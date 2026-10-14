/// <reference lib="webworker" />
// Runs user Python in Pyodide (CPython compiled to WebAssembly), loaded from jsDelivr.
import { PYODIDE_VERSION } from '../lib/runtimes'
import HARNESS from './harness.py?raw'

type PyodideAPI = {
  runPythonAsync: (code: string, opts?: { globals?: unknown }) => Promise<unknown>
  setStdout: (o: { batched: (s: string) => void }) => void
  setStderr: (o: { batched: (s: string) => void }) => void
  globals: { get: (k: string) => unknown }
  loadPackage: (names: string | string[]) => Promise<unknown>
  loadPackagesFromImports: (code: string) => Promise<unknown>
}

let pyodide: Promise<PyodideAPI> | null = null
let out: string[] = []

function boot() {
  pyodide ??= (async () => {
    const url = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`
    const { loadPyodide } = await import(/* @vite-ignore */ `${url}pyodide.mjs`)
    const py: PyodideAPI = await loadPyodide({ indexURL: url })
    py.setStdout({ batched: s => out.push(s) })
    py.setStderr({ batched: s => out.push(s) })
    await py.runPythonAsync(HARNESS)
    return py
  })()
  return pyodide
}

self.onmessage = async (e: MessageEvent) => {
  const { id, type, code, entry, tests } = e.data
  try {
    const py = await boot()
    if (type === 'warmup') {
      self.postMessage({ id, ok: true })
      return
    }
    // Packages (numpy, pandas...) download on first use. DataFrame tests need pandas
    // even if the code never imports it, because their inputs are built as DataFrames.
    if (type === 'prepare') {
      if (JSON.stringify(tests).includes('"__df__"')) await py.loadPackage('pandas')
      await py.loadPackagesFromImports(code).catch(() => {})
      self.postMessage({ id, ok: true })
      return
    }
    out = []
    const run = py.globals.get('__ae_run') as (s: string, e: string, t: string) => string
    const t0 = performance.now()
    const json = run(code, entry, JSON.stringify(tests.map((t: { args: unknown[] }) => t.args)))
    const ms = performance.now() - t0
    self.postMessage({ id, ok: true, payload: JSON.parse(json), stdout: out.join('\n'), ms })
  } catch (err) {
    self.postMessage({ id, ok: false, error: String((err as Error)?.message ?? err), stdout: out.join('\n') })
  }
}

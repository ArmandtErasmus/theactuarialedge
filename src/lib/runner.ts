// Code execution for the workspace. Python and SQL run in our own Web Workers;
// R runs in webR (which manages its own worker). Every run has a timeout, and a
// runtime that times out is torn down and rebuilt so the page never hangs.
import { useSyncExternalStore } from 'react'
import type { CodeProblem, CodeTest, Lang } from '../data/types'
import { createStore } from '../state/storage'
import { resultSetsMatch, sqlIsOrdered, valuesMatch } from './grade'
import { callExpr, fromR } from './rBridge'
import { WEBR_BASE } from './runtimes'

export type RuntimeStatus = 'cold' | 'loading' | 'ready' | 'running' | 'error'
const status = createStore<Record<Lang, RuntimeStatus>>({ python: 'cold', r: 'cold', sql: 'cold' })
const setStatus = (lang: Lang, s: RuntimeStatus) => status.set(prev => ({ ...prev, [lang]: s }))
export const useRuntimeStatus = (lang: Lang) => useSyncExternalStore(status.subscribe, () => status.get()[lang])

export interface TestResult {
  index: number
  args: unknown[]
  expected: unknown
  actual?: unknown
  error?: string
  pass: boolean
}

export interface ResultSet {
  columns: string[]
  values: unknown[][]
}

export type RunOutcome =
  | { kind: 'tests'; results: TestResult[]; stdout: string; ms: number; compileError?: string }
  | { kind: 'sql'; pass: boolean; actual?: ResultSet; expected?: ResultSet; error?: string; ms: number; ordered: boolean }
  | { kind: 'error'; message: string }

const RUN_TIMEOUT_MS = 8000
const BOOT_TIMEOUT_MS = 90000

// ---------- generic worker host ----------
class WorkerHost {
  private worker: Worker | null = null
  private seq = 0
  private booted = false
  /** Bumped whenever the worker is replaced, so per-worker caches know to start over. */
  generation = 0
  private readonly lang: Lang
  private readonly create: () => Worker
  constructor(lang: Lang, create: () => Worker) {
    this.lang = lang
    this.create = create
  }

  private get w() {
    if (!this.worker) {
      this.worker = this.create()
      this.booted = false
    }
    return this.worker
  }

  private reset() {
    this.worker?.terminate()
    this.worker = null
    this.booted = false
    this.generation++
  }

  /** `slow` calls (booting, downloading packages) get the boot timeout and show as loading. */
  call<T>(msg: Record<string, unknown>, slow = false): Promise<T> {
    const id = ++this.seq
    const worker = this.w
    const timeout = this.booted && !slow ? RUN_TIMEOUT_MS : BOOT_TIMEOUT_MS
    if (!this.booted || slow) setStatus(this.lang, 'loading')
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        cleanup()
        const wasBooted = this.booted
        this.reset()
        setStatus(this.lang, wasBooted ? 'ready' : 'error')
        reject(
          new Error(
            wasBooted
              ? `Time limit exceeded (${RUN_TIMEOUT_MS / 1000}s). Check for an infinite loop; the runtime was restarted.`
              : 'The runtime took too long to load. Check your connection and try again.',
          ),
        )
      }, timeout)
      const onMessage = (e: MessageEvent) => {
        if (e.data.id !== id) return
        cleanup()
        this.booted = true
        setStatus(this.lang, 'ready')
        if (e.data.ok) resolve(e.data as T)
        else reject(new Error(e.data.error))
      }
      const onError = (e: ErrorEvent) => {
        cleanup()
        this.reset()
        setStatus(this.lang, 'error')
        reject(new Error(e.message || 'The runtime crashed.'))
      }
      const cleanup = () => {
        clearTimeout(timer)
        worker.removeEventListener('message', onMessage)
        worker.removeEventListener('error', onError)
      }
      worker.addEventListener('message', onMessage)
      worker.addEventListener('error', onError)
      if (this.booted && !slow) setStatus(this.lang, 'running')
      worker.postMessage({ id, ...msg })
    })
  }
}

const python = new WorkerHost('python', () => new Worker(new URL('../workers/python.worker.ts', import.meta.url), { type: 'module' }))
const sql = new WorkerHost('sql', () => new Worker(new URL('../workers/sql.worker.ts', import.meta.url), { type: 'module' }))

// ---------- R (webR) ----------
type WebRModule = typeof import('webr')
type WebRInstance = InstanceType<WebRModule['WebR']>
let webR: Promise<WebRInstance> | null = null

function bootR(): Promise<WebRInstance> {
  webR ??= (async () => {
    setStatus('r', 'loading')
    const mod: WebRModule = await import('webr')
    const instance = new mod.WebR({ baseUrl: WEBR_BASE, channelType: mod.ChannelType.PostMessage, interactive: false })
    await instance.init()
    setStatus('r', 'ready')
    return instance
  })().catch(e => {
    webR = null
    setStatus('r', 'error')
    throw e
  })
  return webR
}

function withTimeout<T>(p: Promise<T>, ms: number, onTimeout: () => void): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => {
      onTimeout()
      reject(new Error(`Time limit exceeded (${ms / 1000}s). Check for an infinite loop; the runtime was restarted.`))
    }, ms)
    p.then(
      v => (clearTimeout(t), resolve(v)),
      e => (clearTimeout(t), reject(e)),
    )
  })
}

async function runR(code: string, entry: string, tests: CodeTest[]): Promise<RunOutcome> {
  const r = await withTimeout(bootR(), BOOT_TIMEOUT_MS, () => {
    webR = null
  })
  setStatus('r', 'running')
  const t0 = performance.now()
  const shelter = await new r.Shelter()
  const stdout: string[] = []
  const kill = () => {
    r.close()
    webR = null
    setStatus('r', 'cold')
  }
  try {
    await r.evalRVoid('rm(list = ls(globalenv()), envir = globalenv())')
    try {
      const def = await withTimeout(shelter.captureR(code, { withAutoprint: false, captureStreams: true }), RUN_TIMEOUT_MS, kill)
      def.output.forEach(o => (o.type === 'stdout' || o.type === 'stderr') && stdout.push(String(o.data)))
    } catch (e) {
      return { kind: 'tests', results: [], stdout: stdout.join('\n'), ms: performance.now() - t0, compileError: (e as Error).message }
    }
    const results: TestResult[] = []
    for (const [index, t] of tests.entries()) {
      try {
        const cap = await withTimeout(shelter.captureR(callExpr(entry, t.args), { withAutoprint: false, captureStreams: true }), RUN_TIMEOUT_MS, kill)
        cap.output.forEach(o => (o.type === 'stdout' || o.type === 'stderr') && stdout.push(String(o.data)))
        const actual = fromR(await cap.result.toJs())
        results.push({ index, args: t.args, expected: t.expected, actual, pass: valuesMatch(actual, t.expected) })
      } catch (e) {
        results.push({ index, args: t.args, expected: t.expected, error: (e as Error).message, pass: false })
        if (!webR) break
      }
    }
    return { kind: 'tests', results, stdout: stdout.join('\n'), ms: performance.now() - t0 }
  } finally {
    if (webR) {
      await shelter.purge().catch(() => {})
      setStatus('r', 'ready')
    }
  }
}

// Loads the packages a run needs (pandas for DataFrame problems, plus anything the code
// imports). Downloads happen once per session, so later runs skip the round trip.
let loadedPython = { generation: -1, modules: new Set<string>() }
async function preparePython(code: string, tests: CodeTest[]) {
  if (loadedPython.generation !== python.generation) loadedPython = { generation: python.generation, modules: new Set() }
  const imports = [...code.matchAll(/^\s*(?:import|from)\s+([A-Za-z_]\w*)/gm)].map(m => m[1])
  if (JSON.stringify(tests).includes('"__df__"')) imports.push('pandas')
  const missing = imports.filter(m => !loadedPython.modules.has(m))
  if (!missing.length) return
  await python.call({ type: 'prepare', code, tests }, true)
  missing.forEach(m => loadedPython.modules.add(m))
}

// ---------- public API ----------
export function warmUp(lang: Lang) {
  if (lang === 'r') return bootR().then(() => undefined)
  return (lang === 'python' ? python : sql).call({ type: 'warmup' }).then(() => undefined)
}

export async function runProblem(problem: CodeProblem, code: string): Promise<RunOutcome> {
  try {
    if (problem.lang === 'sql') {
      const res = await sql.call<{ payload: { actual: ResultSet | { error: string }; expected: ResultSet | { error: string } }; ms: number }>({
        type: 'run',
        tables: problem.tables,
        code,
        reference: problem.solution,
      })
      const { actual, expected } = res.payload
      const ordered = sqlIsOrdered(problem.solution)
      if ('error' in actual) return { kind: 'sql', pass: false, error: actual.error, ms: res.ms, ordered, expected: 'error' in expected ? undefined : expected }
      if ('error' in expected) return { kind: 'error', message: `Reference solution failed: ${expected.error}` }
      return { kind: 'sql', pass: resultSetsMatch(actual, expected, ordered), actual, expected, ms: res.ms, ordered }
    }
    const tests = problem.tests ?? []
    if (problem.lang === 'r') return await runR(code, problem.entry!, tests)
    await preparePython(code, tests)
    const res = await python.call<{ payload: { results?: { ok: boolean; value?: unknown; error?: string; trace?: string }[]; compileError?: string }; stdout: string; ms: number }>({
      type: 'run',
      code,
      entry: problem.entry,
      tests,
    })
    if (res.payload.compileError) return { kind: 'tests', results: [], stdout: res.stdout, ms: res.ms, compileError: res.payload.compileError }
    const results = (res.payload.results ?? []).map((r, index): TestResult => {
      const t = tests[index]
      return r.ok
        ? { index, args: t.args, expected: t.expected, actual: r.value, pass: valuesMatch(r.value, t.expected) }
        : { index, args: t.args, expected: t.expected, error: r.trace || r.error, pass: false }
    })
    return { kind: 'tests', results, stdout: res.stdout, ms: res.ms }
  } catch (e) {
    return { kind: 'error', message: (e as Error).message }
  }
}

export const outcomePassed = (o: RunOutcome) =>
  o.kind === 'sql' ? o.pass : o.kind === 'tests' ? !o.compileError && o.results.length > 0 && o.results.every(r => r.pass) : false

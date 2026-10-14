// Runs scripts/problems/build_python.py inside the same Pyodide (with pandas) that the
// site uses, in headless Chrome, so DataFrame problems are built and checked against
// the real runtime.
//   node scripts/problems/gen-python.ts check [specs/python_x.py ...]
//   node scripts/problems/gen-python.ts write
import fs from 'node:fs'
import path from 'node:path'
import { chromium } from 'playwright-core'
import { PYODIDE_VERSION } from '../../src/lib/runtimes.ts'

const root = path.resolve(import.meta.dirname, '../..')
const [mode = 'check', ...files] = process.argv.slice(2)
const rel = (p: string) => path.relative(root, path.resolve(p)).split(path.sep).join('/')

const inputs: Record<string, string> = {}
const add = (p: string) => (inputs[p] = fs.readFileSync(path.join(root, p), 'utf8'))
add('src/workers/harness.py')
add('scripts/problems/build_python.py')
add('content/coding/python.json')
for (const f of fs.readdirSync(path.join(root, 'scripts/problems/specs'))) if (/^python_.*\.py$/.test(f)) add(`scripts/problems/specs/${f}`)
const args = files.map(f => `/work/${rel(f)}`)
for (const f of files) add(rel(f))

const chrome = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const browser = await chromium.launch({ executablePath: chrome, headless: true })
const page = await browser.newPage()
page.on('console', m => console.log(m.text()))
const result = await page.evaluate(
  async ({ version, inputs, mode, args }) => {
    const url = `https://cdn.jsdelivr.net/pyodide/v${version}/full/`
    const { loadPyodide } = await import(/* @vite-ignore */ `${url}pyodide.mjs`)
    const py = await loadPyodide({ indexURL: url, stdout: (s: string) => console.log(s), stderr: (s: string) => console.log(s) })
    await py.loadPackage('pandas')
    for (const [p, text] of Object.entries(inputs)) {
      py.FS.mkdirTree(`/work/${p.split('/').slice(0, -1).join('/')}`)
      py.FS.writeFile(`/work/${p}`, text)
    }
    py.globals.set('argv', py.toPy(['build_python.py', mode, ...args]))
    const code = py.runPython(`
import runpy
ns = runpy.run_path('/work/scripts/problems/build_python.py', run_name='build')
ns['main'](list(argv))
`)
    const out = mode === 'write' && code === 0 ? py.FS.readFile('/work/content/coding/python.json', { encoding: 'utf8' }) : null
    return { code, out }
  },
  { version: PYODIDE_VERSION, inputs, mode, args },
)
await browser.close()
if (result.out) fs.writeFileSync(path.join(root, 'content/coding/python.json'), result.out)
process.exit(result.code)

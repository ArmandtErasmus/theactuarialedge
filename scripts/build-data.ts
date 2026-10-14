// Compiles content/ into the static JSON the app fetches from /data/.
// Runs automatically before `npm run dev` and `npm run build`.
//
//   content/catalog.json          subjects + exam codes
//   content/questions/*.json      question banks (+ optional content/enrich/*.json patches)
//   content/coding/*.json         Python / R / SQL problems
//   content/projects/*.md         portfolio projects (frontmatter + markdown)
//   content/guides/*.md           CV + career guides
//
// Output: public/data/manifest.json (everything the lists need) plus per-subject bundles.
import fs from 'node:fs'
import path from 'node:path'
import initSqlJs from 'sql.js'
import { buildSchema } from '../src/lib/sqlSchema.ts'
import { callExpr } from '../src/lib/rBridge.ts'

const root = path.resolve(import.meta.dirname, '..')
const content = path.join(root, 'content')
const out = path.join(root, 'public', 'data')

const readJson = (p: string) => JSON.parse(fs.readFileSync(p, 'utf8'))
const listFiles = (dir: string, ext: string) =>
  fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(ext)).sort() : []
const write = (rel: string, data: unknown) => {
  const file = path.join(out, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(data))
}

// ---------- deterministic option shuffle ----------
// The legacy banks almost always list the correct option first, so options are shuffled
// once per question (seeded by id, so a question always looks the same).
function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) >>> 0
    let t = seed
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const PINNED_LAST = /^(all|none|both|neither) of (the )?(above|these)|^all of the|^none of the|^both (a|b) and|^\(?[a-d]\)? and \(?[a-d]\)?$/i

function shuffleOptions(q: any) {
  const idx = q.options.map((_: string, i: number) => i)
  const free = idx.filter((i: number) => !PINNED_LAST.test(q.options[i].trim()))
  const pinned = idx.filter((i: number) => PINNED_LAST.test(q.options[i].trim()))
  // Options that refer to each other by letter ("A and B") can't be reordered safely.
  if (q.options.some((o: string) => /\b(option|answer)s? [A-D]\b|^[A-D] and [A-D]$/.test(o))) return q
  const r = rng(hash(q.id))
  for (let i = free.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[free[i], free[j]] = [free[j], free[i]]
  }
  const order = [...free, ...pinned]
  return { ...q, options: order.map((i: number) => q.options[i]), answerIndex: order.indexOf(q.answerIndex) }
}

// ---------- frontmatter ----------
function parseFrontmatter(src: string): { meta: Record<string, unknown>; body: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src)
  if (!m) return { meta: {}, body: src }
  const meta: Record<string, unknown> = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z][\w-]*):\s*(.*)$/.exec(line)
    if (!kv) continue
    const [, k, raw] = kv
    const v = raw.trim()
    if (v.startsWith('[') && v.endsWith(']')) meta[k] = v.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean)
    else if (/^-?\d+(\.\d+)?$/.test(v)) meta[k] = Number(v)
    else meta[k] = v.replace(/^["']|["']$/g, '')
  }
  return { meta, body: src.slice(m[0].length).trim() }
}

const plain = (s: string) =>
  s.replace(/\$\$?([^$]*)\$\$?/g, '$1').replace(/\\[a-zA-Z]+/g, '').replace(/[{}\\]/g, '').replace(/\s+/g, ' ').trim()
const fallbackTitle = (prompt: string) => {
  const words = plain(prompt).split(' ').slice(0, 8).join(' ')
  return words.length > 60 ? words.slice(0, 57) + '…' : words
}

// ---------- build ----------
fs.rmSync(out, { recursive: true, force: true })
const catalog = readJson(path.join(content, 'catalog.json'))
const problems: any[] = []
const subjectStats: Record<string, { total: number; easy: number; medium: number; hard: number }> = {}
const examCounts: Record<string, number> = {}
let enriched = 0

// Catalogue order (exam subjects first, then interview sets) drives the default list order.
const catalogOrder = catalog.subjects.map((s: { id: string }) => `${s.id}.json`)
const questionFiles = listFiles(path.join(content, 'questions'), '.json').sort(
  (a, b) => (catalogOrder.indexOf(a) + 1 || 999) - (catalogOrder.indexOf(b) + 1 || 999),
)
for (const file of questionFiles) {
  const subject = file.replace(/\.json$/, '')
  const patchFile = path.join(content, 'enrich', file)
  const patch = fs.existsSync(patchFile) ? readJson(patchFile) : {}
  const merged = readJson(path.join(content, 'questions', file)).map((q: any) => {
    const p = patch[q.id]
    if (p) enriched++
    let full = { ...q, ...(p?.fix ?? {}) }
    full.title = p?.title ?? q.title ?? fallbackTitle(q.prompt)
    full.difficulty = p?.difficulty ?? q.difficulty ?? 'medium'
    full.topics = p?.topics ?? q.topics ?? []
    if (full.type === 'mcq') full = shuffleOptions(full)
    return full
  })
  write(`q/${subject}.json`, merged)
  const stats = (subjectStats[subject] = { total: 0, easy: 0, medium: 0, hard: 0 })
  for (const q of merged) {
    stats.total++
    stats[q.difficulty as 'easy']++
    for (const e of q.exams) examCounts[e] = (examCounts[e] ?? 0) + 1
    problems.push({
      id: q.id,
      kind: 'question',
      n: q.n,
      title: q.title,
      difficulty: q.difficulty,
      subject,
      type: q.type,
      topics: q.topics,
      exams: q.exams,
    })
  }
}

const languages: Record<string, number> = {}
for (const file of listFiles(path.join(content, 'coding'), '.json')) {
  const lang = file.replace(/\.json$/, '')
  const list = readJson(path.join(content, 'coding', file))
  write(`code/${lang}.json`, list)
  languages[lang] = list.length
  for (const p of list) {
    problems.push({ id: p.id, kind: 'code', n: p.n, title: p.title, difficulty: p.difficulty, subject: lang, type: 'code', topics: p.topics ?? [], exams: [] })
  }
}

function collectMarkdown(dir: string, kind: string) {
  const items: any[] = []
  for (const file of listFiles(path.join(content, dir), '.md')) {
    const { meta, body } = parseFrontmatter(fs.readFileSync(path.join(content, dir, file), 'utf8'))
    const slug = (meta.slug as string) || file.replace(/\.md$/, '')
    const item = { ...meta, slug }
    write(`${kind}/${slug}.json`, { ...item, body })
    items.push(item)
  }
  return items.sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || String(a.title).localeCompare(String(b.title)))
}

const manifest = {
  generatedAt: new Date().toISOString(),
  subjects: catalog.subjects.map((s: any) => ({ ...s, ...(subjectStats[s.id] ?? { total: 0, easy: 0, medium: 0, hard: 0 }) })),
  exams: catalog.exams.map((e: any) => ({ ...e, total: examCounts[e.id] ?? 0 })),
  languages,
  problems,
  projects: collectMarkdown('projects', 'projects'),
  guides: collectMarkdown('guides', 'guides'),
}
write('manifest.json', manifest)

// ---------- homepage code demo ----------
// The animated hero demo replays real problems: code, calls and expected values come straight
// from content/coding, and the SQL output is computed here with the same sql.js engine.
const DEMOS = [
  { id: 'python-49', blurb: 'Compound a series of returns from a wealth index of 1 and find the deepest fall from a running peak.' },
  { id: 'r-20', blurb: 'Estimate historical Value at Risk at confidence level c, reported as a positive loss.' },
  { id: 'sql-29', blurb: 'List each policy with a running total of premium written, in start-date order.' },
]
const SQL = await initSqlJs()
const pyValue = (v: unknown): string =>
  Array.isArray(v) ? `[${v.map(pyValue).join(', ')}]` : v && typeof v === 'object' ? JSON.stringify(v) : String(v)
const demos = DEMOS.map(({ id, blurb }) => {
  const lang = id.replace(/-\d+$/, '')
  const p = readJson(path.join(content, 'coding', `${lang}.json`)).find((x: { id: string }) => x.id === id)
  if (!p) throw new Error(`demo problem ${id} not found`)
  const base = { id, lang, title: p.title, difficulty: p.difficulty, blurb, starter: p.starterCode, code: p.solution.trim() }
  if (lang === 'sql') {
    const db = new SQL.Database()
    db.run(buildSchema(p.tables))
    const [res] = db.exec(p.solution)
    db.close()
    return { ...base, result: { columns: res.columns, values: res.values } }
  }
  const cases = (p.tests as { args: unknown[]; expected: unknown }[]).map(t => ({
    call: lang === 'r' ? callExpr(p.entry, t.args) : `${p.entry}(${t.args.map(pyValue).join(', ')})`,
    expected: pyValue(t.expected),
  }))
  return { ...base, cases }
})
write('demo.json', demos)

const kb = (fs.statSync(path.join(out, 'manifest.json')).size / 1024).toFixed(0)
console.log(
  `build-data: ${problems.length} problems${enriched ? ` (${enriched} patched)` : ""}, ${manifest.projects.length} projects, ${manifest.guides.length} guides, manifest ${kb} KB`,
)

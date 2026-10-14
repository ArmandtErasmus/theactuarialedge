// HISTORICAL: the one-off migration from the old site's JS question banks to content/.
// Do NOT re-run: content/questions/*.json has since been reviewed and corrected by hand
// (see content/REVIEW_LOG.md) and re-running would overwrite those fixes.
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'

const ROOT = path.resolve(import.meta.dirname, '../..')
const LEGACY = path.resolve(ROOT, '../original')
const OUT = path.join(ROOT, 'content')

const load = (file, varName) => {
  const src = fs.readFileSync(file, 'utf8')
  const stub = { addEventListener() {}, getElementById: () => null, querySelector: () => null, querySelectorAll: () => [] }
  const ctx = { document: stub, window: {}, console }
  vm.createContext(ctx)
  vm.runInContext(src.replace(new RegExp(`^\\s*const ${varName}\\s*=`, 'm'), `globalThis.${varName} =`), ctx)
  return ctx[varName]
}

// ---------- text normalisation ----------

// Escape currency dollars ("$500 on claims") so that only real maths stays inside $...$.
export function escapeCurrency(text) {
  if (!text) return text
  let out = ''
  let i = 0
  while (i < text.length) {
    const ch = text[i]
    if (ch === '\\' && text[i + 1] === '$') { out += '\\$'; i += 2; continue }
    if (ch !== '$') { out += ch; i++; continue }
    if (text[i + 1] === '$') { // display maths: copy through to closing $$
      const end = text.indexOf('$$', i + 2)
      if (end === -1) { out += '\\$\\$'; i += 2; continue }
      out += text.slice(i, end + 2); i = end + 2; continue
    }
    const close = findClose(text, i + 1)
    const inner = close === -1 ? null : text.slice(i + 1, close)
    if (inner !== null && looksLikeMath(inner, text[i + 1])) {
      out += '$' + inner.replace(/(^|[^\\])%/g, '$1\\%') + '$'
      i = close + 1
    } else {
      out += '\\$'
      i++
    }
  }
  return out
}

function findClose(text, from) {
  for (let j = from; j < text.length; j++) {
    if (text[j] === '\\') { j++; continue }
    if (text[j] === '$') return j
  }
  return -1
}

function looksLikeMath(inner, first) {
  if (!inner.trim()) return false
  if (inner.length > 160) return false
  const hasTex = /\\[a-zA-Z]+|[\^_{}]/.test(inner)
  const prose = /[a-zA-Z]{3,}[\s,.]+[a-zA-Z]{3,}[\s,.]+[a-zA-Z]{2,}/.test(inner.replace(/\\[a-zA-Z]+/g, ''))
  // "$4.50, S=$50" / "$500 on claims ... $X$": a dollar before a digit is currency
  // unless the span is TeX ("$0.3 \times 10$") or a bare number ("$500$").
  if (/^[\d.]/.test(first)) return hasTex || /^[\d.,\s]+$/.test(inner)
  if (prose && !hasTex) return false
  return true
}

const clean = s => (s ?? '').toString().replace(/\r\n/g, '\n').trim()
const norm = s => clean(s).toLowerCase().replace(/\s+/g, ' ')

// "21,000.00" | "5%" | "-0.0333" -> number; otherwise null
export function parseNumeric(raw) {
  const s = clean(raw).replace(/^R\s?/i, '').replace(/[\s,$]/g, '').replace(/\\\$/g, '')
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?%?$/i.test(s)) return null
  const pct = s.endsWith('%')
  const n = parseFloat(pct ? s.slice(0, -1) : s)
  return Number.isFinite(n) ? (pct ? n / 100 : n) : null
}

const isPlaceholder = q => /Practice question covering|^\[Question \d+ for/.test(q.question)

function convertQuestion(q, subject) {
  const base = {
    id: `${subject}-${q.id}`,
    subject,
    prompt: escapeCurrency(clean(q.question)),
    solution: escapeCurrency(clean(q.solution)),
  }
  if (q.questionType === 'multiple-choice') {
    const options = (q.options ?? []).map(o => escapeCurrency(clean(o.label)))
    const answerIndex = (q.options ?? []).findIndex(o => o.value === q.answer)
    if (answerIndex < 0) return { ...base, type: 'mcq', options, answerIndex: -1, _issue: 'no correct option' }
    return { ...base, type: 'mcq', options, answerIndex }
  }
  const ans = clean(q.answer)
  if (/^(true|false)$/i.test(ans)) return { ...base, type: 'truefalse', answer: ans.toLowerCase() }
  const n = parseNumeric(ans)
  if (n !== null) return { ...base, type: 'numeric', answer: ans.replace(/\\\$/g, '$') }
  return { ...base, type: 'open', answer: escapeCurrency(ans) }
}

// ---------- exam question banks ----------

const IFOA_PRIMARY = ['cs1', 'cs2', 'cm1', 'cm2', 'cb1', 'cb2', 'cb3', 'cp1', 'cp2', 'cp3',
  'sp1', 'sp2', 'sp4', 'sp5', 'sp6', 'sp7', 'sp8', 'sp9', 'sp10', 'sa1', 'sa2', 'sa3', 'sa4', 'sa7', 'sa10']
const ASSA = ['a111', 'a112', 'a113', 'a211', 'a212', 'a213', 'a214', 'a311', 'n111', 'n211', 'n311', 'n411',
  'f101', 'f102', 'f103', 'f104', 'f105', 'f106', 'f107', 'f108', 'f201', 'f202', 'f203', 'f204', 'f205', 'f207']
const TOPIC_SETS = ['probability', 'statistics', 'finance', 'brainteasers']

const report = { subjects: {}, placeholdersDropped: 0, duplicatesDropped: 0, assaMapped: 0, assaUnique: 0, issues: [] }
const bank = new Map() // subject -> question[]
const byText = new Map() // normalised prompt -> question

function ingest(subject, file, examTag) {
  const qs = load(file, 'questions')
  const kept = []
  for (const q of qs) {
    if (isPlaceholder(q)) { report.placeholdersDropped++; continue }
    const key = norm(q.question)
    const existing = byText.get(key)
    if (existing) {
      if (examTag && !existing.exams.includes(examTag)) { existing.exams.push(examTag); report.assaMapped++ }
      else report.duplicatesDropped++
      continue
    }
    const c = convertQuestion(q, subject)
    c.exams = examTag ? [examTag] : []
    if (c._issue) { report.issues.push(`${c.id}: ${c._issue}`); delete c._issue; continue }
    byText.set(key, c)
    kept.push(c)
  }
  if (kept.length) bank.set(subject, [...(bank.get(subject) ?? []), ...kept])
  report.subjects[subject] = (report.subjects[subject] ?? 0) + kept.length
}

for (const s of IFOA_PRIMARY) {
  const f = path.join(LEGACY, 'exams', `practice-${s}.js`)
  if (fs.existsSync(f)) ingest(s, f, `ifoa-${s}`)
}
for (const s of TOPIC_SETS) ingest(s, path.join(LEGACY, 'exams', `${s}.js`), null)
// ASSA banks mirror IFoA ones; anything genuinely new gets its own subject bucket.
for (const s of ASSA) {
  const f = path.join(LEGACY, 'exams', `practice-${s}.js`)
  if (!fs.existsSync(f)) continue
  const before = report.assaMapped
  ingest(s, f, `assa-${s}`)
  report.assaUnique += report.subjects[s] ?? 0
  report.subjects[`${s} (mapped onto IFoA)`] = report.assaMapped - before
}

fs.mkdirSync(path.join(OUT, 'questions'), { recursive: true })
for (const [subject, qs] of bank) {
  qs.forEach((q, i) => { q.n = i + 1 })
  fs.writeFileSync(path.join(OUT, 'questions', `${subject}.json`), JSON.stringify(qs, null, 2) + '\n')
}

// ---------- coding problems ----------

fs.mkdirSync(path.join(OUT, 'coding'), { recursive: true })
for (const [lang, file, varName] of [
  ['python', 'python-practice.js', 'pythonProblems'],
  ['r', 'r-practice.js', 'rProblems'],
  ['sql', 'sql-practice.js', 'sqlProblems'],
]) {
  const probs = load(path.join(LEGACY, 'resources', file), varName)
  const out = probs.map(p => {
    const common = {
      id: `${lang}-${p.id}`,
      lang,
      n: p.id,
      title: clean(p.title),
      difficulty: p.difficulty,
      description: clean(p.description).replace(/\n\s{4,}/g, '\n'),
      starterCode: p.starterCode.replace(/\r\n/g, '\n'),
      solution: p.solution.replace(/\r\n/g, '\n'),
    }
    if (lang === 'sql') {
      const tables = Array.isArray(p.sampleData)
        ? { [(/\bFROM\s+([a-zA-Z_]\w*)/i.exec(p.solution) ?? [])[1] ?? 'data']: p.sampleData }
        : p.sampleData
      return { ...common, tables }
    }
    const fn = (lang === 'python' ? /def\s+([a-zA-Z_]\w*)\s*\(/ : /([a-zA-Z_][\w.]*)\s*<-\s*function/).exec(p.starterCode)?.[1]
    return { ...common, entry: fn, tests: p.testCases.map(t => ({ args: t.input, expected: t.expected })) }
  })
  fs.writeFileSync(path.join(OUT, 'coding', `${lang}.json`), JSON.stringify(out, null, 2) + '\n')
  report.subjects[`coding:${lang}`] = out.length
}

console.log(JSON.stringify(report, null, 2))

// Validates an enrichment patch (content/enrich/<subject>.json) against its question bank.
// Run: node scripts/check-enrich.ts cm1
// The patch maps question id -> { title, difficulty, topics, fix?, note? }.
import fs from 'node:fs'
import path from 'node:path'
import katex from 'katex'
import { tokenize } from '../../src/lib/tokenize.ts'

const subject = process.argv[2]
if (!subject) throw new Error('usage: node scripts/check-enrich.ts <subject>')
const root = path.resolve(import.meta.dirname, '../..')
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'content/catalog.json'), 'utf8'))
const topics: string[] = catalog.subjects.find((s: { id: string }) => s.id === subject).topics
const qs = JSON.parse(fs.readFileSync(path.join(root, `content/questions/${subject}.json`), 'utf8'))
const patchFile = path.join(root, `content/enrich/${subject}.json`)
const patch = JSON.parse(fs.readFileSync(patchFile, 'utf8'))

const errors: string[] = []
const texOk = (id: string, field: string, s: unknown) => {
  if (typeof s !== 'string') return
  for (const seg of tokenize(s)) {
    if (seg.kind !== 'math') continue
    try {
      katex.renderToString(seg.value, { throwOnError: true, displayMode: seg.display, strict: 'error' })
    } catch (e) {
      errors.push(`${id}.${field}: TeX "${seg.value.slice(0, 60)}" -> ${(e as Error).message.slice(0, 90)}`)
    }
  }
}

const seen = new Set<string>()
for (const q of qs) {
  const p = patch[q.id]
  if (!p) { errors.push(`${q.id}: missing from patch`); continue }
  seen.add(q.id)
  if (typeof p.title !== 'string' || p.title.length < 4 || p.title.length > 70) errors.push(`${q.id}: title must be 4-70 chars`)
  if (!['easy', 'medium', 'hard'].includes(p.difficulty)) errors.push(`${q.id}: difficulty must be easy|medium|hard`)
  if (!Array.isArray(p.topics) || p.topics.length < 1 || p.topics.length > 3) errors.push(`${q.id}: 1-3 topics required`)
  for (const t of p.topics ?? []) if (!topics.includes(t)) errors.push(`${q.id}: unknown topic "${t}"`)
  const merged = { ...q, ...(p.fix ?? {}) }
  if (p.fix) {
    const allowed = ['prompt', 'options', 'answerIndex', 'answer', 'solution', 'type', 'tolerance']
    for (const k of Object.keys(p.fix)) if (!allowed.includes(k)) errors.push(`${q.id}: fix.${k} not allowed`)
    if (!p.note) errors.push(`${q.id}: a fix needs a note explaining it`)
  }
  if (!['mcq', 'numeric', 'truefalse', 'open'].includes(merged.type)) errors.push(`${q.id}: bad type`)
  if (merged.type === 'mcq') {
    if (!Array.isArray(merged.options) || merged.options.length < 2) errors.push(`${q.id}: mcq needs options`)
    else if (!(merged.answerIndex >= 0 && merged.answerIndex < merged.options.length)) errors.push(`${q.id}: answerIndex out of range`)
  } else if (merged.type === 'numeric') {
    const s = String(merged.answer ?? '').replace(/[\s,$R]/g, '').replace(/%$/, '')
    if (!Number.isFinite(Number(s)) || s === '') errors.push(`${q.id}: numeric answer "${merged.answer}" does not parse`)
  } else if (merged.type === 'truefalse') {
    if (!['true', 'false'].includes(merged.answer)) errors.push(`${q.id}: truefalse answer must be "true" or "false"`)
  } else if (!String(merged.answer ?? '').trim()) errors.push(`${q.id}: empty answer`)
  for (const f of ['prompt', 'solution', 'answer']) texOk(q.id, f, merged[f])
  ;(merged.options ?? []).forEach((o: string, i: number) => texOk(q.id, `options[${i}]`, o))
}
for (const id of Object.keys(patch)) if (!seen.has(id)) errors.push(`${id}: not a question in ${subject}`)

const fixes = Object.values(patch).filter((p: any) => p.fix).length
const diff: Record<string, number> = {}
for (const p of Object.values(patch) as any[]) diff[p.difficulty] = (diff[p.difficulty] ?? 0) + 1
console.log({ subject, questions: qs.length, patched: seen.size, fixes, difficulty: diff, errors: errors.length })
errors.slice(0, 80).forEach(e => console.log('  ' + e))
process.exit(errors.length ? 1 : 0)

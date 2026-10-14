// Content QA: every TeX segment must compile, every question must be well-formed.
// Run: node scripts/check-content.ts   (exits 1 on problems)
import fs from 'node:fs'
import path from 'node:path'
import katex from 'katex'
import { tokenize } from '../src/lib/tokenize.ts'

const dir = path.resolve(import.meta.dirname, '../content/questions')
const catalog = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, '../content/catalog.json'), 'utf8'))
const topicsBySubject = new Map<string, string[]>(catalog.subjects.map((s: { id: string; topics: string[] }) => [s.id, s.topics]))
const examIds = new Set(catalog.exams.map((e: { id: string }) => e.id))
const titles = new Map<string, Set<string>>()
const problems: string[] = []
const types: Record<string, number> = {}
let segments = 0
const ids = new Set<string>()

for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
  const qs = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'))
  for (const q of qs) {
    types[q.type] = (types[q.type] ?? 0) + 1
    if (ids.has(q.id)) problems.push(`${q.id}: duplicate id`)
    ids.add(q.id)
    if (!q.prompt?.trim()) problems.push(`${q.id}: empty prompt`)
    if (q.type === 'mcq' && !(q.answerIndex >= 0 && q.answerIndex < q.options.length)) problems.push(`${q.id}: bad answerIndex`)
    if (q.type !== 'mcq' && !String(q.answer ?? '').trim()) problems.push(`${q.id}: empty answer`)
    if (!['easy', 'medium', 'hard'].includes(q.difficulty)) problems.push(`${q.id}: difficulty must be easy|medium|hard`)
    if (typeof q.title !== 'string' || q.title.length < 4 || q.title.length > 70) problems.push(`${q.id}: title must be 4-70 characters`)
    const seen = titles.get(q.subject) ?? new Set<string>()
    if (seen.has(q.title)) problems.push(`${q.id}: duplicate title "${q.title}" in ${q.subject}`)
    seen.add(q.title)
    titles.set(q.subject, seen)
    const allowed = topicsBySubject.get(q.subject)
    if (!allowed) problems.push(`${q.id}: subject "${q.subject}" is not in catalog.json`)
    else if (!Array.isArray(q.topics) || !q.topics.length) problems.push(`${q.id}: needs at least one topic`)
    else for (const t of q.topics) if (!allowed.includes(t)) problems.push(`${q.id}: topic "${t}" is not in the catalog for ${q.subject}`)
    for (const e of q.exams ?? []) if (!examIds.has(e)) problems.push(`${q.id}: unknown exam "${e}"`)
    if (!q.solution?.trim()) problems.push(`${q.id}: empty solution`)
    for (const field of [q.prompt, q.solution, q.answer, ...(q.options ?? [])]) {
      for (const seg of tokenize(field ?? '')) {
        if (seg.kind !== 'math') continue
        segments++
        try {
          katex.renderToString(seg.value, { throwOnError: true, displayMode: seg.display })
        } catch (e) {
          problems.push(`${q.id}: TeX "${seg.value.slice(0, 80)}" -> ${(e as Error).message.slice(0, 80)}`)
        }
      }
    }
  }
}

console.log({ questions: ids.size, texSegments: segments, types, problems: problems.length })
problems.slice(0, 60).forEach(p => console.log('  ' + p))
if (problems.length) process.exit(1)

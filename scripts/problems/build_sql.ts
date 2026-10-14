// Builds SQL code problems from the spec files in scripts/problems/specs/sql_*.ts.
// A spec gives the statement, sample tables and reference query; this script runs the
// query in sql.js (the same SQLite build the site uses), then writes the description
// (schema, expected result, notes) into content/coding/sql.json. The first 50 problems
// in that file are hand-written and kept as they are.
//   node scripts/problems/build_sql.ts check [specs/sql_x.ts ...]
//   node scripts/problems/build_sql.ts show  [specs/sql_x.ts ...]
//   node scripts/problems/build_sql.ts write
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import initSqlJs from 'sql.js'
import { buildSchema, type Tables } from '../../src/lib/sqlSchema.ts'
import { sqlIsOrdered } from '../../src/lib/grade.ts'

export interface SqlSpec {
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  topics: string[]
  /** Markdown task, without the schema/example/notes sections (those are generated). */
  statement: string
  tables: Tables
  solution: string
  notes?: string[]
}

const root = path.resolve(import.meta.dirname, '../..')
const specDir = path.join(root, 'scripts/problems/specs')
const outFile = path.join(root, 'content/coding/sql.json')
const KEEP = 50
const [mode = 'check', ...files] = process.argv.slice(2)

const SQL = await initSqlJs()

const isDate = (v: unknown) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)
function schemaText(tables: Tables) {
  return Object.entries(tables)
    .map(([name, rows]) => {
      const cols = [...new Set(rows.flatMap(r => Object.keys(r)))]
      const w = Math.max(...cols.map(c => c.length)) + 2
      const lines = cols.map(c => {
        const vals = rows.map(r => r[c]).filter(v => v !== null && v !== undefined)
        const type = vals.length && vals.every(v => typeof v === 'number' && Number.isInteger(v)) ? 'INTEGER' : vals.length && vals.every(v => typeof v === 'number') ? 'REAL' : 'TEXT'
        const note = vals.length && vals.every(isDate) ? "  -- 'YYYY-MM-DD'" : ''
        return `  ${c.padEnd(w)}${type}${note}`
      })
      return [name, ...lines].join('\n')
    })
    .join('\n\n')
}

const cell = (v: unknown) => (v === null || v === undefined ? 'NULL' : typeof v === 'number' && !Number.isInteger(v) ? String(Math.round(v * 1e4) / 1e4) : String(v))
function textTable(columns: string[], rows: unknown[][]) {
  const cells = rows.map(r => r.map(cell))
  const widths = columns.map((c, i) => Math.max(c.length, ...cells.map(r => r[i].length)))
  const line = (vals: string[]) => vals.map((v, i) => v.padEnd(widths[i])).join(' | ').trimEnd()
  const sep = widths.map(w => '-'.repeat(w + 2)).join('+').slice(1, -1)
  return [line(columns), sep, ...cells.map(line)].join('\n')
}

function build(spec: SqlSpec, n: number) {
  for (const k of ['title', 'difficulty', 'topics', 'statement', 'tables', 'solution'] as const) if (!spec[k]) throw new Error(`missing ${k}`)
  if (!['easy', 'medium', 'hard'].includes(spec.difficulty)) throw new Error('difficulty must be easy, medium or hard')
  if (!spec.topics.length) throw new Error('give at least one topic')
  if (/leetcode/i.test(spec.statement + spec.title)) throw new Error("don't mention LeetCode")
  for (const [t, rows] of Object.entries(spec.tables)) if (!rows.length) throw new Error(`table ${t} has no rows`)
  const db = new SQL.Database()
  try {
    db.run(buildSchema(spec.tables))
    const res = db.exec(spec.solution)
    if (!res.length || !res[res.length - 1].values.length) throw new Error('reference query returns no rows: give the sample data at least one matching row')
    const { columns, values } = res[res.length - 1]
    if (new Set(columns).size !== columns.length) throw new Error(`duplicate output column names: ${columns.join(', ')}`)
    const ordered = sqlIsOrdered(spec.solution)
    if (ordered && !/\b(order|sort|sorted|highest|lowest|first|ascending|descending)\b/i.test(spec.statement))
      throw new Error('the query sorts its output, so the statement must say how the rows are ordered')
    const notes = [
      'The database is SQLite.',
      ...(spec.notes ?? []),
      "Return the columns in the order shown; column names don't matter.",
      ordered ? 'Return the rows in the order described.' : "Row order doesn't matter.",
    ]
    const description = [
      spec.statement.trim(),
      '### Schema',
      '```text\n' + schemaText(spec.tables) + '\n```',
      '### Example',
      'Expected result for the sample data:',
      '```text\n' + textTable(columns, values) + '\n```',
      '### Notes',
      notes.map(x => `- ${x}`).join('\n'),
    ].join('\n\n')
    return {
      id: `sql-${n}`,
      lang: 'sql',
      n,
      title: spec.title,
      difficulty: spec.difficulty,
      topics: spec.topics,
      description,
      starterCode: '-- Write your query here\n',
      solution: spec.solution.trim() + '\n',
      tables: spec.tables,
    }
  } finally {
    db.close()
  }
}

// Topic tags for the hand-written problems, from their titles.
function legacyTopics(title: string): string[] {
  const t = title.toLowerCase()
  if (/rank|lag|lead|running|moving|number policies/.test(t)) return ['Window functions']
  if (/exists|cte|above|latest|maximum premium/.test(t)) return ['Subqueries']
  if (/claims|reconcile|customers, policies|pairs/.test(t)) return ['Joins']
  if (/year|month|date|duration|renewal|started/.test(t)) return ['Dates']
  if (/name|code|upper|normalise|coalesce|ifnull/.test(t)) return ['Strings & nulls']
  if (/average|count|total|summary|pivot|unpivot|by status|by product|largest|smallest/.test(t)) return ['Aggregation']
  return ['Filtering']
}

const specFiles = fs.readdirSync(specDir).filter(f => /^sql_.*\.ts$/.test(f)).sort().map(f => path.join(specDir, f))
const chosen = mode === 'write' || !files.length ? specFiles : files.map(f => path.resolve(f))
const existing = JSON.parse(fs.readFileSync(outFile, 'utf8')).slice(0, KEEP)
const titles = new Set(existing.map((p: { title: string }) => p.title.toLowerCase()))
const built: ReturnType<typeof build>[] = []
let failures = 0
let n = KEEP
for (const f of chosen) {
  const specs: SqlSpec[] = (await import(pathToFileURL(f).href)).problems
  if (!Array.isArray(specs)) throw new Error(`${path.basename(f)}: export const problems: SqlSpec[] = [...]`)
  for (const [i, spec] of specs.entries()) {
    n++
    const label = `${path.basename(f)}[${i}] "${spec.title}"`
    try {
      if (titles.has(spec.title.toLowerCase())) throw new Error('duplicate title')
      titles.add(spec.title.toLowerCase())
      built.push(build(spec, n))
    } catch (e) {
      failures++
      console.log(`FAIL ${label}: ${(e as Error).message}`)
    }
  }
}
if (mode === 'show') for (const p of built) console.log(`\n===== ${p.title} (${p.difficulty}, ${p.topics.join(', ')})\n${p.description}\n--- solution\n${p.solution}`)
console.log(`${built.length} built, ${failures} failed`)
if (mode === 'write') {
  if (failures) {
    console.log('not written: fix the failures first')
    process.exitCode = 1
  }
  for (const p of existing) p.topics ??= legacyTopics(p.title)
  fs.writeFileSync(outFile, JSON.stringify([...existing, ...built], null, 2) + '\n')
  console.log(`wrote content/coding/sql.json: ${existing.length + built.length} problems`)
}
process.exitCode = failures ? 1 : 0

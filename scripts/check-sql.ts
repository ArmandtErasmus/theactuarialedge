// Runs every SQL reference solution in sql.js (the same SQLite build the site uses).
// Run: node scripts/check-sql.ts   (exits 1 on failures)
import fs from 'node:fs'
import path from 'node:path'
import initSqlJs from 'sql.js'
import { buildSchema } from '../src/lib/sqlSchema.ts'

const root = path.resolve(import.meta.dirname, '..')
const problems = JSON.parse(fs.readFileSync(path.join(root, 'content/coding/sql.json'), 'utf8'))
const SQL = await initSqlJs()

let failures = 0
for (const p of problems) {
  const db = new SQL.Database()
  try {
    db.run(buildSchema(p.tables))
    const res = db.exec(p.solution)
    if (!res.length) throw new Error('query returned no result set')
    const rows = res[res.length - 1].values.length
    if (rows === 0) console.log(`  note ${p.id} "${p.title}": reference returns 0 rows`)
  } catch (e) {
    failures++
    console.log(`${p.id} "${p.title}": ${(e as Error).message}`)
  } finally {
    db.close()
  }
}
console.log(`${problems.length} problems, ${failures} failures`)
process.exit(failures ? 1 : 0)

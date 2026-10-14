/// <reference lib="webworker" />
// Runs user SQL against an in-memory SQLite database (sql.js / WebAssembly).
import initSqlJs, { type SqlJsStatic } from 'sql.js'
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url'
import { buildSchema, type Tables } from '../lib/sqlSchema'

let SQL: Promise<SqlJsStatic> | null = null
const boot = () => (SQL ??= initSqlJs({ locateFile: () => wasmUrl }))

type ResultSet = { columns: string[]; values: unknown[][] }

function run(sql: SqlJsStatic, tables: Tables, query: string): ResultSet | { error: string } {
  const db = new sql.Database()
  try {
    db.run(buildSchema(tables))
    const res = db.exec(query)
    if (!res.length) return { columns: [], values: [] }
    const last = res[res.length - 1]
    return { columns: last.columns, values: last.values }
  } catch (e) {
    return { error: (e as Error).message }
  } finally {
    db.close()
  }
}

self.onmessage = async (e: MessageEvent) => {
  const { id, type, tables, code, reference } = e.data
  try {
    const sql = await boot()
    if (type === 'warmup') {
      self.postMessage({ id, ok: true })
      return
    }
    const t0 = performance.now()
    const actual = run(sql, tables, code)
    const ms = performance.now() - t0
    const expected = run(sql, tables, reference)
    self.postMessage({ id, ok: true, payload: { actual, expected }, ms })
  } catch (err) {
    self.postMessage({ id, ok: false, error: String((err as Error)?.message ?? err) })
  }
}

// Builds CREATE TABLE + INSERT statements from a problem's sample tables.
export type Row = Record<string, string | number | boolean | null>
export type Tables = Record<string, Row[]>

const quoteIdent = (s: string) => `"${s.replace(/"/g, '""')}"`

function sqlType(values: unknown[]): string {
  const present = values.filter(v => v !== null && v !== undefined)
  if (present.length && present.every(v => typeof v === 'number' && Number.isInteger(v))) return 'INTEGER'
  if (present.length && present.every(v => typeof v === 'number')) return 'REAL'
  return 'TEXT'
}

function literal(v: unknown): string {
  if (v === null || v === undefined) return 'NULL'
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : 'NULL'
  if (typeof v === 'boolean') return v ? '1' : '0'
  return `'${String(v).replace(/'/g, "''")}'`
}

export function buildSchema(tables: Tables): string {
  const out: string[] = []
  for (const [name, rows] of Object.entries(tables)) {
    const cols = [...new Set(rows.flatMap(r => Object.keys(r)))]
    const defs = cols.map(c => `${quoteIdent(c)} ${sqlType(rows.map(r => r[c]))}`)
    out.push(`CREATE TABLE ${quoteIdent(name)} (${defs.join(', ')});`)
    for (const r of rows) out.push(`INSERT INTO ${quoteIdent(name)} VALUES (${cols.map(c => literal(r[c])).join(', ')});`)
  }
  return out.join('\n')
}

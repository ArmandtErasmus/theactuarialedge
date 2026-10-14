// Converts test arguments (JSON) into R source and webR results back into plain JSON values.
//
//   number[] -> c(...) numeric vector       string[] -> c("a", "b")
//   object   -> list(name = ...)            nested / mixed arrays -> list(...)
//   true     -> TRUE                        null -> NULL
//
// Results: atomic length 1 -> scalar, atomic vector -> array, named list -> object, list -> array.

export function toR(v: unknown): string {
  if (v === null || v === undefined) return 'NULL'
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE'
  if (typeof v === 'number') return Number.isFinite(v) ? String(v) : v > 0 ? 'Inf' : v < 0 ? '-Inf' : 'NaN'
  if (typeof v === 'string') return JSON.stringify(v)
  if (Array.isArray(v)) {
    if (v.length === 0) return 'c()'
    const allNum = v.every(x => typeof x === 'number')
    const allStr = v.every(x => typeof x === 'string')
    const allBool = v.every(x => typeof x === 'boolean')
    return `${allNum || allStr || allBool ? 'c' : 'list'}(${v.map(toR).join(', ')})`
  }
  const entries = Object.entries(v as Record<string, unknown>)
  return `list(${entries.map(([k, x]) => `${JSON.stringify(k)} = ${toR(x)}`).join(', ')})`
}

export function callExpr(entry: string, args: unknown[]): string {
  return `${entry}(${args.map(toR).join(', ')})`
}

type WebRJs = { type: string; names: (string | null)[] | null; values: unknown[] }

export function fromR(obj: unknown): unknown {
  const o = obj as WebRJs
  if (!o || typeof o !== 'object' || !('type' in o)) return obj
  if (o.type === 'null') return null
  if (o.type === 'list') {
    const vals = o.values.map(fromR)
    if (o.names && o.names.every(n => n)) return Object.fromEntries(o.names.map((n, i) => [n as string, vals[i]]))
    return vals
  }
  const vals = o.values.map(x => (x === null ? null : x))
  if (o.names && o.names.every(n => n) && vals.length > 1) {
    return Object.fromEntries(o.names.map((n, i) => [n as string, vals[i]]))
  }
  return vals.length === 1 ? vals[0] : vals
}

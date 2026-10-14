// Answer checking shared by the question workspace, the code runners and the content scripts.

/** Parses "21,000.00", "R 1 500", "\$5", "5%", "-0.0333", "1.2e-3". Percentages become fractions. */
export function parseNumber(raw: string): number | null {
  const s = raw
    .trim()
    .replace(/\\\$/g, '')
    .replace(/^[R$€£]\s?/i, '')
    .replace(/[\s,$]/g, '')
  if (!/^[-+]?(\d+\.?\d*|\.\d+)(e[-+]?\d+)?%?$/i.test(s)) return null
  const pct = s.endsWith('%')
  const n = parseFloat(pct ? s.slice(0, -1) : s)
  if (!Number.isFinite(n)) return null
  return pct ? n / 100 : n
}

function decimalsOf(raw: string): number {
  const m = /\.(\d+)/.exec(raw.replace(/[\s,%]/g, ''))
  return m ? m[1].length : 0
}

/** Tolerance for a stated answer: 0.5% relative, or half a unit in the last shown decimal place. */
export function toleranceFor(expectedRaw: string, expected: number, override?: number): number {
  if (override !== undefined) return override
  const d = decimalsOf(expectedRaw)
  const lastPlace = d ? 0.5 * 10 ** -d : 0.5
  return Math.max(Math.abs(expected) * 0.005, lastPlace) + 1e-12
}

/**
 * Grades a typed numeric answer. A user may answer a percentage either way round:
 * "6.01%" or "0.0601" for an expected "0.0601", and "6.01" for an expected "6.01%".
 */
export function checkNumeric(userRaw: string, expectedRaw: string, tolerance?: number): boolean {
  const expected = parseNumber(expectedRaw)
  const user = parseNumber(userRaw)
  if (expected === null || user === null) return false
  const tol = toleranceFor(expectedRaw, expected, tolerance)
  if (Math.abs(user - expected) <= tol) return true
  if (expectedRaw.trim().endsWith('%') && !userRaw.trim().endsWith('%')) {
    return Math.abs(user / 100 - expected) <= tol
  }
  return false
}

/** Deep comparison of code results: numbers with relative/absolute tolerance, everything else exact. */
export function valuesMatch(actual: unknown, expected: unknown, relTol = 0.005): boolean {
  if (typeof expected === 'number') {
    if (typeof actual !== 'number' || !Number.isFinite(actual)) return false
    const s = String(expected)
    const d = s.includes('.') && !s.includes('e') ? s.split('.')[1].length : 0
    const tol = Math.max(Math.abs(expected) * relTol, d ? 0.5 * 10 ** -d : 1e-9)
    return Math.abs(actual - expected) <= tol + 1e-12
  }
  if (Array.isArray(expected)) {
    return Array.isArray(actual) && actual.length === expected.length && expected.every((e, i) => valuesMatch(actual[i], e, relTol))
  }
  if (expected && typeof expected === 'object') {
    if (!actual || typeof actual !== 'object' || Array.isArray(actual)) return false
    const ek = Object.keys(expected).sort()
    const ak = Object.keys(actual).sort()
    return (
      ek.length === ak.length &&
      ek.every((k, i) => k === ak[i] && valuesMatch((actual as Record<string, unknown>)[k], (expected as Record<string, unknown>)[k], relTol))
    )
  }
  return actual === expected
}

/** SQL result sets: same column count and values; row order matters only when the reference sorts. */
export function resultSetsMatch(
  actual: { columns: string[]; values: unknown[][] },
  expected: { columns: string[]; values: unknown[][] },
  ordered: boolean,
): boolean {
  if (actual.columns.length !== expected.columns.length) return false
  if (actual.values.length !== expected.values.length) return false
  const norm = (row: unknown[]) => row.map(v => (typeof v === 'number' ? Math.round(v * 1e6) / 1e6 : v))
  const a = actual.values.map(norm)
  const e = expected.values.map(norm)
  if (!ordered) {
    const key = (r: unknown[]) => JSON.stringify(r)
    a.sort((x, y) => key(x).localeCompare(key(y)))
    e.sort((x, y) => key(x).localeCompare(key(y)))
  }
  return a.every((row, i) => valuesMatch(row, e[i], 1e-6))
}

/**
 * Row order matters only when the outer query sorts. ORDER BY inside brackets (window
 * functions, subqueries, CTE bodies) doesn't fix the order of the final result.
 */
export function sqlIsOrdered(sql: string): boolean {
  let s = sql.replace(/--.*$/gm, '').replace(/'(?:[^']|'')*'/g, "''")
  for (let prev = ''; prev !== s; ) {
    prev = s
    s = s.replace(/\([^()]*\)/g, ' ')
  }
  return /\border\s+by\b/i.test(s)
}

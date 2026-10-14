import { describe, expect, it } from 'vitest'
import { checkNumeric, parseNumber, resultSetsMatch, sqlIsOrdered, valuesMatch } from './grade'

describe('parseNumber', () => {
  it.each([
    ['21,000.00', 21000],
    ['R 1 500', 1500],
    ['\\$5', 5],
    ['$32,900', 32900],
    ['6.01%', 0.0601],
    ['-0.0333', -0.0333],
    ['1.2e-3', 0.0012],
    ['.5', 0.5],
  ])('%s -> %d', (raw, n) => expect(parseNumber(raw)).toBeCloseTo(n, 10))

  it.each(['', 'abc', '1,2,3x', '5 apples', '--1'])('rejects %s', raw => expect(parseNumber(raw)).toBeNull())
})

describe('checkNumeric', () => {
  it('accepts the stated answer in other formats', () => {
    expect(checkNumeric('21000', '21,000.00')).toBe(true)
    expect(checkNumeric('21,000.004', '21,000.00')).toBe(true)
    expect(checkNumeric('0.0601', '0.0601')).toBe(true)
  })
  it('allows 0.5% relative error or half a unit in the last place', () => {
    expect(checkNumeric('100.4', '100')).toBe(true)
    expect(checkNumeric('101', '100')).toBe(false)
    expect(checkNumeric('0.06', '0.0601')).toBe(true) // 0.17% off: rounding of intermediate steps
    expect(checkNumeric('0.059', '0.0601')).toBe(false) // 1.8% off
    expect(checkNumeric('12.3', '12.34')).toBe(true) // 0.32% off
    expect(checkNumeric('12.2', '12.34')).toBe(false) // 1.1% off
    expect(checkNumeric('0.0046', '0.005')).toBe(true) // within half a unit (0.0005) of the last place
    expect(checkNumeric('0.004', '0.005')).toBe(false)
  })
  it('accepts percentages either way round', () => {
    expect(checkNumeric('6.01%', '0.0601')).toBe(true)
    expect(checkNumeric('6.01', '6.01%')).toBe(true)
    expect(checkNumeric('0.0601', '6.01%')).toBe(true)
  })
  it('honours an explicit tolerance', () => {
    expect(checkNumeric('10.2', '10', 0.1)).toBe(false)
    expect(checkNumeric('10.05', '10', 0.1)).toBe(true)
  })
  it('handles negative answers and zero', () => {
    expect(checkNumeric('-8.55', '-8.55')).toBe(true)
    expect(checkNumeric('8.55', '-8.55')).toBe(false)
    expect(checkNumeric('0', '0.00')).toBe(true)
    expect(checkNumeric('0.01', '0.00')).toBe(false)
  })
})

describe('valuesMatch', () => {
  it('compares numbers with tolerance and structures deeply', () => {
    expect(valuesMatch(613.9132, 613.91)).toBe(true)
    expect(valuesMatch(620, 613.91)).toBe(false)
    expect(valuesMatch([1, 2.0001], [1, 2])).toBe(true)
    expect(valuesMatch({ a: 1, b: [2] }, { b: [2], a: 1 })).toBe(true)
    expect(valuesMatch({ a: 1 }, { a: 1, b: 2 })).toBe(false)
    expect(valuesMatch('x', 'x')).toBe(true)
    expect(valuesMatch(null, 0)).toBe(false)
    expect(valuesMatch(Number.NaN, 0)).toBe(false)
  })
})

describe('SQL result sets', () => {
  const a = { columns: ['x', 'y'], values: [[1, 'a'], [2, 'b']] }
  const b = { columns: ['p', 'q'], values: [[2, 'b'], [1, 'a']] }
  it('ignores column names, and row order unless ordered', () => {
    expect(resultSetsMatch(a, b, false)).toBe(true)
    expect(resultSetsMatch(a, b, true)).toBe(false)
  })
  it('detects ORDER BY outside comments', () => {
    expect(sqlIsOrdered('SELECT * FROM t ORDER BY x')).toBe(true)
    expect(sqlIsOrdered('SELECT * FROM t -- order by x')).toBe(false)
  })
  it('ignores ORDER BY inside window functions, subqueries and CTEs', () => {
    expect(sqlIsOrdered('SELECT x, RANK() OVER (ORDER BY x DESC) FROM t')).toBe(false)
    expect(sqlIsOrdered('WITH a AS (SELECT * FROM t ORDER BY x LIMIT 3) SELECT * FROM a')).toBe(false)
    expect(sqlIsOrdered("SELECT x, RANK() OVER (PARTITION BY (y) ORDER BY x) AS r FROM t WHERE z = '(' ORDER BY r")).toBe(true)
  })
})

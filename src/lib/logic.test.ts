import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tokenize } from './tokenize'
import { callExpr, fromR, toR } from './rBridge'
import { renderMarkdown } from './markdown'
import { legacyRedirect } from './legacy'

describe('legacy URLs from the old site', () => {
  it.each([
    ['/index.html', '/'],
    ['/exams/assa-a211.html', '/exams/assa-a211'],
    ['/exams/ifoa-sp8.html', '/exams/ifoa-sp8'],
    ['/exams/brainteasers.html', '/problems?subject=brainteasers'],
    ['/projects/bfreserving.html', '/projects/bfreserving'],
    ['/projects/xvaengine.html', '/projects/xva'],
    ['/resumes/graduate.html', '/careers/graduate-cv'],
    ['/resources/sql.html', '/code?lang=sql'],
  ])('%s -> %s', (from, to) => expect(legacyRedirect(from)).toBe(to))
  it('ignores normal routes', () => expect(legacyRedirect('/problems')).toBeNull())
})

describe('tokenize', () => {
  it('splits text and maths', () => {
    expect(tokenize('Let $x^2$ be $$y$$.')).toEqual([
      { kind: 'text', value: 'Let ' },
      { kind: 'math', value: 'x^2', display: false },
      { kind: 'text', value: ' be ' },
      { kind: 'math', value: 'y', display: true },
      { kind: 'text', value: '.' },
    ])
  })
  it('treats \\$ as a literal dollar', () => {
    expect(tokenize('Pay \\$500 now')).toEqual([{ kind: 'text', value: 'Pay $500 now' }])
  })
  it('leaves an unmatched dollar as text', () => {
    expect(tokenize('costs $5')).toEqual([{ kind: 'text', value: 'costs $5' }])
  })
  it('supports \\( \\) and \\[ \\]', () => {
    expect(tokenize('\\(a\\) and \\[b\\]').filter(s => s.kind === 'math')).toHaveLength(2)
  })
})

describe('R bridge', () => {
  it('converts JSON arguments to R source', () => {
    expect(toR([1, 2, 3])).toBe('c(1, 2, 3)')
    expect(toR({ '65': 0.02 })).toBe('list("65" = 0.02)')
    expect(toR([[1, 2], [3, 4]])).toBe('list(c(1, 2), c(3, 4))')
    expect(toR(true)).toBe('TRUE')
    expect(toR(null)).toBe('NULL')
    expect(toR([])).toBe('c()')
    expect(toR('a"b')).toBe('"a\\"b"')
    expect(callExpr('f', [1, 'x'])).toBe('f(1, "x")')
  })
  it('converts webR results back to plain values', () => {
    expect(fromR({ type: 'double', names: null, values: [613.91] })).toBe(613.91)
    expect(fromR({ type: 'double', names: null, values: [1, 2] })).toEqual([1, 2])
    expect(fromR({ type: 'list', names: ['a', 'b'], values: [{ type: 'double', names: null, values: [1] }, { type: 'character', names: null, values: ['x'] }] })).toEqual({ a: 1, b: 'x' })
    expect(fromR({ type: 'null', names: null, values: [] })).toBeNull()
  })
})

describe('markdown', () => {
  it('renders maths but not inside code', () => {
    const html = renderMarkdown('Value $x^2$ and `df$col` and\n\n```r\ndf$a + df$b\n```')
    expect(html).toContain('katex')
    expect(html).toContain('df$col')
    expect(html).toContain('df$a + df$b')
  })
  it('opens external links in a new tab', () => {
    expect(renderMarkdown('[IFoA](https://actuaries.org.uk)')).toContain('target="_blank"')
    expect(renderMarkdown('[Home](/problems)')).not.toContain('target=')
  })
})

describe('progress and spaced repetition', () => {
  beforeEach(() => {
    vi.resetModules()
    const store = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => store.set(k, v),
      removeItem: (k: string) => store.delete(k),
    })
  })

  it('schedules misses for today and first-try solves far out', async () => {
    const p = await import('../state/progress')
    p.recordAttempt('cm1-1', false)
    p.recordAttempt('cm1-2', true)
    const s = p.progressStore.get()
    expect(s.problems['cm1-1']).toMatchObject({ status: 'attempted', box: 0, due: p.today() })
    expect(s.problems['cm1-2']).toMatchObject({ status: 'solved', box: 4, due: p.addDays(p.today(), 21) })
    expect(p.dueForReview(s)).toEqual(['cm1-1'])
  })

  it('moves a missed question up the boxes as it is answered correctly', async () => {
    const p = await import('../state/progress')
    p.recordAttempt('cs2-3', false)
    p.recordAttempt('cs2-3', true)
    expect(p.progressStore.get().problems['cs2-3']).toMatchObject({ status: 'solved', box: 1, attempts: 2, correct: 1, wrong: 1 })
    p.recordAttempt('cs2-3', false)
    expect(p.progressStore.get().problems['cs2-3']).toMatchObject({ status: 'solved', box: 0 })
  })

  it('counts streaks across consecutive days', async () => {
    const p = await import('../state/progress')
    const d = p.today()
    expect(p.currentStreak({ [d]: 2, [p.addDays(d, -1)]: 1, [p.addDays(d, -3)]: 1 })).toBe(2)
    expect(p.currentStreak({ [p.addDays(d, -1)]: 1 })).toBe(1)
    expect(p.currentStreak({})).toBe(0)
    expect(p.longestStreak({ '2026-01-01': 1, '2026-01-02': 1, '2026-01-03': 1, '2026-02-01': 1 })).toBe(3)
  })
})

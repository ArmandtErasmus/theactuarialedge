// Dev-only (/dev/selftest): runs every reference solution through the real in-browser
// runtimes and grading, so Python, R and SQL problems are verified end to end.
import { useState } from 'react'
import { loadCode } from '../data/load'
import type { Lang } from '../data/types'
import { outcomePassed, runProblem } from '../lib/runner'
import { Button, Container } from '../components/ui'

type Row = { id: string; title: string; pass: boolean; detail: string }

export default function SelfTest() {
  const [rows, setRows] = useState<Row[]>([])
  const [running, setRunning] = useState<Lang | null>(null)

  const run = async (lang: Lang) => {
    setRunning(lang)
    setRows([])
    const problems = await loadCode(lang)
    for (const p of problems) {
      const o = await runProblem(p, p.solution)
      const pass = outcomePassed(o)
      const detail =
        o.kind === 'error'
          ? o.message
          : o.kind === 'sql'
            ? o.error ?? `${o.actual?.values.length ?? 0} rows`
            : o.compileError ?? o.results.filter(r => !r.pass).map(r => `case ${r.index + 1}: expected ${JSON.stringify(r.expected)} got ${r.error ?? JSON.stringify(r.actual)}`).join(' | ')
      setRows(r => [...r, { id: p.id, title: p.title, pass, detail }])
    }
    setRunning(null)
  }

  const failed = rows.filter(r => !r.pass).length
  return (
    <Container className="py-10">
      <h1 className="text-2xl font-semibold">Runtime self-test</h1>
      <p className="mt-1 text-sm text-gm-ink-soft">Runs each reference solution through the same runner and grader users get.</p>
      <div className="mt-6 flex gap-2">
        {(['python', 'r', 'sql'] as Lang[]).map(l => (
          <Button key={l} onClick={() => run(l)} loading={running === l} disabled={!!running}>
            Test {l}
          </Button>
        ))}
      </div>
      <p className="mt-6 font-mono text-sm" data-testid="summary">
        {rows.length} run · {rows.length - failed} pass · {failed} fail{running ? ' · running…' : rows.length ? ' · done' : ''}
      </p>
      <ul className="mt-4 divide-y-2 divide-gm-line rounded-xl border-2 border-gm-line font-mono text-xs">
        {rows.map(r => (
          <li key={r.id} className="flex gap-3 px-4 py-2">
            <span className={r.pass ? 'text-gm-lime' : 'text-gm-coral'}>{r.pass ? 'PASS' : 'FAIL'}</span>
            <span className="w-20 shrink-0 text-gm-ink-dim">{r.id}</span>
            <span className="w-64 shrink-0 truncate">{r.title}</span>
            <span className="min-w-0 flex-1 break-all text-gm-ink-soft">{r.pass ? '' : r.detail}</span>
          </li>
        ))}
      </ul>
    </Container>
  )
}

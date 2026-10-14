import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BookOpen, CheckCircle2, CircleAlert, Eye, FileText, Lock, Play, RotateCcw, Send, XCircle } from 'lucide-react'
import clsx from 'clsx'
import type { CodeProblem } from '../../data/types'
import { LANG_LABEL } from '../../data/labels'
import { outcomePassed, runProblem, useRuntimeStatus, warmUp, type ResultSet, type RunOutcome } from '../../lib/runner'
import { clearDraft, loadDraft, saveDraft } from '../../state/drafts'
import { recordAttempt, useProgress } from '../../state/progress'
import { PanelFrame, ProblemHeading } from '../ProblemChrome'
import { useManifest } from '../../data/load'
import { CodeEditor } from '../CodeEditor'
import { Markdown } from '../Markdown'
import { Badge, Button, DifficultyPill, Kbd, Spinner } from '../ui'
import { StatusIcon } from '../ProblemTable'

const fmt = (v: unknown) => {
  if (v === undefined) return '—'
  const s = JSON.stringify(v)
  return s.length > 400 ? s.slice(0, 400) + '…' : s
}

// DataFrame values travel as {"__df__": {columns, rows}} (see src/workers/harness.py).
type Frame = { __df__: { columns: string[]; rows: unknown[][] } }
const isFrame = (v: unknown): v is Frame => !!v && typeof v === 'object' && '__df__' in v
const frameRs = (f: Frame): ResultSet => ({
  columns: f.__df__.columns,
  values: f.__df__.rows,
})
const usesFrames = (args: unknown[], expected: unknown) => isFrame(expected) || args.some(isFrame)

/** Parameter names from the starter code's `def name(a, b: T)` line, to label table inputs. */
function paramNames(problem: CodeProblem): string[] {
  const m = /def\s+\w+\s*\(([^)]*)\)/.exec(problem.starterCode)
  return m
    ? m[1]
        .split(',')
        .map(p => p.split(/[:=]/)[0].trim())
        .filter(Boolean)
    : []
}

/** Inputs and expected/actual values as tables, for DataFrame problems. */
function FrameCase({ names, args, expected, actual }: { names: string[]; args: unknown[]; expected: unknown; actual?: { value: unknown; pass: boolean } }) {
  const show = (title: string, v: unknown) =>
    isFrame(v) ? (
      <ResultTable key={title} title={title} rs={frameRs(v)} />
    ) : (
      <div key={title} className="text-gm-ink-soft">
        <span className="text-gm-ink-dim">{title} </span>
        {fmt(v)}
      </div>
    )
  const inputs = args.map((a, i) => show(names[i] ?? `argument ${i + 1}`, a))
  const outputs = (
    <div key="outputs" className="grid gap-3 xl:grid-cols-2">
      {show('Expected', expected)}
      {actual && show(actual.pass ? 'Your output' : 'Your output (different)', actual.value)}
    </div>
  )
  // After a run the comparison matters most, so it comes before the inputs.
  return <div className="flex flex-col gap-3">{actual ? [outputs, ...inputs] : [...inputs, outputs]}</div>
}

export function CodeWorkspace({ problem }: { problem: CodeProblem }) {
  const progress = useProgress()
  const status = progress.problems[problem.id]?.status
  const [code, setCode] = useState(() => loadDraft(problem.id) ?? problem.starterCode)
  const [leftTab, setLeftTab] = useState<'description' | 'solution'>('description')
  const [consoleTab, setConsoleTab] = useState<'tests' | 'result' | 'output'>('tests')
  const [outcome, setOutcome] = useState<RunOutcome | null>(null)
  const [busy, setBusy] = useState<'run' | 'submit' | null>(null)
  const [submitted, setSubmitted] = useState<boolean | null>(null)
  const runtime = useRuntimeStatus(problem.lang)
  const manifest = useManifest()
  const totalInLang = manifest.languages[problem.lang] ?? 0
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => {
    warmUp(problem.lang).catch(() => {})
  }, [problem.lang])

  const onChange = useCallback(
    (v: string) => {
      setCode(v)
      clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => saveDraft(problem.id, v), 400)
    },
    [problem.id],
  )

  const execute = useCallback(
    async (mode: 'run' | 'submit') => {
      if (busy) return
      setBusy(mode)
      setConsoleTab('result')
      const o = await runProblem(problem, code)
      setOutcome(o)
      setBusy(null)
      if (mode === 'submit' && o.kind !== 'error') {
        const pass = outcomePassed(o)
        recordAttempt(problem.id, pass)
        setSubmitted(pass)
      } else setSubmitted(null)
    },
    [busy, problem, code],
  )
  const run = useCallback(() => void execute('run'), [execute])
  const submit = useCallback(() => void execute('submit'), [execute])

  const langProblems = useMemo(
    () => Object.entries(progress.problems).filter(([id, p]) => id.startsWith(`${problem.lang}-`) && p.status === 'solved').length,
    [progress, problem.lang],
  )

  const description = (
    <div className="p-5 sm:p-6">
      {leftTab === 'description' ? (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <StatusIcon status={status} />
            <DifficultyPill value={problem.difficulty} />
            <Badge>{LANG_LABEL[problem.lang]}</Badge>
            {problem.lang === 'sql' && <Badge>SQLite</Badge>}
          </div>
          <Markdown source={problem.description} className="mt-6 text-[15px]" />
          {problem.tables && <SchemaPreview tables={problem.tables} />}
        </>
      ) : (
        <ReferenceSolution
          problem={problem}
          unlocked={!!status || submitted !== null}
          onReveal={() => {
            recordAttempt(problem.id, false, { revealed: true })
            setSubmitted(false)
          }}
        />
      )}
    </div>
  )

  const fileName = problem.lang === 'python' ? 'solution.py' : problem.lang === 'r' ? 'solution.R' : 'query.sql'

  return (
    <>
      <ProblemHeading
        crumb={`${LANG_LABEL[problem.lang]} · Problem ${problem.n}`}
        title={problem.title}
        solved={langProblems}
        total={totalInLang}
        scope={LANG_LABEL[problem.lang]}
        right={
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gm-ink-soft sm:inline">View</span>
            <div role="tablist" aria-label="Problem panels" className="gm-tabs">
              {(['description', 'solution'] as const).map(t => (
                <button key={t} type="button" role="tab" aria-selected={leftTab === t} onClick={() => setLeftTab(t)} className="gm-tab capitalize">
                  {t === 'description' ? <FileText className="size-4" aria-hidden="true" /> : <BookOpen className="size-4" aria-hidden="true" />}
                  {t}
                </button>
              ))}
            </div>
          </div>
        }
      />

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <PanelFrame path={`~/${problem.lang}/problem-${problem.n}`} label="Problem" className="lg:h-[780px]">
          <div className="gm-scroll min-h-0 flex-1 overflow-y-auto">{description}</div>
        </PanelFrame>

        <PanelFrame
          path={`~/${problem.lang}/${fileName}`}
          label="Code editor"
          className="h-[640px] lg:h-[780px]"
          actions={
            <>
              <RuntimeChip status={runtime} lang={problem.lang} />
              <button
                type="button"
                onClick={() => {
                  if (code !== problem.starterCode && !confirm('Reset to the starter code? Your current code will be lost.')) return
                  setCode(problem.starterCode)
                  clearDraft(problem.id)
                }}
                title="Reset to starter code"
                aria-label="Reset to starter code"
                className="ml-1 flex size-8 items-center justify-center rounded-[0.6rem] text-gm-ink-soft hover:bg-gm-deep hover:text-gm-ink"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
              </button>
            </>
          }
        >
          <div className="min-h-0 flex-1 overflow-hidden bg-gm-void">
            <CodeEditor lang={problem.lang} value={code} onChange={onChange} onRun={run} onSubmit={submit} label={`${LANG_LABEL[problem.lang]} code editor`} />
          </div>
          <div className="flex shrink-0 items-center gap-2 border-y-2 border-gm-line bg-gm-deep/40 px-3 py-2.5">
            <span className="hidden items-center gap-1 text-xs text-gm-ink-dim md:flex">
              <Kbd>Ctrl</Kbd>
              <Kbd>↵</Kbd> run
            </span>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="secondary" onClick={run} loading={busy === 'run'} disabled={!!busy} title="Run tests (Ctrl Enter)">
                {busy !== 'run' && <Play className="size-3.5" aria-hidden="true" />} Run
              </Button>
              <Button size="sm" variant="primary" onClick={submit} loading={busy === 'submit'} disabled={!!busy} title="Submit (Ctrl Shift Enter)">
                {busy !== 'submit' && <Send className="size-3.5" aria-hidden="true" />} Submit
              </Button>
            </div>
          </div>
          <section className="flex h-[300px] shrink-0 flex-col" aria-label="Console">
            <div className="flex shrink-0 items-center px-3 pt-3">
              <div role="tablist" aria-label="Console panels" className="gm-tabs">
                {(
                  [
                    ['tests', problem.lang === 'sql' ? 'Expected output' : 'Test cases'],
                    ['result', 'Result'],
                    ['output', 'Output'],
                  ] as const
                ).map(([t, label]) => (
                  <button key={t} type="button" role="tab" aria-selected={consoleTab === t} onClick={() => setConsoleTab(t)} className="gm-tab !min-h-9 text-[13px]">
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="gm-scroll min-h-0 flex-1 overflow-y-auto p-4 font-mono text-[13px]" aria-live="polite">
              {consoleTab === 'tests' && <TestsView problem={problem} />}
              {consoleTab === 'result' && <ResultView problem={problem} outcome={outcome} busy={!!busy} runtime={runtime} submitted={submitted} />}
              {consoleTab === 'output' && (
                <pre className="whitespace-pre-wrap text-gm-ink-soft">{(outcome?.kind === 'tests' && outcome.stdout) || 'Anything your code prints appears here.'}</pre>
              )}
            </div>
          </section>
        </PanelFrame>
      </div>
    </>
  )
}

function RuntimeChip({ status, lang }: { status: string; lang: CodeProblem['lang'] }) {
  if (status === 'loading')
    return (
      <span className="flex items-center gap-1.5 text-xs text-gm-ink-dim" role="status">
        <Spinner className="size-3" /> Getting {LANG_LABEL[lang]} ready…
      </span>
    )
  if (status === 'error') return <span className="text-xs text-gm-coral">Couldn’t start {LANG_LABEL[lang]}. Check your connection and try again.</span>
  return null
}

function TestsView({ problem }: { problem: CodeProblem }) {
  if (problem.lang === 'sql')
    return (
      <p className="font-sans text-sm text-gm-ink-soft">
        Your query is run against the sample tables shown in the description and compared with the reference result. Column names don’t matter; row order only matters if the task
        asks for an ordering.
      </p>
    )
  return (
    <div className="flex flex-col gap-3">
      {(problem.tests ?? []).map((t, i) => (
        <div key={i} className="rounded-lg border-2 border-gm-line bg-gm-night p-3">
          <div className="mb-1.5 font-sans text-xs font-medium text-gm-ink-dim">Case {i + 1}</div>
          {usesFrames(t.args, t.expected) ? (
            <FrameCase names={paramNames(problem)} args={t.args} expected={t.expected} />
          ) : (
            <>
              <div className="text-gm-ink-soft">
                <span className="text-gm-ink-dim">{problem.entry}(</span>
                {t.args.map(fmt).join(', ')}
                <span className="text-gm-ink-dim">)</span>
              </div>
              <div className="mt-1 text-gm-ink-soft">
                <span className="text-gm-ink-dim">→ </span>
                {fmt(t.expected)}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

function ResultView({
  problem,
  outcome,
  busy,
  runtime,
  submitted,
}: {
  problem: CodeProblem
  outcome: RunOutcome | null
  busy: boolean
  runtime: string
  submitted: boolean | null
}) {
  if (busy)
    return (
      <div className="flex items-center gap-2 font-sans text-sm text-gm-ink-soft">
        <Spinner /> {runtime === 'loading' ? 'Getting ready…' : 'Running…'}
      </div>
    )
  if (!outcome) return <p className="font-sans text-sm text-gm-ink-soft">Run your code to see results.</p>
  if (outcome.kind === 'error')
    return (
      <div className="flex items-start gap-2 font-sans text-sm text-gm-coral" role="alert">
        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" /> {outcome.message}
      </div>
    )
  const passed = outcomePassed(outcome)
  const header = (
    <div className="mb-4 flex flex-wrap items-center gap-3 font-sans">
      <span className={clsx('text-lg font-semibold', passed ? 'text-gm-lime' : 'text-gm-coral')}>
        {passed ? 'Accepted' : outcome.kind === 'tests' && outcome.compileError ? 'Error' : 'Wrong answer'}
      </span>
      {outcome.kind === 'tests' && !outcome.compileError && (
        <span className="text-sm text-gm-ink-soft tabular">
          {outcome.results.filter(r => r.pass).length} / {outcome.results.length} tests passed
        </span>
      )}
      <span className="text-xs text-gm-ink-dim tabular">{Math.round(outcome.ms)} ms</span>
      {submitted !== null && <Badge tone={submitted ? 'success' : 'danger'}>{submitted ? 'Submitted · solved' : 'Submitted · keep going'}</Badge>}
    </div>
  )

  if (outcome.kind === 'sql')
    return (
      <div>
        {header}
        {outcome.error && <pre className="mb-4 whitespace-pre-wrap rounded-[1rem] border-2 border-gm-coral-edge bg-gm-coral/12 p-3 text-gm-coral">{outcome.error}</pre>}
        <div className="grid gap-4 xl:grid-cols-2">
          {outcome.actual && <ResultTable title="Your output" rs={outcome.actual} />}
          {outcome.expected && <ResultTable title="Expected" rs={outcome.expected} />}
        </div>
        {!outcome.pass && outcome.actual && !outcome.ordered && <p className="mt-3 font-sans text-xs text-gm-ink-dim">Row order is ignored for this problem.</p>}
      </div>
    )

  return (
    <div>
      {header}
      {outcome.compileError && <pre className="whitespace-pre-wrap rounded-[1rem] border-2 border-gm-coral-edge bg-gm-coral/12 p-3 text-gm-coral">{outcome.compileError}</pre>}
      <div className="flex flex-col gap-2">
        {outcome.results.map(r => (
          <div key={r.index} className={clsx('rounded-[1rem] border-2 p-3', r.pass ? 'border-gm-line bg-gm-night' : 'border-gm-coral-edge bg-gm-coral/12')}>
            <div className="mb-1.5 flex items-center gap-1.5 font-sans text-xs font-medium">
              {r.pass ? <CheckCircle2 className="size-3.5 text-gm-lime" aria-hidden="true" /> : <XCircle className="size-3.5 text-gm-coral" aria-hidden="true" />}
              Case {r.index + 1} {r.pass ? 'passed' : 'failed'}
            </div>
            {usesFrames(r.args, r.expected) ? (
              r.error ? (
                <pre className="mt-1 whitespace-pre-wrap text-gm-coral">{r.error}</pre>
              ) : (
                <FrameCase names={paramNames(problem)} args={r.pass ? [] : r.args} expected={r.expected} actual={{ value: r.actual, pass: r.pass }} />
              )
            ) : (
              <>
                <div className="text-gm-ink-soft">
                  <span className="text-gm-ink-dim">input </span>
                  {r.args.map(fmt).join(', ')}
                </div>
                <div className="text-gm-ink-soft">
                  <span className="text-gm-ink-dim">expected </span>
                  {fmt(r.expected)}
                </div>
                {r.error ? (
                  <pre className="mt-1 whitespace-pre-wrap text-gm-coral">{r.error}</pre>
                ) : (
                  <div className={r.pass ? 'text-gm-ink' : 'text-gm-coral'}>
                    <span className="text-gm-ink-dim">got </span>
                    {fmt(r.actual)}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ResultTable({ title, rs }: { title: string; rs: ResultSet }) {
  return (
    <div className="min-w-0">
      <div className="mb-1.5 font-sans text-xs font-medium text-gm-ink-dim">
        {title} · {rs.values.length} row{rs.values.length === 1 ? '' : 's'}
      </div>
      <div className="overflow-x-auto rounded-lg border-2 border-gm-line">
        <table className="w-full text-left text-xs">
          <thead className="bg-gm-deep text-gm-ink">
            <tr>
              {rs.columns.map((c, i) => (
                <th key={i} className="px-3 py-1.5 font-medium whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rs.values.slice(0, 50).map((row, i) => (
              <tr key={i} className="border-t-2 border-gm-line">
                {row.map((v, j) => (
                  <td key={j} className="px-3 py-1.5 whitespace-nowrap text-gm-ink-soft tabular">
                    {v === null ? <span className="text-gm-ink-dim">NULL</span> : String(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function SchemaPreview({ tables }: { tables: NonNullable<CodeProblem['tables']> }) {
  const entries = useMemo(() => Object.entries(tables), [tables])
  return (
    <div className="mt-8">
      <h2 className="mb-3 text-sm font-semibold">Sample data</h2>
      <div className="flex flex-col gap-4">
        {entries.map(([name, rows]) => (
          <ResultTable
            key={name}
            title={name}
            rs={{
              columns: [...new Set(rows.flatMap(r => Object.keys(r)))],
              values: rows.map(r => [...new Set(rows.flatMap(x => Object.keys(x)))].map(c => r[c] ?? null)),
            }}
          />
        ))}
      </div>
    </div>
  )
}

function ReferenceSolution({ problem, unlocked, onReveal }: { problem: CodeProblem; unlocked: boolean; onReveal: () => void }) {
  if (!unlocked)
    return (
      <div className="flex flex-col items-center rounded-[1.4rem] border-2 border-dashed border-gm-line px-6 py-12 text-center">
        <Lock className="mb-3 size-6 text-gm-ink-dim" aria-hidden="true" />
        <h2 className="font-medium">Try it first</h2>
        <p className="mt-1.5 max-w-sm text-sm text-gm-ink-soft">
          Submit once to unlock the reference solution, or reveal it now. That counts as an attempt and adds it to your review queue.
        </p>
        <Button variant="secondary" className="mt-5" onClick={onReveal}>
          <Eye className="size-4" aria-hidden="true" /> Reveal solution
        </Button>
      </div>
    )
  return (
    <div>
      <h2 className="text-lg font-semibold">Reference solution</h2>
      <p className="mt-1 text-sm text-gm-ink-soft">One clean way to solve it. Yours may differ and still pass.</p>
      <pre className="mt-4 overflow-x-auto rounded-xl border-2 border-gm-line bg-gm-night p-4 font-mono text-[13px] leading-relaxed">{problem.solution}</pre>
    </div>
  )
}

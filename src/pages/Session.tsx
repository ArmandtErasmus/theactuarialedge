import { use, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Clock, Flag, RotateCcw, XCircle } from 'lucide-react'
import clsx from 'clsx'
import { loadSubject, useManifest } from '../data/load'
import type { Manifest, Question } from '../data/types'
import { isLang } from '../data/load'
import { AnswerPanel, type Verdict } from '../components/question/AnswerPanel'
import { MathText } from '../components/MathText'
import { QuestionHeader } from '../components/question/QuestionHeader'
import { Solution } from '../components/question/Solution'
import { Button, ButtonLink, Card, EmptyState, ProgressBar } from '../components/ui'
import { dueForReview, progressStore, recordAttempt, useProgress } from '../state/progress'
import { usePageTitle } from '../lib/usePageTitle'

type Mode = 'practice' | 'mock' | 'review'
const SIZES: Record<Mode, number> = { practice: 10, mock: 20, review: 20 }
const MOCK_MINUTES = 30

const shuffle = <T,>(a: T[]) => {
  const x = [...a]
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[x[i], x[j]] = [x[j], x[i]]
  }
  return x
}

// Session sets are built once per URL so a re-render never reshuffles.
const sessionCache = new Map<string, Promise<Question[]>>()

function buildSession(manifest: Manifest, mode: Mode, exam: string | null, subject: string | null, topic: string | null): Promise<Question[]> {
  const prog = progressStore.get()
  // Self-assessed (open) questions can't be marked automatically, so mocks skip them.
  let pool = manifest.problems.filter(p => p.kind === 'question' && (mode !== 'mock' || p.type !== 'open'))
  if (exam) pool = pool.filter(p => p.exams.includes(exam))
  if (subject) pool = pool.filter(p => p.subject === subject)
  if (topic) pool = pool.filter(p => p.topics.includes(topic))
  let ids: string[]
  if (mode === 'review') {
    const allowed = new Set(pool.map(p => p.id))
    ids = dueForReview(prog).filter(id => allowed.has(id)).slice(0, SIZES.review)
  } else {
    const unsolved = shuffle(pool.filter(p => prog.problems[p.id]?.status !== 'solved'))
    const solved = shuffle(pool.filter(p => prog.problems[p.id]?.status === 'solved'))
    ids = [...unsolved, ...solved].slice(0, SIZES[mode]).map(p => p.id)
  }
  const subjects = [...new Set(ids.map(id => id.replace(/-\d+$/, '')))]
  return Promise.all(subjects.map(s => loadSubject(s))).then(banks => {
    const byId = new Map(banks.flat().map(q => [q.id, q]))
    return ids.map(id => byId.get(id)).filter(Boolean) as Question[]
  })
}

export default function Session() {
  const manifest = useManifest()
  const [params] = useSearchParams()
  const mode = (['practice', 'mock', 'review'].includes(params.get('mode') ?? '') ? params.get('mode') : 'practice') as Mode
  const exam = params.get('exam')
  const subject = params.get('subject')
  const topic = params.get('topic')
  const key = `${params.toString()}|${params.get('n') ?? ''}`
  const [nonce, setNonce] = useState(0)
  const cacheKey = `${key}#${nonce}`
  if (!sessionCache.has(cacheKey)) sessionCache.set(cacheKey, buildSession(manifest, mode, exam, subject, topic))
  const questions = use(sessionCache.get(cacheKey)!)
  const examInfo = manifest.exams.find(e => e.id === exam)
  const scope = examInfo ? `${examInfo.society} ${examInfo.code}` : (manifest.subjects.find(s => s.id === subject)?.code ?? (topic || 'All subjects'))
  const title = { practice: 'Practice set', mock: 'Mock exam', review: 'Review' }[mode]
  usePageTitle(`${title} · ${scope}`)

  const restart = () => setNonce(n => n + 1)

  if (!questions.length)
    return (
      <div className="mx-auto max-w-lg px-4 py-20">
        <EmptyState
          title={mode === 'review' ? 'Nothing to review right now' : 'No questions found'}
          action={<ButtonLink to={examInfo ? `/exams/${examInfo.id}` : '/problems'}>Back to {examInfo ? examInfo.code : 'problems'}</ButtonLink>}
        >
          {mode === 'review'
            ? 'Questions you miss (or reveal) come back here the same day, then again after 1, 3, 7 and 21 days as you get them right.'
            : 'Try a different exam or topic.'}
        </EmptyState>
        {mode === 'review' && <CodeDueNote manifest={manifest} />}
      </div>
    )

  return mode === 'mock' ? (
    <MockExam key={cacheKey} questions={questions} manifest={manifest} scope={scope} onRestart={restart} />
  ) : (
    <PracticeRun key={cacheKey} questions={questions} manifest={manifest} scope={scope} title={title} onRestart={restart} />
  )
}

function CodeDueNote({ manifest }: { manifest: Manifest }) {
  const progress = useProgress()
  const code = dueForReview(progress).filter(id => isLang(id.replace(/-\d+$/, '')))
  if (!code.length) return null
  const first = manifest.problems.find(p => p.id === code[0])
  return (
    <p className="mt-6 text-center text-sm text-gm-ink-soft">
      {code.length} code problem{code.length === 1 ? ' is' : 's are'} also due.{' '}
      {first && (
        <Link to={`/problems/${first.id}`} className="font-semibold text-gm-lime underline decoration-gm-lime-edge decoration-2 underline-offset-4 hover:decoration-gm-lime">
          Open {first.title}
        </Link>
      )}
    </p>
  )
}

function SessionBar({
  title,
  scope,
  index,
  total,
  right,
  wide,
  done = index,
}: {
  title: string
  scope: string
  index: number
  total: number
  right?: React.ReactNode
  wide?: boolean
  done?: number
}) {
  return (
    <div className="sticky top-16 z-10 border-b-2 border-gm-line bg-gm-void/95 backdrop-blur">
      <div className={clsx('mx-auto flex h-14 items-center gap-3 px-4', wide ? 'max-w-5xl' : 'max-w-3xl')}>
        <span className="font-display text-sm uppercase">{title}</span>
        <span className="gm-chip bg-gm-grape text-gm-ink">{scope}</span>
        <span className="ml-auto font-mono text-sm font-bold text-gm-gold tabular">
          {Math.min(index + 1, total)}/{total}
        </span>
        {right}
      </div>
      <ProgressBar value={done} max={total} thin label="Session progress" />
    </div>
  )
}

function PracticeRun({ questions, manifest, scope, title, onRestart }: { questions: Question[]; manifest: Manifest; scope: string; title: string; onRestart: () => void }) {
  const [index, setIndex] = useState(0)
  const [results, setResults] = useState<Record<string, boolean>>({})
  const [showSolution, setShowSolution] = useState(false)
  const q = questions[index]
  const done = index >= questions.length

  if (done) return <Summary questions={questions} manifest={manifest} results={results} title={title} scope={scope} onRestart={onRestart} />

  const answered = q.id in results
  return (
    <div>
      <SessionBar title={title} scope={scope} index={index} total={questions.length} />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <QuestionHeader question={q} subject={manifest.subjects.find(s => s.id === q.subject)} exams={manifest.exams} />
        <div className="gm-panel mt-6 p-6 text-[15.5px] leading-[1.75]">
          <MathText text={q.prompt} />
        </div>
        <div className="mt-6">
          <AnswerPanel
            key={q.id}
            question={q}
            onAnswer={(v: Verdict) => {
              recordAttempt(q.id, v.correct)
              setResults(r => (q.id in r && r[q.id] === false && v.correct ? r : { ...r, [q.id]: v.correct }))
            }}
          />
        </div>
        {answered && (
          <div className="mt-6 flex flex-wrap gap-3 border-t-2 border-gm-line pt-6">
            <Button variant="secondary" onClick={() => setShowSolution(s => !s)}>
              {showSolution ? 'Hide solution' : 'Show solution'}
            </Button>
            <Button
              variant="primary"
              className="ml-auto"
              onClick={() => {
                setShowSolution(false)
                setIndex(i => i + 1)
                window.scrollTo(0, 0)
              }}
            >
              {index === questions.length - 1 ? 'Finish' : 'Next question'}
            </Button>
          </div>
        )}
        {!answered && (
          <div className="mt-6 flex justify-end">
            <Button variant="ghost" size="sm" onClick={() => setIndex(i => i + 1)}>
              Skip
            </Button>
          </div>
        )}
        {showSolution && (
          <div className="gm-panel mt-6 p-6">
            <Solution question={q} unlocked onReveal={() => {}} />
          </div>
        )}
      </div>
    </div>
  )
}

function MockExam({ questions, manifest, scope, onRestart }: { questions: Question[]; manifest: Manifest; scope: string; onRestart: () => void }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Verdict>>({})
  const [flags, setFlags] = useState<string[]>([])
  const [finished, setFinished] = useState(false)
  const [deadline] = useState(() => Date.now() + MOCK_MINUTES * 60_000)
  const [now, setNow] = useState(Date.now())
  const remaining = Math.max(0, deadline - now)

  useEffect(() => {
    if (finished) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [finished])

  const finish = () => {
    if (finished) return
    for (const q of questions) if (answers[q.id]) recordAttempt(q.id, answers[q.id].correct)
    setFinished(true)
    window.scrollTo(0, 0)
  }
  useEffect(() => {
    if (remaining === 0 && !finished) finish()
  })

  // Leaving mid-exam loses answers, so ask first.
  useEffect(() => {
    if (finished) return
    const warn = (e: BeforeUnloadEvent) => e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [finished])

  if (finished)
    return (
      <Summary
        questions={questions}
        manifest={manifest}
        results={Object.fromEntries(questions.map(q => [q.id, answers[q.id]?.correct ?? false]))}
        unanswered={questions.filter(q => !answers[q.id]).map(q => q.id)}
        title="Mock exam"
        scope={scope}
        onRestart={onRestart}
      />
    )

  const q = questions[index]
  const mm = String(Math.floor(remaining / 60000)).padStart(2, '0')
  const ss = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0')
  const answeredCount = Object.keys(answers).length

  return (
    <div>
      <SessionBar
        title="Mock exam"
        scope={scope}
        index={index}
        done={answeredCount}
        total={questions.length}
        wide
        right={
          <span
            className={clsx('flex items-center gap-1.5 rounded-[0.7rem] border-2 px-2.5 py-1 font-mono text-sm font-bold tabular', remaining < 5 * 60_000 ? 'border-gm-coral-edge bg-gm-coral/15 text-gm-coral' : 'border-gm-line bg-gm-night text-gm-ink')}
            role="timer"
            aria-label={`${mm} minutes ${ss} seconds remaining`}
          >
            <Clock className="size-3.5" aria-hidden="true" /> {mm}:{ss}
          </span>
        }
      />
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="font-display text-xl uppercase">Question {index + 1}</div>
            <Button
              size="sm"
              variant={flags.includes(q.id) ? 'accent' : 'ghost'}
              aria-pressed={flags.includes(q.id)}
              onClick={() => setFlags(f => (f.includes(q.id) ? f.filter(x => x !== q.id) : [...f, q.id]))}
            >
              <Flag className="size-3.5" aria-hidden="true" /> {flags.includes(q.id) ? 'Flagged' : 'Flag'}
            </Button>
          </div>
          <div className="gm-panel mt-4 p-6 text-[15.5px] leading-[1.75]">
            <MathText text={q.prompt} />
          </div>
          <div className="mt-6">
            <AnswerPanel key={q.id} question={q} feedback={false} initial={answers[q.id] ?? null} onAnswer={v => setAnswers(a => ({ ...a, [q.id]: v }))} />
          </div>
          <div className="mt-8 flex items-center gap-3 border-t-2 border-gm-line pt-6">
            <Button variant="secondary" disabled={index === 0} onClick={() => setIndex(i => i - 1)}>
              Previous
            </Button>
            {index < questions.length - 1 ? (
              <Button variant="primary" className="ml-auto" onClick={() => setIndex(i => i + 1)}>
                Next
              </Button>
            ) : (
              <Button
                variant="primary"
                className="ml-auto"
                onClick={() => (answeredCount < questions.length ? confirm(`You have ${questions.length - answeredCount} unanswered. Finish anyway?`) && finish() : finish())}
              >
                Finish exam
              </Button>
            )}
          </div>
        </div>
        <aside aria-label="Question navigator">
          <Card lift className="p-4 lg:sticky lg:top-36">
            <div className="mb-3 text-sm font-semibold text-gm-ink-soft tabular">
              {answeredCount} of {questions.length} answered
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {questions.map((x, i) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Question ${i + 1}${answers[x.id] ? ', answered' : ''}${flags.includes(x.id) ? ', flagged' : ''}`}
                  aria-current={i === index ? 'step' : undefined}
                  className={clsx(
                    'relative flex aspect-square items-center justify-center rounded-[0.6rem] border-2 text-xs font-bold tabular transition-colors',
                    i === index ? 'border-gm-lime text-gm-ink' : 'border-gm-line hover:border-gm-grape-hi',
                    answers[x.id] ? 'bg-gm-grape text-gm-ink' : 'bg-gm-void text-gm-ink-soft',
                  )}
                >
                  {i + 1}
                  {flags.includes(x.id) && <span className="absolute -top-1 -right-1 size-2.5 rounded-full border-2 border-gm-night bg-gm-gold" aria-hidden="true" />}
                </button>
              ))}
            </div>
            <Button variant="secondary" size="sm" className="mt-4 w-full" onClick={() => confirm('Finish the exam and see your results?') && finish()}>
              Finish exam
            </Button>
          </Card>
        </aside>
      </div>
    </div>
  )
}

function Summary({
  questions,
  manifest,
  results,
  unanswered = [],
  title,
  scope,
  onRestart,
}: {
  questions: Question[]
  manifest: Manifest
  results: Record<string, boolean>
  unanswered?: string[]
  title: string
  scope: string
  onRestart: () => void
}) {
  const navigate = useNavigate()
  const correct = questions.filter(q => results[q.id]).length
  const pct = Math.round((correct / questions.length) * 100)
  const byTopic = useMemo(() => {
    const m = new Map<string, [number, number]>()
    for (const q of questions) {
      const t = q.topics[0] ?? 'General'
      const e = m.get(t) ?? [0, 0]
      e[1]++
      if (results[q.id]) e[0]++
      m.set(t, e)
    }
    return [...m].sort((a, b) => a[1][0] / a[1][1] - b[1][0] / b[1][1])
  }, [questions, results])

  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-14">
        <div className="font-mono text-sm text-gm-ink-soft">
          {title} · {scope}
        </div>
        <h1 className="mt-2 font-display text-4xl leading-[1.05] text-balance uppercase sm:text-5xl">
          {pct >= 80 ? 'Excellent work.' : pct >= 50 ? 'Solid progress.' : 'Good practice. Keep at it.'}
        </h1>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Card className="border-gm-lime-edge p-5 shadow-[0_6px_0_var(--gm-lime-edge)]">
            <div className="font-display text-4xl text-gm-lime tabular">{pct}%</div>
            <div className="text-sm text-gm-ink-soft">Score</div>
          </Card>
          <Card className="border-gm-gold-edge p-5 shadow-[0_6px_0_var(--gm-gold-edge)]">
            <div className="font-display text-4xl text-gm-gold tabular">
              {correct}/{questions.length}
            </div>
            <div className="text-sm text-gm-ink-soft">Correct</div>
          </Card>
          <Card className="border-gm-coral-edge p-5 shadow-[0_6px_0_var(--gm-coral-edge)]">
            <div className="font-display text-4xl text-gm-coral tabular">{questions.length - correct}</div>
            <div className="text-sm text-gm-ink-soft">Added to review{unanswered.length ? ` (${unanswered.length} unanswered)` : ''}</div>
          </Card>
        </div>

        {byTopic.length > 1 && (
          <Card lift className="mt-8 p-6">
            <h2 className="font-bold">By topic, weakest first</h2>
            <ul className="mt-4 space-y-3">
              {byTopic.map(([t, [c, n]]) => (
                <li key={t}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-gm-ink-soft">{t}</span>
                    <span className="font-bold text-gm-gold tabular">
                      {c}/{n}
                    </span>
                  </div>
                  <ProgressBar value={c} max={n} tone={c / n >= 0.7 ? 'success' : 'accent'} label={`${t} score`} />
                </li>
              ))}
            </ul>
          </Card>
        )}

        <h2 className="mt-12 mb-4 text-xl font-bold">Questions</h2>
        <ul className="divide-y-2 divide-gm-line overflow-hidden rounded-[1.4rem] border-2 border-gm-line bg-gm-night shadow-[0_6px_0_var(--gm-line)]">
          {questions.map((q, i) => (
            <li key={q.id}>
              <Link to={`/problems/${q.id}`} className="flex items-center gap-3 px-5 py-3.5 text-sm transition-colors hover:bg-gm-deep hover:text-gm-lime">
                {unanswered.includes(q.id) ? (
                  <span className="size-4 rounded-full border-2 border-gm-line" aria-label="Unanswered" />
                ) : results[q.id] ? (
                  <CheckCircle2 className="size-4 text-gm-lime" aria-label="Correct" />
                ) : (
                  <XCircle className="size-4 text-gm-coral" aria-label="Incorrect" />
                )}
                <span className="font-mono text-xs text-gm-ink-dim">{i + 1}</span>
                <span className="min-w-0 flex-1 truncate">{q.title}</span>
                <span className="font-mono text-xs text-gm-ink-dim">{manifest.subjects.find(s => s.id === q.subject)?.code}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="primary" onClick={onRestart}>
            <RotateCcw className="size-4" aria-hidden="true" /> New set
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Back
          </Button>
          <ButtonLink to="/session?mode=review" variant="accent">
            Go to review queue
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

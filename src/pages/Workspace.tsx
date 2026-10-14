import { Suspense, lazy, use, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Bookmark, BookOpen, ChevronLeft, ChevronRight, CircleHelp, Link2, Lock, Shuffle, Timer } from 'lucide-react'
import clsx from 'clsx'
import { loadProblem, useManifest } from '../data/load'
import type { CodeProblem, Manifest, Question } from '../data/types'
import { getListContext } from '../lib/listContext'
import { usePageTitle } from '../lib/usePageTitle'
import { recordAttempt, toggleBookmark, useProgress } from '../state/progress'
import { Button, ButtonLink, Container, EmptyState, IconButton, PageSpinner } from '../components/ui'
import { QuestionHeader } from '../components/question/QuestionHeader'
import { AnswerPanel } from '../components/question/AnswerPanel'
import { MathText } from '../components/MathText'
import { Solution } from '../components/question/Solution'
import { PanelFrame, ProblemHeading } from '../components/ProblemChrome'

// The editor (CodeMirror) and runners only load for code problems.
const CodeWorkspace = lazy(() => import('../components/code/CodeWorkspace').then(m => ({ default: m.CodeWorkspace })))

const problemCache = new Map<string, ReturnType<typeof loadProblem>>()
const getProblem = (id: string) => {
  if (!problemCache.has(id)) problemCache.set(id, loadProblem(id))
  return problemCache.get(id)!
}

export default function Workspace() {
  const { id = '' } = useParams()
  const manifest = useManifest()
  const problem = use(getProblem(id))
  usePageTitle(problem ? problem.data.title : 'Problem not found')

  if (!problem)
    return (
      <Container className="max-w-lg py-24">
        <EmptyState title="Problem not found" action={<ButtonLink to="/problems">Browse problems</ButtonLink>}>
          There’s no problem with the id “{id}”. It may have been renamed.
        </EmptyState>
      </Container>
    )

  return (
    <Container className="py-6 sm:py-8">
      <Toolbar id={id} manifest={manifest} />
      {problem.kind === 'question' ? (
        <QuestionWorkspace key={id} question={problem.data} manifest={manifest} />
      ) : (
        <Suspense fallback={<PageSpinner label="Loading the editor" />}>
          <CodeWorkspace key={id} problem={problem.data as CodeProblem} />
        </Suspense>
      )}
    </Container>
  )
}

function Toolbar({ id, manifest }: { id: string; manifest: Manifest }) {
  const navigate = useNavigate()
  const progress = useProgress()
  const ctx = useMemo(() => getListContext(), [])
  const ids = ctx?.ids.includes(id) ? ctx.ids : manifest.problems.filter(p => p.subject === manifest.problems.find(x => x.id === id)?.subject).map(p => p.id)
  const index = ids.indexOf(id)
  const prev = index > 0 ? ids[index - 1] : null
  const next = index >= 0 && index < ids.length - 1 ? ids[index + 1] : null
  const bookmarked = progress.bookmarks.includes(id)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('input, textarea, .cm-editor') || e.metaKey || e.ctrlKey) return
      if (e.altKey && e.key === 'ArrowRight' && next) navigate(`/problems/${next}`)
      if (e.altKey && e.key === 'ArrowLeft' && prev) navigate(`/problems/${prev}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, navigate])

  const random = () => {
    const pool = ids.filter(x => x !== id && progress.problems[x]?.status !== 'solved')
    const list = pool.length ? pool : ids.filter(x => x !== id)
    if (list.length) navigate(`/problems/${list[Math.floor(Math.random() * list.length)]}`)
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link to={ctx?.back ?? '/problems'} className="btn-arcade btn-arcade-xs btn-arcade-night">
        <span className="max-w-[200px] truncate">{ctx?.ids.includes(id) ? ctx.label : 'Problem list'}</span>
      </Link>
      <span className="font-mono text-xs text-gm-ink-dim tabular">{index >= 0 ? `${index + 1} / ${ids.length}` : ''}</span>
      <div className="ml-auto flex items-center gap-1 rounded-[0.95rem] border-2 border-gm-line bg-gm-night p-1">
        <IconButton label="Previous problem (Alt ←)" disabled={!prev} onClick={() => prev && navigate(`/problems/${prev}`)}>
          <ChevronLeft className="size-4" />
        </IconButton>
        <IconButton label="Next problem (Alt →)" disabled={!next} onClick={() => next && navigate(`/problems/${next}`)}>
          <ChevronRight className="size-4" />
        </IconButton>
        <IconButton label="Random problem" onClick={random}>
          <Shuffle className="size-4" />
        </IconButton>
        <span className="mx-0.5 h-5 w-0.5 rounded-full bg-gm-line" aria-hidden="true" />
        <Stopwatch key={id} />
        <IconButton label={bookmarked ? 'Remove bookmark' : 'Bookmark'} aria-pressed={bookmarked} onClick={() => toggleBookmark(id)}>
          <Bookmark className={clsx('size-4', bookmarked && 'fill-current text-gm-lime')} />
        </IconButton>
        <IconButton
          label={copied ? 'Link copied' : 'Copy link'}
          onClick={() => {
            navigator.clipboard?.writeText(location.href).then(() => {
              setCopied(true)
              setTimeout(() => setCopied(false), 1500)
            })
          }}
        >
          <Link2 className={clsx('size-4', copied && 'text-gm-lime')} />
        </IconButton>
      </div>
    </div>
  )
}

function Stopwatch() {
  const [running, setRunning] = useState(false)
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [running])
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  return (
    <button
      type="button"
      onClick={() => setRunning(r => !r)}
      onDoubleClick={() => (setRunning(false), setSecs(0))}
      aria-label={running ? `Pause timer (${mm}:${ss})` : secs ? `Resume timer (${mm}:${ss}). Double-click to reset` : 'Start timer'}
      title="Click to start or pause, double-click to reset"
      className={clsx('flex h-9 items-center gap-1.5 rounded-[0.85rem] px-2 font-mono text-xs font-bold tabular hover:bg-gm-deep', running ? 'text-gm-lime' : 'text-gm-ink-soft')}
    >
      <Timer className="size-4" aria-hidden="true" />
      {secs || running ? `${mm}:${ss}` : null}
    </button>
  )
}

function QuestionWorkspace({ question, manifest }: { question: Question; manifest: Manifest }) {
  const progress = useProgress()
  const [tab, setTab] = useState<'question' | 'solution'>('question')
  const [answered, setAnswered] = useState(false)
  const status = progress.problems[question.id]?.status
  const subject = manifest.subjects.find(s => s.id === question.subject)
  const navigate = useNavigate()
  const bookmarked = progress.bookmarks.includes(question.id)

  const nextId = useMemo(() => {
    const ctx = getListContext()
    const ids = ctx?.ids.includes(question.id) ? ctx.ids : manifest.problems.filter(p => p.subject === question.subject).map(p => p.id)
    return ids[ids.indexOf(question.id) + 1] ?? null
  }, [question, manifest])

  const subjectProblems = manifest.problems.filter(p => p.subject === question.subject)
  const solvedInSubject = subjectProblems.filter(p => progress.problems[p.id]?.status === 'solved').length
  const exam = manifest.exams.find(e => question.exams.includes(e.id))
  const crumb = `${exam ? `${exam.society} ${exam.code}` : (subject?.name ?? question.subject)} · Problem ${question.n}`

  return (
    <>
      <ProblemHeading
        crumb={crumb}
        title={question.title}
        solved={solvedInSubject}
        total={subjectProblems.length}
        scope={subject?.code ?? question.subject}
        right={
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-gm-ink-soft sm:inline">View</span>
            <div role="tablist" aria-label="Question panels" className="gm-tabs">
              <button type="button" role="tab" aria-selected={tab === 'question'} onClick={() => setTab('question')} className="gm-tab">
                <CircleHelp className="size-4" aria-hidden="true" /> Question
              </button>
              <button type="button" role="tab" aria-selected={tab === 'solution'} onClick={() => setTab('solution')} className="gm-tab">
                {answered || status ? <BookOpen className="size-4" aria-hidden="true" /> : <Lock className="size-4" aria-hidden="true" />} Solution
              </button>
            </div>
          </div>
        }
      />

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-2">
        <PanelFrame path={`~/${question.subject}/problem-${question.n}`} className="lg:min-h-[520px]" label="Question">
          <div className="p-5 sm:p-6">
            {tab === 'question' ? (
              <>
                <QuestionHeader question={question} subject={subject} exams={manifest.exams} status={status} hideTitle />
                <div className="mt-6 text-[16px] leading-[1.75] text-gm-ink">
                  <MathText text={question.prompt} />
                </div>
              </>
            ) : (
              <Solution
                question={question}
                unlocked={answered || !!status}
                onReveal={() => {
                  recordAttempt(question.id, false, { revealed: true })
                  setAnswered(true)
                }}
              />
            )}
          </div>
        </PanelFrame>

        <section className="min-w-0 rounded-[1.4rem] border-2 border-gm-line bg-gm-night p-5 sm:p-6 lg:min-h-[520px]" aria-label="Answer panel">
          <div className="mb-5 flex items-center gap-2">
            <span className="gm-tabs">
              <span className="gm-tab" aria-pressed="true">
                <CircleHelp className="size-4" aria-hidden="true" /> Challenge
              </span>
            </span>
          </div>
          <AnswerPanel
            question={question}
            onAnswer={v => {
              recordAttempt(question.id, v.correct)
              setAnswered(true)
            }}
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <Button size="md" onClick={() => setTab('solution')}>
              <BookOpen className="size-4" aria-hidden="true" /> Solution
            </Button>
            <Button size="md" aria-pressed={bookmarked} onClick={() => toggleBookmark(question.id)}>
              <Bookmark className={clsx('size-4', bookmarked && 'fill-current text-gm-lime')} aria-hidden="true" /> {bookmarked ? 'Saved' : 'Save'}
            </Button>
            <Button size="md" variant="primary" disabled={!nextId} onClick={() => nextId && navigate(`/problems/${nextId}`)}>
              Next problem
            </Button>
          </div>
        </section>
      </div>
    </>
  )
}


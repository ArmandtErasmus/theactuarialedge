import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Play, RotateCcw, Timer } from 'lucide-react'
import { useManifest } from '../data/load'
import { DIFFICULTIES } from '../data/labels'
import { ButtonLink, Card, Container, DifficultyText, EmptyState, ProgressBar, ProgressRing, Segmented } from '../components/ui'
import { ProblemTable } from '../components/ProblemTable'
import { ArcadeCard, LockedCard } from '../components/ArcadeCard'
import { dueForReview, useProgress } from '../state/progress'
import { usePageTitle } from '../lib/usePageTitle'

export default function ExamDetail() {
  const { examId = '' } = useParams()
  const manifest = useManifest()
  const progress = useProgress()
  const exam = manifest.exams.find(e => e.id === examId)
  usePageTitle(exam ? `${exam.society} ${exam.code} ${exam.name}` : 'Exam not found')
  const [diff, setDiff] = useState<'all' | 'easy' | 'medium' | 'hard'>('all')

  const problems = useMemo(() => manifest.problems.filter(p => p.exams.includes(examId)), [manifest, examId])
  const subject = manifest.subjects.find(s => s.id === exam?.subject)
  const subjects = useMemo(() => new Map(manifest.subjects.map(s => [s.id, s])), [manifest])

  const topics = useMemo(() => {
    const m = new Map<string, { total: number; solved: number }>()
    for (const p of problems)
      for (const t of p.topics.slice(0, 1)) {
        const e = m.get(t) ?? { total: 0, solved: 0 }
        e.total++
        if (progress.problems[p.id]?.status === 'solved') e.solved++
        m.set(t, e)
      }
    return [...m].sort((a, b) => b[1].total - a[1].total)
  }, [problems, progress])

  if (!exam || !problems.length)
    return (
      <Container className="py-24">
        <EmptyState title={exam ? `${exam.code} questions are coming soon` : 'Exam not found'} action={<ButtonLink to="/exams">All exams</ButtonLink>}>
          {exam ? 'We only publish questions that have been checked. This subject isn’t ready yet.' : 'Check the exam code and try again.'}
        </EmptyState>
      </Container>
    )

  const solved = problems.filter(p => progress.problems[p.id]?.status === 'solved').length
  const attempted = problems.filter(p => progress.problems[p.id]).length
  const due = dueForReview(progress).filter(id => problems.some(p => p.id === id)).length
  const visible = diff === 'all' ? problems : problems.filter(p => p.difficulty === diff)
  const accuracy = (() => {
    let c = 0
    let a = 0
    for (const p of problems) {
      const pr = progress.problems[p.id]
      if (pr) {
        c += pr.correct
        a += pr.attempts
      }
    }
    return a ? Math.round((c / a) * 100) : null
  })()

  return (
    <Container className="py-10">
      <Link to={`/exams${exam.society === 'ASSA' ? '?society=ASSA' : ''}`} className="btn-arcade btn-arcade-xs btn-arcade-night">
        {exam.society} exams
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="font-mono text-sm text-gm-ink-soft">
            {exam.society} · {exam.stage}
          </div>
          <h1 className="mt-1 font-display text-4xl leading-[1.05] text-balance uppercase sm:text-5xl">
            {exam.code} <span className="text-gm-ink-soft">{exam.name}</span>
          </h1>
          {subject && subject.exams && subject.exams.length > 1 && (
            <p className="mt-3 text-sm text-gm-ink-soft">
              Shares its question bank with{' '}
              {subject.exams
                .filter(e => e !== exam.id)
                .map(e => manifest.exams.find(x => x.id === e))
                .filter(Boolean)
                .map((e, i, arr) => (
                  <span key={e!.id}>
                    <Link to={`/exams/${e!.id}`} className="font-semibold text-gm-lime underline decoration-gm-lime-edge decoration-2 underline-offset-4 hover:decoration-gm-lime">
                      {e!.society} {e!.code}
                    </Link>
                    {i < arr.length - 1 ? ', ' : ''}
                  </span>
                ))}
              .
            </p>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <ArcadeCard to={`/session?exam=${exam.id}&mode=practice`} tone="lime" icon={<Play />} title="Practice set" subtitle="Instant feedback" footer={<PlayRow label="Start" />}>
              10 questions you haven’t solved yet, marked as you go.
            </ArcadeCard>
            <ArcadeCard to={`/session?exam=${exam.id}&mode=mock`} tone="coral" icon={<Timer />} title="Mock exam" subtitle="30 minutes" footer={<PlayRow label="Start" />}>
              20 questions against the clock, marked at the end.
            </ArcadeCard>
            {due ? (
              <ArcadeCard to={`/session?exam=${exam.id}&mode=review`} tone="cyan" icon={<RotateCcw />} title="Review" subtitle={`${due} due now`} footer={<PlayRow label="Review" />}>
                The questions you missed, spaced so they stick.
              </ArcadeCard>
            ) : (
              <LockedCard icon={<RotateCcw />} title="Review" subtitle="Nothing due yet" note="Questions you miss land here." />
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Questions</h2>
            <Segmented
              label="Difficulty"
              size="sm"
              value={diff}
              onChange={setDiff}
              options={[
                { value: 'all', label: 'All', count: problems.length },
                ...DIFFICULTIES.map(d => ({ value: d, label: <DifficultyText value={d} />, count: problems.filter(p => p.difficulty === d).length })),
              ]}
            />
          </div>
          <div className="mt-4">
            <ProblemTable problems={visible} subjects={subjects} progress={progress} contextLabel={`${exam.society} ${exam.code}`} showSubject={false} />
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-5">
              <ProgressRing value={solved} max={problems.length} size={96} stroke={10}>
                <span className="font-display text-lg tabular">{Math.round((solved / problems.length) * 100)}%</span>
              </ProgressRing>
              <dl className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <dt className="text-gm-ink-soft">Solved</dt>
                  <dd className="font-medium tabular">
                    {solved}/{problems.length}
                  </dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-gm-ink-soft">Attempted</dt>
                  <dd className="font-medium tabular">{attempted}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-gm-ink-soft">Accuracy</dt>
                  <dd className="font-medium tabular">{accuracy === null ? '—' : `${accuracy}%`}</dd>
                </div>
              </dl>
            </div>
          </Card>
          <Card className="p-5">
            <h2 className="font-bold">By topic</h2>
            <ul className="mt-4 space-y-3.5">
              {topics.map(([t, s]) => (
                <li key={t}>
                  <Link to={`/problems?subject=${exam.subject}&topic=${encodeURIComponent(t)}`} className="group block">
                    <div className="mb-1 flex justify-between gap-3 text-xs">
                      <span className="truncate text-gm-ink-soft group-hover:text-gm-ink">{t}</span>
                      <span className="text-gm-ink-dim tabular">
                        {s.solved}/{s.total}
                      </span>
                    </div>
                    <ProgressBar value={s.solved} max={s.total} label={`${t} progress`} />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </Container>
  )
}

function PlayRow({ label }: { label: string }) {
  return (
    <span className="ml-auto flex items-center gap-1 font-bold text-gm-lime">
      <Play className="size-4 fill-current" aria-hidden="true" /> {label}
    </span>
  )
}

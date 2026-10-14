import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Flame, Target, Trophy, XCircle } from 'lucide-react'
import { useManifest } from '../data/load'
import type { Difficulty } from '../data/types'
import { DIFFICULTIES, LANG_LABEL } from '../data/labels'
import { ButtonLink, Card, Container, DifficultyText, EmptyState, PageHeader, ProgressBar, ProgressRing } from '../components/ui'
import { Heatmap } from '../components/Activity'
import { currentStreak, dueForReview, longestStreak, useProgress } from '../state/progress'
import { usePageTitle } from '../lib/usePageTitle'
import { DEFAULT_AVATAR_IMAGE, useProfile } from '../state/profile'

export default function Progress() {
  usePageTitle('My progress')
  const manifest = useManifest()
  const progress = useProgress()
  const profile = useProfile()

  const stats = useMemo(() => {
    const byDiff = Object.fromEntries(DIFFICULTIES.map(d => [d, { solved: 0, total: 0 }])) as Record<Difficulty, { solved: number; total: number }>
    const bySubject = new Map<string, { solved: number; attempted: number; total: number }>()
    let attempts = 0
    let correct = 0
    for (const p of manifest.problems) {
      const pr = progress.problems[p.id]
      byDiff[p.difficulty].total++
      const s = bySubject.get(p.subject) ?? { solved: 0, attempted: 0, total: 0 }
      s.total++
      if (pr) {
        s.attempted++
        attempts += pr.attempts
        correct += pr.correct
      }
      if (pr?.status === 'solved') {
        byDiff[p.difficulty].solved++
        s.solved++
      }
      bySubject.set(p.subject, s)
    }
    const solved = DIFFICULTIES.reduce((a, d) => a + byDiff[d].solved, 0)
    return { byDiff, bySubject, attempts, correct, solved }
  }, [manifest, progress])

  const recent = useMemo(
    () =>
      Object.entries(progress.problems)
        .sort((a, b) => b[1].lastAt.localeCompare(a[1].lastAt))
        .slice(0, 12)
        .map(([id, p]) => ({ id, p, meta: manifest.problems.find(x => x.id === id) }))
        .filter(r => r.meta),
    [progress, manifest],
  )

  const due = dueForReview(progress).length
  const subjectLabel = (id: string) => manifest.subjects.find(s => s.id === id)?.name ?? LANG_LABEL[id as 'python'] ?? id

  return (
    <Container className="py-14">
      <PageHeader
        title={
          <span className="flex items-center gap-4">
            <img src={profile.image ?? DEFAULT_AVATAR_IMAGE} alt="" className="size-14 shrink-0 rounded-full border-2 border-gm-line sm:size-16" />
            {profile.name ? `${profile.name}’s progress` : 'Your progress'}
          </span>
        }
        description="Everything you’ve solved, your streak and what’s due for review, all in one place."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Stat tone="lime" icon={<CheckCircle2 className="size-5" />} label="Solved" value={stats.solved} sub={`of ${manifest.problems.length}`} />
        <Stat tone="cyan" icon={<Target className="size-5" />} label="Accuracy" value={stats.attempts ? `${Math.round((stats.correct / stats.attempts) * 100)}%` : '—'} sub={`${stats.attempts} attempts`} />
        <Stat tone="gold" icon={<Flame className="size-5" />} label="Streak (days)" value={currentStreak(progress.activity)} sub={`Best ${longestStreak(progress.activity)} days`} />
        <Stat
          tone="coral"
          icon={<Trophy className="size-5" />}
          label="Review due"
          value={due}
          sub={
            due ? (
              <Link to="/session?mode=review" className="font-semibold text-gm-lime underline decoration-gm-lime-edge decoration-2 underline-offset-4 hover:decoration-gm-lime">
                Start review
              </Link>
            ) : (
              'All caught up'
            )
          }
        />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[340px_minmax(0,1fr)]">
        <Card className="flex items-center gap-6 p-6">
          <ProgressRing value={stats.solved} max={manifest.problems.length} size={112} stroke={10}>
            <span className="font-display text-2xl tabular">{stats.solved}</span>
            <span className="text-xs font-semibold text-gm-ink-dim">solved</span>
          </ProgressRing>
          <div className="flex-1 space-y-3">
            {DIFFICULTIES.map(d => (
              <div key={d}>
                <div className="mb-1.5 flex justify-between text-sm font-semibold">
                  <DifficultyText value={d} />
                  <span className="text-gm-ink-soft tabular">
                    {stats.byDiff[d].solved}/{stats.byDiff[d].total}
                  </span>
                </div>
                <ProgressBar value={stats.byDiff[d].solved} max={stats.byDiff[d].total} tone={d} label={`${d} solved`} />
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <Heatmap activity={progress.activity} />
        </Card>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-lg uppercase">By subject</h2>
          <ul className="mt-5 space-y-4">
            {[...stats.bySubject]
              .sort((a, b) => b[1].attempted - a[1].attempted || b[1].total - a[1].total)
              .map(([id, s]) => (
                <li key={id}>
                  <div className="mb-1 flex justify-between gap-3 text-sm">
                    <Link to={`/problems?subject=${id}`} className="truncate font-semibold text-gm-ink-soft hover:text-gm-lime">
                      {subjectLabel(id)}
                    </Link>
                    <span className="shrink-0 font-bold text-gm-gold tabular">
                      {s.solved}/{s.total}
                    </span>
                  </div>
                  <ProgressBar value={s.solved} max={s.total} label={`${subjectLabel(id)} progress`} />
                </li>
              ))}
          </ul>
        </Card>
        <Card className="p-6">
          <h2 className="font-display text-lg uppercase">Recent activity</h2>
          {recent.length === 0 ? (
            <div className="mt-5">
              <EmptyState title="No attempts yet" action={<ButtonLink to="/problems" variant="primary">Solve your first problem</ButtonLink>}>
                Everything you answer shows up here.
              </EmptyState>
            </div>
          ) : (
            <ul className="mt-4 divide-y-2 divide-gm-line overflow-hidden rounded-[1rem] border-2 border-gm-line bg-gm-void">
              {recent.map(({ id, p, meta }) => (
                <li key={id}>
                  <Link to={`/problems/${id}`} className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gm-deep hover:text-gm-lime">
                    {p.status === 'solved' ? <CheckCircle2 className="size-4 shrink-0 text-gm-lime" aria-label="Solved" /> : <XCircle className="size-4 shrink-0 text-gm-coral" aria-label="Not solved yet" />}
                    <span className="min-w-0 flex-1 truncate">{meta!.title}</span>
                    <span className="shrink-0 text-xs text-gm-ink-dim">{new Date(p.lastAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</span>
                    <ArrowRight className="size-3.5 shrink-0 text-gm-ink-dim" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </Container>
  )
}

const STAT_TONE = {
  lime: ['border-gm-lime-edge shadow-[0_6px_0_var(--gm-lime-edge)]', 'bg-gm-lime/12 text-gm-lime'],
  cyan: ['border-gm-cyan-edge shadow-[0_6px_0_var(--gm-cyan-edge)]', 'bg-gm-cyan/12 text-gm-cyan'],
  gold: ['border-gm-gold-edge shadow-[0_6px_0_var(--gm-gold-edge)]', 'bg-gm-gold/12 text-gm-gold'],
  coral: ['border-gm-coral-edge shadow-[0_6px_0_var(--gm-coral-edge)]', 'bg-gm-coral/12 text-gm-coral'],
} as const

function Stat({ tone, icon, label, value, sub }: { tone: keyof typeof STAT_TONE; icon: React.ReactNode; label: string; value: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <Card className={`p-5 ${STAT_TONE[tone][0]}`}>
      <div className="flex items-center gap-3">
        <span className={`flex size-10 items-center justify-center rounded-xl ${STAT_TONE[tone][1]}`} aria-hidden="true">
          {icon}
        </span>
        <span className="text-sm font-semibold text-gm-ink-soft">{label}</span>
      </div>
      <div className="mt-4 font-display text-4xl tabular">{value}</div>
      {sub && <div className="mt-1 text-sm text-gm-ink-dim">{sub}</div>}
    </Card>
  )
}

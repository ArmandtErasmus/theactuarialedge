import { useDeferredValue, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Bookmark, CalendarCheck2, RotateCcw, Search, Shuffle, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useManifest } from '../data/load'
import type { Difficulty, ProblemSummary, Subject } from '../data/types'
import { DIFFICULTIES, DIFFICULTY_LABEL, LANG_LABEL, TRACKS, type TrackFilter } from '../data/labels'
import { Button, ButtonLink, Card, Container, DifficultyText, EmptyState, ProgressBar, ProgressRing, Segmented } from '../components/ui'
import { FilterMenu } from '../components/Filters'
import { ProblemTable } from '../components/ProblemTable'
import { MonthCalendar } from '../components/Activity'
import { currentStreak, dueForReview, useProgress, type ProgressState } from '../state/progress'
import { hashString, setListContext } from '../lib/listContext'
import { usePageTitle } from '../lib/usePageTitle'

const PAGE_SIZE = 50
const diffRank: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 }

export function trackOf(p: ProblemSummary, subjects: Map<string, Subject>): Exclude<TrackFilter, 'all'> {
  if (p.kind === 'code') return 'code'
  return subjects.get(p.subject)?.track === 'interview' ? 'interview' : 'exams'
}

export function dailyProblem(problems: ProblemSummary[], day: string) {
  const pool = problems.filter(p => p.kind === 'question' && p.difficulty !== 'easy')
  return pool[hashString(day) % pool.length]
}

export default function Problems() {
  usePageTitle('Problems')
  const manifest = useManifest()
  const progress = useProgress()
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()

  const track = (params.get('track') ?? 'all') as TrackFilter
  const diff = params.get('difficulty') ?? ''
  const status = params.get('status') ?? ''
  const subject = params.get('subject') ?? ''
  const topic = params.get('topic') ?? ''
  const sort = params.get('sort') ?? ''
  const q = params.get('q') ?? ''
  const page = Math.max(1, Number(params.get('page') ?? 1))
  const deferredQ = useDeferredValue(q)

  const set = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    if (key === 'track') {
      next.delete('subject')
      next.delete('topic')
    }
    if (key === 'subject') next.delete('topic')
    setParams(next, { replace: true })
  }

  const subjects = useMemo(() => new Map(manifest.subjects.map(s => [s.id, s])), [manifest])
  const subjectOptions = useMemo(() => {
    const ids = [...new Set(manifest.problems.filter(p => track === 'all' || trackOf(p, subjects) === track).map(p => p.subject))]
    return ids.map(id => {
      const s = subjects.get(id)
      const count = manifest.problems.filter(p => p.subject === id).length
      return { value: id, label: s ? `${s.code} · ${s.name}` : LANG_LABEL[id as 'python'] ?? id, hint: count }
    })
  }, [manifest, subjects, track])

  const topicOptions = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of manifest.problems) {
      if (subject && p.subject !== subject) continue
      if (track !== 'all' && trackOf(p, subjects) !== track) continue
      for (const t of p.topics) counts.set(t, (counts.get(t) ?? 0) + 1)
    }
    return [...counts].sort((a, b) => b[1] - a[1]).map(([t, n]) => ({ value: t, label: t, hint: n }))
  }, [manifest, subject, track, subjects])

  const filtered = useMemo(() => {
    const words = deferredQ.trim().toLowerCase().split(/\s+/).filter(Boolean)
    const list = manifest.problems.filter(p => {
      if (track !== 'all' && trackOf(p, subjects) !== track) return false
      if (diff && p.difficulty !== diff) return false
      if (subject && p.subject !== subject) return false
      if (topic && !p.topics.includes(topic)) return false
      const st = progress.problems[p.id]?.status
      if (status === 'solved' && st !== 'solved') return false
      if (status === 'attempted' && st !== 'attempted') return false
      if (status === 'todo' && st) return false
      if (status === 'bookmarked' && !progress.bookmarks.includes(p.id)) return false
      if (words.length) {
        const hay = `${p.title} ${p.id} ${subjects.get(p.subject)?.code ?? p.subject} ${p.topics.join(' ')}`.toLowerCase()
        if (!words.every(w => hay.includes(w))) return false
      }
      return true
    })
    if (sort === 'difficulty') list.sort((a, b) => diffRank[a.difficulty] - diffRank[b.difficulty])
    if (sort === '-difficulty') list.sort((a, b) => diffRank[b.difficulty] - diffRank[a.difficulty])
    if (sort === 'title') list.sort((a, b) => a.title.localeCompare(b.title))
    return list
  }, [manifest, subjects, track, diff, subject, topic, status, sort, deferredQ, progress])

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const anyFilter = diff || status || subject || topic || q || track !== 'all'

  const trackCounts = useMemo(() => {
    const c: Record<string, number> = { all: manifest.problems.length, exams: 0, interview: 0, code: 0 }
    for (const p of manifest.problems) c[trackOf(p, subjects)]++
    return c
  }, [manifest, subjects])

  const pickRandom = () => {
    const pool = filtered.filter(p => progress.problems[p.id]?.status !== 'solved')
    const list = pool.length ? pool : filtered
    if (!list.length) return
    setListContext({ label: 'Filtered problems', back: `/problems?${params}`, ids: filtered.map(p => p.id) })
    navigate(`/problems/${list[Math.floor(Math.random() * list.length)].id}`)
  }

  return (
    <Container className="py-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <h1 className="font-display text-4xl uppercase sm:text-5xl">Problems</h1>
          <p className="mt-3 text-lg text-gm-ink-soft">
            {manifest.problems.length.toLocaleString()} problems across actuarial exams, interview prep and code.
          </p>

          <div className="mt-6">
            <Segmented
              label="Track"
              value={track}
              onChange={v => set('track', v === 'all' ? '' : v)}
              options={TRACKS.map(t => ({ value: t.id, label: t.label, count: trackCounts[t.id] }))}
            />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <label className="relative min-w-[200px] flex-1">
              <span className="sr-only">Search problems</span>
              <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gm-ink-dim" aria-hidden="true" />
              <input
                value={q}
                onChange={e => set('q', e.target.value)}
                placeholder="Search by title, topic or code"
                className="gm-field h-11 !py-0 pl-10 text-sm"
              />
            </label>
            <FilterMenu
              label="Difficulty"
              value={diff}
              onChange={v => set('difficulty', v)}
              options={DIFFICULTIES.map(d => ({ value: d, label: <DifficultyText value={d} /> }))}
            />
            <FilterMenu
              label="Status"
              value={status}
              onChange={v => set('status', v)}
              options={[
                { value: 'todo', label: 'Not started' },
                { value: 'attempted', label: 'Attempted' },
                { value: 'solved', label: 'Solved' },
                { value: 'bookmarked', label: 'Bookmarked' },
              ]}
            />
            <FilterMenu label="Subject" value={subject} onChange={v => set('subject', v)} options={subjectOptions} searchable />
            <FilterMenu label="Topic" value={topic} onChange={v => set('topic', v)} options={topicOptions} searchable />
            <FilterMenu
              label="Sort"
              value={sort}
              onChange={v => set('sort', v)}
              options={[
                { value: 'difficulty', label: 'Easiest first' },
                { value: '-difficulty', label: 'Hardest first' },
                { value: 'title', label: 'Title A–Z' },
              ]}
            />
            <Button variant="secondary" size="md" onClick={pickRandom} title="Open a random unsolved problem from this list">
              <Shuffle className="size-4" aria-hidden="true" /> Random
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-gm-ink-dim" aria-live="polite">
            <span>
              {filtered.length.toLocaleString()} {filtered.length === 1 ? 'problem' : 'problems'}
            </span>
            {anyFilter && (
              <button type="button" onClick={() => setParams({}, { replace: true })} className="inline-flex items-center gap-1 hover:text-gm-ink">
                <RotateCcw className="size-3" aria-hidden="true" /> Reset filters
              </button>
            )}
          </div>

          <div className="mt-2">
            {visible.length ? (
              <ProblemTable problems={visible} subjects={subjects} progress={progress} contextLabel="Problems" />
            ) : (
              <EmptyState icon={<Search className="size-6" />} title="No problems match these filters" action={<Button onClick={() => setParams({}, { replace: true })}>Reset filters</Button>}>
                Try a broader search or clear a filter.
              </EmptyState>
            )}
          </div>

          {pages > 1 && <Pagination page={page} pages={pages} onPage={p => set('page', String(p))} />}
        </div>

        <Sidebar progress={progress} problems={manifest.problems} />
      </div>
    </Container>
  )
}

function Pagination({ page, pages, onPage }: { page: number; pages: number; onPage: (p: number) => void }) {
  const nums = [...new Set([1, page - 1, page, page + 1, pages].filter(n => n >= 1 && n <= pages))].sort((a, b) => a - b)
  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-center gap-1">
      <Button size="sm" variant="ghost" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Previous
      </Button>
      {nums.map((n, i) => (
        <span key={n} className="flex items-center">
          {i > 0 && n - nums[i - 1] > 1 && <span className="px-1 text-gm-ink-dim">…</span>}
          <button
            type="button"
            aria-current={n === page ? 'page' : undefined}
            onClick={() => onPage(n)}
            className={`h-8 min-w-8 rounded-lg px-2 text-sm tabular ${n === page ? 'bg-gm-line font-medium text-gm-ink' : 'text-gm-ink-soft hover:bg-gm-deep'}`}
          >
            {n}
          </button>
        </span>
      ))}
      <Button size="sm" variant="ghost" disabled={page >= pages} onClick={() => onPage(page + 1)}>
        Next
      </Button>
    </nav>
  )
}

function Sidebar({ progress, problems }: { progress: ProgressState; problems: ProblemSummary[] }) {
  const byDiff = useMemo(() => {
    const out = { easy: [0, 0], medium: [0, 0], hard: [0, 0] } as Record<Difficulty, [number, number]>
    for (const p of problems) {
      out[p.difficulty][1]++
      if (progress.problems[p.id]?.status === 'solved') out[p.difficulty][0]++
    }
    return out
  }, [problems, progress])
  const solved = byDiff.easy[0] + byDiff.medium[0] + byDiff.hard[0]
  const due = dueForReview(progress).length
  const streak = currentStreak(progress.activity)
  const daily = dailyProblem(problems, new Date().toISOString().slice(0, 10))
  const dailyDone = progress.problems[daily?.id]?.status === 'solved'

  return (
    <aside className="flex flex-col gap-4" aria-label="Your progress">
      <Card className="p-5">
        <div className="flex items-center gap-5">
          <ProgressRing value={solved} max={problems.length} size={104} stroke={7}>
            <span className="text-xl font-semibold tabular">{solved}</span>
            <span className="text-[11px] text-gm-ink-dim tabular">/ {problems.length}</span>
          </ProgressRing>
          <div className="flex-1 space-y-2.5">
            {DIFFICULTIES.map(d => (
              <div key={d}>
                <div className="mb-1 flex justify-between text-xs">
                  <DifficultyText value={d} />
                  <span className="tabular text-gm-ink-soft">
                    {byDiff[d][0]}/{byDiff[d][1]}
                  </span>
                </div>
                <ProgressBar value={byDiff[d][0]} max={byDiff[d][1]} tone={d} label={`${DIFFICULTY_LABEL[d]} solved`} />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {daily && (
        <Card className="p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-gm-ink-dim">
            <Sparkles className="size-3.5 text-gm-lime" aria-hidden="true" /> QUESTION OF THE DAY
          </div>
          <Link to={`/problems/${daily.id}`} className="mt-2 block font-medium hover:text-gm-lime">
            {daily.title}
          </Link>
          <div className="mt-1 flex items-center gap-2 text-xs">
            <DifficultyText value={daily.difficulty} />
            {dailyDone && <span className="text-gm-lime">· Solved</span>}
          </div>
        </Card>
      )}

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-medium">
            <CalendarCheck2 className="size-4 text-gm-ink-dim" aria-hidden="true" />
            {streak > 0 ? `${streak}-day streak` : 'Start a streak today'}
          </span>
        </div>
        <MonthCalendar activity={progress.activity} />
      </Card>

      <Card className="p-5">
        <div className="text-sm font-medium">Review queue</div>
        <p className="mt-1 text-sm text-gm-ink-soft">
          {due ? `${due} question${due === 1 ? '' : 's'} due, spaced by how well you knew them.` : 'Nothing due. Questions you get wrong come back here.'}
        </p>
        <div className="mt-4 flex gap-2">
          <ButtonLink to="/session?mode=review" variant={due ? 'primary' : 'secondary'} size="sm" aria-disabled={!due}>
            Start review
          </ButtonLink>
          <ButtonLink to="/problems?status=bookmarked" variant="ghost" size="sm">
            <Bookmark className="size-3.5" aria-hidden="true" /> Saved
          </ButtonLink>
        </div>
      </Card>
    </aside>
  )
}

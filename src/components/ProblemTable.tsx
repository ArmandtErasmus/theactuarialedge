import { Link, useLocation } from 'react-router-dom'
import { Bookmark, CheckCircle2, CircleDashed, Code2 } from 'lucide-react'
import clsx from 'clsx'
import type { ProblemSummary, Subject } from '../data/types'
import { LANG_LABEL, TYPE_LABEL } from '../data/labels'
import { DifficultyText } from './ui'
import { setListContext } from '../lib/listContext'
import type { ProgressState } from '../state/progress'

export function StatusIcon({ status }: { status?: 'solved' | 'attempted' }) {
  if (status === 'solved') return <CheckCircle2 className="size-4 text-gm-lime" aria-label="Solved" />
  if (status === 'attempted') return <CircleDashed className="size-4 text-gm-gold" aria-label="Attempted" />
  return <span className="sr-only">Not started</span>
}

export function ProblemTable({
  problems,
  subjects,
  progress,
  contextLabel,
  showSubject = true,
}: {
  problems: ProblemSummary[]
  subjects: Map<string, Subject>
  progress: ProgressState
  contextLabel: string
  showSubject?: boolean
}) {
  const location = useLocation()
  const remember = () =>
    setListContext({ label: contextLabel, back: location.pathname + location.search, ids: problems.map(p => p.id) })

  return (
    <div className="overflow-hidden rounded-[1.4rem] border-2 border-gm-line bg-gm-night shadow-[0_6px_0_var(--gm-line)]">
      <table className="w-full table-fixed text-sm">
        <caption className="sr-only">{contextLabel}</caption>
        <thead className="border-b-2 border-gm-line bg-gm-deep text-left text-xs font-semibold tracking-wide text-gm-ink-soft uppercase">
          <tr>
            <th scope="col" className="w-11 py-2.5 pl-4 font-medium">
              <span className="sr-only">Status</span>
            </th>
            <th scope="col" className="py-2.5 pr-3 font-medium">
              Title
            </th>
            {showSubject && (
              <th scope="col" className="hidden w-28 py-2.5 pr-3 font-medium sm:table-cell">
                Subject
              </th>
            )}
            <th scope="col" className="hidden w-[30%] py-2.5 pr-3 font-medium lg:table-cell">
              Topics
            </th>
            <th scope="col" className="w-20 py-2.5 pr-4 font-medium sm:w-24">
              Difficulty
            </th>
          </tr>
        </thead>
        <tbody>
          {problems.map((p, i) => {
            const prog = progress.problems[p.id]
            const subject = subjects.get(p.subject)
            const bookmarked = progress.bookmarks.includes(p.id)
            return (
              <tr key={p.id} className={clsx('group border-b-2 border-gm-line last:border-0 transition-colors hover:bg-gm-deep', i % 2 === 1 && 'bg-gm-void/40')}>
                <td className="py-3 pl-4">
                  <StatusIcon status={prog?.status} />
                </td>
                <td className="py-3 pr-3">
                  <Link to={`/problems/${p.id}`} onClick={remember} className="flex min-w-0 items-center gap-2 font-semibold text-gm-ink hover:text-gm-lime">
                    <span className="truncate">{p.title}</span>
                    {p.kind === 'code' && <Code2 className="size-3.5 shrink-0 text-gm-ink-dim" aria-label="Code problem" />}
                    {bookmarked && <Bookmark className="size-3.5 shrink-0 fill-current text-gm-lime" aria-label="Bookmarked" />}
                  </Link>
                  <div className="mt-0.5 truncate text-xs text-gm-ink-dim sm:hidden">
                    {p.kind === 'code' ? LANG_LABEL[p.subject as 'python'] : subject?.code} · {TYPE_LABEL[p.type]}
                  </div>
                </td>
                {showSubject && (
                  <td className="hidden py-3 pr-3 sm:table-cell">
                    <span className="font-mono text-xs text-gm-ink-soft">{p.kind === 'code' ? LANG_LABEL[p.subject as 'python'] : subject?.code}</span>
                  </td>
                )}
                <td className="hidden py-3 pr-3 lg:table-cell">
                  <div className="truncate text-xs text-gm-ink-dim" title={p.topics.join(', ')}>
                    {p.topics.length ? p.topics.join(' · ') : TYPE_LABEL[p.type]}
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <DifficultyText value={p.difficulty} className="text-[13px]" />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

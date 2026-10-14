// Lesson-page chrome shared by the question and code workspaces:
// mono breadcrumb + display title, a milestone progress bar, and terminal-style panels.
import type { ReactNode } from 'react'
import clsx from 'clsx'

export function ProblemHeading({
  crumb,
  title,
  right,
  solved,
  total,
  scope,
}: {
  crumb: string
  title: string
  right?: ReactNode
  solved: number
  total: number
  scope: string
}) {
  const pct = total ? Math.round((solved / total) * 100) : 0
  return (
    <>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <div className="font-mono text-sm text-gm-ink-soft">{crumb}</div>
          <h1 className="mt-1 font-display text-2xl leading-[1.05] text-balance uppercase [overflow-wrap:anywhere] sm:text-3xl sm:[overflow-wrap:normal]">{title}</h1>
        </div>
        {right}
      </div>
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="font-bold">Progress</span>
          <span className="text-sm font-bold tabular">
            {solved}/{total} solved in {scope} ({pct}%)
          </span>
        </div>
        <div className="relative">
          <div className="relative h-3 w-full overflow-hidden rounded-full border-2 border-gm-line bg-gm-void" role="progressbar" aria-valuenow={solved} aria-valuemax={total} aria-label={`${scope} progress`}>
            <div className="h-full rounded-full bg-gm-lime transition-[width] duration-300 ease-out-expo" style={{ width: `${pct}%` }} />
          </div>
          {[25, 50, 75].map(m => (
            <span key={m} className="absolute top-0 h-3 w-0.5 bg-gm-line" style={{ left: `${m}%` }} aria-hidden="true" />
          ))}
          <div className="relative mt-1.5 hidden h-4 text-xs font-semibold text-gm-ink-dim sm:block" aria-hidden="true">
            {[25, 50, 75, 100].map(m => (
              <span key={m} className={clsx('absolute tabular', m === 100 ? '-translate-x-full' : '-translate-x-1/2')} style={{ left: `${m}%` }}>
                {m}%
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/** Terminal-style panel frame: status dot + mono path header. */
export function PanelFrame({ path, actions, children, className, label }: { path: string; actions?: ReactNode; children: ReactNode; className?: string; label?: string }) {
  return (
    <section aria-label={label} className={clsx('flex min-w-0 flex-col overflow-hidden rounded-[1.4rem] border-2 border-gm-line bg-gm-night shadow-[0_6px_0_var(--gm-line)]', className)}>
      <div className="flex h-12 shrink-0 items-center gap-2 border-b-2 border-gm-line bg-gm-deep/50 px-4">
        <span className="size-2 shrink-0 rounded-full bg-gm-lime shadow-[0_0_8px_var(--gm-lime)]" aria-hidden="true" />
        <span className="min-w-0 truncate font-mono text-xs text-gm-ink-soft">{path}</span>
        <div className="ml-auto flex items-center gap-1">{actions}</div>
      </div>
      {children}
    </section>
  )
}

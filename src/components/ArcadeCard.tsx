// "Arcade" card: coloured rim + matching solid drop, icon tile, chip, footer row.
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

export type ArcadeTone = 'cyan' | 'grape' | 'lime' | 'coral' | 'gold'

const RIM: Record<ArcadeTone, string> = {
  cyan: 'border-gm-cyan-edge shadow-[0_6px_0_var(--gm-cyan-edge)] hover:shadow-[0_9px_0_var(--gm-cyan-edge)]',
  grape: 'border-gm-grape-hi shadow-[0_6px_0_var(--gm-grape)] hover:shadow-[0_9px_0_var(--gm-grape)]',
  lime: 'border-gm-lime-edge shadow-[0_6px_0_var(--gm-lime-edge)] hover:shadow-[0_9px_0_var(--gm-lime-edge)]',
  coral: 'border-gm-coral-edge shadow-[0_6px_0_var(--gm-coral-edge)] hover:shadow-[0_9px_0_var(--gm-coral-edge)]',
  gold: 'border-gm-gold-edge shadow-[0_6px_0_var(--gm-gold-edge)] hover:shadow-[0_9px_0_var(--gm-gold-edge)]',
}
const TILE: Record<ArcadeTone, string> = {
  cyan: 'bg-gm-cyan/12 text-gm-cyan',
  grape: 'bg-gm-grape/30 text-gm-grape-hi',
  lime: 'bg-gm-lime/12 text-gm-lime',
  coral: 'bg-gm-coral/12 text-gm-coral',
  gold: 'bg-gm-gold/12 text-gm-gold',
}
export const TONES: ArcadeTone[] = ['cyan', 'gold', 'lime', 'coral']

export function ArcadeCard({
  to,
  tone,
  icon,
  title,
  subtitle,
  chip,
  children,
  footer,
  className,
}: {
  to: string
  tone: ArcadeTone
  icon: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  chip?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      className={clsx(
        'group flex flex-col rounded-[1.4rem] border-2 bg-gm-night p-5 transition-[transform,box-shadow] duration-150 ease-out-expo hover:-translate-y-1',
        RIM[tone],
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <span className={clsx('flex size-11 shrink-0 items-center justify-center rounded-xl [&>svg]:size-5', TILE[tone])} aria-hidden="true">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate font-bold text-gm-ink">{title}</div>
          {subtitle && <div className="line-clamp-2 text-sm text-gm-ink-dim">{subtitle}</div>}
        </div>
        {chip}
      </div>
      {children && <div className="mt-4 flex-1 text-sm leading-relaxed text-gm-ink-soft">{children}</div>}
      {footer && <div className="mt-4 flex items-center justify-between gap-3 border-t-2 border-gm-line pt-3 text-sm">{footer}</div>}
    </Link>
  )
}

/** Disabled / coming-soon variant. */
export function LockedCard({ icon, title, subtitle, note }: { icon: ReactNode; title: ReactNode; subtitle?: ReactNode; note: ReactNode }) {
  return (
    <div className="flex flex-col rounded-[1.4rem] border-2 border-dashed border-gm-line bg-gm-night/50 p-5 opacity-80">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gm-grape-edge/50 text-gm-ink-dim [&>svg]:size-5" aria-hidden="true">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate font-bold text-gm-ink-soft">{title}</div>
          {subtitle && <div className="line-clamp-2 text-sm text-gm-ink-dim">{subtitle}</div>}
        </div>
      </div>
      <div className="mt-4 text-sm font-semibold text-gm-ink-dim">{note}</div>
    </div>
  )
}

// Arcade UI kit. Buttons, chips, panels and tabs share the "face + edge" language:
// a flat colour face sitting on a solid darker drop that presses down when clicked.
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import clsx from 'clsx'
import type { Difficulty } from '../data/types'
import { DIFFICULTY_LABEL } from '../data/labels'

// ---------- buttons ----------
type Variant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger' | 'gold' | 'cyan'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Exclude<Variant, 'ghost'>, string> = {
  primary: 'btn-arcade-lime',
  secondary: 'btn-arcade-night',
  accent: 'btn-arcade-grape',
  danger: 'btn-arcade-coral',
  gold: 'btn-arcade-gold',
  cyan: 'btn-arcade-cyan',
}
const sizes: Record<Size, string> = { sm: 'btn-arcade-xs', md: 'btn-arcade-sm', lg: '' }

export const buttonClass = (variant: Variant = 'secondary', size: Size = 'md', extra?: string) =>
  variant === 'ghost'
    ? clsx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-[0.85rem] border-2 border-transparent font-semibold whitespace-nowrap text-gm-ink-soft transition-colors duration-150 hover:bg-gm-deep hover:text-gm-ink disabled:pointer-events-none disabled:opacity-45',
        size === 'sm' ? 'min-h-9 px-3 text-[13px]' : size === 'lg' ? 'min-h-13 px-6' : 'min-h-11 px-4 text-[15px]',
        extra,
      )
    : clsx('btn-arcade', variants[variant], sizes[size], extra)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size; loading?: boolean }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'secondary', size = 'md', className, loading, children, disabled, type = 'button', ...rest },
  ref,
) {
  return (
    <button ref={ref} type={type} className={buttonClass(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...rest}>
      {loading && <Spinner className="size-4" />}
      {children}
    </button>
  )
})

export function ButtonLink({ variant = 'secondary', size = 'md', className, ...rest }: LinkProps & { variant?: Variant; size?: Size }) {
  return <Link className={buttonClass(variant, size, className)} {...rest} />
}

export function IconButton({ label, className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={clsx(
        'inline-flex size-9 shrink-0 items-center justify-center rounded-[0.85rem] border-2 border-transparent text-gm-ink-soft transition-colors duration-150 hover:bg-gm-deep hover:text-gm-ink disabled:opacity-40',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

// ---------- feedback ----------
export function Spinner({ className }: { className?: string }) {
  return (
    <svg className={clsx('animate-spin', className ?? 'size-4')} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export function PageSpinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center gap-3 font-mono text-sm text-gm-ink-soft" role="status">
      <Spinner className="size-5 text-gm-lime" /> {label}…
    </div>
  )
}

// ---------- labels ----------
const diffText: Record<Difficulty, string> = { easy: 'text-dif-easy', medium: 'text-dif-medium', hard: 'text-dif-hard' }
const diffChip: Record<Difficulty, string> = {
  easy: 'bg-dif-easy text-gm-void',
  medium: 'bg-dif-medium text-gm-void',
  hard: 'bg-dif-hard text-gm-void',
}

export function DifficultyText({ value, className }: { value: Difficulty; className?: string }) {
  return <span className={clsx('font-semibold', diffText[value], className)}>{DIFFICULTY_LABEL[value]}</span>
}

export function DifficultyPill({ value }: { value: Difficulty }) {
  return <span className={clsx('gm-chip', diffChip[value])}>{DIFFICULTY_LABEL[value]}</span>
}

export function Badge({ children, className, tone = 'neutral' }: { children: ReactNode; className?: string; tone?: 'neutral' | 'accent' | 'success' | 'danger' | 'lime' | 'gold' }) {
  const tones = {
    neutral: 'border-gm-line bg-gm-deep text-gm-ink-soft',
    accent: 'bg-gm-grape text-gm-ink',
    lime: 'bg-gm-lime text-gm-void',
    gold: 'border-gm-gold-edge text-gm-gold',
    success: 'border-gm-lime-edge bg-gm-lime/12 text-gm-lime',
    danger: 'border-gm-coral-edge bg-gm-coral/12 text-gm-coral',
  }
  return <span className={clsx('gm-chip', tones[tone], className)}>{children}</span>
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-md border-2 border-gm-line bg-gm-void px-1 font-mono text-[11px] text-gm-ink-soft">
      {children}
    </kbd>
  )
}

// ---------- layout ----------
export function Card({ children, className, as: As = 'div', lift = true }: { children: ReactNode; className?: string; as?: 'div' | 'section' | 'article'; lift?: boolean }) {
  return <As className={clsx('gm-panel', lift && 'gm-panel-lift', className)}>{children}</As>
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={clsx('container mx-auto w-full px-4', className)}>{children}</div>
}

/** Page title block: mono breadcrumb, Bungee title, soft subtitle. */
export function PageHeader({ title, description, actions }: { title: ReactNode; description?: ReactNode; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        <h1 className="font-display text-4xl leading-[1.05] text-balance uppercase sm:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-lg leading-relaxed text-gm-ink-soft">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  )
}

export function EmptyState({ icon, title, children, action }: { icon?: ReactNode; title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="gm-inset gm-dots-line flex flex-col items-center px-6 py-14 text-center">
      {icon && <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-gm-grape/30 text-gm-grape-hi">{icon}</div>}
      <h3 className="font-display text-xl uppercase">{title}</h3>
      {children && <p className="mt-2 max-w-sm text-sm text-gm-ink-soft">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}

/** Coloured icon tile used in HUDs and cards (gold / lime / coral / cyan / grape at 12%). */
export function IconTile({ children, tone = 'grape', className }: { children: ReactNode; tone?: 'gold' | 'lime' | 'coral' | 'cyan' | 'grape'; className?: string }) {
  const tones = {
    gold: 'text-gm-gold bg-gm-gold/12',
    lime: 'text-gm-lime bg-gm-lime/12',
    coral: 'text-gm-coral bg-gm-coral/12',
    cyan: 'text-gm-cyan bg-gm-cyan/12',
    grape: 'text-gm-grape-hi bg-gm-grape/25',
  }
  return (
    <span className={clsx('flex size-11 shrink-0 items-center justify-center rounded-xl', tones[tone], className)} aria-hidden="true">
      {children}
    </span>
  )
}

// ---------- progress ----------
export function ProgressBar({
  value,
  max,
  className,
  tone = 'accent',
  label,
  thin = false,
}: {
  value: number
  max: number
  className?: string
  tone?: 'accent' | Difficulty | 'success'
  label?: string
  thin?: boolean
}) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0
  const fill = { accent: 'bg-gm-lime', success: 'bg-gm-lime', easy: 'bg-dif-easy', medium: 'bg-dif-medium', hard: 'bg-dif-hard' }[tone]
  return (
    <div
      className={clsx('w-full overflow-hidden rounded-full', thin ? 'h-1 bg-gm-line' : 'h-3 border-2 border-gm-line bg-gm-void', className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label}
    >
      <div className={clsx('h-full rounded-full transition-[width] duration-300 ease-out-expo', fill)} style={{ width: `${pct}%` }} />
    </div>
  )
}

export function ProgressRing({ value, max, size = 120, stroke = 10, children }: { value: number; max: number; size?: number; stroke?: number; children?: ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const pct = max > 0 ? Math.min(1, value / max) : 0
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--gm-line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--gm-lime)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">{children}</div>
    </div>
  )
}

// ---------- segmented tabs ----------
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
  size = 'md',
}: {
  value: T
  onChange: (v: T) => void
  options: { value: T; label: ReactNode; count?: number }[]
  label: string
  size?: 'sm' | 'md'
}) {
  return (
    <div role="tablist" aria-label={label} className="gm-tabs">
      {options.map(o => (
        <button
          key={o.value}
          role="tab"
          type="button"
          aria-selected={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx('gm-tab', size === 'sm' && 'min-h-9 text-[13px]')}
        >
          {o.label}
          {o.count !== undefined && <span className="tabular font-mono text-xs opacity-75">{o.count}</span>}
        </button>
      ))}
    </div>
  )
}

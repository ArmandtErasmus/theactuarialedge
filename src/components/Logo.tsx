import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { topIfCurrent } from '../lib/scrollTop'

/** Mark: the mascot in glasses. */
export function LogoMark({ size = 40, className }: { size?: number; className?: string }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}assets/mascots/logo.webp`}
      alt=""
      width={size}
      height={size}
      className={clsx('shrink-0 transition-transform duration-150 ease-out-expo group-hover:-rotate-6', className)}
      style={{ width: size, height: size }}
    />
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" onClick={topIfCurrent('/')} className={clsx('group flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline-offset-4', className)} aria-label="The Actuarial Edge home">
      <LogoMark />
      <span className="hidden font-display text-lg leading-none whitespace-nowrap text-gm-ink sm:inline">Actuarial Edge</span>
    </Link>
  )
}

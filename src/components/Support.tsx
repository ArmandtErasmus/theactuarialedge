import { useId, useRef, type ReactNode } from 'react'
import { Coffee, Globe, Heart, LockOpen, Sparkles, X } from 'lucide-react'
import clsx from 'clsx'

export const GITHUB_URL = 'https://github.com/ArmandtErasmus/theactuarialedge'
export const COFFEE_URL = 'https://buymeacoffee.com/theactuarialedge'

const REASONS = [
  { icon: Globe, text: 'Keeps the domain and the site online' },
  { icon: Sparkles, text: 'Funds new questions, code problems and projects' },
  { icon: LockOpen, text: 'Keeps every question and solution free to use' },
]

function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.35.95.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

/** "Support the project" trigger that opens the sponsor dialog (GitHub star or a coffee). */
export function SupportButton({ children = 'Support the project', className }: { children?: ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const close = () => ref.current?.close()
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.showModal()}
        className={clsx(
          'inline-flex cursor-pointer items-center gap-1.5 rounded font-semibold text-gm-gold underline-offset-4 transition-colors duration-150 hover:text-gm-ink hover:underline',
          className,
        )}
      >
        <Heart className="size-4 fill-current" aria-hidden="true" />
        {children}
      </button>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        onClick={e => e.target === e.currentTarget && close()}
        className="gm-panel gm-scroll gm-dialog m-auto max-h-[92svh] w-[calc(100vw-1.5rem)] max-w-md overflow-y-auto p-5 text-gm-ink shadow-[0_0_0_4px_var(--gm-void),10px_10px_0_0_var(--gm-grape)] sm:p-6"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 inline-flex size-9 cursor-pointer items-center justify-center rounded-[0.7rem] border-2 border-gm-line bg-gm-void text-gm-ink-soft transition-colors duration-150 hover:border-gm-coral hover:text-gm-coral"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
        <div className="flex flex-col gap-1.5 pe-14 text-start">
          <span className="mb-1 flex size-14 items-center justify-center rounded-[1rem] border-2 border-gm-gold-edge bg-gm-gold text-gm-void" aria-hidden="true">
            <Heart className="size-7 fill-current" />
          </span>
          <h2 id={titleId} className="font-display text-xl leading-tight sm:text-2xl">
            Keep Actuarial Edge free
          </h2>
          <p className="text-base text-gm-ink-soft">No ads, no account, no paywall. Sponsors pay the bills that keep it that way.</p>
        </div>
        <ul className="mt-6 flex flex-col gap-2.5">
          {REASONS.map(r => (
            <li key={r.text} className="gm-inset flex items-center gap-3 px-3.5 py-3 text-sm leading-snug text-gm-ink-soft">
              <r.icon className="size-5 shrink-0 text-gm-gold" aria-hidden="true" />
              {r.text}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-arcade btn-arcade-sm btn-arcade-gold flex-1">
            <GitHubMark className="size-4" />
            Star on GitHub
          </a>
          <a href={COFFEE_URL} target="_blank" rel="noopener noreferrer" className="btn-arcade btn-arcade-sm btn-arcade-night flex-1">
            <Coffee className="size-4 text-gm-gold" aria-hidden="true" />
            Buy me a coffee
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-gm-ink-dim">Entirely optional. Practising stays free either way.</p>
      </dialog>
    </>
  )
}

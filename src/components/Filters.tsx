import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'
import clsx from 'clsx'

export interface Option {
  value: string
  label: ReactNode
  hint?: ReactNode
}

/** Single-select filter dropdown with a clear button. */
export function FilterMenu({
  label,
  value,
  options,
  onChange,
  searchable = false,
}: {
  label: string
  value: string
  options: Option[]
  onChange: (v: string) => void
  searchable?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const current = options.find(o => o.value === value)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', esc)
    }
  }, [open])

  const visible = q ? options.filter(o => String(o.label).toLowerCase().includes(q.toLowerCase())) : options

  return (
    <div className="relative" ref={ref}>
      <div
        className={clsx(
          'flex h-11 items-center rounded-[0.85rem] border-2 text-sm font-semibold transition-colors',
          value ? 'border-gm-grape-edge bg-gm-grape text-gm-ink' : 'border-gm-line bg-gm-night text-gm-ink-soft hover:border-gm-grape-hi hover:text-gm-ink',
        )}
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="flex h-full items-center gap-1.5 pr-2.5 pl-3.5"
        >
          <span>{current ? current.label : label}</span>
          <ChevronDown className="size-3.5 opacity-60" aria-hidden="true" />
        </button>
        {value && (
          <button type="button" aria-label={`Clear ${label} filter`} onClick={() => onChange('')} className="mr-1.5 rounded-md p-1 hover:bg-gm-grape-edge">
            <X className="size-3.5" />
          </button>
        )}
      </div>
      {open && (
        <div className="absolute left-0 z-40 mt-2 w-64 overflow-hidden rounded-[1rem] border-2 border-gm-line bg-gm-night shadow-[0_6px_0_var(--gm-line)]">
          {searchable && (
            <input
              autoFocus
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder={`Filter ${label.toLowerCase()}…`}
              aria-label={`Filter ${label} options`}
              className="h-11 w-full border-b-2 border-gm-line bg-gm-void px-3 text-sm outline-none placeholder:text-gm-ink-dim"
            />
          )}
          <ul role="listbox" aria-label={label} className="max-h-72 overflow-y-auto p-1">
            {visible.map(o => (
              <li key={o.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={o.value === value}
                  onClick={() => {
                    onChange(o.value === value ? '' : o.value)
                    setOpen(false)
                    setQ('')
                  }}
                  className="flex w-full items-center gap-2 rounded-[0.6rem] px-2.5 py-2 text-left text-sm font-medium hover:bg-gm-deep aria-selected:bg-gm-grape"
                >
                  <Check className={clsx('size-3.5 shrink-0', o.value === value ? 'text-gm-lime' : 'opacity-0')} aria-hidden="true" />
                  <span className="min-w-0 flex-1 truncate">{o.label}</span>
                  {o.hint !== undefined && <span className="tabular text-xs text-gm-ink-dim">{o.hint}</span>}
                </button>
              </li>
            ))}
            {visible.length === 0 && <li className="px-3 py-4 text-center text-sm text-gm-ink-dim">No options</li>}
          </ul>
        </div>
      )}
    </div>
  )
}

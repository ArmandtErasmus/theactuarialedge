import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { Container } from './ui'
import { Markdown } from './Markdown'
import { headings } from '../lib/markdown'

/** Long-form article layout with a sticky on-page table of contents. */
export function DocPage({ back, eyebrow, title, summary, meta, aside, body }: { back: { to: string; label: string }; eyebrow?: ReactNode; title: string; summary?: string; meta?: ReactNode; aside?: ReactNode; body: string }) {
  const toc = useMemo(() => headings(body), [body])
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const els = toc.map(t => document.getElementById(t.id)).filter(Boolean) as HTMLElement[]
    if (!els.length) return
    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px' },
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [toc, body])

  return (
    <Container className="py-12">
      <Link to={back.to} className="btn-arcade btn-arcade-xs btn-arcade-night">
        {back.label}
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <article className="min-w-0">
          {eyebrow && <div className="font-mono text-sm text-gm-ink-soft">{eyebrow}</div>}
          <h1 className="mt-2 font-display text-3xl leading-[1.1] text-balance uppercase sm:text-5xl">{title}</h1>
          {summary && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gm-ink-soft">{summary}</p>}
          {meta && <div className="mt-6">{meta}</div>}
          <div className="gm-panel gm-panel-lift mt-10 p-6 sm:p-10">
            <Markdown source={body} className="max-w-3xl" />
          </div>
        </article>
        <aside className="hidden lg:block">
          <div className="sticky top-24 flex flex-col gap-6">
            {aside}
            {toc.length > 2 && (
              <nav aria-label="On this page" className="gm-panel p-5">
                <div className="mb-4 font-display text-sm uppercase">On this page</div>
                <ul className="space-y-1 border-l-2 border-gm-line text-sm">
                  {toc.map(t => (
                    <li key={t.id}>
                      <a
                        href={`#${t.id}`}
                        className={clsx('-ml-0.5 block border-l-2 py-1 pl-3 transition-colors', active === t.id ? 'border-gm-lime font-semibold text-gm-lime' : 'border-transparent text-gm-ink-soft hover:text-gm-ink')}
                      >
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </aside>
      </div>
    </Container>
  )
}

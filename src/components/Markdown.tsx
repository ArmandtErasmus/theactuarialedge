import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { renderMarkdown, slugify } from '../lib/markdown'

/** Renders trusted, repo-authored Markdown. Internal links use client-side navigation. */
export function Markdown({ source, className = '' }: { source: string; className?: string }) {
  const html = useMemo(() => renderMarkdown(source), [source])
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.querySelectorAll('h2, h3').forEach(h => {
      if (!h.id) h.id = slugify(h.textContent ?? '')
    })
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a')
      const href = a?.getAttribute('href')
      if (!a || !href || a.target === '_blank' || e.metaKey || e.ctrlKey) return
      if (href.startsWith('/')) {
        e.preventDefault()
        navigate(href)
      }
    }
    el.addEventListener('click', onClick)
    return () => el.removeEventListener('click', onClick)
  }, [html, navigate])

  return <div ref={ref} className={`prose-ae ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
}

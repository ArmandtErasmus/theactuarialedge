import { memo, useMemo } from 'react'
import katex from 'katex'
import { tokenize } from '../lib/tokenize'

const renderTex = (tex: string, display: boolean) =>
  katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: 'ignore', output: 'html' })

/** Plain text with $inline$ / $$display$$ maths. Newlines are preserved; no Markdown. */
export const MathText = memo(function MathText({ text, className }: { text: string; className?: string }) {
  const parts = useMemo(() => tokenize(text ?? ''), [text])
  return (
    <span className={className} style={{ whiteSpace: 'pre-line' }}>
      {parts.map((p, i) =>
        p.kind === 'text' ? (
          <span key={i}>{p.value}</span>
        ) : (
          <span
            key={i}
            className={p.display ? 'my-2 block overflow-x-auto overflow-y-hidden' : undefined}
            dangerouslySetInnerHTML={{ __html: renderTex(p.value, p.display) }}
          />
        ),
      )}
    </span>
  )
})

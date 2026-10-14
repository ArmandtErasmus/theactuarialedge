// Markdown + KaTeX for repo-authored content (guides, projects, coding descriptions).
// Maths is a marked extension, so `$` inside code spans and fenced blocks
// (e.g. R's df$col) is never treated as TeX.
import { Marked, type TokenizerExtension, type RendererExtension } from 'marked'
import katex from 'katex'

type MathToken = { type: string; raw: string; text: string; display: boolean }

const tex = (t: string, display: boolean) =>
  katex.renderToString(t, { displayMode: display, throwOnError: false, strict: 'ignore' })

const block: TokenizerExtension & RendererExtension = {
  name: 'mathBlock',
  level: 'block',
  start: src => src.match(/^\$\$|\n\$\$/)?.index,
  tokenizer(src) {
    const m = /^\$\$([\s\S]+?)\$\$[^\S\n]*(?:\n|$)/.exec(src)
    if (m) return { type: 'mathBlock', raw: m[0], text: m[1].trim(), display: true } satisfies MathToken
  },
  renderer: t => `<div class="katex-display-wrap">${tex((t as unknown as MathToken).text, true)}</div>`,
}

const inline: TokenizerExtension & RendererExtension = {
  name: 'mathInline',
  level: 'inline',
  start(src) {
    const i = src.search(/(?<!\\)\$/)
    return i < 0 ? undefined : i
  },
  tokenizer(src) {
    const m = /^\$\$((?:\\.|[^\\$])+?)\$\$/.exec(src) ?? /^\$((?:\\.|[^\\$\n])+?)\$(?![\d])/.exec(src)
    if (m) return { type: 'mathInline', raw: m[0], text: m[1], display: m[0].startsWith('$$') } satisfies MathToken
  },
  renderer: t => tex((t as unknown as MathToken).text, (t as unknown as MathToken).display),
}

const md = new Marked({ gfm: true, breaks: false })
md.use({ extensions: [block, inline] })
md.use({
  renderer: {
    link({ href, title, text }) {
      const external = /^https?:\/\//.test(href)
      const t = title ? ` title="${title}"` : ''
      return external
        ? `<a href="${href}"${t} target="_blank" rel="noopener noreferrer">${text}</a>`
        : `<a href="${href}"${t}>${text}</a>`
    },
  },
})

export function renderMarkdown(src: string): string {
  return md.parse(src ?? '', { async: false }) as string
}

/** Extracts "## Heading" entries for an on-page table of contents. */
export function headings(src: string): { id: string; text: string }[] {
  return [...(src ?? '').matchAll(/^##\s+(.+)$/gm)].map(m => ({ id: slugify(m[1]), text: m[1].replace(/[*_`]/g, '') }))
}

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[*_`'’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

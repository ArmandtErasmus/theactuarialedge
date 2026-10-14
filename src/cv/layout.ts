// Shared typography for the CV (points). The live preview and the PDF both read these,
// so what you see is what you download. Modelled on the site's LaTeX template.
export const CV = {
  margin: { x: 36, top: 30, bottom: 30 },
  name: 24,
  contact: 10,
  sectionGap: 9,
  titleBig: 12.5,
  titleSmall: 10,
  entryIndent: 10.8,
  entryGap: 4,
  head: 11,
  sub: 10,
  body: 10,
  lineHeight: 1.25,
  bulletIndent: 14,
  rule: 0.6,
} as const

/** LaTeX-style small caps: lower-case letters become smaller capitals. */
export function smallCaps(text: string): { text: string; small: boolean }[] {
  const runs: { text: string; small: boolean }[] = []
  for (const ch of text) {
    const small = ch !== ch.toUpperCase() && ch === ch.toLowerCase()
    const t = small ? ch.toUpperCase() : ch
    const last = runs[runs.length - 1]
    if (last && last.small === small) last.text += t
    else runs.push({ text: t, small })
  }
  return runs
}

export const PAPER = {
  A4: { width: 595.28, height: 841.89, label: 'A4' },
  LETTER: { width: 612, height: 792, label: 'US Letter' },
} as const

// Splits question text into plain text and TeX segments.
// Supported delimiters: $$...$$ and \[...\] (display), $...$ and \(...\) (inline).
// A literal dollar sign is written as \$ (the content migration escapes currency).

export type Segment =
  | { kind: 'text'; value: string }
  | { kind: 'math'; value: string; display: boolean }

const PAIRS: Array<[open: string, close: string, display: boolean]> = [
  ['$$', '$$', true],
  ['\\[', '\\]', true],
  ['\\(', '\\)', false],
  ['$', '$', false],
]

export function tokenize(input: string): Segment[] {
  const out: Segment[] = []
  let text = ''
  let i = 0
  const flush = () => {
    if (text) out.push({ kind: 'text', value: text })
    text = ''
  }
  outer: while (i < input.length) {
    if (input.startsWith('\\$', i)) {
      text += '$'
      i += 2
      continue
    }
    for (const [open, close, display] of PAIRS) {
      if (!input.startsWith(open, i)) continue
      const end = findClose(input, i + open.length, close)
      if (end === -1) break
      const value = input.slice(i + open.length, end)
      if (!value.trim()) break
      flush()
      out.push({ kind: 'math', value, display })
      i = end + close.length
      continue outer
    }
    text += input[i]
    i++
  }
  flush()
  return out
}

function findClose(s: string, from: number, close: string): number {
  for (let j = from; j < s.length; j++) {
    if (close === '$' || close === '$$') {
      if (s[j] === '\\') {
        j++
        continue
      }
      if (s.startsWith(close, j)) return j
    } else if (s.startsWith(close, j)) return j
  }
  return -1
}

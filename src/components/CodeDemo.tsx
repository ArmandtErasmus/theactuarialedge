// Homepage hero: replays a real code problem being solved, from typing the solution
// to the test results. Data comes from /data/demo.json (generated from content/coding).
import { use, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Braces, CheckCircle2, ListChecks, Pause, Play, Send } from 'lucide-react'
import clsx from 'clsx'
import type { Difficulty, Lang } from '../data/types'
import { LANG_LABEL } from '../data/labels'
import { DifficultyPill } from './ui'

interface Demo {
  id: string
  lang: Lang
  title: string
  difficulty: Difficulty
  blurb: string
  starter: string
  code: string
  cases?: { call: string; expected: string }[]
  result?: { columns: string[]; values: (string | number | null)[][] }
}

let demoPromise: Promise<Demo[]> | null = null
const loadDemos = (): Promise<Demo[]> =>
  (demoPromise ??= fetch(`${import.meta.env.BASE_URL}data/demo.json`).then(r => {
    if (!r.ok) throw new Error('Could not load the demo')
    return r.json() as Promise<Demo[]>
  }))

// ---------- tiny syntax highlighter (display only) ----------
const KEYWORDS: Record<Lang, RegExp> = {
  python: /^(def|return|for|in|if|elif|else|while|import|from|not|and|or|True|False|None|lambda)$/,
  r: /^(function|return|if|else|for|in|while|TRUE|FALSE|NULL)$/,
  sql: /^(select|from|where|order|by|group|over|as|sum|max|min|count|avg|join|on|and|or|in|exists|not|desc|asc|limit|with|partition|having)$/i,
}

function highlight(code: string, lang: Lang) {
  const out: { t: string; c?: string }[] = []
  const re = /(#[^\n]*|--[^\n]*)|('[^'\n]*'?|"[^"\n]*"?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w.]*)(?=\s*\()|([A-Za-z_][\w.]*)|(\s+|[^\sA-Za-z_\d'"#-]+|-)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(code))) {
    const [tok, comment, str, num, fn, word] = m
    if (comment && (lang === 'sql' ? tok.startsWith('--') : tok.startsWith('#'))) out.push({ t: tok, c: 'text-gm-ink-dim italic' })
    else if (str) out.push({ t: tok, c: 'text-gm-cyan' })
    else if (num) out.push({ t: tok, c: 'text-gm-gold' })
    else if ((fn || word) && KEYWORDS[lang].test(tok)) out.push({ t: tok, c: 'text-gm-lime' })
    else if (fn) out.push({ t: tok, c: 'font-semibold text-gm-ink' })
    else if (word) out.push({ t: tok, c: 'text-gm-ink' })
    else out.push({ t: tok, c: 'text-gm-ink-soft' })
  }
  return out
}

// Typing rhythm (ms per key): quick on letters, a beat on newlines and after ':' / '{' / ','.
const FRAME = 40
function delayFor(prev: string, ch: string, i: number) {
  if (ch === '\n') return prev === ':' || prev === '{' ? 180 : 110
  if (ch === ' ' && prev === ' ') return 4
  if (prev === ',' || prev === '(') return 45
  return 16 + ((i * 37) % 14)
}

type Phase = 'starter' | 'typing' | 'submitting' | 'running' | 'done'

export function CodeDemo() {
  const demos = use(loadDemos())
  const reduced = useMemo(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(reduced ? demos[0].code : demos[0].starter)
  const [phase, setPhase] = useState<Phase>(reduced ? 'done' : 'starter')
  const [view, setView] = useState<'editor' | 'results'>('editor')
  const [shown, setShown] = useState(reduced ? 99 : 0)
  const [paused, setPaused] = useState(reduced)
  const [visible, setVisible] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const pauseRef = useRef(paused)
  useEffect(() => {
    pauseRef.current = paused || !visible
  }, [paused, visible])
  const demo = demos[index]

  // Only animate while on screen and while the tab is visible.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting && document.visibilityState === 'visible'), { threshold: 0.25 })
    io.observe(el)
    const onVis = () => setVisible(document.visibilityState === 'visible' && el.getBoundingClientRect().bottom > 0)
    document.addEventListener('visibilitychange', onVis)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  // The timeline for one problem. Each run is cancelled when the problem changes.
  useEffect(() => {
    if (reduced) return
    let cancelled = false
    const wait = (ms: number) =>
      new Promise<void>((resolve, reject) => {
        let left = ms
        const tick = () => {
          if (cancelled) return reject(new Error('cancelled'))
          if (!pauseRef.current) left -= 40
          if (left <= 0) resolve()
          else setTimeout(tick, 40)
        }
        setTimeout(tick, 40)
      })
    const run = async () => {
      setView('editor')
      setPhase('starter')
      setShown(0)
      setTyped(demo.starter)
      await wait(1100)
      setPhase('typing')
      setTyped('')
      // Advance in ~frame-sized slices so short per-key delays aren't rounded up by timers.
      let i = 0
      let debt = 0
      while (i < demo.code.length) {
        await wait(FRAME)
        debt += FRAME
        while (i < demo.code.length) {
          const d = delayFor(demo.code[i - 1] ?? '', demo.code[i], i)
          if (d > debt) break
          debt -= d
          i++
        }
        setTyped(demo.code.slice(0, i))
      }
      await wait(700)
      setPhase('submitting')
      await wait(450)
      setView('results')
      setPhase('running')
      await wait(1500)
      setPhase('done')
      const n = demo.cases?.length ?? demo.result?.values.length ?? 0
      for (let i = 1; i <= n; i++) {
        await wait(140)
        setShown(i)
      }
      await wait(4800)
      setIndex(i => (i + 1) % demos.length)
    }
    run().catch(() => {})
    return () => {
      cancelled = true
    }
  }, [index, demo, demos.length, reduced])

  const pick = (i: number) => {
    if (i === index) return
    if (reduced) {
      setTyped(demos[i].code)
      setView('editor')
    }
    setIndex(i)
  }

  const lines = (phase === 'typing' || phase === 'starter' ? typed : demo.code).split('\n')
  const tokens = useMemo(() => lines.map(l => highlight(l, demo.lang)), [lines.join('\n'), demo.lang]) // eslint-disable-line react-hooks/exhaustive-deps
  const caretLine = lines.length - 1
  const total = demo.cases?.length ?? 1

  return (
    <figure ref={rootRef} className="relative m-0">
      <figcaption className="sr-only">
        Animated demo: the {LANG_LABEL[demo.lang]} problem “{demo.title}” is solved in the editor and passes its test cases.
      </figcaption>
      <div className="overflow-hidden rounded-[1.4rem] border-2 border-gm-line bg-gm-night shadow-[10px_10px_0_var(--gm-grape)]">
        {/* window bar: language switcher + pause */}
        <div className="flex h-12 items-center gap-2 border-b-2 border-gm-line bg-gm-deep/50 px-3">
          <span className="size-2 rounded-full bg-gm-lime shadow-[0_0_8px_var(--gm-lime)]" aria-hidden="true" />
          <span className="mr-1 hidden font-mono text-xs text-gm-ink-soft sm:inline">~/actuarial-edge</span>
          <div role="tablist" aria-label="Demo language" className="gm-tabs !rounded-[0.7rem] !p-0.5">
            {demos.map((d, i) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                onClick={() => pick(i)}
                className="gm-tab !min-h-7 !rounded-[0.5rem] !px-2.5 !text-xs"
              >
                {LANG_LABEL[d.lang]}
              </button>
            ))}
          </div>
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused(p => !p)}
              aria-label={paused ? 'Play demo' : 'Pause demo'}
              title={paused ? 'Play' : 'Pause'}
              className="ml-auto flex size-8 items-center justify-center rounded-[0.6rem] text-gm-ink-soft hover:bg-gm-deep hover:text-gm-ink"
            >
              {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          )}
        </div>

        {/* problem header */}
        <div className="border-b-2 border-gm-line px-5 py-4" aria-hidden="true">
          <div className="flex items-center justify-between gap-3">
            <span className="truncate font-display text-lg uppercase">{demo.title}</span>
            <DifficultyPill value={demo.difficulty} />
          </div>
          <p className="mt-1.5 line-clamp-2 min-h-10 text-sm text-gm-ink-soft">{demo.blurb}</p>
        </div>

        {/* editor / results tabs */}
        <div className="flex h-12 items-center gap-1 border-b-2 border-gm-line px-3 text-xs" aria-hidden="true">
          {(
            [
              ['editor', 'Editor', <Braces key="e" className="size-3.5" />],
              ['results', 'Results', <ListChecks key="r" className="size-3.5" />],
            ] as const
          ).map(([v, label, icon]) => (
            <button
              key={v}
              type="button"
              tabIndex={-1}
              onClick={() => {
                setView(v)
                setPaused(true)
              }}
              aria-pressed={view === v}
              className="gm-tab !min-h-8 !text-xs"
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        <div className="relative h-[260px] overflow-hidden bg-gm-void font-mono text-[12.5px] leading-[1.7]" aria-hidden="true">
          {view === 'editor' ? (
            <div className="flex h-full overflow-hidden py-3">
              <div className="w-9 shrink-0 pr-3 text-right text-gm-line select-none">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="min-w-0 flex-1 overflow-hidden pr-4 whitespace-pre">
                {tokens.map((line, i) => (
                  <div key={i} className="min-h-[1.7em]">
                    {line.map((tk, j) => (
                      <span key={j} className={clsx(tk.c, phase === 'starter' && 'opacity-60')}>
                        {tk.t}
                      </span>
                    ))}
                    {i === caretLine && (phase === 'typing' || phase === 'starter') && (
                      <span className="ml-px inline-block h-[1.15em] w-[0.55em] translate-y-[3px] animate-caret bg-gm-lime" />
                    )}
                  </div>
                ))}
              </pre>
            </div>
          ) : phase === 'running' || phase === 'submitting' ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 px-10 font-sans">
              <span className="text-sm font-semibold text-gm-ink-soft">Running {demo.cases ? `${total} test cases` : 'your query'}…</span>
              <div className="h-3 w-full max-w-xs overflow-hidden rounded-full border-2 border-gm-line bg-gm-void">
                <div className="h-full w-full origin-left animate-[demo-progress_1.5s_ease-out_forwards] rounded-full bg-gm-lime" />
              </div>
            </div>
          ) : (
            <div className="h-full overflow-hidden px-4 py-3">
              <div className="mb-3 flex items-center gap-2 font-sans">
                <CheckCircle2 className="size-4 text-gm-lime" />
                <span className="font-semibold text-gm-lime">Accepted</span>
                <span className="text-xs text-gm-ink-soft">{demo.cases ? `${demo.cases.length} / ${demo.cases.length} test cases passed` : 'Output matches the expected result'}</span>
              </div>
              {demo.cases ? (
                <ul className="space-y-1.5">
                  {demo.cases.map((c, i) => (
                    <li
                      key={i}
                      className={clsx('flex items-center gap-2 rounded-[0.6rem] border-2 border-gm-line bg-gm-night px-2.5 py-1.5 transition-all duration-300', i < shown ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0')}
                    >
                      <CheckCircle2 className="size-3.5 shrink-0 text-gm-lime" />
                      <span className="min-w-0 flex-1 truncate text-gm-ink-soft">{c.call}</span>
                      <span className="shrink-0 text-gm-cyan">→ {c.expected}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                demo.result && (
                  <div className="overflow-hidden rounded-[0.6rem] border-2 border-gm-line">
                    <table className="w-full text-left text-[11.5px]">
                      <thead className="bg-gm-deep text-gm-ink">
                        <tr>
                          {demo.result.columns.map(c => (
                            <th key={c} className="px-2.5 py-1 font-medium whitespace-nowrap">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {demo.result.values.map((row, i) => (
                          <tr key={i} className={clsx('border-t-2 border-gm-line transition-opacity duration-300', i < shown ? 'opacity-100' : 'opacity-0')}>
                            {row.map((v, j) => (
                              <td key={j} className="px-2.5 py-1 whitespace-nowrap text-gm-ink-soft tabular">
                                {String(v)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* footer */}
        <div className="flex h-14 items-center gap-2 border-t-2 border-gm-line px-3">
          <Link to={`/problems/${demo.id}`} className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-semibold text-gm-lime hover:underline">
            Try this problem
          </Link>
          <span className="ml-auto flex items-center gap-1.5" aria-hidden="true">
            <span className="btn-arcade btn-arcade-xs btn-arcade-night pointer-events-none !min-h-8">Run tests</span>
            <span
              className={clsx(
                'btn-arcade btn-arcade-xs pointer-events-none !min-h-8',
                phase === 'submitting' ? 'btn-arcade-lime translate-y-[2px] !shadow-[0_1px_0_var(--gm-lime-edge)]' : phase === 'done' ? 'btn-arcade-lime' : 'btn-arcade-grape',
              )}
            >
              {phase === 'done' ? <CheckCircle2 className="size-3" /> : <Send className="size-3" />}
              {phase === 'done' ? 'Accepted' : 'Submit'}
            </span>
          </span>
        </div>
      </div>
    </figure>
  )
}

import { Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpenCheck,
  Check,
  ChevronDown,
  CircleHelp,
  FileText,
  Flame,
  FolderGit2,
  Gift,
  Play,
  RotateCcw,
  Target,
  Timer,
  Trophy,
} from 'lucide-react'
import clsx from 'clsx'
import { useManifest } from '../data/load'
import type { Manifest } from '../data/types'
import { CodeDemo } from '../components/CodeDemo'
import { SupportButton } from '../components/Support'
import { usePageTitle } from '../lib/usePageTitle'
import { useProgress, type ProgressState } from '../state/progress'
import { readStore, writeStore } from '../state/storage'

export default function Home() {
  usePageTitle()
  const manifest = useManifest()
  const progress = useProgress()
  return (
    <>
      <Hero />
      <Tape />
      <ExamPath manifest={manifest} progress={progress} />
      <Features manifest={manifest} />
      <Faq />
      <FinalCta />
    </>
  )
}

// ---------- hero ----------
function Hero() {
  // Tall enough that the ribbon sits at the bottom of the first screen and the exam
  // section (which starts under the band, ~116 units below the ribbon's top) stays below it.
  return (
    <section className="relative isolate flex flex-col justify-center overflow-hidden" style={{ minHeight: `calc(100svh - 116 * ${RIBBON_UNIT})` }}>
      <HeroBackdrop />
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 pt-14 pb-24 sm:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:pb-32">
        <div className="text-center lg:text-left">
          <h1 className="font-display text-[2.6rem] leading-[0.98] tracking-[0.01em] uppercase sm:text-6xl lg:text-[5.25rem]">
            Find your actuarial
            <span className="mt-[0.18em] block">
              {/* Hover: the badge straightens and the mascot (layered behind it) peeks out from its right edge. */}
              <span className="group/edge relative inline-block">
                <span className="relative z-10 inline-block -rotate-3 rounded-[0.3em] bg-gm-lime px-[0.28em] pt-[0.14em] pb-[0.04em] text-[1.3em] text-gm-void shadow-[0_0.12em_0_var(--gm-lime-edge)] transition-[rotate] duration-500 ease-out-expo group-hover/edge:rotate-0">
                  Edge
                </span>
                <img
                  src={`${import.meta.env.BASE_URL}assets/mascots/peek.webp`}
                  alt=""
                  width={257}
                  height={288}
                  // The art's straight cut edge sits 8.6% in from its left; that edge lines up with the badge's side.
                  className="pointer-events-none absolute top-1/2 left-full z-0 ml-[-0.13em] h-[1.6em] w-auto max-w-none origin-left -translate-x-[45%] -translate-y-1/2 scale-50 -rotate-12 opacity-0 transition-[translate,rotate,scale,opacity] delay-100 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/edge:translate-x-0 group-hover/edge:scale-100 group-hover/edge:rotate-0 group-hover/edge:opacity-100"
                />
              </span>
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-[34rem] text-lg leading-relaxed text-pretty text-gm-ink-soft sm:text-xl lg:mx-0">
            Practise exam-style questions with worked solutions, solve code challenges in Python, R and SQL, and build portfolio projects, all made for actuarial students.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link to="/problems" className="btn-arcade btn-arcade-lime">
              <Play className="size-4 fill-current" aria-hidden="true" /> Start practising
            </Link>
            <Link to="/projects" className="btn-arcade btn-arcade-grape">
              <FolderGit2 className="size-4" aria-hidden="true" /> Start a project
            </Link>
          </div>
        </div>
        <Suspense fallback={<div className="h-[497px] rounded-[1.4rem] border-2 border-gm-line bg-gm-night" aria-hidden="true" />}>
          <CodeDemo />
        </Suspense>
      </div>
    </section>
  )
}

/** Night-sky backdrop: violet glows and a sparse star field (CSS only). */
function HeroBackdrop() {
  const stars = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => {
        const r = (n: number) => {
          const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453
          return x - Math.floor(x)
        }
        return { x: r(1) * 100, y: r(2) * 100, s: r(3) > 0.85 ? 3 : 2, o: 0.25 + r(4) * 0.6 }
      }),
    [],
  )
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]" aria-hidden="true">
      <div className="absolute -top-40 right-[-10%] size-[720px] rounded-full opacity-60 blur-3xl" style={{ background: 'radial-gradient(closest-side, var(--gm-grape), transparent)' }} />
      <div className="absolute bottom-[-30%] left-[-15%] size-[620px] rounded-full opacity-35 blur-3xl" style={{ background: 'radial-gradient(closest-side, var(--gm-grape-hi), transparent)' }} />
      {stars.map((st, i) => (
        <span key={i} className="absolute rounded-full bg-gm-ink" style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.s, height: st.s, opacity: st.o }} />
      ))}
    </div>
  )
}

// ---------- lime tape marquee ----------
const TAPE = ['Chain ladder', 'Black-Scholes', 'Kaplan–Meier', 'IFRS 17', 'Annuity-due', 'Value at risk', 'Markov chains', 'Solvency II', 'Bornhuetter–Ferguson', 'GLM pricing']

const TAPE_TEXT = TAPE.map(t => t.toUpperCase()).join('   ★   ') + '   ★   '
const TAPE_SPEED = 70 // viewBox units per second

// The ribbon SVG is max(112vw, 1100px) wide and 1600 x 200 units, so one unit in px is:
const RIBBON_UNIT = 'max(112vw, 1100px) / 1600'

/** The ribbon, drawn along a gentle curve with the words scrolling along it. */
function Tape() {
  const measure = useRef<SVGTextElement>(null)
  const [loop, setLoop] = useState(0)
  const [still] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  // One copy of the text scrolls by exactly its own length, so the loop is seamless.
  // Measured after the display font loads, since that changes the length.
  useEffect(() => {
    let live = true
    const m = () => {
      const l = measure.current?.getComputedTextLength()
      if (live && l) setLoop(l)
    }
    m()
    document.fonts?.ready.then(m)
    return () => {
      live = false
    }
  }, [])
  const text = { fontFamily: 'var(--font-display)', fontSize: 30, fill: 'var(--gm-void)', whiteSpace: 'pre' } as const
  return (
    <div className="relative z-10 -mt-12 overflow-x-clip sm:-mt-16" aria-hidden="true">
      <svg viewBox="0 0 1600 200" className="relative left-1/2 block w-[max(112%,1100px)] -translate-x-1/2">
        <defs>
          <path id="tape-curve" d="M -40 150 Q 800 20 1640 150" />
        </defs>
        <use href="#tape-curve" style={{ fill: 'none', stroke: 'var(--gm-lime-edge)', strokeWidth: 78 }} />
        <use href="#tape-curve" style={{ fill: 'none', stroke: 'var(--gm-lime)', strokeWidth: 64 }} />
        <text style={text} dominantBaseline="central">
          <textPath href="#tape-curve" startOffset="0">
            {TAPE_TEXT.repeat(3)}
            {loop > 0 && !still && <animate attributeName="startOffset" from="0" to={-loop} dur={`${loop / TAPE_SPEED}s`} repeatCount="indefinite" />}
          </textPath>
        </text>
        <text ref={measure} style={text} visibility="hidden">
          {TAPE_TEXT}
        </text>
      </svg>
    </div>
  )
}

// ---------- curved section edges ----------
/**
 * Arches a section's top or bottom edge to match the ribbon: paints the page background
 * over the corners, rising about 4% of the page width in the middle.
 */
function Arch({ edge, line }: { edge: 'top' | 'bottom'; line?: string }) {
  return (
    <svg
      viewBox="0 0 100 5"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={clsx('pointer-events-none absolute inset-x-0 h-[5vw] w-full', edge === 'top' ? '-top-px' : '-bottom-px')}
    >
      <path d={edge === 'top' ? 'M0 0 H100 V5 Q50 -3 0 5 Z' : 'M0 5 Q50 -3 100 5 Z'} style={{ fill: 'var(--gm-void)' }} />
      {line && <path d="M0 5 Q50 -3 100 5" vectorEffect="non-scaling-stroke" style={{ fill: 'none', stroke: line, strokeWidth: 2 }} />}
    </svg>
  )
}

// ---------- grape exam path ----------
// Difficulty mascots (easy, medium, hard); tiles take the colour of each mascot's glasses.
const mascot = (d: 'easy' | 'medium' | 'hard') => `${import.meta.env.BASE_URL}assets/mascots/${d}.webp`
const MASCOT_TILE = {
  easy: 'border-dif-easy-edge shadow-[0_4px_0_var(--gm-dif-easy-edge)] hover:shadow-[0_6px_0_var(--gm-dif-easy-edge)]',
  medium: 'border-dif-medium-edge shadow-[0_4px_0_var(--gm-dif-medium-edge)] hover:shadow-[0_6px_0_var(--gm-dif-medium-edge)]',
  hard: 'border-dif-hard-edge shadow-[0_4px_0_var(--gm-dif-hard-edge)] hover:shadow-[0_6px_0_var(--gm-dif-hard-edge)]',
}

type Level = 'all' | 'easy' | 'medium' | 'hard'
const LEVELS: Level[] = ['all', 'easy', 'medium', 'hard']
const LEVEL_KEY = 'ae:home-difficulty'

function ExamPath({ manifest, progress }: { manifest: Manifest; progress: ProgressState }) {
  // The chosen difficulty narrows the tiles, progress and links on every subject.
  const [level, setLevelState] = useState<Level>(() => {
    const saved = readStore<string>(LEVEL_KEY, 'all')
    return (LEVELS as string[]).includes(saved) ? (saved as Level) : 'all'
  })
  const setLevel = (l: Level) => {
    setLevelState(l)
    writeStore(LEVEL_KEY, l)
  }
  const subjects = manifest.subjects.filter(s => s.track === 'exams' && s.total)
  const rows = subjects.map(s => {
    const list = manifest.problems.filter(p => p.subject === s.id && (level === 'all' || p.difficulty === level))
    const solved = list.filter(p => progress.problems[p.id]?.status === 'solved').length
    return { s, solved, total: list.length }
  })
  const current = Math.max(0, rows.findIndex(r => r.solved < r.total))

  return (
    <section
      className="relative bg-gm-grape pb-24 sm:pb-32"
      // Starts 90 units up, behind the ribbon band (its straight top edge stays hidden under
      // the band at every width), so the colour and the dots run right up to the ribbon.
      style={{ marginTop: `calc(-90 * ${RIBBON_UNIT})`, paddingTop: `calc(90 * ${RIBBON_UNIT} + 2.5rem)` }}
    >
      <div className="gm-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <Arch edge="bottom" />
      <div className="relative container mx-auto px-4">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-4xl leading-[1.02] uppercase sm:text-[3.6rem]">
              Your exam path
              <img src={`${import.meta.env.BASE_URL}assets/mascots/education.webp`} alt="" width={64} height={63} className="ml-3 inline-block size-14 -translate-y-1 align-middle sm:size-16" />
            </h2>
            <p className="mt-4 text-sm text-gm-ink">Work through questions at your own pace, learn from the worked solutions and watch your progress grow subject by subject.</p>
          </div>
          <div className="shrink-0 self-start sm:self-auto">
            <div className="mb-2 text-sm font-semibold text-gm-ink" id="level-label">
              Select difficulty
            </div>
            <div role="group" aria-labelledby="level-label" className="gm-tabs">
              {LEVELS.map(l => (
                <button key={l} type="button" aria-pressed={level === l} onClick={() => setLevel(l)} className="gm-tab gap-1.5 capitalize">
                  {l !== 'all' && <img src={mascot(l)} alt="" width={24} height={24} className="-my-1 size-6" />}
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ol className="relative mt-16 space-y-14">
          <span className="absolute start-[26px] top-2 bottom-2 w-2 -translate-x-1/2 rounded-full bg-gm-grape-edge sm:start-[36px]" aria-hidden="true" />
          {rows.map(({ s, solved, total }, i) => {
            const done = total > 0 && solved >= total
            const isCurrent = i === current
            const exam = manifest.exams.find(e => e.subject === s.id && e.society === 'IFoA')
            return (
              <li key={s.id} className="relative flex gap-5 sm:gap-8">
                <span
                  className={clsx(
                    'relative z-10 flex size-[52px] shrink-0 items-center justify-center rounded-full border-4 sm:size-[72px]',
                    done ? 'border-gm-lime-edge bg-gm-lime text-gm-void' : 'border-gm-ink bg-gm-night text-gm-ink',
                    isCurrent && !done && 'outline-4 outline-offset-4 outline-gm-lime',
                  )}
                  aria-hidden="true"
                >
                  {done ? <Check className="size-6" strokeWidth={3} /> : <BookOpenCheck className="size-5 sm:size-6" />}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <span className="font-mono text-gm-ink tabular">{String(i + 1).padStart(2, '0')}</span>
                      <span className="rounded-md bg-gm-lime px-2 py-0.5 font-mono text-xs font-bold text-gm-void">{s.code}</span>
                      <span className="flex items-center gap-1 font-semibold">
                        <Trophy className="size-3.5" aria-hidden="true" /> {solved}/{total}
                      </span>
                    </div>
                    <h3 className={clsx('mt-2 font-display text-2xl leading-tight uppercase sm:text-[2.5rem]', isCurrent ? 'text-gm-ink' : 'text-gm-ink/70')}>
                      <Link to={level !== 'all' ? `/problems?subject=${s.id}&difficulty=${level}` : exam ? `/exams/${exam.id}` : `/problems?subject=${s.id}`} className="hover:text-gm-lime">
                        {s.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-base text-gm-ink sm:text-lg">{s.topics.slice(0, 3).join(' · ')}</p>
                    <div className="mt-5 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-gm-grape-edge" role="progressbar" aria-valuenow={solved} aria-valuemax={total} aria-label={`${s.code} progress`}>
                      <div className="h-full rounded-full bg-gm-lime" style={{ width: `${total ? (solved / total) * 100 : 0}%` }} />
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-3">
                    {(['easy', 'medium', 'hard'] as const).filter(d => level === 'all' || d === level).map(d => (
                      <Link
                        key={d}
                        to={`/problems?subject=${s.id}&difficulty=${d}`}
                        title={`${s.code} ${d} problems`}
                        aria-label={`${s.code}: ${s[d]} ${d} problems`}
                        className={clsx(
                          'flex w-16 flex-col items-center rounded-2xl border-2 bg-gm-night px-1 pt-1 pb-1.5 transition-[transform,box-shadow] duration-150 ease-out-expo hover:-translate-y-0.5',
                          MASCOT_TILE[d],
                        )}
                      >
                        <img src={mascot(d)} alt="" width={48} height={48} loading="lazy" decoding="async" className="size-12" />
                        <span className="font-sans text-[11px] font-bold text-gm-ink tabular">{s[d]}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

// ---------- features ----------
function Features({ manifest }: { manifest: Manifest }) {
  const exams = manifest.exams.filter(e => e.total > 0 && e.society === 'IFoA').slice(0, 4)
  const tileTones = ['border-gm-cyan text-gm-cyan', 'border-gm-coral text-gm-coral', 'border-gm-gold text-gm-gold', 'border-gm-lime text-gm-lime']
  const projects = manifest.projects.slice(0, 3)
  const projectTones = ['bg-gm-cyan/12 text-gm-cyan', 'bg-gm-gold/12 text-gm-gold', 'bg-gm-coral/12 text-gm-coral']
  return (
    <section className="container mx-auto px-4 py-24 sm:py-32">
      <h2 className="font-display text-4xl uppercase sm:text-[3.6rem]">What’s inside</h2>
      <div className="mt-16 space-y-24">
        <FeatureRow
          title="Learn by coding"
          body={`Solve ${(manifest.languages.python ?? 0) + (manifest.languages.r ?? 0) + (manifest.languages.sql ?? 0)} real actuarial problems in Python, R and SQL right here on the page. Write your answer, press run and see instantly what works.`}
          link={{ to: '/code', label: 'Code', icon: <Play className="size-4" /> }}
          card={
            <div className="overflow-hidden rounded-[1.6rem] border-2 border-gm-line bg-gm-night p-6 font-mono text-[13px] leading-[1.7] shadow-[12px_12px_0_0_var(--gm-lime)] transition-transform duration-500 ease-out-expo -rotate-2 hover:rotate-0">
              <div><span className="text-gm-lime">$</span> submit max_drawdown.py</div>
              <div className="text-gm-coral">✗ case 2: expected -0.19, got -0.1</div>
              <div><span className="text-gm-lime">$</span> submit max_drawdown.py</div>
              <div className="text-gm-lime">✓ Accepted · 5 / 5 test cases passed</div>
              <div className="mt-1"><span className="text-gm-lime">$</span> <span className="inline-block h-4 w-2 translate-y-0.5 animate-caret bg-gm-lime" /></div>
            </div>
          }
        />
        <FeatureRow
          flip
          title="Mock exams"
          body="Twenty timed questions from one subject, a navigator, flags, and a score by topic at the end. What you miss goes straight into your review queue."
          link={{ to: '/exams', label: 'Exams', icon: <Timer className="size-4" /> }}
          card={
            <div className="rounded-[1.6rem] border-2 border-gm-line bg-gm-night p-5 shadow-[12px_12px_0_0_var(--gm-coral)] transition-transform duration-500 ease-out-expo rotate-2 hover:rotate-0">
              <div className="grid grid-cols-2 gap-3">
                {exams.map((e, i) => (
                  <Link key={e.id} to={`/exams/${e.id}`} className={clsx('rounded-2xl border-2 bg-gm-void/60 p-4 transition-colors hover:bg-gm-deep', tileTones[i % 4])}>
                    <Target className="size-5" aria-hidden="true" />
                    <div className="mt-3 font-semibold text-gm-ink">{e.code}</div>
                    <div className="mt-1 flex items-center gap-1 text-xs font-bold">
                      <Gift className="size-3.5" aria-hidden="true" /> {e.total} questions
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          }
        />
        <FeatureRow
          title="CV builder"
          body="Fill in a form and the template completes itself. Download a clean, ATS-readable PDF built right in your browser."
          link={{ to: '/careers/cv-builder', label: 'CV builder', icon: <FileText className="size-4" /> }}
          card={
            <div className="relative rounded-[1.6rem] border-2 border-gm-line bg-gm-night p-6 shadow-[12px_12px_0_0_var(--gm-gold)] transition-transform duration-500 ease-out-expo -rotate-2 hover:rotate-0">
              <div className="rotate-1 rounded-lg bg-white p-5 font-serif text-[9px] leading-snug text-black shadow-lg">
                <div className="text-center text-base font-bold">Mia Baddison</div>
                <div className="text-center text-[8px] text-neutral-600">mia@example.com | linkedin.com/in/mia</div>
                <div className="mt-2 border-b border-black pb-0.5 text-[10px] tracking-wide uppercase">Experience</div>
                <div className="mt-1 flex justify-between font-bold"><span>Sanlam</span><span className="font-normal">2025 – Present</span></div>
                <div>• Built a lapse model in R, cutting review time by <b>30%</b>.</div>
                <div className="mt-2 border-b border-black pb-0.5 text-[10px] tracking-wide uppercase">Skills</div>
                <div><b>Technical:</b> Python, R, SQL</div>
              </div>
            </div>
          }
        />
        <FeatureRow
          flip
          title="Portfolio projects"
          body="Build the kind of models actuaries use at work, from a reserving engine to an option pricer. Each project comes with full source code, the theory behind it and CV bullet points you can make your own."
          link={{ to: '/projects', label: 'Projects', icon: <FolderGit2 className="size-4" /> }}
          card={
            <div className="overflow-hidden rounded-[1.6rem] border-2 border-gm-line bg-gm-night shadow-[12px_12px_0_0_var(--gm-grape)] transition-transform duration-500 ease-out-expo rotate-2 hover:rotate-0">
              <div className="flex items-center gap-2 border-b-2 border-gm-line px-5 py-3 font-mono text-xs text-gm-ink-soft">
                <span className="size-2.5 rounded-full bg-gm-lime" aria-hidden="true" /> ~/projects
              </div>
              <ul className="divide-y-2 divide-gm-line">
                {projects.map((pr, i) => (
                  <li key={pr.slug}>
                    <Link to={`/projects/${pr.slug}`} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gm-deep">
                      <span className={clsx('flex size-9 shrink-0 items-center justify-center rounded-xl', projectTones[i % 3])} aria-hidden="true">
                        <FolderGit2 className="size-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-gm-ink">{pr.title}</span>
                        <span className="block truncate text-xs text-gm-ink-dim">{[pr.area, pr.level].filter(Boolean).join(' · ')}</span>
                      </span>
                      <span className="gm-chip hidden shrink-0 bg-gm-grape text-gm-ink sm:inline-flex">{pr.stack?.[0] ?? 'Python'}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          }
        />
        <FeatureRow
          title="Spaced review"
          body="Questions you miss come back the same day, then after 1, 3, 7 and 21 days until they stick. Your streak and year heatmap keep you honest."
          link={{ to: '/progress', label: 'Progress', icon: <RotateCcw className="size-4" /> }}
          card={
            <div className="rounded-[1.6rem] border-2 border-gm-line bg-gm-night p-6 shadow-[12px_12px_0_0_var(--gm-cyan)] transition-transform duration-500 ease-out-expo -rotate-2 hover:rotate-0" aria-hidden="true">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Flame className="size-4 text-gm-gold" /> 12-day streak
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-hidden">
                {Array.from({ length: 7 * 24 }, (_, i) => {
                  const x = Math.sin(i * 12.9898) * 43758.5453
                  const r = x - Math.floor(x)
                  const c = r < 0.4 ? 'var(--gm-deep)' : r < 0.6 ? 'var(--gm-grape-edge)' : r < 0.78 ? 'var(--gm-grape)' : r < 0.92 ? 'var(--gm-grape-hi)' : 'var(--gm-lime)'
                  return <span key={i} className="size-[11px] rounded-[3px]" style={{ background: c }} />
                })}
              </div>
            </div>
          }
        />
      </div>
    </section>
  )
}

function FeatureRow({ title, body, link, card, flip }: { title: string; body: string; link: { to: string; label: string; icon: ReactNode }; card: ReactNode; flip?: boolean }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className={clsx('min-w-0', flip && 'lg:order-2')}>{card}</div>
      <div className={clsx('min-w-0', flip && 'lg:order-1')}>
        <h3 className="font-display text-3xl uppercase sm:text-[2.2rem]">{title}</h3>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-gm-ink-soft">{body}</p>
        <Link to={link.to} className="btn-arcade btn-arcade-xs btn-arcade-night mt-6">
          <span className="text-gm-lime [&>svg]:size-4" aria-hidden="true">
            {link.icon}
          </span>
          {link.label}
        </Link>
      </div>
    </div>
  )
}

// ---------- FAQ ----------
const FAQ = [
  ['Is it really free?', 'Yes. Every question, code challenge, project and template is free. There is no paywall and no trial. If it helps you, you can support the site with a coffee, but you never have to.'],
  ['Which exams does it cover?', 'Questions are mapped to IFoA Core Principles subjects (CS1, CS2, CM1, CM2, CB1, CB2) and their ASSA equivalents (A111–A214). Specialist subjects are on the roadmap and are marked as coming soon.'],
  ['Will this get me a job?', 'Nobody can promise that. The projects and CV guidance were put together with input from practising actuaries, and practice like this helps you stand out in exams, assessments and technical interviews.'],
]

function Faq() {
  return (
    <section className="container mx-auto max-w-3xl px-4 pb-24 sm:pb-32">
      <h2 className="font-display text-3xl uppercase sm:text-[2.6rem]">Questions</h2>
      <div className="mt-8 divide-y-2 divide-gm-line overflow-hidden rounded-[1.4rem] border-2 border-gm-line bg-gm-night">
        {FAQ.map(([q, a]) => (
          <details key={q} className="group">
            <summary className="flex list-none items-center gap-3 px-5 py-4 font-semibold transition-colors hover:bg-gm-deep [&::-webkit-details-marker]:hidden">
              <CircleHelp className="size-5 shrink-0 text-gm-grape-hi" aria-hidden="true" />
              <span className="flex-1">{q}</span>
              <ChevronDown className="size-5 shrink-0 text-gm-ink-dim transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="px-5 pb-5 pl-[3.25rem] leading-relaxed text-gm-ink-soft">{a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

// ---------- final CTA ----------
const WATERMARK = ['CS1 ★ CM2 ★ IFRS 17 ★ CHAIN LADDER', 'BLACK-SCHOLES ★ A211 ★ VAR ★ GLM ★ SQL', 'ANNUITIES ★ MARKOV ★ RESERVES ★ R']

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-gm-night py-28 sm:py-36">
      <Arch edge="top" line="var(--gm-line)" />
      <div className="pointer-events-none absolute inset-y-0 -inset-x-[10%] -z-10 flex -rotate-6 flex-col justify-center gap-6 opacity-[0.07] select-none" aria-hidden="true">
        {/* Each row holds two identical copies and slides by one copy, so the loop is seamless. Rows alternate direction. */}
        {WATERMARK.map((w, i) => (
          <div
            key={i}
            className={clsx('flex w-max motion-reduce:animate-none', i % 2 ? 'animate-marquee-reverse' : 'animate-marquee')}
            style={{ animationDuration: `${70 + i * 15}s` }}
          >
            {[0, 1].map(copy => (
              <span key={copy} className="shrink-0 pr-[0.35em] font-display text-7xl whitespace-nowrap text-gm-ink sm:text-8xl">
                {w} ★ {w} ★
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="container mx-auto px-4 text-center">
        <h2 className="mx-auto max-w-4xl font-display text-5xl leading-none text-balance uppercase sm:text-[5rem]">Level up your actuarial skills</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-gm-ink-soft">Every problem you solve sharpens the skills you use at work and in the exam room. Pick one, work it through, learn from the solution and come back a better actuary.</p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link to="/problems" className="btn-arcade btn-arcade-lime">
            <Play className="size-4 fill-current" aria-hidden="true" /> Start practising
          </Link>
          <Link to="/projects" className="btn-arcade btn-arcade-grape">
            <FolderGit2 className="size-4" aria-hidden="true" /> Projects
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm text-gm-ink-dim">
          <p>Free and kept alive by its sponsors.</p>
          <SupportButton />
        </div>
      </div>
    </section>
  )
}

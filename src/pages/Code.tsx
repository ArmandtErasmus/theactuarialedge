import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Database, Terminal } from 'lucide-react'
import { useManifest } from '../data/load'
import type { Lang } from '../data/types'
import { LANG_LABEL } from '../data/labels'
import { Container, IconTile, PageHeader, ProgressBar, Segmented } from '../components/ui'
import clsx from 'clsx'
import { ProblemTable } from '../components/ProblemTable'
import { useProgress } from '../state/progress'
import { usePageTitle } from '../lib/usePageTitle'

const TONE: Record<Lang, string> = {
  python: 'border-gm-cyan-edge shadow-[0_6px_0_var(--gm-cyan-edge)]',
  r: 'border-gm-grape-hi shadow-[0_6px_0_var(--gm-grape)]',
  sql: 'border-gm-gold-edge shadow-[0_6px_0_var(--gm-gold-edge)]',
}
const TILE: Record<Lang, 'cyan' | 'grape' | 'gold'> = { python: 'cyan', r: 'grape', sql: 'gold' }

const BLURB: Record<Lang, string> = {
  python: 'Maths puzzles, pricing and reserving functions, and data work with pandas.',
  r: 'The same actuarial toolkit, written in R.',
  sql: 'Ask questions of policy, claims and customer data.',
}

export default function Code() {
  usePageTitle('Code')
  const manifest = useManifest()
  const progress = useProgress()
  const [params, setParams] = useSearchParams()
  const lang = (['python', 'r', 'sql'].includes(params.get('lang') ?? '') ? params.get('lang') : 'python') as Lang
  const subjects = useMemo(() => new Map(manifest.subjects.map(s => [s.id, s])), [manifest])
  const inLang = useMemo(() => manifest.problems.filter(p => p.kind === 'code' && p.subject === lang), [manifest, lang])
  // Topic chips use each problem's main topic (Finance, Maths, Pandas, Joins...).
  const topics = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of inLang) if (p.topics[0]) counts.set(p.topics[0], (counts.get(p.topics[0]) ?? 0) + 1)
    return [...counts]
  }, [inLang])
  const topic = topics.some(([t]) => t === params.get('topic')) ? params.get('topic') : null
  const problems = topic ? inLang.filter(p => p.topics[0] === topic) : inLang
  const setLang = (l: Lang) => setParams(l === 'python' ? {} : { lang: l }, { replace: true })
  const setTopic = (t: string | null) => setParams(() => ({ ...(lang !== 'python' && { lang }), ...(t && { topic: t }) }), { replace: true })

  return (
    <Container className="py-14">
      <PageHeader
        title="Code challenges"
        description="Practise the coding side of the job until it feels natural. Work through problems from easy to hard, check your answer instantly, compare it with a worked solution and watch your progress build in each language."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {(['python', 'r', 'sql'] as Lang[]).map(l => {
          const list = manifest.problems.filter(p => p.kind === 'code' && p.subject === l)
          const solved = list.filter(p => progress.problems[p.id]?.status === 'solved').length
          return (
            <button
              key={l}
              type="button"
              aria-pressed={lang === l}
              onClick={() => setLang(l)}
              className={clsx(
                'flex flex-col rounded-[1.4rem] border-2 bg-gm-night p-5 text-left transition-[transform,box-shadow,border-color] duration-150 ease-out-expo hover:-translate-y-1',
                lang === l ? TONE[l] : 'border-gm-line shadow-[0_5px_0_var(--gm-line)] hover:border-gm-grape-hi',
              )}
            >
              <span className="flex items-center gap-3">
                <IconTile tone={TILE[l]}>{l === 'sql' ? <Database className="size-5" /> : <Terminal className="size-5" />}</IconTile>
                <span className="font-display text-xl uppercase">{LANG_LABEL[l]}</span>
              </span>
              <span className="mt-4 text-sm leading-relaxed text-gm-ink-soft">{BLURB[l]}</span>
              <span className="mt-5 mb-2 text-sm font-bold text-gm-gold tabular">
                {solved}/{list.length} <span className="font-semibold text-gm-ink-dim">solved</span>
              </span>
              <ProgressBar value={solved} max={list.length} label={`${LANG_LABEL[l]} progress`} />
            </button>
          )
        })}
      </div>
      <div className="mt-14 mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold">{LANG_LABEL[lang]} problems</h2>
        <Segmented
          label="Language"
          size="sm"
          value={lang}
          onChange={setLang}
          options={(['python', 'r', 'sql'] as Lang[]).map(l => ({ value: l, label: LANG_LABEL[l] }))}
        />
      </div>
      {topics.length > 1 && (
        <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Topic">
          {[[null, inLang.length] as const, ...topics].map(([t, count]) => (
            <button
              key={t ?? 'all'}
              type="button"
              aria-pressed={topic === t}
              onClick={() => setTopic(t)}
              className={clsx(
                'inline-flex h-9 items-center gap-2 rounded-[0.85rem] border-2 px-3.5 text-sm font-semibold transition-colors duration-150',
                topic === t ? 'border-gm-grape-edge bg-gm-grape text-gm-ink' : 'border-gm-line bg-gm-night text-gm-ink-soft hover:border-gm-grape-hi hover:text-gm-ink',
              )}
            >
              {t ?? 'All'}
              <span className="text-xs text-gm-ink-dim tabular">{count}</span>
            </button>
          ))}
        </div>
      )}
      <ProblemTable problems={problems} subjects={subjects} progress={progress} contextLabel={`${topic ? `${topic} · ` : ''}${LANG_LABEL[lang]} problems`} showSubject={false} />
    </Container>
  )
}

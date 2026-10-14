import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BookOpenCheck, Lock, Play, Trophy } from 'lucide-react'
import { useManifest } from '../data/load'
import type { Exam } from '../data/types'
import { Container, PageHeader, ProgressBar, Segmented } from '../components/ui'
import { ArcadeCard, LockedCard, TONES } from '../components/ArcadeCard'
import { useProgress } from '../state/progress'
import { usePageTitle } from '../lib/usePageTitle'

export default function Exams() {
  usePageTitle('Exams')
  const manifest = useManifest()
  const progress = useProgress()
  const [params, setParams] = useSearchParams()
  const society = (params.get('society') === 'ASSA' ? 'ASSA' : 'IFoA') as Exam['society']

  const solvedByExam = useMemo(() => {
    const out: Record<string, number> = {}
    for (const p of manifest.problems) {
      if (progress.problems[p.id]?.status !== 'solved') continue
      for (const e of p.exams) out[e] = (out[e] ?? 0) + 1
    }
    return out
  }, [manifest, progress])

  const stages = useMemo(() => {
    const map = new Map<string, Exam[]>()
    for (const e of manifest.exams.filter(e => e.society === society)) map.set(e.stage, [...(map.get(e.stage) ?? []), e])
    return [...map]
  }, [manifest, society])

  let n = 0
  return (
    <Container className="max-w-6xl py-14">
      <PageHeader
        title={`${society} exams`}
        description="Pick your exam and start practising. Work through questions at your own pace, learn from the worked solutions and watch your progress grow subject by subject."
        actions={
          <Segmented
            label="Actuarial society"
            value={society}
            onChange={v => setParams(v === 'IFoA' ? {} : { society: v }, { replace: true })}
            options={[
              { value: 'IFoA', label: 'IFoA' },
              { value: 'ASSA', label: 'ASSA' },
            ]}
          />
        }
      />
      <div className="mt-12 space-y-12">
        {stages.map(([stage, exams]) => (
          <section key={stage} aria-labelledby={`stage-${stage}`}>
            <h2 id={`stage-${stage}`} className="mb-5 text-xl font-bold">
              {stage}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {exams.map(e => {
                if (!e.total)
                  return <LockedCard key={e.id} icon={<Lock />} title={e.code} subtitle={e.name} note="Coming soon" />
                const solved = solvedByExam[e.id] ?? 0
                const tone = TONES[n++ % TONES.length]
                return (
                  <ArcadeCard
                    key={e.id}
                    to={`/exams/${e.id}`}
                    tone={tone}
                    icon={<BookOpenCheck />}
                    title={e.code}
                    subtitle={e.name}
                    chip={<span className="gm-chip bg-gm-grape text-gm-ink">{e.society}</span>}
                    footer={
                      <>
                        <span className="flex items-center gap-1.5 font-bold text-gm-gold tabular">
                          <Trophy className="size-4" aria-hidden="true" /> {solved}/{e.total}
                          <span className="font-semibold text-gm-ink-dim">solved</span>
                        </span>
                        <span className="flex items-center gap-1 font-bold text-gm-lime">
                          <Play className="size-4 fill-current" aria-hidden="true" /> Practise
                        </span>
                      </>
                    }
                  >
                    <ProgressBar value={solved} max={e.total} label={`${e.code} progress`} />
                  </ArcadeCard>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </Container>
  )
}

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useManifest } from '../data/load'
import { Badge, Container, EmptyState, PageHeader } from '../components/ui'
import { usePageTitle } from '../lib/usePageTitle'

export const asset = (p?: string) => (p ? `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}` : undefined)

const RIM = [
  'border-gm-cyan-edge shadow-[0_6px_0_var(--gm-cyan-edge)] hover:shadow-[0_9px_0_var(--gm-cyan-edge)]',
  'border-gm-grape-hi shadow-[0_6px_0_var(--gm-grape)] hover:shadow-[0_9px_0_var(--gm-grape)]',
  'border-gm-lime-edge shadow-[0_6px_0_var(--gm-lime-edge)] hover:shadow-[0_9px_0_var(--gm-lime-edge)]',
  'border-gm-coral-edge shadow-[0_6px_0_var(--gm-coral-edge)] hover:shadow-[0_9px_0_var(--gm-coral-edge)]',
]

export default function Projects() {
  usePageTitle('Projects')
  const { projects } = useManifest()
  return (
    <Container className="py-14">
      <PageHeader
        title="Projects"
        description="Industry-style projects with full source code, the theory behind them, interview questions and CV bullet points you can adapt."
      />
      {projects.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="Projects are on their way">Check back soon.</EmptyState>
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className={`group flex flex-col overflow-hidden rounded-[1.4rem] border-2 bg-gm-night transition-[transform,box-shadow] duration-150 ease-out-expo hover:-translate-y-1 ${RIM[i % RIM.length]}`}
            >
              <div className="aspect-[16/9] overflow-hidden border-b-2 border-gm-line bg-gm-void">
                {p.image && (
                  <img
                    src={asset(p.image)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 font-mono text-xs text-gm-ink-soft">
                  {p.area && <span>{p.area}</span>}
                  {p.level && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{p.level}</span>
                    </>
                  )}
                </div>
                <h2 className="mt-2 text-lg font-bold group-hover:text-gm-lime">{p.title}</h2>
                {p.summary && <p className="mt-2 mb-5 text-sm leading-relaxed text-gm-ink-soft">{p.summary}</p>}
                <div className="mt-auto flex flex-wrap items-center gap-1.5 border-t-2 border-gm-line pt-4">
                  {(p.stack ?? []).slice(0, 4).map(s => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                  <ArrowRight className="ml-auto size-5 text-gm-lime transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Container>
  )
}

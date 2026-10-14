import { Link } from 'react-router-dom'
import { ArrowRight, FileText, PenLine } from 'lucide-react'
import { useManifest } from '../data/load'
import { Container, EmptyState, PageHeader } from '../components/ui'
import { usePageTitle } from '../lib/usePageTitle'

const ORDER = ['CV', 'Careers', 'Qualification']
const HEADINGS: Record<string, string> = { CV: 'CVs that pass screening', Careers: 'Careers', Qualification: 'Qualifying as an actuary' }

export default function Careers() {
  usePageTitle('Careers')
  const { guides } = useManifest()
  // Template guides are superseded by the CV builder, so the lists skip them.
  const groups = ORDER.map(c => [c, guides.filter(g => !g.download && (g.category ?? 'Careers') === c)] as const).filter(([, list]) => list.length)

  return (
    <Container className="py-14">
      <PageHeader
        title="Get hired"
        description="Build a recruiter-ready CV and read practical guides on qualifying, specialising and breaking into actuarial work."
        actions={
          <Link to="/past-papers" className="btn-arcade btn-arcade-sm btn-arcade-night">
            Past exam papers
          </Link>
        }
      />
      <Link
        to="/careers/cv-builder"
        className="group gm-dots relative mt-12 flex flex-col gap-5 overflow-hidden rounded-[1.4rem] border-2 border-gm-grape-hi bg-gm-grape p-6 shadow-[0_8px_0_var(--gm-grape-edge)] transition-transform duration-150 ease-out-expo hover:-translate-y-1 sm:flex-row sm:items-center sm:p-8"
      >
        <span className="relative flex size-14 shrink-0 -rotate-6 items-center justify-center rounded-2xl border-2 border-gm-lime-edge bg-gm-lime text-gm-void shadow-[0_5px_0_var(--gm-lime-edge)]" aria-hidden="true">
          <PenLine className="size-6" />
        </span>
        <span className="relative flex-1">
          <span className="block font-display text-2xl uppercase">Build your CV online</span>
          <span className="mt-2 block text-sm leading-relaxed text-gm-ink">
            Type your details and watch the template fill itself in, then download a finished, ATS-readable PDF.
          </span>
        </span>
        <span className="btn-arcade btn-arcade-sm btn-arcade-lime relative self-start sm:self-center">
          Open the CV builder
        </span>
      </Link>
      {groups.length === 0 && (
        <div className="mt-10">
          <EmptyState title="Guides are on their way" />
        </div>
      )}
      {groups.map(([cat, list]) => (
        <section key={cat} className="mt-14" aria-labelledby={`cat-${cat}`}>
          <h2 id={`cat-${cat}`} className="mb-5 text-xl font-bold">
            {HEADINGS[cat] ?? cat}
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.map(g => (
              <Link key={g.slug} to={`/careers/${g.slug}`} className="group flex flex-col rounded-[1.4rem] border-2 border-gm-line bg-gm-night p-5 shadow-[0_5px_0_var(--gm-line)] transition-[transform,border-color,box-shadow] duration-150 ease-out-expo hover:-translate-y-1 hover:border-gm-grape-hi hover:shadow-[0_8px_0_var(--gm-grape)]">
                <span className="flex size-11 items-center justify-center rounded-xl bg-gm-grape/30 text-gm-grape-hi" aria-hidden="true">
                  <FileText className="size-5" />
                </span>
                <h3 className="mt-4 font-bold group-hover:text-gm-lime">{g.title}</h3>
                {g.summary && <p className="mt-1.5 mb-5 text-sm leading-relaxed text-gm-ink-soft">{g.summary}</p>}
                <div className="mt-auto flex items-center justify-between border-t-2 border-gm-line pt-3 text-sm font-semibold text-gm-ink-dim">
                  <span>{g.readingTime}</span>
                  <ArrowRight className="size-5 text-gm-lime transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </Container>
  )
}

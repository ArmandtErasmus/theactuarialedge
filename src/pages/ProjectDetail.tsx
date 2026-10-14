import { use } from 'react'
import { useParams } from 'react-router-dom'
import { Download } from 'lucide-react'
import { loadProject, useManifest } from '../data/load'
import { Badge, ButtonLink, Card, Container, EmptyState } from '../components/ui'
import { DocPage } from '../components/DocPage'
import { usePageTitle } from '../lib/usePageTitle'
import { asset } from './Projects'

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const { projects } = useManifest()
  const meta = projects.find(p => p.slug === slug)
  usePageTitle(meta?.title ?? 'Project not found')
  if (!meta)
    return (
      <Container className="py-24">
        <EmptyState title="Project not found" action={<ButtonLink to="/projects">All projects</ButtonLink>} />
      </Container>
    )
  return <ProjectBody slug={slug} />
}

function ProjectBody({ slug }: { slug: string }) {
  const p = use(loadProject(slug))
  const download = (
    <Card className="p-5">
      <div className="font-bold">Project brief</div>
      <p className="mt-1 text-sm text-gm-ink-soft">The full write-up: theory, code listings and how to build it, as a PDF.</p>
      {p.download && (
        <a
          href={asset(p.download)}
          target="_blank"
          rel="noopener"
          className="btn-arcade btn-arcade-sm btn-arcade-lime mt-4 w-full"
        >
          <Download className="size-4" aria-hidden="true" /> Open brief (PDF)
        </a>
      )}
    </Card>
  )
  return (
    <DocPage
      back={{ to: '/projects', label: 'All projects' }}
      eyebrow={[p.area, p.level].filter(Boolean).join(' · ')}
      title={p.title}
      summary={p.summary}
      meta={
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-1.5">
            {(p.stack ?? []).map(s => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
          {p.image && (
            <img src={asset(p.image)} alt={`Screenshot of ${p.title}`} className="w-full rounded-[1.4rem] border-2 border-gm-line shadow-[0_6px_0_var(--gm-line)]" decoding="async" />
          )}
          <div className="lg:hidden">{download}</div>
        </div>
      }
      aside={download}
      body={p.body}
    />
  )
}

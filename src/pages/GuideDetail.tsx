import { use } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Download, PenLine } from 'lucide-react'
import { loadGuide, useManifest } from '../data/load'
import { ButtonLink, Card, Container, EmptyState } from '../components/ui'
import { DocPage } from '../components/DocPage'
import { usePageTitle } from '../lib/usePageTitle'
import { asset } from './Projects'

export default function GuideDetail() {
  const { slug = '' } = useParams()
  const { guides } = useManifest()
  const meta = guides.find(g => g.slug === slug)
  usePageTitle(meta?.title ?? 'Guide not found')
  if (!meta)
    return (
      <Container className="py-24">
        <EmptyState title="Guide not found" action={<ButtonLink to="/careers">All guides</ButtonLink>} />
      </Container>
    )
  return <GuideBody slug={slug} />
}

function GuideBody({ slug }: { slug: string }) {
  const g = use(loadGuide(slug))
  const template = g.download ? (
    <Card className="p-5">
      <div className="font-bold">Template</div>
      {g.image && <img src={asset(g.image)} alt={`Preview of the ${g.title}`} className="mt-3 w-full rounded-[1rem] border-2 border-gm-line" loading="lazy" />}
      <a href={asset(g.download)} download className="btn-arcade btn-arcade-sm btn-arcade-lime mt-4 w-full">
        <Download className="size-4" aria-hidden="true" /> Download template
      </a>
      <Link to="/careers/cv-builder" className="btn-arcade btn-arcade-sm btn-arcade-grape mt-4 w-full">
        <PenLine className="size-4" aria-hidden="true" /> Fill it in online
      </Link>
    </Card>
  ) : null
  return (
    <DocPage
      back={{ to: '/careers', label: 'Careers' }}
      eyebrow={[g.category, g.readingTime].filter(Boolean).join(' · ')}
      title={g.title}
      summary={g.summary}
      meta={template && <div className="lg:hidden">{template}</div>}
      aside={template}
      body={g.body}
    />
  )
}

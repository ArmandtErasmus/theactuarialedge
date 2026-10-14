import { ExternalLink } from 'lucide-react'
import { Card, Container, PageHeader } from '../components/ui'
import { usePageTitle } from '../lib/usePageTitle'

const SOURCES = [
  {
    society: 'IFoA',
    name: 'Institute and Faculty of Actuaries',
    url: 'https://actuaries.org.uk/qualify/my-exams/past-exam-papers-and-examiners-reports/',
    body: 'Past papers and examiners’ reports for CS, CM, CB, CP, SP and SA subjects. Since October 2025 they are on the IFoA Virtual Learning Environment (VLE), which needs a free student or member login.',
  },
  {
    society: 'ASSA',
    name: 'Actuarial Society of South Africa',
    url: 'https://www.actuarialsociety.org.za/document-category/past-paper/',
    body: 'Past papers and reports for ASSA-set subjects (A211, A213, A311, N211 and the F-series fellowship subjects). For A111–A214 subjects set jointly with the IFoA, ASSA points to the IFoA papers.',
  },
]

export default function PastPapers() {
  usePageTitle('Past papers')
  return (
    <Container className="py-14">
      <PageHeader
        title="Past papers"
        description="Past papers and examiners’ reports are published by the societies themselves. We link to the official source rather than re-hosting copies, so you always get the latest versions and mark schemes."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {SOURCES.map((s, i) => (
          <Card key={s.society} className={`flex flex-col p-6 ${i ? 'border-gm-cyan-edge shadow-[0_6px_0_var(--gm-cyan-edge)]' : 'border-gm-grape-hi shadow-[0_6px_0_var(--gm-grape)]'}`}>
            <span className="gm-chip self-start bg-gm-grape text-gm-ink">{s.society}</span>
            <h2 className="mt-3 text-xl font-bold">{s.name}</h2>
            <p className="mt-2 mb-6 text-sm leading-relaxed text-gm-ink-soft">{s.body}</p>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-arcade btn-arcade-sm btn-arcade-lime mt-auto self-start"
            >
              Open {s.society} past papers <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </Card>
        ))}
      </div>
      <Card lift={false} className="mt-10 bg-gm-void p-6">
        <h2 className="font-display text-lg uppercase">How to use past papers well</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-gm-ink-soft marker:text-gm-lime">
          <li>Sit at least two full papers under timed conditions in the final month before the exam.</li>
          <li>Mark yourself against the examiners’ report, not just the answer. The reports explain where marks are won and lost.</li>
          <li>Topics you drop marks on: drill them here with the topic filter on the Problems page, then retry.</li>
        </ul>
      </Card>
    </Container>
  )
}

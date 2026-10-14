import { Link } from 'react-router-dom'
import type { Exam, Question, Subject } from '../../data/types'
import { TYPE_LABEL } from '../../data/labels'
import { Badge, DifficultyPill } from '../ui'
import { StatusIcon } from '../ProblemTable'

export function QuestionHeader({
  question,
  subject,
  exams,
  status,
  hideTitle = false,
}: {
  question: Question
  subject?: Subject
  exams: Exam[]
  status?: 'solved' | 'attempted'
  hideTitle?: boolean
}) {
  const examTags = question.exams.map(id => exams.find(e => e.id === id)).filter(Boolean) as Exam[]
  return (
    <div>
      {!hideTitle && (
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-2xl leading-tight uppercase">
            <span className="mr-2 font-mono text-base text-gm-ink-dim">{String(question.n).padStart(2, '0')}</span>
            {question.title}
          </h2>
          <span className="mt-1.5">
            <StatusIcon status={status} />
          </span>
        </div>
      )}
      <div className={hideTitle ? 'flex flex-wrap items-center gap-2' : 'mt-3 flex flex-wrap items-center gap-2'}>
        {hideTitle && <StatusIcon status={status} />}
        <DifficultyPill value={question.difficulty} />
        {subject && (
          <Badge>
            <span className="font-mono">{subject.code}</span> {subject.name}
          </Badge>
        )}
        {examTags.map(e => (
          <Link key={e.id} to={`/exams/${e.id}`}>
            <Badge className="hover:border-gm-grape-hi hover:text-gm-ink" tone="neutral">
              {e.society} {e.code}
            </Badge>
          </Link>
        ))}
        <Badge>{TYPE_LABEL[question.type]}</Badge>
      </div>
      {question.topics.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {question.topics.map(t => (
            <Link
              key={t}
              to={`/problems?subject=${question.subject}&topic=${encodeURIComponent(t)}`}
              className="gm-chip border-gm-line text-gm-ink-soft transition-colors hover:border-gm-grape-hi hover:text-gm-ink"
            >
              {t}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

import { Eye, Lock } from 'lucide-react'
import type { Question } from '../../data/types'
import { MathText } from '../MathText'
import { Button } from '../ui'

export function Solution({ question, unlocked, onReveal }: { question: Question; unlocked: boolean; onReveal: () => void }) {
  if (!unlocked)
    return (
      <div className="gm-inset gm-dots-line flex flex-col items-center px-6 py-12 text-center">
        <Lock className="mb-3 size-6 text-gm-ink-dim" aria-hidden="true" />
        <h2 className="font-display text-xl uppercase">Try it first</h2>
        <p className="mt-1.5 max-w-sm text-sm text-gm-ink-soft">
          Submit an answer to unlock the worked solution. Revealing it now counts as an attempt, so the question will come back in your review queue.
        </p>
        <Button variant="secondary" className="mt-5" onClick={onReveal}>
          <Eye className="size-4" aria-hidden="true" /> Reveal solution
        </Button>
      </div>
    )

  const answer =
    question.type === 'mcq'
      ? question.options![question.answerIndex!]
      : question.type === 'truefalse'
        ? question.answer === 'true'
          ? 'True'
          : 'False'
        : question.answer
  return (
    <div>
      <h2 className="font-display text-xl uppercase">Solution</h2>
      <div className="mt-4 rounded-[1rem] border-2 border-gm-lime-edge bg-gm-lime/12 px-4 py-3">
        <div className="text-xs font-bold tracking-wide text-gm-lime uppercase">Answer</div>
        <div className="mt-1 text-[15px] text-gm-ink">
          <MathText text={answer ?? ''} />
        </div>
      </div>
      <div className="mt-6 text-[15px] leading-[1.75] text-gm-ink">
        <MathText text={question.solution} />
      </div>
    </div>
  )
}

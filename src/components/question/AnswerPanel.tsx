import { useEffect, useRef, useState } from 'react'
import { Check, CheckCircle2, Eye, RotateCcw, X, XCircle } from 'lucide-react'
import clsx from 'clsx'
import type { Question } from '../../data/types'
import { checkNumeric } from '../../lib/grade'
import { MathText } from '../MathText'
import { Button, Kbd } from '../ui'

export type Verdict = { correct: boolean; revealed?: boolean; given: string }

const LETTERS = 'ABCDEFGHIJ'

/**
 * Answer input for one question. `feedback=false` (mock exams) records the answer
 * without revealing whether it was right.
 */
export function AnswerPanel({
  question,
  onAnswer,
  feedback = true,
  initial,
  autoFocus = true,
}: {
  question: Question
  onAnswer: (v: Verdict) => void
  feedback?: boolean
  initial?: Verdict | null
  autoFocus?: boolean
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const [text, setText] = useState(question.type === 'numeric' ? (initial?.given ?? '') : '')
  const [verdict, setVerdict] = useState<Verdict | null>(initial ?? null)
  const [revealedOpen, setRevealedOpen] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  // Practice locks once correct (or revealed). Mock answers stay editable until the exam ends.
  // State belongs to one question: callers render <AnswerPanel key={question.id} />.
  const locked = feedback && verdict !== null && (verdict.correct || !!verdict.revealed)

  useEffect(() => {
    if (autoFocus && question.type === 'numeric') inputRef.current?.focus()
  }, [question.id, question.type, autoFocus])

  const submit = (value?: number | string) => {
    if (locked) return
    let v: Verdict
    if (question.type === 'mcq') {
      const idx = typeof value === 'number' ? value : selected
      if (idx === null || idx === undefined) return setError('Choose an option first.')
      v = { correct: idx === question.answerIndex, given: String(idx) }
    } else if (question.type === 'truefalse') {
      const given = String(value)
      v = { correct: given === question.answer, given }
    } else if (question.type === 'numeric') {
      if (!text.trim()) return setError('Enter a number first.')
      if (!/[\d]/.test(text)) return setError('That doesn’t look like a number.')
      v = { correct: checkNumeric(text, question.answer!, question.tolerance), given: text.trim() }
    } else return
    setError('')
    setVerdict(v)
    onAnswer(v)
  }

  /** Picks an option. In mock mode that is the answer; in practice it awaits Submit. */
  const choose = (i: number) => {
    setError('')
    if (!feedback) {
      setSelected(i)
      submit(i)
      return
    }
    if (verdict && !verdict.correct) setVerdict(null)
    setSelected(i)
  }

  // Keyboard: 1-9 / A-D pick an option, Enter submits.
  useEffect(() => {
    if (question.type !== 'mcq' || locked) return
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('input, textarea, [contenteditable="true"]') || e.metaKey || e.ctrlKey || e.altKey) return
      const n = Number(e.key)
      const letter = LETTERS.indexOf(e.key.toUpperCase())
      const idx = n >= 1 && n <= 9 ? n - 1 : letter >= 0 && e.key.length === 1 ? letter : -1
      if (idx >= 0 && idx < (question.options?.length ?? 0)) {
        e.preventDefault()
        choose(idx)
      } else if (feedback && e.key === 'Enter' && selected !== null) {
        e.preventDefault()
        submit()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const retry = () => {
    setVerdict(null)
    setSelected(null)
    setText('')
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const showResult = feedback && verdict !== null

  return (
    <div className="flex flex-col gap-4">
      {question.type === 'mcq' && (
        <div role="radiogroup" aria-label="Answer options" className="flex flex-col gap-2">
          {question.options!.map((opt, i) => {
            const isChosen = verdict ? Number(verdict.given) === i : selected === i
            const isAnswer = i === question.answerIndex
            const state =
              showResult && (verdict!.correct || verdict!.revealed || locked)
                ? isAnswer
                  ? 'correct'
                  : isChosen
                    ? 'wrong'
                    : 'idle'
                : showResult && isChosen
                  ? 'wrong'
                  : isChosen
                    ? 'selected'
                    : 'idle'
            return (
              <button
                key={i}
                type="button"
                role="radio"
                aria-checked={isChosen}
                disabled={locked}
                onClick={() => choose(i)}
                onDoubleClick={() => feedback && !locked && submit(i)}
                className={clsx(
                  'group flex w-full items-start gap-3 rounded-[1rem] border-2 px-4 py-3.5 text-left text-[15px] transition-[background-color,border-color] duration-150 ease-out-expo disabled:cursor-default',
                  state === 'idle' && 'border-gm-line bg-gm-void hover:border-gm-grape-hi hover:bg-gm-deep',
                  state === 'selected' && 'border-gm-grape-hi bg-gm-grape/35',
                  state === 'correct' && 'border-gm-lime-edge bg-gm-lime/12',
                  state === 'wrong' && 'border-gm-coral-edge bg-gm-coral/12',
                )}
              >
                <span
                  className={clsx(
                    'mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-[0.45rem] border-2 font-mono text-xs font-bold',
                    state === 'selected' ? 'border-gm-grape-edge bg-gm-grape text-gm-ink' : 'border-gm-line text-gm-ink-soft',
                    state === 'correct' && 'border-gm-lime-edge bg-gm-lime text-gm-void',
                    state === 'wrong' && 'border-gm-coral-edge bg-gm-coral text-gm-void',
                  )}
                  aria-hidden="true"
                >
                  {state === 'correct' ? <Check className="size-3.5" /> : state === 'wrong' ? <X className="size-3.5" /> : LETTERS[i]}
                </span>
                <MathText text={opt} className="min-w-0 flex-1 leading-relaxed" />
              </button>
            )
          })}
        </div>
      )}

      {question.type === 'truefalse' && (
        <div className="grid grid-cols-2 gap-3">
          {(['true', 'false'] as const).map(v => {
            const chosen = verdict?.given === v
            return (
              <button
                key={v}
                type="button"
                disabled={locked}
                onClick={() => submit(v)}
                className={clsx(
                  'h-16 rounded-[1rem] border-2 font-display text-lg uppercase transition-colors',
                  !showResult && (chosen ? 'border-gm-grape-hi bg-gm-grape/35' : 'border-gm-line bg-gm-void hover:border-gm-grape-hi hover:bg-gm-deep'),
                  showResult && v === question.answer && (verdict!.correct || locked) && 'border-gm-lime-edge bg-gm-lime/12 text-gm-lime',
                  showResult && chosen && !verdict!.correct && 'border-gm-coral-edge bg-gm-coral/12 text-gm-coral',
                  showResult && !chosen && v !== question.answer && 'border-gm-line bg-gm-void opacity-60',
                )}
              >
                {v === 'true' ? 'True' : 'False'}
              </button>
            )
          })}
        </div>
      )}

      {question.type === 'numeric' && (
        <form
          onSubmit={e => {
            e.preventDefault()
            submit()
          }}
        >
          <label htmlFor={`ans-${question.id}`} className="mb-2 block font-bold">
            Your answer
          </label>
          <div className="flex gap-2">
            <input
              id={`ans-${question.id}`}
              ref={inputRef}
              value={verdict && locked ? verdict.given : text}
              onChange={e => {
                setText(e.target.value)
                setError('')
                if (showResult && !verdict!.correct) setVerdict(null)
              }}
              disabled={locked}
              inputMode="decimal"
              autoComplete="off"
              spellCheck={false}
              aria-describedby={`ans-help-${question.id}`}
              aria-invalid={showResult && !verdict!.correct ? true : undefined}
              placeholder="e.g. 1,234.56"
              className={clsx(
                'gm-field min-w-0 flex-1 font-mono tabular disabled:opacity-80',
                showResult && (verdict!.correct ? '!border-gm-lime-edge' : '!border-gm-coral-edge'),
              )}
            />
            {!locked && (
              <Button type="submit" variant="primary" disabled={!feedback && !!verdict && verdict.given === text.trim()}>
                {feedback ? 'Submit' : verdict && verdict.given === text.trim() ? 'Saved' : 'Save'}
              </Button>
            )}
          </div>
          <p id={`ans-help-${question.id}`} className="mt-2 text-xs text-gm-ink-dim">
            Commas, currency symbols and % are fine. Answers within 0.5% (or rounding at the stated precision) are accepted.
          </p>
        </form>
      )}

      {question.type === 'open' && <OpenAnswer question={question} onAnswer={v => (setVerdict(v), onAnswer(v))} verdict={verdict} open={revealedOpen} setOpen={setRevealedOpen} />}

      {error && (
        <p role="alert" className="text-sm text-gm-coral">
          {error}
        </p>
      )}

      {question.type === 'mcq' && !locked && feedback && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="hidden items-center gap-1.5 text-xs text-gm-ink-dim sm:flex">
            <Kbd>1</Kbd>–<Kbd>{Math.min(9, question.options?.length ?? 4)}</Kbd> to choose, <Kbd>Enter</Kbd> to submit
          </span>
          <Button variant="primary" className="ml-auto" onClick={() => submit()} disabled={selected === null}>
            Submit
          </Button>
        </div>
      )}
      {question.type === 'mcq' && !feedback && (
        <span className="hidden items-center gap-1.5 text-xs text-gm-ink-dim sm:flex">
          <Kbd>1</Kbd>–<Kbd>{Math.min(9, question.options?.length ?? 4)}</Kbd> to choose. You can change your answer until you finish.
        </span>
      )}

      <div aria-live="polite">
        {showResult && question.type !== 'open' && (
          <div
            className={clsx(
              'flex items-start gap-3 rounded-[0.85rem] px-4 py-3 font-semibold',
              verdict!.correct ? 'bg-gm-lime text-gm-void' : 'bg-gm-coral text-gm-void',
            )}
          >
            {verdict!.correct ? <CheckCircle2 className="mt-0.5 size-5 shrink-0" /> : <XCircle className="mt-0.5 size-5 shrink-0" />}
            <div className="min-w-0 flex-1">
              <div className="font-display text-lg leading-tight uppercase">
                {verdict!.correct ? 'Correct' : 'Not quite'}
              </div>
              <div className="mt-0.5 text-sm font-medium opacity-80">
                {verdict!.correct
                  ? question.type === 'numeric'
                    ? <>Expected <span className="font-mono font-bold">{question.answer}</span>. Check the solution for the full working.</>
                    : 'Nice. Read the solution to lock it in.'
                  : 'Have another go, or open the solution to see the working.'}
              </div>
            </div>
            {!verdict!.correct && (
              <Button size="sm" variant="secondary" className="self-center" onClick={retry}>
                <RotateCcw className="size-3.5" aria-hidden="true" /> Try again
              </Button>
            )}
          </div>
        )}
        {!feedback && verdict && (
          <div className="rounded-[0.85rem] border-2 border-gm-line bg-gm-deep px-4 py-3 text-sm font-semibold text-gm-ink-soft">Answer saved. Results are shown when you finish the exam.</div>
        )}
      </div>
    </div>
  )
}

function OpenAnswer({
  question,
  onAnswer,
  verdict,
  open,
  setOpen,
}: {
  question: Question
  onAnswer: (v: Verdict) => void
  verdict: Verdict | null
  open: boolean
  setOpen: (b: boolean) => void
}) {
  const [notes, setNotes] = useState('')
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={`open-${question.id}`} className="text-sm font-medium">
        Your answer <span className="font-normal text-gm-ink-dim">(for your own reference, not graded)</span>
      </label>
      <textarea
        id={`open-${question.id}`}
        value={notes}
        onChange={e => setNotes(e.target.value)}
        rows={4}
        disabled={!!verdict}
        className="gm-field min-h-28 text-[15px]"
        placeholder="Write your answer, then compare it with the model answer."
      />
      {!open ? (
        <Button variant="primary" className="self-start" onClick={() => setOpen(true)}>
          <Eye className="size-4" aria-hidden="true" /> Reveal model answer
        </Button>
      ) : (
        <div className="gm-inset p-4">
          <div className="mb-1 text-xs font-medium tracking-wide text-gm-ink-dim uppercase">Model answer</div>
          <MathText text={question.answer ?? ''} className="text-[15px]" />
          {!verdict ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm text-gm-ink-soft">How did you do?</span>
              <Button size="sm" variant="secondary" onClick={() => onAnswer({ correct: true, given: notes })}>
                <Check className="size-3.5 text-gm-lime" aria-hidden="true" /> I got it
              </Button>
              <Button size="sm" variant="secondary" onClick={() => onAnswer({ correct: false, given: notes })}>
                <X className="size-3.5 text-gm-coral" aria-hidden="true" /> I missed it
              </Button>
            </div>
          ) : (
            <p className="mt-3 text-sm text-gm-ink-soft">{verdict.correct ? 'Marked as solved.' : 'Marked for review. It will come back in your review queue.'}</p>
          )}
        </div>
      )}
    </div>
  )
}

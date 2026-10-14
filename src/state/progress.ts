// Progress lives in this browser (localStorage): every attempt is recorded immediately.
// Spaced repetition uses Leitner boxes. Settings can export / import it as JSON.
import { useSyncExternalStore } from 'react'
import { createStore, readStore, writeStore } from './storage'

export interface ProblemProgress {
  /** solved = answered correctly at least once. */
  status: 'solved' | 'attempted'
  attempts: number
  correct: number
  wrong: number
  /** Leitner box 0-5; drives the review schedule. */
  box: number
  /** ISO date (yyyy-mm-dd) when the problem is next due for review. */
  due: string
  firstSolvedAt?: string
  lastAt: string
  /** Set when the last result came from the worked solution being revealed first. */
  revealed?: boolean
}

export interface ProgressState {
  version: 1
  problems: Record<string, ProblemProgress>
  /** yyyy-mm-dd -> number of attempts that day. */
  activity: Record<string, number>
  bookmarks: string[]
}

const KEY = 'ae:progress:v1'
const empty: ProgressState = { version: 1, problems: {}, activity: {}, bookmarks: [] }
const saved = readStore<Partial<ProgressState>>(KEY, empty)
// Keep only known fields (older versions also stored account-sync bookkeeping).
export const progressStore = createStore<ProgressState>({
  version: 1,
  problems: saved.problems ?? {},
  activity: saved.activity ?? {},
  bookmarks: saved.bookmarks ?? [],
})
progressStore.subscribe(() => writeStore(KEY, progressStore.get()))

// Days until the next review for each Leitner box. A miss (or a revealed solution)
// drops to box 0 and is due the same day; each later correct answer moves up a box.
// Getting a question right first time skips straight to box 4, a light refresh.
export const INTERVALS = [0, 1, 3, 7, 21, 60]
const FIRST_TRY_BOX = 4

export const today = (d = new Date()) => {
  const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return z.toISOString().slice(0, 10)
}
const addDays = (iso: string, days: number) => {
  const d = new Date(iso + 'T12:00:00')
  d.setDate(d.getDate() + days)
  return today(d)
}

/** Records an answer. `correct=false` with `revealed` means the user peeked at the solution. */
export function recordAttempt(id: string, correct: boolean, opts: { revealed?: boolean } = {}) {
  const now = new Date().toISOString()
  const day = today()
  progressStore.set(s => {
    const prev = s.problems[id]
    const box = !correct ? 0 : prev ? Math.min(prev.box + 1, INTERVALS.length - 1) : FIRST_TRY_BOX
    const next: ProblemProgress = {
      status: correct || prev?.status === 'solved' ? 'solved' : 'attempted',
      attempts: (prev?.attempts ?? 0) + 1,
      correct: (prev?.correct ?? 0) + (correct ? 1 : 0),
      wrong: (prev?.wrong ?? 0) + (correct ? 0 : 1),
      box,
      due: addDays(day, INTERVALS[box]),
      firstSolvedAt: prev?.firstSolvedAt ?? (correct ? now : undefined),
      lastAt: now,
      revealed: opts.revealed || undefined,
    }
    return {
      ...s,
      problems: { ...s.problems, [id]: next },
      activity: { ...s.activity, [day]: (s.activity[day] ?? 0) + 1 },
    }
  })
}

export function toggleBookmark(id: string) {
  progressStore.set(s => ({
    ...s,
    bookmarks: s.bookmarks.includes(id) ? s.bookmarks.filter(b => b !== id) : [...s.bookmarks, id],
  }))
}

export const useProgress = () => useSyncExternalStore(progressStore.subscribe, progressStore.get)

export function dueForReview(s: ProgressState, day = today()): string[] {
  return Object.entries(s.problems)
    .filter(([, p]) => p.due <= day)
    .sort(([, a], [, b]) => a.box - b.box || a.due.localeCompare(b.due))
    .map(([id]) => id)
}

/** Consecutive days with activity, ending today (or yesterday if nothing yet today). */
export function currentStreak(activity: Record<string, number>, day = today()): number {
  let streak = 0
  let cursor = activity[day] ? day : addDays(day, -1)
  while (activity[cursor]) {
    streak++
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function longestStreak(activity: Record<string, number>): number {
  const days = Object.keys(activity).filter(d => activity[d] > 0).sort()
  let best = 0
  let run = 0
  let prev = ''
  for (const d of days) {
    run = prev && addDays(prev, 1) === d ? run + 1 : 1
    best = Math.max(best, run)
    prev = d
  }
  return best
}

export { addDays }

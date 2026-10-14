import type { Difficulty, Lang, ProblemSummary } from './types'

export const DIFFICULTY_LABEL: Record<Difficulty, string> = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
export const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard']

export const LANG_LABEL: Record<Lang, string> = { python: 'Python', r: 'R', sql: 'SQL' }

export const TYPE_LABEL: Record<ProblemSummary['type'], string> = {
  mcq: 'Multiple choice',
  numeric: 'Numeric answer',
  truefalse: 'True / false',
  open: 'Self-assessed',
  code: 'Code',
}

export const TRACKS = [
  { id: 'all', label: 'All problems' },
  { id: 'exams', label: 'Exam practice' },
  { id: 'interview', label: 'Interview prep' },
  { id: 'code', label: 'Code' },
] as const
export type TrackFilter = (typeof TRACKS)[number]['id']

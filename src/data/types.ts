export type Difficulty = 'easy' | 'medium' | 'hard'
export type QuestionType = 'mcq' | 'numeric' | 'truefalse' | 'open'
export type Lang = 'python' | 'r' | 'sql'
export type Track = 'exams' | 'interview' | 'code'

export interface ProblemSummary {
  id: string
  kind: 'question' | 'code'
  n: number
  title: string
  difficulty: Difficulty
  /** Question subject id (cm1, probability…) or language for code problems. */
  subject: string
  type: QuestionType | 'code'
  topics: string[]
  exams: string[]
}

export interface Subject {
  id: string
  code: string
  name: string
  track: 'exams' | 'interview'
  exams?: string[]
  topics: string[]
  total: number
  easy: number
  medium: number
  hard: number
}

export interface Exam {
  id: string
  society: 'IFoA' | 'ASSA'
  code: string
  name: string
  stage: string
  subject?: string
  total: number
}

export interface DocMeta {
  slug: string
  title: string
  summary?: string
  order?: number
  [key: string]: unknown
}

export interface ProjectMeta extends DocMeta {
  area?: string
  level?: string
  stack?: string[]
  tags?: string[]
  image?: string
  download?: string
}

export interface GuideMeta extends DocMeta {
  category?: string
  readingTime?: string
  download?: string
  image?: string
}

export interface Manifest {
  generatedAt: string
  subjects: Subject[]
  exams: Exam[]
  languages: Record<Lang, number>
  problems: ProblemSummary[]
  projects: ProjectMeta[]
  guides: GuideMeta[]
}

export interface Question {
  id: string
  subject: string
  n: number
  title: string
  difficulty: Difficulty
  topics: string[]
  exams: string[]
  type: QuestionType
  prompt: string
  options?: string[]
  answerIndex?: number
  answer?: string
  tolerance?: number
  solution: string
}

export interface CodeTest {
  args: unknown[]
  expected: unknown
}

export interface CodeProblem {
  id: string
  lang: Lang
  n: number
  title: string
  difficulty: Difficulty
  description: string
  starterCode: string
  solution: string
  entry?: string
  tests?: CodeTest[]
  tables?: Record<string, Record<string, string | number | null>[]>
}

export type Doc<M> = M & { body: string }

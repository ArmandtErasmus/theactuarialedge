import { use } from 'react'
import type { CodeProblem, Doc, GuideMeta, Lang, Manifest, ProjectMeta, Question } from './types'

const base = import.meta.env.BASE_URL

// Each JSON file is fetched once and the promise cached, so React's use()
// can suspend on it from any component.
const cache = new Map<string, Promise<unknown>>()

function fetchJson<T>(rel: string): Promise<T> {
  let p = cache.get(rel) as Promise<T> | undefined
  if (!p) {
    p = fetch(`${base}data/${rel}`).then(r => {
      if (!r.ok) throw new Error(`Could not load ${rel} (${r.status})`)
      return r.json() as Promise<T>
    })
    p.catch(() => cache.delete(rel))
    cache.set(rel, p)
  }
  return p
}

export const loadManifest = () => fetchJson<Manifest>('manifest.json')
export const loadSubject = (subject: string) => fetchJson<Question[]>(`q/${subject}.json`)
export const loadCode = (lang: Lang) => fetchJson<CodeProblem[]>(`code/${lang}.json`)
export const loadProject = (slug: string) => fetchJson<Doc<ProjectMeta>>(`projects/${slug}.json`)
export const loadGuide = (slug: string) => fetchJson<Doc<GuideMeta>>(`guides/${slug}.json`)

export const useManifest = () => use(loadManifest())

export const LANGS: Lang[] = ['python', 'r', 'sql']
export const isLang = (s: string): s is Lang => (LANGS as string[]).includes(s)

/** Splits a problem id such as "cm1-12" or "python-3" into its bundle and number. */
export function parseProblemId(id: string): { bundle: string; n: string } | null {
  const m = /^([a-z0-9]+)-(\d+)$/.exec(id)
  return m ? { bundle: m[1], n: m[2] } : null
}

export async function loadProblem(id: string): Promise<{ kind: 'question'; data: Question } | { kind: 'code'; data: CodeProblem } | null> {
  const parsed = parseProblemId(id)
  if (!parsed) return null
  if (isLang(parsed.bundle)) {
    const list = await loadCode(parsed.bundle)
    const data = list.find(p => p.id === id)
    return data ? { kind: 'code', data } : null
  }
  const list = await loadSubject(parsed.bundle).catch(() => null)
  const data = list?.find(q => q.id === id)
  return data ? { kind: 'question', data } : null
}

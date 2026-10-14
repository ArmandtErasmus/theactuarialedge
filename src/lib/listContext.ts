// Remembers the list the user opened a problem from, so the workspace can offer
// previous / next / random within that same filtered list.
const KEY = 'ae:list'

export interface ListContext {
  label: string
  back: string
  ids: string[]
}

export function setListContext(ctx: ListContext) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(ctx))
  } catch {
    /* ignore */
  }
}

export function getListContext(): ListContext | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as ListContext) : null
  } catch {
    return null
  }
}

export function hashString(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}

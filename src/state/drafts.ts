import { readStore, removeStore, writeStore } from './storage'

// Code drafts stay in this browser only.
export const loadDraft = (id: string) => readStore<string | null>(`ae:draft:${id}`, null)
export const saveDraft = (id: string, code: string) => writeStore(`ae:draft:${id}`, code)
export const clearDraft = (id: string) => removeStore(`ae:draft:${id}`)

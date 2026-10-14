// The visitor's pretend profile: a display name, an avatar and the shop items they own,
// saved in this browser only. `image` is the rendered avatar (a data URI), so pages can
// show it without loading the avatar renderer. Avatar options are stored loosely and
// validated by src/lib/avatar.ts.
import { useEffect, useState, useSyncExternalStore } from 'react'
import { createStore, readStore, writeStore } from './storage'
import { useProgress, type ProgressState } from './progress'
import { loadManifest } from '../data/load'
import type { Manifest } from '../data/types'
import { REWARD, isUnlocked, itemId, priceOf, type ShopCategory, type ShopItem } from '../lib/shop'

export interface Profile {
  name: string
  gender?: 'male' | 'female'
  avatar?: Record<string, string>
  image?: string
  /** Shop items bought, as "part:value". */
  owned?: string[]
  /** Actuary Bucks spent so far. */
  spent?: number
}

const KEY = 'ae:profile'

// Avatars designed before the shop existed keep what they're wearing, free.
function grandfather(p: Profile): Profile {
  const worn = Object.entries(p.avatar ?? {}).filter(([part, value]) => !isUnlocked(part, value, p.owned))
  return worn.length ? { ...p, owned: [...(p.owned ?? []), ...worn.map(([part, value]) => itemId(part, value))] } : p
}

export const profileStore = createStore<Profile>(grandfather(readStore<Profile>(KEY, { name: '' })))
profileStore.subscribe(() => writeStore(KEY, profileStore.get()))

export const useProfile = () => useSyncExternalStore(profileStore.subscribe, profileStore.get)

/** Shown until someone designs their own (rendered from DEFAULT_AVATAR; see avatar.test.ts). */
export const DEFAULT_AVATAR_IMAGE = `${import.meta.env.BASE_URL}avatar.svg`

// ---------- Actuary Bucks ----------
/** Earned from every problem solved so far, so existing progress counts straight away. */
export function earnedBucks(manifest: Manifest, progress: ProgressState): number {
  let total = 0
  for (const p of manifest.problems) if (progress.problems[p.id]?.status === 'solved') total += REWARD[p.difficulty]
  return total
}

/** Balance without suspending: `null` until the problem list has loaded. */
export function useBucks(): { earned: number; balance: number } | null {
  const progress = useProgress()
  const profile = useProfile()
  const [manifest, setManifest] = useState<Manifest | null>(null)
  useEffect(() => {
    let live = true
    loadManifest().then(m => live && setManifest(m), () => {})
    return () => {
      live = false
    }
  }, [])
  if (!manifest) return null
  const earned = earnedBucks(manifest, progress)
  return { earned, balance: earned - (profile.spent ?? 0) }
}

/** Records a purchase. The caller checks the balance and dresses the avatar. */
export function buyItem(item: ShopItem) {
  profileStore.set(p => ({ ...p, owned: [...(p.owned ?? []), itemId(item.part, item.value)], spent: (p.spent ?? 0) + priceOf(item) }))
}

// ---------- shop dialog ----------
export const shopStore = createStore<{ open: boolean; category: ShopCategory }>({ open: false, category: 'clothes' })
export const useShop = () => useSyncExternalStore(shopStore.subscribe, shopStore.get)
export const openShop = (category: ShopCategory = shopStore.get().category) => shopStore.set({ open: true, category })
export const closeShop = () => shopStore.set(s => ({ ...s, open: false }))

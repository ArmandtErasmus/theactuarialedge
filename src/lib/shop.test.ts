import { describe, expect, it } from 'vitest'
import { OPTIONS, randomAvatar } from './avatar'
import { PRICE, REWARD, SHOP_ITEMS, isUnlocked, itemId, priceOf, shopItem } from './shop'
import { earnedBucks } from '../state/profile'
import type { Manifest } from '../data/types'
import type { ProgressState } from '../state/progress'

describe('shop', () => {
  it('only sells real avatar options, each once', () => {
    for (const i of SHOP_ITEMS) expect(OPTIONS[i.part]).toContain(i.value)
    expect(new Set(SHOP_ITEMS.map(i => itemId(i.part, i.value))).size).toBe(SHOP_ITEMS.length)
  })
  it('keeps the basics, prescription glasses, hijab and turban free', () => {
    for (const [part, value] of [['clothing', 'hoodie'], ['clothing', 'shirtCrewNeck'], ['accessories', 'prescription01'], ['accessories', 'prescription02'], ['accessories', 'round'], ['top', 'hijab'], ['top', 'turban'], ['clothingGraphic', 'bear']])
      expect(isUnlocked(part, value)).toBe(true)
  })
  it('locks shop items until bought', () => {
    expect(isUnlocked('clothing', 'blazerAndShirt')).toBe(false)
    expect(isUnlocked('clothing', 'blazerAndShirt', ['clothing:blazerAndShirt'])).toBe(true)
    expect(priceOf(shopItem('accessories', 'eyepatch')!)).toBe(PRICE.legendary)
  })
  it('random avatars never wear locked items', () => {
    for (let i = 0; i < 100; i++) {
      const a = randomAvatar(i % 2 ? 'male' : 'female', (part, v) => isUnlocked(part, v))
      for (const part of ['clothing', 'accessories', 'top'] as const) expect(isUnlocked(part, a[part])).toBe(true)
    }
  })
  it('earns bucks for solved problems by difficulty', () => {
    const manifest = { problems: [{ id: 'a', difficulty: 'easy' }, { id: 'b', difficulty: 'medium' }, { id: 'c', difficulty: 'hard' }, { id: 'd', difficulty: 'hard' }] } as unknown as Manifest
    const progress = { problems: { a: { status: 'solved' }, b: { status: 'solved' }, c: { status: 'attempted' }, d: { status: 'solved' } } } as unknown as ProgressState
    expect(earnedBucks(manifest, progress)).toBe(REWARD.easy + REWARD.medium + REWARD.hard)
  })
})

// The avatar shop: what costs Actuary Bucks and how they're earned. Kept free of the
// avatar renderer so the header can show balances without loading it.
//
// Free: gender, skin, eyes and eye colour, expressions, hair and facial hair, hijab and
// turban, prescription glasses, all colours, the background, a hoodie and a crew-neck tee.
// Everything listed below has to be bought once; after that it can be worn any time.
import type { Difficulty } from '../data/types'

export type Rarity = 'common' | 'rare' | 'epic' | 'legendary'
export type ShopCategory = 'clothes' | 'prints' | 'eyewear' | 'hats'
export type ShopPart = 'clothing' | 'clothingGraphic' | 'accessories' | 'top'

export const PRICE: Record<Rarity, number> = { common: 50, rare: 120, epic: 250, legendary: 500 }
/** Actuary Bucks for solving a problem for the first time. */
export const REWARD: Record<Difficulty, number> = { easy: 10, medium: 20, hard: 40 }

export interface ShopItem {
  part: ShopPart
  value: string
  name: string
  rarity: Rarity
  blurb: string
}

export const CATEGORIES: { id: ShopCategory; label: string; part: ShopPart }[] = [
  { id: 'clothes', label: 'Clothes', part: 'clothing' },
  { id: 'prints', label: 'Prints', part: 'clothingGraphic' },
  { id: 'eyewear', label: 'Eyewear', part: 'accessories' },
  { id: 'hats', label: 'Hats', part: 'top' },
]

export const SHOP_ITEMS: ShopItem[] = [
  { part: 'clothing', value: 'shirtScoopNeck', name: 'Scoop-neck tee', rarity: 'common', blurb: 'Relaxed and easy for long revision days.' },
  { part: 'clothing', value: 'shirtVNeck', name: 'V-neck tee', rarity: 'common', blurb: 'A classic cut for casual Fridays.' },
  { part: 'clothing', value: 'graphicShirt', name: 'Graphic tee', rarity: 'rare', blurb: 'A tee with room for a print. Comes with the bear.' },
  { part: 'clothing', value: 'collarAndSweater', name: 'Collared jumper', rarity: 'rare', blurb: 'Smart enough for a client call, cosy enough for the study.' },
  { part: 'clothing', value: 'overall', name: 'Dungarees', rarity: 'rare', blurb: 'For when you are knee-deep in data cleaning.' },
  { part: 'clothing', value: 'blazerAndSweater', name: 'Blazer and jumper', rarity: 'epic', blurb: 'Ready to present the reserving results.' },
  { part: 'clothing', value: 'blazerAndShirt', name: 'Blazer and shirt', rarity: 'epic', blurb: 'Dressed for the valuation committee.' },

  { part: 'clothingGraphic', value: 'pizza', name: 'Pizza print', rarity: 'common', blurb: 'Fuel for exam season.' },
  { part: 'clothingGraphic', value: 'hola', name: 'Hola print', rarity: 'common', blurb: 'Say hello to the team.' },
  { part: 'clothingGraphic', value: 'cumbia', name: 'Cumbia print', rarity: 'common', blurb: 'For celebrating a passed exam.' },
  { part: 'clothingGraphic', value: 'deer', name: 'Deer print', rarity: 'common', blurb: 'Calm under pressure.' },
  { part: 'clothingGraphic', value: 'bat', name: 'Bat print', rarity: 'rare', blurb: 'For late-night study sessions.' },
  { part: 'clothingGraphic', value: 'skullOutline', name: 'Skull outline print', rarity: 'rare', blurb: 'A nod to mortality tables.' },
  { part: 'clothingGraphic', value: 'skull', name: 'Skull print', rarity: 'epic', blurb: 'Fully committed to life contingencies.' },
  { part: 'clothingGraphic', value: 'diamond', name: 'Diamond print', rarity: 'legendary', blurb: 'For actuaries who have qualified.' },

  { part: 'accessories', value: 'sunglasses', name: 'Sunglasses', rarity: 'rare', blurb: 'For a future so bright.' },
  { part: 'accessories', value: 'wayfarers', name: 'Wayfarers', rarity: 'rare', blurb: 'Timeless frames with dark lenses.' },
  { part: 'accessories', value: 'kurt', name: 'Retro shades', rarity: 'epic', blurb: 'Oversized and unapologetic.' },
  { part: 'accessories', value: 'eyepatch', name: 'Eyepatch', rarity: 'legendary', blurb: 'For those who have stared into the tail of the distribution.' },

  { part: 'top', value: 'winterHat1', name: 'Trapper hat', rarity: 'common', blurb: 'Warm ears for cold exam halls.' },
  { part: 'top', value: 'winterHat03', name: 'Bobble beanie', rarity: 'common', blurb: 'Simple, warm and cheerful.' },
  { part: 'top', value: 'winterHat02', name: 'Pompom beanie', rarity: 'rare', blurb: 'With ear ties and a pompom on top.' },
  { part: 'top', value: 'hat', name: 'Wide-brim hat', rarity: 'rare', blurb: 'Shade for reading through the summer.' },
  { part: 'top', value: 'winterHat04', name: 'Cat-ear beanie', rarity: 'epic', blurb: 'The most popular hat in the office.' },
]

export const itemId = (part: string, value: string) => `${part}:${value}`
export const shopItem = (part: string, value: string) => SHOP_ITEMS.find(i => i.part === part && i.value === value)
export const priceOf = (item: ShopItem) => PRICE[item.rarity]
/** Free options and bought items can be worn; anything else in the shop is locked. */
export const isUnlocked = (part: string, value: string, owned: readonly string[] = []) => !shopItem(part, value) || owned.includes(itemId(part, value))
export const categoryOf = (part: string) => CATEGORIES.find(c => c.part === part)?.id

export const RARITY_LABEL: Record<Rarity, string> = { common: 'Common', rare: 'Rare', epic: 'Epic', legendary: 'Legendary' }

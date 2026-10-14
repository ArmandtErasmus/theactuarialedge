// Avatar builder: the Avataaars style (Pablo Stanley, free for personal and commercial use)
// rendered by DiceBear. Only the Settings page imports this, so DiceBear stays out of the
// main bundle; everywhere else shows the data URI saved in the profile.
import { createAvatar } from '@dicebear/core'
import * as avataaars from '@dicebear/avataaars'

export interface Avatar {
  top: string
  hairColor: string
  hatColor: string
  accessories: string
  accessoriesColor: string
  facialHair: string
  facialHairColor: string
  clothing: string
  clothesColor: string
  clothingGraphic: string
  eyes: string
  eyebrows: string
  mouth: string
  skinColor: string
  /** Pupil colour, applied after rendering (the style itself only draws dark eyes). */
  eyeColor: string
  background: string
}

// Shapes are enums in the style's schema; colours are free hex values with a default palette.
const enumOf = (key: string): string[] => {
  const prop = (avataaars.schema.properties as Record<string, { items?: { enum?: string[] }; default?: string[] }>)[key]
  return prop?.items?.enum ?? prop?.default ?? []
}

export const NONE = 'none'
const HEADWEAR = new Set(['hat', 'hijab', 'turban', 'winterHat1', 'winterHat02', 'winterHat03', 'winterHat04'])
export const isHeadwear = (top: string) => HEADWEAR.has(top)

/** Eye colours: "default" keeps the style's own dark pupils. */
export const EYE_COLORS = ['default', '6b4226', '8a6a2f', '3e8e41', '2f73d9', '6e7f8d']

/** Background swatches in the site palette, plus no background. */
export const BACKGROUNDS = ['11805b', 'ffd23f', 'fb5607', 'ff006e', '4cc9f0', '1b2231', 'transparent']
// Backgrounds saved under earlier palettes map to their closest current colour.
const OLD_BACKGROUNDS: Record<string, string> = {
  '6a2fd3': '11805b',
  '8338ec': '11805b',
  '2a66d9': '11805b',
  '3a86ff': '11805b',
  bdf25a: 'ffd23f',
  ffbe0b: 'ffd23f',
  f5c84b: 'fb5607',
  ff6b6b: 'ff006e',
  '5fd4f4': '4cc9f0',
  '2a1d4f': '1b2231',
}

export const OPTIONS = {
  skinColor: enumOf('skinColor'),
  top: [NONE, ...enumOf('top')],
  hairColor: enumOf('hairColor'),
  hatColor: enumOf('hatColor'),
  eyes: enumOf('eyes'),
  eyebrows: enumOf('eyebrows'),
  mouth: enumOf('mouth'),
  facialHair: [NONE, ...enumOf('facialHair')],
  facialHairColor: enumOf('facialHairColor'),
  accessories: [NONE, ...enumOf('accessories')],
  accessoriesColor: enumOf('accessoriesColor'),
  clothing: enumOf('clothing'),
  clothesColor: enumOf('clothesColor'),
  // "resist" is a slogan, so it isn't offered.
  clothingGraphic: enumOf('clothingGraphic').filter(g => g !== 'resist'),
  eyeColor: EYE_COLORS,
  background: BACKGROUNDS,
} satisfies Record<keyof Avatar, string[]>

export const DEFAULT_AVATAR: Avatar = {
  top: 'shortFlat',
  hairColor: '2c1b18',
  hatColor: '262e33',
  accessories: NONE,
  accessoriesColor: '262e33',
  facialHair: NONE,
  facialHairColor: '2c1b18',
  clothing: 'hoodie',
  clothesColor: '262e33',
  clothingGraphic: 'bear',
  eyes: 'default',
  eyebrows: 'defaultNatural',
  mouth: 'smile',
  skinColor: 'edb98a',
  eyeColor: 'default',
  background: '11805b',
}

/** Keeps saved avatars valid if the style's options ever change. */
export function normaliseAvatar(a: Partial<Avatar> | undefined): Avatar {
  if (a?.background && OLD_BACKGROUNDS[a.background]) a = { ...a, background: OLD_BACKGROUNDS[a.background] }
  const out = { ...DEFAULT_AVATAR }
  for (const k of Object.keys(OPTIONS) as (keyof Avatar)[]) if (a?.[k] && OPTIONS[k].includes(a[k])) out[k] = a[k]
  return out
}

// Pupils in the style's eye shapes: dark, semi-transparent fills on these paths. Closed or
// smiling eyes have no pupils, so eye colour only shows on open eyes.
const PUPIL_PATH = /(<path d="(?:M36 22a6 6 0 1 1-12 0|M36 14a6 6 0 1 1-12 0|M32\.82 28\.3a25\.15|M27 16c-4\.84 0-9 2\.65)[^"]*")\s*fill="#000" fill-opacity="\.[67]"/g
function colourEyes(svg: string, colour: string): string {
  if (colour === 'default') return svg
  return svg
    .replace(PUPIL_PATH, `$1 fill="#${colour}"`)
    .replace(/<circle cx="82" cy="22" r="6" fill="#000" fill-opacity="\.7"\/>/g, `<circle cx="82" cy="22" r="6" fill="#${colour}"/>`)
    .replace(/<g fill="#000" fill-opacity="\.6">(<path d="M36 22a6)/g, `<g fill="#${colour}">$1`)
}

export function avatarSvg(a: Avatar): string {
  const one = (v: string) => (v === NONE ? [] : [v])
  const svg = createAvatar(avataaars, {
    seed: 'actuarial-edge',
    style: ['circle'],
    backgroundColor: [a.background],
    top: one(a.top) as never,
    topProbability: a.top === NONE ? 0 : 100,
    hairColor: [a.hairColor],
    hatColor: [a.hatColor],
    accessories: one(a.accessories) as never,
    accessoriesProbability: a.accessories === NONE ? 0 : 100,
    accessoriesColor: [a.accessoriesColor],
    facialHair: one(a.facialHair) as never,
    facialHairProbability: a.facialHair === NONE ? 0 : 100,
    facialHairColor: [a.facialHairColor],
    clothing: [a.clothing] as never,
    clothesColor: [a.clothesColor],
    clothingGraphic: [a.clothingGraphic] as never,
    eyes: [a.eyes] as never,
    eyebrows: [a.eyebrows] as never,
    mouth: [a.mouth] as never,
    skinColor: [a.skinColor],
  }).toString()
  return colourEyes(svg, a.eyeColor)
}

export const avatarUri = (a: Avatar) => `data:image/svg+xml;utf8,${encodeURIComponent(avatarSvg(a))}`

// ---------- gender ----------
// The style has no gender of its own, so it decides which hairstyles are offered, what
// Randomise picks, and whether facial hair is available. Headwear suits either.
export type Gender = 'male' | 'female'
const HAIR: Record<Gender, string[]> = {
  female: ['bob', 'bun', 'curly', 'curvy', 'dreads', 'frida', 'fro', 'froBand', 'longButNotTooLong', 'miaWallace', 'straight01', 'straight02', 'straightAndStrand', 'bigHair', 'shavedSides'],
  male: ['shortFlat', 'shortRound', 'shortWaved', 'shortCurly', 'theCaesar', 'theCaesarAndSidePart', 'sides', 'frizzle', 'shaggy', 'shaggyMullet', 'dreads01', 'dreads02', 'fro'],
}
const SIGNATURE_HAIR: Record<Gender, string> = { female: 'straight01', male: 'shortFlat' }

/** Hair or headwear choices for a gender, in tile order. */
export const topsFor = (g: Gender) => [...(g === 'male' ? [NONE] : []), ...HAIR[g], ...OPTIONS.top.filter(isHeadwear)]
export const canHaveFacialHair = (g: Gender) => g === 'male'
/** Guess from the hairstyle, for avatars saved before gender was a setting. */
export const genderOf = (a: Avatar): Gender => (HAIR.female.includes(a.top) && !HAIR.male.includes(a.top) ? 'female' : 'male')

/** Switches an avatar to a gender: a matching hairstyle if needed, and no beard for female. */
export function applyGender(a: Avatar, g: Gender): Avatar {
  return {
    ...a,
    top: topsFor(g).includes(a.top) ? a.top : SIGNATURE_HAIR[g],
    facialHair: canHaveFacialHair(g) ? a.facialHair : NONE,
  }
}

const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)]
/** A random avatar using only options that `allowed` accepts (free or already bought). */
export function randomAvatar(g: Gender = 'male', allowed: (part: keyof Avatar, value: string) => boolean = () => true): Avatar {
  const from = (part: keyof Avatar, values: string[]) => {
    const ok = values.filter(v => v !== NONE && allowed(part, v))
    return ok.length ? pick(ok) : DEFAULT_AVATAR[part]
  }
  const a = Object.fromEntries((Object.keys(OPTIONS) as (keyof Avatar)[]).map(k => [k, from(k, OPTIONS[k])])) as unknown as Avatar
  const hats = OPTIONS.top.filter(t => isHeadwear(t) && allowed('top', t))
  a.top = hats.length && Math.random() < 0.12 ? pick(hats) : from('top', HAIR[g])
  // Glasses and beards are extras: most random avatars go without.
  if (Math.random() < 0.65) a.accessories = NONE
  if (!canHaveFacialHair(g) || Math.random() < 0.7) a.facialHair = NONE
  if (Math.random() < 0.5) a.eyeColor = 'default'
  return a
}

/** "shortFlat" -> "Short flat", "winterHat02" -> "Winter hat 2". */
export const optionLabel = (v: string) =>
  v === NONE
    ? 'None'
    : v
        .replace(/0*(\d+)$/, ' $1')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .replace(/^./, c => c.toUpperCase())

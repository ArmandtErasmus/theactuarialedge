import { useEffect, useMemo, useState } from 'react'
import { Coins, Keyboard, Lock, RotateCcw, ShoppingBag, Shuffle, UserRound } from 'lucide-react'
import clsx from 'clsx'
import { Button, Card, Container, IconTile, Kbd, PageHeader, Segmented } from '../components/ui'
import { DEFAULT_AVATAR, NONE, OPTIONS, applyGender, avatarUri, canHaveFacialHair, genderOf, isHeadwear, normaliseAvatar, optionLabel, randomAvatar, topsFor, type Avatar, type Gender } from '../lib/avatar'
import { DEFAULT_AVATAR_IMAGE, openShop, profileStore, useBucks, useProfile } from '../state/profile'
import { categoryOf, isUnlocked, priceOf, shopItem } from '../lib/shop'
import { usePageTitle } from '../lib/usePageTitle'

const SHORTCUTS: [string[], string][] = [
  [['1', '–', '4'], 'Choose an answer option'],
  [['Enter'], 'Submit your answer'],
  [['Alt', '←', '→'], 'Previous / next problem'],
  [['Ctrl', 'Enter'], 'Run your code'],
  [['Ctrl', 'Shift', 'Enter'], 'Submit your code'],
]

const BACKGROUND_NAMES: Record<string, string> = {
  '11805b': 'Emerald',
  ffd23f: 'Gold',
  fb5607: 'Orange',
  ff006e: 'Pink',
  '4cc9f0': 'Sky',
  '1b2231': 'Night',
  transparent: 'No background',
}
const EYE_COLOR_NAMES: Record<string, string> = { default: 'Dark', '6b4226': 'Brown', '8a6a2f': 'Hazel', '3e8e41': 'Green', '2f73d9': 'Blue', '6e7f8d': 'Grey' }
const swatchName = (key: keyof Avatar, v: string) => (key === 'background' ? BACKGROUND_NAMES[v] : key === 'eyeColor' ? EYE_COLOR_NAMES[v] : undefined) ?? `#${v}`
const swatchFill = (key: keyof Avatar, v: string) => (key === 'eyeColor' && v === 'default' ? '#2b2b33' : `#${v}`)

// Each part is either picture tiles (zoomed onto the bit that changes) or colour swatches.
type Part = { key: keyof Avatar; label: string; kind: 'tiles' | 'swatches'; zoom?: 'face' | 'head' | 'body'; show?: (a: Avatar, g: Gender) => boolean }
const TABS: { id: string; label: string; parts: Part[] }[] = [
  {
    id: 'face',
    label: 'Face',
    parts: [
      { key: 'skinColor', label: 'Skin tone', kind: 'swatches' },
      { key: 'eyes', label: 'Eyes', kind: 'tiles', zoom: 'face' },
      { key: 'eyeColor', label: 'Eye colour', kind: 'swatches' },
      { key: 'eyebrows', label: 'Eyebrows', kind: 'tiles', zoom: 'face' },
      { key: 'mouth', label: 'Mouth', kind: 'tiles', zoom: 'face' },
    ],
  },
  {
    id: 'hair',
    label: 'Hair',
    parts: [
      { key: 'top', label: 'Hair or headwear', kind: 'tiles', zoom: 'head' },
      { key: 'hairColor', label: 'Hair colour', kind: 'swatches', show: a => a.top !== NONE && !isHeadwear(a.top) },
      { key: 'hatColor', label: 'Headwear colour', kind: 'swatches', show: a => isHeadwear(a.top) },
      { key: 'facialHair', label: 'Facial hair', kind: 'tiles', zoom: 'face', show: (_, g) => canHaveFacialHair(g) },
      { key: 'facialHairColor', label: 'Facial hair colour', kind: 'swatches', show: (a, g) => canHaveFacialHair(g) && a.facialHair !== NONE },
    ],
  },
  {
    id: 'clothes',
    label: 'Clothes',
    parts: [
      { key: 'clothing', label: 'Top', kind: 'tiles', zoom: 'body' },
      { key: 'clothesColor', label: 'Colour', kind: 'swatches' },
      { key: 'clothingGraphic', label: 'Print', kind: 'tiles', zoom: 'body', show: a => a.clothing === 'graphicShirt' },
    ],
  },
  {
    id: 'extras',
    label: 'Extras',
    parts: [
      { key: 'accessories', label: 'Glasses and eyewear', kind: 'tiles', zoom: 'face' },
      { key: 'accessoriesColor', label: 'Lens colour', kind: 'swatches', show: a => a.accessories !== NONE },
      { key: 'background', label: 'Background', kind: 'swatches' },
    ],
  },
]

const ZOOM = {
  face: { transform: 'scale(1.9)', transformOrigin: '50% 47%' },
  head: { transform: 'scale(1.35)', transformOrigin: '50% 30%' },
  body: { transform: 'scale(1.6)', transformOrigin: '50% 96%' },
}

export default function Settings() {
  usePageTitle('Settings')
  const profile = useProfile()
  const avatar = useMemo(() => normaliseAvatar(profile.avatar as Partial<Avatar> | undefined), [profile.avatar])
  const gender: Gender = profile.gender ?? genderOf(avatar)
  const owned = profile.owned ?? []
  const bucks = useBucks()
  const [tab, setTab] = useState(TABS[0].id)
  // Re-render a saved avatar whose options were updated (e.g. colours from an older palette).
  useEffect(() => {
    if (profile.avatar && JSON.stringify(avatar) !== JSON.stringify(profile.avatar))
      profileStore.set(p => ({ ...p, avatar: { ...avatar }, image: avatarUri(avatar) }))
  }, [avatar, profile.avatar])

  // Without a saved avatar the default (male) picture shows; a female default is saved explicitly.
  const saveAvatar = (next: Avatar | null) =>
    profileStore.set(p => (next ? { ...p, avatar: { ...next }, image: avatarUri(next) } : { ...p, avatar: undefined, image: undefined }))
  const setPart = (key: keyof Avatar, value: string) => saveAvatar({ ...avatar, [key]: value })
  const setGender = (g: Gender) => {
    profileStore.set(p => ({ ...p, gender: g }))
    saveAvatar(applyGender(avatar, g))
  }
  const reset = () => saveAvatar(gender === 'male' ? null : applyGender(DEFAULT_AVATAR, gender))

  return (
    <Container className="max-w-5xl py-14">
      <PageHeader title="Settings" />
      <div className="mt-10 flex flex-col gap-6">
        <Card className="p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <IconTile tone="lime">
              <UserRound className="size-5" />
            </IconTile>
            <div>
              <h2 className="text-xl font-bold">Your profile</h2>
              <p className="mt-1 leading-relaxed text-gm-ink-soft">Changes save as you go.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <div className="flex flex-col items-center gap-5 lg:items-stretch">
              <div className="gm-inset gm-dots-line flex justify-center p-5">
                <img src={profile.image ?? DEFAULT_AVATAR_IMAGE} alt="Your avatar" className="size-52" />
              </div>
              <div className="w-full">
                <label htmlFor="display-name" className="mb-1.5 block text-sm font-semibold text-gm-ink-soft">
                  Display name
                </label>
                <input
                  id="display-name"
                  className="gm-field h-11 !py-0 text-sm"
                  value={profile.name}
                  maxLength={30}
                  placeholder="e.g. Mia"
                  autoComplete="nickname"
                  onChange={e => profileStore.set(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div className="w-full">
                <div className="mb-1.5 text-sm font-semibold text-gm-ink-soft">
                  Gender
                </div>
                <Segmented
                  label="Gender"
                  value={gender}
                  onChange={setGender}
                  options={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                  ]}
                />
              </div>
              <div className="flex w-full gap-3">
                <Button variant="gold" className="flex-1" onClick={() => saveAvatar(randomAvatar(gender, (part, v) => isUnlocked(part, v, owned)))}>
                  <Shuffle className="size-4" aria-hidden="true" /> Randomise
                </Button>
                <Button className="flex-1" onClick={reset} disabled={!profile.avatar}>
                  <RotateCcw className="size-4" aria-hidden="true" /> Reset
                </Button>
              </div>
              <div className="gm-inset flex w-full items-center gap-3 p-3">
                <span className="flex min-w-0 flex-1 items-center gap-1.5 text-sm font-bold whitespace-nowrap text-gm-gold tabular">
                  <Coins className="size-4 shrink-0" aria-hidden="true" /> {bucks ? bucks.balance : '…'}
                  <span className="font-semibold text-gm-ink-dim">bucks</span>
                </span>
                <Button size="sm" variant="accent" onClick={() => openShop()}>
                  <ShoppingBag className="size-4" aria-hidden="true" /> Shop
                </Button>
              </div>
            </div>

            <div className="min-w-0">
              <div role="tablist" aria-label="Avatar parts" className="gm-tabs">
                {TABS.map(t => (
                  <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className="gm-tab" onClick={() => setTab(t.id)}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div role="tabpanel" aria-label={TABS.find(t => t.id === tab)!.label} className="mt-6 flex flex-col gap-7">
                {TABS.find(t => t.id === tab)!.parts.map(part =>
                  part.show && !part.show(avatar, gender) ? null : (
                    <PartPicker key={part.key} part={part} values={part.key === 'top' ? topsFor(gender) : OPTIONS[part.key]} avatar={avatar} owned={owned} onPick={v => setPart(part.key, v)} />
                  ),
                )}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <IconTile tone="gold">
              <Keyboard className="size-5" />
            </IconTile>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold">Keyboard shortcuts</h2>
              <ul className="mt-4 divide-y-2 divide-gm-line">
                {SHORTCUTS.map(([keys, what]) => (
                  <li key={what} className="flex items-center justify-between gap-4 py-2.5 text-sm">
                    <span className="text-gm-ink-soft">{what}</span>
                    <span className="flex items-center gap-1">
                      {keys.map(k => (k === '–' ? <span key={k}>–</span> : <Kbd key={k}>{k}</Kbd>))}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  )
}

function PartPicker({ part, values, avatar, owned, onPick }: { part: Part; values: string[]; avatar: Avatar; owned: string[]; onPick: (v: string) => void }) {
  // Tiles preview the whole avatar with just this part changed.
  const tiles = useMemo(
    () => (part.kind === 'tiles' ? values.map(v => [v, avatarUri({ ...avatar, [part.key]: v, background: 'transparent' })] as const) : []),
    [part, values, avatar],
  )
  const current = avatar[part.key]
  return (
    <section aria-label={part.label}>
      <h3 className="mb-3 text-sm font-bold">
        {part.label}
        {part.kind === 'tiles' && <span className="ml-2 font-semibold text-gm-ink-dim">{optionLabel(current)}</span>}
      </h3>
      {part.kind === 'tiles' ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(4.25rem,1fr))] gap-2.5">
          {tiles.map(([v, uri]) => {
            // Shop items not bought yet show their price and open the shop instead.
            const item = shopItem(part.key, v)
            const locked = !isUnlocked(part.key, v, owned)
            const label = item ? item.name : optionLabel(v)
            return (
              <button
                key={v}
                type="button"
                aria-pressed={current === v}
                aria-label={locked ? `${label}: ${priceOf(item!)} Actuary Bucks in the shop` : label}
                title={locked ? `${label}: unlock in the shop` : label}
                onClick={() => (locked ? openShop(categoryOf(part.key)) : onPick(v))}
                className={clsx(
                  'relative aspect-square overflow-hidden rounded-[0.9rem] border-2 bg-gm-void transition-colors duration-150',
                  current === v ? 'border-gm-lime shadow-[0_3px_0_var(--gm-lime-edge)]' : locked ? 'border-dashed border-gm-line hover:border-gm-gold' : 'border-gm-line hover:border-gm-grape-hi',
                )}
              >
                <img src={uri} alt="" className={clsx('size-full', locked && 'opacity-55')} style={part.zoom ? ZOOM[part.zoom] : undefined} loading="lazy" />
                {locked && (
                  <span className="absolute top-1 right-1 flex items-center gap-0.5 rounded-md border border-gm-gold-edge bg-gm-void/95 px-1 py-px text-[10px] font-bold text-gm-gold tabular" aria-hidden="true">
                    <Lock className="size-2.5" /> {priceOf(item!)}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2.5">
          {values.map(v => {
            const name = swatchName(part.key, v)
            return (
              <button
                key={v}
                type="button"
                aria-pressed={current === v}
                aria-label={name}
                title={name}
                onClick={() => onPick(v)}
                className={clsx(
                  'size-9 rounded-full border-2 transition-[box-shadow,border-color] duration-150',
                  current === v ? 'border-gm-void ring-3 ring-gm-lime' : 'border-gm-line hover:border-gm-grape-hi',
                  v === 'transparent' && 'gm-dots-line bg-gm-void',
                )}
                style={v === 'transparent' ? undefined : { background: swatchFill(part.key, v) }}
              />
            )
          })}
        </div>
      )}
    </section>
  )
}

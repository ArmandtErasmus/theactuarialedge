// The avatar shop. Loaded on demand (it pulls in the avatar renderer) and opened from the
// header's Actuary Bucks chip or from Settings. Buying an item also puts it on.
import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Coins, Lock, ShoppingBag, X } from 'lucide-react'
import clsx from 'clsx'
import { avatarUri, normaliseAvatar, type Avatar } from '../lib/avatar'
import { CATEGORIES, RARITY_LABEL, SHOP_ITEMS, REWARD, isUnlocked, priceOf, type Rarity, type ShopItem } from '../lib/shop'
import { buyItem, closeShop, profileStore, shopStore, useBucks, useProfile, useShop } from '../state/profile'

const RARITY_CHIP: Record<Rarity, string> = {
  common: 'border-gm-line bg-gm-void text-gm-ink-soft',
  rare: 'bg-gm-cyan text-gm-void',
  epic: 'bg-gm-grape text-gm-ink',
  legendary: 'bg-gm-gold text-gm-void',
}

/** The avatar wearing an item (a print goes on the graphic tee). */
const wearing = (a: Avatar, item: ShopItem): Avatar =>
  item.part === 'clothingGraphic' ? { ...a, clothing: 'graphicShirt', clothingGraphic: item.value } : { ...a, [item.part]: item.value }

export default function ShopDialog() {
  const ref = useRef<HTMLDialogElement>(null)
  const { open, category } = useShop()
  const profile = useProfile()
  const bucks = useBucks()
  const avatar = useMemo(() => normaliseAvatar(profile.avatar as Partial<Avatar> | undefined), [profile.avatar])
  const owned = profile.owned ?? []
  const [message, setMessage] = useState('')

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      setMessage('')
      d.showModal()
    } else if (!open && d.open) d.close()
  }, [open])

  const wear = (item: ShopItem) => {
    const next = wearing(avatar, item)
    profileStore.set(p => ({ ...p, avatar: { ...next }, image: avatarUri(next) }))
  }
  const buy = (item: ShopItem) => {
    buyItem(item)
    wear(item)
    setMessage(`You bought the ${item.name.toLowerCase()} and you're wearing it now.`)
  }

  const items = SHOP_ITEMS.filter(i => i.part === CATEGORIES.find(c => c.id === category)!.part)
  return (
    <dialog
      ref={ref}
      aria-labelledby="shop-title"
      onClose={closeShop}
      onClick={e => e.target === e.currentTarget && closeShop()}
      className="gm-panel gm-scroll gm-dialog m-auto max-h-[92svh] w-[calc(100vw-1.5rem)] max-w-3xl overflow-y-auto p-5 text-gm-ink shadow-[0_0_0_4px_var(--gm-void),10px_10px_0_0_var(--gm-grape)] sm:p-6"
    >
      <button
        type="button"
        onClick={closeShop}
        aria-label="Close"
        className="absolute top-4 right-4 z-10 inline-flex size-9 cursor-pointer items-center justify-center rounded-[0.7rem] border-2 border-gm-line bg-gm-void text-gm-ink-soft transition-colors duration-150 hover:border-gm-coral hover:text-gm-coral"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
      <div className="flex flex-col gap-1.5 pe-14">
        <h2 id="shop-title" className="flex items-center gap-2 font-display text-xl leading-tight sm:text-2xl">
          <ShoppingBag className="size-6 text-gm-gold" aria-hidden="true" /> Avatar shop
        </h2>
        <p className="text-sm leading-relaxed text-gm-ink-soft">
          Spend the Actuary Bucks you earn by solving problems on new outfits and accessories. You get {REWARD.easy} for an easy problem, {REWARD.medium} for a medium one and {REWARD.hard}{' '}
          for a hard one.
        </p>
        <p className="mt-1 inline-flex items-center gap-2 self-start rounded-full border-2 border-gm-gold-edge px-3 py-1 text-sm font-semibold text-gm-gold">
          <Coins className="size-4" aria-hidden="true" /> Your balance: {bucks ? bucks.balance : '…'} Actuary Bucks
        </p>
      </div>

      <div role="tablist" aria-label="Shop sections" className="gm-tabs mt-5">
        {CATEGORIES.map(c => (
          <button key={c.id} type="button" role="tab" aria-selected={category === c.id} className="gm-tab" onClick={() => shopStore.set(s => ({ ...s, category: c.id }))}>
            {c.label}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        {message}
      </p>
      {message && <p className="mt-4 text-sm font-semibold text-gm-lime">{message}</p>}

      <ul className="mt-5 grid list-none grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
        {items.map(item => {
          const have = isUnlocked(item.part, item.value, owned)
          const price = priceOf(item)
          const on = item.part === 'clothingGraphic' ? avatar.clothing === 'graphicShirt' && avatar.clothingGraphic === item.value : avatar[item.part] === item.value
          const needsTee = item.part === 'clothingGraphic' && !isUnlocked('clothing', 'graphicShirt', owned)
          const short = bucks ? price - bucks.balance : 0
          return (
            <li key={item.value} className="gm-inset flex min-w-0 flex-col gap-3 p-4">
              <div className="flex items-start gap-3">
                <img src={avatarUri(wearing({ ...avatar, background: 'transparent' }, item))} alt="" className="size-16 shrink-0 rounded-xl border-2 border-gm-line bg-gm-night" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-bold">{item.name}</h3>
                    <span className={clsx('gm-chip shrink-0', RARITY_CHIP[item.rarity])}>{RARITY_LABEL[item.rarity]}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-gm-ink-soft">{item.blurb}</p>
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="inline-flex items-center gap-1.5 font-semibold text-gm-gold">
                  {have ? (
                    <>
                      <Check className="size-4" aria-hidden="true" /> Owned
                    </>
                  ) : (
                    <>
                      <Coins className="size-4" aria-hidden="true" /> {price}
                      <span className="sr-only">Actuary Bucks</span>
                    </>
                  )}
                </p>
                {have ? (
                  <button type="button" disabled={on} onClick={() => wear(item)} className="btn-arcade btn-arcade-xs btn-arcade-night w-full sm:w-auto">
                    {on ? 'Wearing' : 'Wear'}
                  </button>
                ) : needsTee ? (
                  <button type="button" disabled className="btn-arcade btn-arcade-xs btn-arcade-night w-full sm:w-auto">
                    <Lock className="size-3.5" aria-hidden="true" /> Needs the graphic tee
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={!bucks || short > 0}
                    onClick={() => buy(item)}
                    className={clsx('btn-arcade btn-arcade-xs w-full sm:w-auto', bucks && short > 0 ? 'btn-arcade-night' : 'btn-arcade-lime')}
                  >
                    {bucks && short > 0 ? `Need ${short} more` : `Buy for ${price}`}
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
      <p className="mt-5 text-center text-xs text-gm-ink-dim">Gender, skin, hair, eye colour, glasses, colours and backgrounds are always free in Settings.</p>
    </dialog>
  )
}

import { describe, expect, it } from 'vitest'
import defaultSvg from '../../public/avatar.svg?raw'
import { DEFAULT_AVATAR, NONE, OPTIONS, applyGender, avatarSvg, genderOf, normaliseAvatar, optionLabel, randomAvatar, topsFor } from './avatar'

describe('avatar', () => {
  it('public/avatar.svg is the default avatar (regenerate it if DEFAULT_AVATAR changes)', () => {
    expect(defaultSvg).toBe(avatarSvg(DEFAULT_AVATAR))
  })
  it('keeps valid saved options and replaces unknown ones', () => {
    expect(normaliseAvatar({ top: 'bob', mouth: 'nope' })).toEqual({ ...DEFAULT_AVATAR, top: 'bob' })
    expect(normaliseAvatar(undefined)).toEqual(DEFAULT_AVATAR)
  })
  it('random avatars only use known options', () => {
    for (let i = 0; i < 50; i++) for (const [k, v] of Object.entries(randomAvatar())) expect(OPTIONS[k as keyof typeof OPTIONS]).toContain(v)
  })
  it('every option has choices', () => {
    for (const [k, v] of Object.entries(OPTIONS)) expect(v.length, k).toBeGreaterThan(1)
  })
  it('gender picks matching hairstyles and drops beards for female', () => {
    const f = applyGender({ ...DEFAULT_AVATAR, facialHair: 'beardLight' }, 'female')
    expect(topsFor('female')).toContain(f.top)
    expect(f.facialHair).toBe(NONE)
    expect(genderOf(f)).toBe('female')
    expect(applyGender(f, 'male').top).toBe('shortFlat')
    for (let i = 0; i < 50; i++) {
      const a = randomAvatar('female')
      expect(topsFor('female')).toContain(a.top)
      expect(a.facialHair).toBe(NONE)
    }
  })
  it('labels options readably', () => {
    expect(optionLabel('shortFlat')).toBe('Short flat')
    expect(optionLabel('winterHat02')).toBe('Winter hat 2')
    expect(optionLabel(NONE)).toBe('None')
  })
})


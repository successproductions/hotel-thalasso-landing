import type { ElementType } from 'react'
import { cx } from './ui'

// Le titre maison : deux lignes en capitales espacées.
// Chaque ligne monte depuis derrière sa ligne de base quand elle entre à l'écran.
// title__mask, title__em et title__caps servent de repères aux animations (App.tsx).
// size remplace la taille des lignes (premier écran, sections texte + photo).
const line = 'block font-sans font-normal leading-[1.05] tracking-[0.06em] uppercase text-balance'
const sizes = {
  base: 'text-[clamp(1.875rem,1.2rem+2.2vw,3.25rem)]',
  split: 'text-[clamp(1.875rem,1.2rem+2vw,2.625rem)]',
  hero: 'text-[clamp(2.5rem,1.2rem+4.4vw,5.5rem)] tracking-[0.05em]',
}

type TitleProps = {
  id?: string
  eyebrow?: string
  em?: string
  caps: string
  as?: ElementType
  light?: boolean
  center?: boolean
  size?: keyof typeof sizes
}

export function Title({ id, eyebrow, em, caps, as: Tag = 'h2', light, center, size = 'base' }: TitleProps) {
  const mask = 'title__mask block overflow-hidden pb-[0.08em] -mb-[0.08em]'
  return (
    <Tag id={id} className={cx('flex flex-col gap-[0.1em] font-normal', light ? 'text-on-dark' : 'text-ink', center && 'items-center text-center')} data-title>
      {eyebrow && <span className={mask}><span className="title__em block font-sans font-normal text-[0.8125rem] leading-[1.4] tracking-[0.24em] uppercase mb-2 max-sm:text-[0.6875rem] max-sm:tracking-[0.18em]">{eyebrow}</span></span>}
      {em && <span className={mask}><span className={cx('title__em', line, size === 'hero' ? sizes.hero : sizes.base)}>{em}</span></span>}
      <span className={mask}><span className={cx('title__caps', line, sizes[size])}>{caps}</span></span>
    </Tag>
  )
}

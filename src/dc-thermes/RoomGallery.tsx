'use client'

import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { cx, pill, arrow } from './ui'
import type { Pack } from './i18n'

// Galerie des photos d'une chambre (photos SiteMinder), ouverte depuis la liste des chambres de la page de réservation.
// <dialog> natif : Échap ferme, le focus reste dedans puis revient au bouton qui l'a ouverte.
// Les photos défilent au doigt (scroll-snap) ; flèches, vignettes et clavier (← →) pour les autres appareils.

const size = (url: string, w: number, h: number) => `${url}?w=${w}&h=${h}&fit=crop&auto=format`
const navBtn =
  'absolute top-1/2 -translate-y-1/2 grid place-items-center size-11 rounded-full bg-white/90 text-ink shadow-[0_6px_18px_-6px_rgb(28_27_25/0.45)] transition-opacity duration-300 hover:bg-white disabled:opacity-0 max-sm:size-9'

export function RoomGallery({ room, meta, price, photos, chosen, b, onChoose, onClose }: {
  room: string
  meta: string
  price: string
  photos: string[]
  chosen: boolean
  b: Pack['bookingPage']
  onChoose: () => void
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const thumbs = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const last = photos.length - 1

  // Ouverte dès l'affichage ; la page derrière ne défile plus.
  // Pas de close() au nettoyage : en développement, React lance l'effet deux fois (Strict Mode) et l'événement
  // « close » refermerait aussitôt la galerie. Retirée de la page, la fenêtre disparaît d'elle-même.
  useEffect(() => {
    const d = dialog.current
    if (d && !d.open) d.showModal()
    const html = document.documentElement
    const before = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = before
    }
  }, [])

  // La vignette de la photo affichée reste visible
  useEffect(() => {
    thumbs.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }, [index])

  const go = (i: number) => {
    const t = track.current
    if (t) t.scrollTo({ left: Math.max(0, Math.min(last, i)) * t.clientWidth, behavior: 'smooth' })
  }
  const onScroll = () => {
    const t = track.current
    if (t) setIndex(Math.round(t.scrollLeft / t.clientWidth))
  }
  const onKey = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      go(index + (e.key === 'ArrowRight' ? 1 : -1))
    }
  }

  return (
    <dialog
      ref={dialog}
      className="w-[min(980px,calc(100vw-32px))] max-w-none max-h-[calc(100dvh-32px)] m-auto p-0 border-0 rounded-[18px] bg-white text-ink overflow-y-auto overscroll-contain backdrop:bg-[rgb(28_27_25/0.72)] max-sm:w-[calc(100vw-16px)] max-sm:max-h-[calc(100dvh-16px)]"
      aria-labelledby="gallery-title"
      onClose={onClose}
      onKeyDown={onKey}
      // Un clic sur le fond sombre ferme la galerie
      onClick={(e) => e.target === dialog.current && dialog.current.close()}
    >
      <div className="grid gap-4 p-[clamp(16px,2.4vw,28px)]">
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1 min-w-0">
            <h2 id="gallery-title" className="font-serif italic font-normal text-[1.75rem] leading-[1.1] max-sm:text-[1.5rem]">{room}</h2>
            <p className="text-[0.875rem] text-muted">{meta}</p>
          </div>
          <button type="button" className="flex-none grid place-items-center size-11 rounded-full border border-line text-[1.5rem] leading-none hover:border-ink" onClick={() => dialog.current?.close()} aria-label={b.galleryClose}>
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div className="relative">
          <div ref={track} onScroll={onScroll} className="flex overflow-x-auto snap-x snap-mandatory rounded-[12px] bg-panel [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {photos.map((url, i) => (
              <img key={url} className="flex-none w-full aspect-[3/2] object-cover snap-center" src={size(url, 1400, 933)} alt={b.photoOf(i + 1, photos.length)} loading={i < 2 ? 'eager' : 'lazy'} />
            ))}
          </div>
          <button type="button" className={cx(navBtn, 'left-3')} onClick={() => go(index - 1)} disabled={index <= 0} aria-label={b.photoPrev}>
            <span className={cx(arrow(true), 'ml-1')} aria-hidden="true" />
          </button>
          <button type="button" className={cx(navBtn, 'right-3')} onClick={() => go(index + 1)} disabled={index >= last} aria-label={b.photoNext}>
            <span className={cx(arrow(), 'mr-1')} aria-hidden="true" />
          </button>
          <p className="absolute left-3 bottom-3 m-0 py-1 px-[10px] rounded-full bg-[rgb(28_27_25/0.72)] text-white text-[0.8125rem] tabular-nums" aria-live="polite">
            {index + 1} / {photos.length}
          </p>
        </div>

        {photos.length > 1 && (
          <div ref={thumbs} className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {photos.map((url, i) => (
              <button
                key={url}
                type="button"
                className={cx('flex-none w-24 aspect-[3/2] overflow-hidden rounded-[8px] border-2 transition-opacity', i === index ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100')}
                onClick={() => go(i)}
                aria-label={b.photoOf(i + 1, photos.length)}
                aria-current={i === index}
              >
                <img className="w-full h-full object-cover" src={size(url, 192, 128)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-line">
          <p className="m-0 text-[1.125rem]">{price}</p>
          <button
            type="button"
            className={pill(chosen ? 'outline' : 'dark')}
            onClick={() => {
              onChoose()
              dialog.current?.close()
            }}
          >
            {chosen ? b.roomChosen : b.chooseRoom}
          </button>
        </div>
      </div>
    </dialog>
  )
}

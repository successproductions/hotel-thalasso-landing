import { useEffect, useRef, useState } from 'react'
import type { SyntheticEvent } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useT } from './i18n'
import { Title } from './Title'
import { lockScroll } from './motion'
import { cx, arrow, blockHead } from './ui'
import type { Video } from './types'

// Ce qu'en disent nos hôtes : une citation qui change toutes les 6 secondes, les notes avec leurs logos,
// puis les vidéos des créateurs (aperçu muet au survol, plein écran avec le son au clic).

const DELAY = 6000

function QuoteCarousel() {
  const { proof, ui } = useT()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  const quotes = proof.quotes

  useEffect(() => {
    if (paused) return
    const t = setTimeout(() => setI((n) => (n + 1) % quotes.length), DELAY)
    return () => clearTimeout(t)
  }, [i, paused, quotes.length])

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.fromTo('.qc__quote', { y: 18, opacity: 0, filter: 'blur(6px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: 'expo.out', clearProps: 'filter' })
      gsap.fromTo('.qc__by', { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.2 })
    },
    { scope: box, dependencies: [i], revertOnUpdate: true }
  )

  const [q, name, date] = quotes[i]
  return (
    <div className="grid gap-5 min-h-[12em] content-start max-md:min-h-0" ref={box} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription={ui.carousel} aria-label={ui.reviewsLabel}>
      <blockquote className="qc__quote m-0 font-serif italic font-normal text-[clamp(1.625rem,1.1rem+1.6vw,2.5rem)] leading-[1.28] max-w-[30ch]" aria-live="polite">{ui.quoteOpen}{q}{ui.quoteClose}</blockquote>
      <p className="qc__by flex items-center gap-2 flex-wrap text-[0.875rem] text-on-dark-muted">
        <img className="invert" src="/images/dc-thermes/logos/tripadvisor.svg" alt="" width="18" height="18" />
        {name} · {date}{ui.translated && ` · ${ui.translated}`} · <a className="text-on-dark underline underline-offset-[3px]" href={proof.quotesLink} target="_blank" rel="noopener">{ui.tripadvisorReview}</a>
      </p>
      <div className="flex gap-2 mt-1.5">
        {quotes.map((_, n) => (
          <button key={n} type="button" className={cx('relative h-[3px] border-0 p-0 rounded-[3px] bg-on-dark/22 cursor-pointer overflow-hidden transition-[width] duration-500 ease-brand', n === i ? 'w-16' : 'w-7')} onClick={() => setI(n)} aria-label={ui.reviewN(n + 1, quotes.length)}>
            {n === i && <span key={`${i}-${paused}`} className={cx('absolute inset-0 bg-on-dark origin-left animate-qcbar', paused && '[animation-play-state:paused]')} style={{ animationDuration: `${DELAY}ms` }} />}
          </button>
        ))}
      </div>
    </div>
  )
}

function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
  const { ui } = useT()
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    lockScroll(true)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    box.current?.querySelector('button')?.focus()
    return () => {
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  useGSAP(() => {
    gsap.fromTo('.vm', { opacity: 0 }, { opacity: 1, duration: 0.4 })
    gsap.fromTo('.vm__frame', { scale: 0.92, y: 20 }, { scale: 1, y: 0, duration: 0.7, ease: 'expo.out' })
  }, { scope: box })
  return (
    <div className="vm fixed inset-0 z-[100] grid place-items-center bg-[rgb(15_14_13/0.86)] p-6" ref={box} role="dialog" aria-modal="true" aria-label={video.label} onClick={onClose}>
      <div className="vm__frame relative h-[min(86vh,860px)] aspect-[9/16] max-w-full rounded-[18px] overflow-hidden bg-black" onClick={(e) => e.stopPropagation()}>
        <video className="w-full h-full object-cover" src={video.src} poster={video.poster} controls autoPlay playsInline />
        <button type="button" className="absolute top-3 right-3 w-10 h-10 rounded-full border-0 bg-white/92 cursor-pointer" onClick={onClose} aria-label={ui.closeVideo}><span className="before:content-[''] before:absolute before:left-3 before:top-[19px] before:w-4 before:h-[1.5px] before:bg-ink before:rotate-45 after:content-[''] after:absolute after:left-3 after:top-[19px] after:w-4 after:h-[1.5px] after:bg-ink after:-rotate-45" /></button>
      </div>
    </div>
  )
}

// Une seule section, sur fond sombre : le titre, les vidéos des créateurs, puis la citation qui tourne et les notes.
export default function Reviews() {
  const { proof, ui } = useT()
  const [open, setOpen] = useState<Video | null>(null)
  const root = useRef<HTMLElement>(null)
  const play = (e: SyntheticEvent<HTMLButtonElement>) => {
    const v = e.currentTarget.querySelector('video')
    if (!v) return
    if (!v.src) v.src = v.dataset.src ?? ''
    v.currentTime = 0
    v.play().catch(() => {})
  }
  const stop = (e: SyntheticEvent<HTMLButtonElement>) => e.currentTarget.querySelector('video')?.pause()

  // Chaque vidéo dérive à sa propre vitesse au défilement
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 861px)', () => {
        gsap.utils.toArray<HTMLElement>('.reel__list li').forEach((li, i) => {
          gsap.fromTo(li, { y: [50, 0, 70, 15, 55][i] ?? 30 }, { y: [-15, -50, 0, -40, -10][i] ?? -15, ease: 'none', scrollTrigger: { trigger: '.reel__list', start: 'top bottom', end: 'bottom top', scrub: true } })
        })
      })
    },
    { scope: root }
  )

  return (
    <section className="py-section px-m bg-dark text-on-dark overflow-hidden" id="avis" aria-labelledby="proof-title" ref={root}>
      <div className={cx(blockHead, '[&_p]:text-on-dark-muted!')}>
        <Title id="proof-title" em={proof.em} caps={proof.caps} light center />
        {proof.sub && <p data-reveal>{proof.sub}</p>}
      </div>

      <ul className="reel__list max-w-[1320px] mx-auto grid grid-cols-5 gap-[clamp(12px,1.4vw,22px)] items-start max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:-mx-m max-md:px-m max-md:max-w-none max-md:[scrollbar-width:none] max-md:[&::-webkit-scrollbar]:hidden">
        {proof.videos.map((v) => (
          <li className="max-sm:flex-[0_0_58%] sm:max-md:flex-[0_0_34%] max-md:snap-start" key={v.src}>
            <button type="button" className="group/reel relative block w-full aspect-[9/16] p-0 border-0 rounded-[20px] overflow-hidden cursor-pointer bg-dark text-white text-left transition-shadow duration-[600ms] ease-brand hover:shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(180deg,transparent_55%,rgb(0_0_0/0.55))]" onMouseEnter={play} onMouseLeave={stop} onFocus={play} onBlur={stop} onClick={() => setOpen(v)} aria-label={ui.watch(v.label)}>
              <img className="absolute inset-0 w-full h-full object-cover [transition:transform_1.2s_cubic-bezier(0.16,1,0.3,1),scale_1.2s_cubic-bezier(0.16,1,0.3,1),opacity_0.6s_cubic-bezier(0.22,1,0.36,1)] group-hover/reel:scale-[1.04]" src={v.poster} alt="" loading="lazy" />
              <video className="absolute inset-0 w-full h-full object-cover [transition:transform_1.2s_cubic-bezier(0.16,1,0.3,1),scale_1.2s_cubic-bezier(0.16,1,0.3,1),opacity_0.6s_cubic-bezier(0.22,1,0.36,1)] group-hover/reel:scale-[1.04] opacity-0 group-hover/reel:opacity-100 group-focus-visible/reel:opacity-100 max-md:hidden" data-src={v.src} muted loop playsInline preload="none" aria-hidden="true" />
              <span className="absolute left-4 right-4 bottom-4 z-[1] text-[0.9375rem] font-normal">{v.label}</span>
              <span className="absolute top-3.5 right-3.5 z-[1] w-[38px] h-[38px] rounded-full bg-white/90 transition-transform duration-[400ms] ease-brand group-hover/reel:scale-110 after:content-[''] after:absolute after:left-[15px] after:top-3 after:border-l-[11px] after:border-l-ink after:border-y-[7px] after:border-y-transparent" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <div className="max-w-[1320px] mx-auto mt-[clamp(64px,7vw,112px)] grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-[clamp(32px,5vw,96px)] items-start max-md:mt-12 max-md:grid-cols-1">
        <QuoteCarousel />
        <div className="mt-3" data-reveal>
          <ul className="grid bg-white text-ink rounded-[18px] overflow-hidden [&>li+li>a]:border-t [&>li+li>a]:border-line">
            {proof.ratings.map((r) => (
              <li key={r.platform}>
                <a className="group/sc grid grid-cols-[1.4fr_auto_1fr_16px] items-center gap-4 py-5 px-6 no-underline text-ink transition-[background-color] duration-[400ms] ease-brand hover:bg-[#faf9f7] max-md:py-4 max-md:px-[18px] max-md:gap-2.5" href={r.url} target="_blank" rel="noopener" aria-label={ui.scoreAria(r)}>
                  <span className="flex items-center gap-2 text-[0.9375rem] font-normal">
                    <img className={r.color ? 'w-auto h-4' : r.wide ? 'w-auto h-[18px] [filter:grayscale(1)_brightness(0.25)]' : 'w-auto h-5'} src={r.logo} alt="" />
                    {!r.wide && <span>{r.platform}</span>}
                  </span>
                  <span className="font-serif italic font-normal text-[2rem] leading-none">{r.score}<small className="font-sans not-italic font-light text-[0.42em] leading-none text-soft ml-[3px]">{r.scale}</small></span>
                  <span className="text-[0.875rem] text-muted text-right">{r.count}</span>
                  <span className={cx(arrow(), 'group-hover/sc:translate-x-1')} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3.5 mt-5">
            {proof.awards.map((a) => <img className="w-16 h-16 object-cover rounded-[10px]" key={a.alt} src={a.img} alt={a.alt} width="240" height="240" loading="lazy" />)}
            <p className="text-[0.8125rem] text-on-dark-muted max-w-[26ch]">{proof.note}</p>
          </div>
        </div>
      </div>

      {open && <VideoModal video={open} onClose={() => setOpen(null)} />}
    </section>
  )
}

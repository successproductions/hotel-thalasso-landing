'use client'

import { useEffect, useRef, useState } from 'react'
import type { MouseEvent as ReactMouseEvent, ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Planner from './Planner'
import Programme from './Programme'
import Reviews from './Reviews'
import { Title } from './Title'
import { useSmoothScroll, scrollToId } from './motion'
import { packs, LangContext, number } from './i18n'
import { cx, pill, link, arrow, logo, blockHead } from './ui'
import { landingHref } from './funnel'
import { captureAttribution } from '@/lib/metaTracking'
import type { CureKey, Funnel, Lang } from './types'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger, useGSAP)

// Groupe de pastilles de l'en-tête : verre clair sur la photo, blanc dès que l'on défile
const pillGroup =
  'flex items-center gap-1 p-[5px] rounded-full w-fit bg-white/14 border border-white/28 text-white backdrop-blur-[14px] transition-[background-color,color,border-color] duration-500 ease-brand in-[.is-scrolled]:bg-white/86 in-[.is-scrolled]:border-line in-[.is-scrolled]:text-ink'
const pillGroupLink =
  'py-[9px] px-4 text-[0.875rem] no-underline rounded-full transition-[background-color] duration-300 ease-brand hover:bg-white/18 in-[.is-scrolled]:hover:bg-panel'

// Panneaux en demi-écran
const split = 'grid grid-cols-2 min-h-svh bg-page max-md:grid-cols-1 max-md:min-h-0'
const splitPanel = 'grid items-center bg-[radial-gradient(120%_90%_at_30%_20%,#f6f5f2_0%,var(--color-panel)_100%)]'
const splitMedia = (reverse?: boolean, film?: boolean) =>
  cx(
    'relative overflow-hidden min-h-[70svh] max-md:order-[-1] max-md:min-h-0',
    film ? 'bg-dark max-md:aspect-[16/10]' : 'bg-panel max-md:aspect-[4/5]',
    'sm:max-md:aspect-[16/11]',
    reverse && 'order-2'
  )
const splitImg = 'absolute inset-x-0 inset-y-[-6%] w-full h-[112%] object-cover'
const panel = (center?: boolean) =>
  cx('w-full max-w-[560px] mx-auto py-section px-m grid gap-[26px] max-md:py-16 max-md:gap-5', center ? 'justify-items-center text-center' : 'justify-items-start')
const panelText = 'max-w-[44ch] text-muted'

// Pied de page
const footCol = 'grid gap-2.5 content-start'
const footTitle = 'text-[0.75rem] tracking-[0.18em] uppercase text-soft'
const footLink = 'no-underline w-fit text-ink hover:underline hover:underline-offset-3'

// Questions : le + devient − à l'ouverture
const qaIcon =
  "relative w-3.5 h-3.5 flex-none before:content-[''] before:absolute before:left-0 before:top-[6.5px] before:w-3.5 before:h-px before:bg-current before:transition-transform before:duration-[450ms] before:ease-brand after:content-[''] after:absolute after:left-0 after:top-[6.5px] after:w-3.5 after:h-px after:bg-current after:transition-transform after:duration-[450ms] after:ease-brand after:[transform:rotate(90deg)] group-open:after:[transform:rotate(0)]"
// Réponses : paragraphes et listes, l'espace du bas sur le dernier élément
const qaGap = '[p+&]:mt-3 [ul+&]:mt-3 [ol+&]:mt-3 last:pb-7'
const qaList = 'grid gap-2 [p+&]:mt-3 last:pb-7'

function go(id: string) {
  return (e: ReactMouseEvent) => {
    e.preventDefault()
    scrollToId(id)
  }
}

// Liste numérotée : seuls les titres s'affichent, la phrase s'ouvre au survol (ou au toucher), comme les anciens univers
function Gains({ items }: { items: string[][] }) {
  const [open, setOpen] = useState(0)
  return (
    <ol className="w-full [counter-reset:gain]" data-reveal>
      {items.map(([title, text], i) => {
        const on = i === open
        return (
          <li key={title} className={cx("[counter-increment:gain] grid grid-cols-[44px_minmax(0,1fr)] gap-x-3 py-3.5 border-t border-line last:border-b transition-[padding] duration-[450ms] ease-brand before:content-[counter(gain,decimal-leading-zero)] before:row-span-2 before:text-[0.75rem] before:tracking-[0.1em] before:text-soft before:pt-1.5", on ? 'gap-y-1.5' : 'gap-y-0')} onMouseEnter={() => setOpen(i)}>
            <button type="button" className={cx('bg-transparent border-0 p-0 text-left cursor-pointer font-sans font-normal text-[1.125rem] leading-[1.4] tracking-[0.04em] transition-[color] duration-[400ms] ease-brand focus-visible:outline-offset-4', on ? 'text-ink' : 'text-soft')} aria-expanded={on} onFocus={() => setOpen(i)} onClick={() => setOpen(i)}>{title}</button>
            <div className={cx('grid transition-[grid-template-rows] duration-[550ms] ease-brand', on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}><span className={cx('overflow-hidden min-h-0 text-muted text-[0.9375rem] max-w-[46ch] transition-opacity duration-[450ms] ease-brand', on ? 'opacity-100' : 'opacity-0')}>{text}</span></div>
          </li>
        )
      })}
    </ol>
  )
}

// Icônes des réseaux sociaux : traits fins, couleur du texte
const socialIcons: Record<string, ReactNode> = {
  Instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" /></>,
  Facebook: <path d="M14.2 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5h1.6V4.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8.5v3h2.6V21" />,
  YouTube: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10.4 9.4v5.2l4.5-2.6z" fill="currentColor" stroke="none" /></>,
}

function Logo({ light, alt, className }: { light?: boolean; alt: string; className?: string }) {
  return <img className={cx(logo(light), className)} src="/images/dc-thermes/logo-dc.webp" width="600" height="296" alt={alt} />
}

export default function App({ lang = 'fr', funnel = 'main' }: { lang?: Lang; funnel?: Funnel }) {
  const t = packs[lang] || packs.fr
  const { site, nav, hero, intro, benefits, cures, curesHead, booking, why, gift, faq, ui } = t
  const mad = (n: number) => number(t, n)
  const root = useRef<HTMLDivElement>(null)
  // Deux choix indépendants : la cure affichée dans le programme, et celle du formulaire de réservation
  const [progKey, setProgKey] = useState<CureKey>('regeneration')
  const [bookKey, setBookKey] = useState<CureKey>('regeneration')

  // Publicité Meta : fbclid et utm_* du lien d'arrivée sont gardés pour la page de réservation
  useEffect(() => captureAttribution(), [])
  // Téléphone : la liste « ce qui est inclus » se déplie à la demande
  const [openOffer, setOpenOffer] = useState<CureKey | null>(null)
  useSmoothScroll()

  const pick = (key: CureKey, target: string) => (e: ReactMouseEvent) => {
    if (target === 'programme') setProgKey(key)
    else setBookKey(key)
    go(target)(e)
  }

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      // Sur écran tactile, les mouvements sont plus courts : le pouce défile vite
      const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches
      const k = touch ? 0.65 : 1

      // En-tête : les pastilles prennent un fond dès que l'on quitte la photo
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'bottom 80px',
        onEnter: () => document.body.classList.add('is-scrolled'),
        onLeaveBack: () => document.body.classList.remove('is-scrolled'),
      })

      // Le film ne se charge qu'à l'approche de sa section, et se met en pause hors de l'écran
      const film = document.querySelector<HTMLVideoElement>('.film video')
      if (film && !reduce) {
        ScrollTrigger.create({
          trigger: film,
          start: 'top bottom+=200',
          end: 'bottom top',
          onToggle: ({ isActive }) => {
            if (isActive) {
              if (!film.src) film.src = film.dataset.src ?? ''
              film.play().catch(() => {})
            } else film.pause()
          },
        })
      }

      // Soins du programme et questions : ouverture et fermeture animées
      const onSummary = (e: MouseEvent) => {
        const summary = (e.target as Element).closest('details.tr > summary, details.qa > summary')
        if (!summary || reduce) return
        const details = summary.parentElement as HTMLDetailsElement
        const body = details.querySelector(':scope > p, :scope > .qa__body')
        if (!body) return
        e.preventDefault()
        gsap.killTweensOf(body)
        if (details.open) {
          gsap.to(body, { height: 0, opacity: 0, duration: 0.35, ease: 'power3.inOut', onComplete: () => { details.open = false; gsap.set(body, { clearProps: 'all' }) } })
        } else {
          details.open = true
          gsap.fromTo(body, { height: 0, opacity: 0, y: -8 }, { height: 'auto', opacity: 1, y: 0, duration: 0.5, ease: 'expo.out', clearProps: 'height,transform' })
        }
      }
      document.addEventListener('click', onSummary)

      if (reduce) return

      // Premier écran : la photo se pose, la ligne en italique puis les capitales montent
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.hero__media img', { scale: 1.12 }, { scale: 1, duration: 2.6, ease: 'power2.out' }, 0)
        .from('.hero .title__em', { yPercent: 110, duration: 1.4 }, 0.3)
        .from('.hero .title__caps', { yPercent: 110, duration: 1.4 }, 0.45)
        .from('.hero__foot > *', { opacity: 0, y: 16, duration: 1.1, stagger: 0.1, clearProps: 'opacity,transform' }, 0.9)
        .from('.header > *', { opacity: 0, y: -10, duration: 1, stagger: 0.08, clearProps: 'opacity,transform' }, 0.6)

      gsap.to('.hero__media img', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      // Le contenu du premier écran s'éloigne quand on le quitte
      gsap.to('.hero__center, .hero__foot', {
        y: -90,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 35%', scrub: true },
      })

      // Les offres montent en décalé ; leur texte et leur prix restent toujours visibles
      ScrollTrigger.create({
        trigger: '.offers__grid',
        start: 'top 95%',
        once: true,
        onEnter: () => {
          gsap.from('.offer', { y: 70, duration: 1.3, ease: 'expo.out', stagger: 0.12, clearProps: 'transform' })
          gsap.fromTo('.offer__img img', { scale: 1.15 }, { scale: 1, duration: 1.8, ease: 'expo.out', stagger: 0.12, clearProps: 'transform' })
        },
      })

      // Titres hors du premier écran : chaque ligne monte quand le titre entre à l'écran
      gsap.utils.toArray<HTMLElement>('[data-title]').forEach((t) => {
        if (t.closest('.hero')) return
        const lines = t.querySelectorAll('.title__mask > span')
        gsap.set(lines, { yPercent: 110 })
        ScrollTrigger.create({
          trigger: t,
          start: 'top 90%',
          once: true,
          onEnter: () => gsap.to(lines, { yPercent: 0, duration: 1.3 * k, ease: 'expo.out', stagger: 0.12 * k }),
        })
      })

      // Textes : une fois, quand l'élément passe sous 88 % de l'écran (vérifié à chaque défilement)
      let pending = gsap.utils.toArray<HTMLElement>('[data-reveal]')
      gsap.set(pending, { opacity: 0, y: touch ? 14 : 24 })
      let queued = false
      const check = () => {
        queued = false
        const line = window.innerHeight * 0.88
        const ready = pending.filter((el) => el.getBoundingClientRect().top < line)
        if (!ready.length) return
        pending = pending.filter((el) => !ready.includes(el))
        gsap.to(ready, { opacity: 1, y: 0, duration: 1.1 * k, ease: 'expo.out', stagger: { each: 0.08 * k, amount: Math.min(0.3, ready.length * 0.08) * k } })
        if (!pending.length) window.removeEventListener('scroll', onScroll)
      }
      const onScroll = () => {
        if (!queued) {
          queued = true
          requestAnimationFrame(check)
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      check()

      // Photographies : ouverture de bas en haut, l'image se pose à l'intérieur
      gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
        const img = el.querySelector('img, video')
        gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' })
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4 * k, ease: 'expo.inOut' })
            if (img) gsap.fromTo(img, { scale: touch ? 1.08 : 1.18 }, { scale: 1, duration: 2 * k, ease: 'expo.out' })
          },
        })
      })

      // Grandes photos des panneaux : légère dérive au défilement
      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((img) => {
        gsap.fromTo(img, { yPercent: -5 }, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: img.closest('section') || img, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      return () => document.removeEventListener('click', onSummary)
    },
    { scope: root }
  )


  return (
    <LangContext.Provider value={lang}>
    <div ref={root}>
      <a className="absolute left-4 -top-[100px] z-100 bg-ink text-white py-2.5 px-4 rounded-full focus:top-3" href="#cures">{ui.skip}</a>

      <header className="header fixed inset-x-0 top-0 z-50 pt-[calc(env(safe-area-inset-top,0px)+18px)] px-m pb-0 grid grid-cols-[1fr_auto_1fr] items-start gap-4 pointer-events-none max-xl:grid-cols-[auto_1fr]">
        <nav className={cx(pillGroup, 'pointer-events-auto max-xl:hidden')} aria-label={ui.navLabel}>
          {nav.map(([id, label, url]) => url
            ? <a key={id} className={pillGroupLink} href={url} target="_blank" rel="noopener">{label}</a>
            : <a key={id} className={pillGroupLink} href={`#${id}`} onClick={go(id)}>{label}</a>)}
        </nav>
        <a className="relative block pointer-events-auto transition-[opacity,transform] duration-[600ms] ease-brand in-[.is-scrolled]:opacity-0 in-[.is-scrolled]:[transform:translateY(-12px)] in-[.is-scrolled]:pointer-events-none max-xl:col-[1] max-xl:row-[1]" href="#top" onClick={go('top')} aria-label={ui.home}>
          <Logo light alt={ui.logoAlt} className="h-[58px] max-xl:h-[46px]" />
          <Logo alt={ui.logoAlt} className="hidden" />
        </a>
        <div className={cx(pillGroup, 'pointer-events-auto justify-self-end max-md:in-[.is-scrolled]:opacity-0 max-md:in-[.is-scrolled]:pointer-events-none')}>
          <a className={pillGroupLink} href={landingHref(funnel, lang === 'fr' ? 'en' : 'fr')} hrefLang={lang === 'fr' ? 'en' : 'fr'} lang={lang === 'fr' ? 'en' : 'fr'} aria-label={ui.switchLabel}>{ui.switchShort}</a>
          <a className={pill('dark', { small: true })} href="#reserver" onClick={go('reserver')}>{ui.book}</a>
        </div>
      </header>

      <main id="top">
        {/* Premier écran */}
        <section className="hero relative h-[max(100svh,640px)] grid place-items-center text-on-dark overflow-hidden bg-[#3b4a47]" aria-labelledby="hero-title">
          <figure className="hero__media absolute inset-0 after:content-[''] after:absolute after:inset-0 after:bg-[radial-gradient(70%_55%_at_50%_52%,rgb(20_18_16/0.35),transparent_75%),linear-gradient(180deg,rgb(20_18_16/0.45),rgb(20_18_16/0.2)_38%,rgb(20_18_16/0.45)_68%,rgb(20_18_16/0.8))]">
            <img className="w-full h-full object-cover object-[50%_58%]" src="/images/dc-thermes/piscine-thermale.webp" width="2400" height="2130" alt={ui.heroAlt} fetchPriority="high" />
          </figure>
          <div className="hero__center relative px-m">
            <Title as="h1" id="hero-title" eyebrow={hero.eyebrow} em={hero.em} caps={hero.caps} light center size="hero" />
          </div>
          <div className="hero__foot absolute inset-x-0 bottom-[clamp(28px,5vh,56px)] grid justify-items-center gap-5 text-center px-m">
            <p className="max-w-[42ch] text-[1.0625rem] font-normal text-white [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]">{hero.lead}</p>
            <a className={pill('light')} href="#cures" onClick={go('cures')}>{hero.cta}</a>
            <a className="w-[30px] h-[30px] border border-white/50 rounded-full grid place-items-center" href="#pour-qui" onClick={go('pour-qui')} aria-label={ui.scrollNext}><span className="w-[7px] h-[7px] border-r border-b border-current [transform:translateY(-2px)_rotate(45deg)] animate-nudge" /></a>
          </div>
        </section>

        {/* Les cures : juste après le premier écran, lisibles d'un coup d'œil */}
        <section className="pt-[clamp(72px,7vw,112px)] px-m pb-section bg-page max-md:pt-14" id="cures" aria-labelledby="cures-title">
          <div className={cx(blockHead, 'mb-[clamp(36px,4vw,56px)]!')}>
            <Title id="cures-title" em={curesHead.em} caps={curesHead.caps} center />
            <p data-reveal>{curesHead.sub}</p>
          </div>
          <ul className="hidden max-xl:grid max-xl:grid-cols-3 max-xl:gap-2 max-xl:max-w-[620px] max-xl:mx-auto max-xl:mt-0 max-xl:mb-7" aria-label={ui.compareLabel}>
            {cures.map((c) => (
              <li key={c.key}>
                <a className={cx('grid gap-1 min-w-0 h-full py-3.5 px-3.5 rounded-[14px] no-underline transition-transform duration-200 ease-brand active:scale-[0.98] max-sm:py-3 max-sm:px-2.5', c.label ? 'bg-dark text-on-dark' : 'bg-white')} href={`#${c.key}`} onClick={go(c.key)}>
                  <span className="text-[0.75rem] tracking-[0.1em] uppercase min-w-0 [overflow-wrap:anywhere] max-sm:text-[0.6875rem] max-sm:tracking-[0.04em]">{c.name}</span>
                  <span className={cx('text-[0.8125rem] leading-[1.35]', c.label ? 'text-on-dark-muted' : 'text-muted')}>{c.days} {ui.days} · {c.treatments} {ui.treatments}</span>
                  <span className="font-serif italic font-normal text-[1.375rem] leading-[1.1] mt-1">{mad(c.price)} MAD</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="offers__grid grid grid-cols-3 gap-[clamp(16px,2vw,28px)] max-w-[1320px] mx-auto items-stretch max-xl:grid-cols-1 max-xl:max-w-[560px] sm:max-md:max-w-[620px]">
            {cures.map((c) => {
              const f = !!c.label
              const open = openOffer === c.key
              return (
              <article className={cx('offer group flex flex-col rounded-[18px] overflow-hidden transition-[transform,box-shadow] duration-[600ms] ease-brand hover:[transform:translateY(-6px)] hover:shadow-[0_30px_60px_-30px_rgb(28_27_25/0.35)]', f ? 'bg-dark text-on-dark' : 'bg-white')} key={c.key} id={c.key} aria-labelledby={`offer-${c.key}`}>
                <figure className="offer__img relative aspect-[4/3] overflow-hidden bg-panel max-md:aspect-[16/10]">
                  <img className="w-full h-full object-cover transition-transform duration-[1400ms] ease-slow group-hover:[transform:scale(1.05)]" src={c.img} alt={c.alt} loading="lazy" style={c.imgPos ? { objectPosition: c.imgPos } : undefined} />
                </figure>
                <div className="flex-1 flex flex-col gap-[18px] p-[clamp(24px,2.4vw,36px)] max-md:gap-3.5 max-md:pt-[22px] max-md:px-5 max-md:pb-5">
                  <div className="flex justify-between items-baseline gap-3">
                    <h3 className="font-sans font-normal text-[clamp(1.5rem,1.2rem+0.8vw,1.875rem)] leading-[1.1] tracking-[0.08em] uppercase" id={`offer-${c.key}`}>{c.name}</h3>
                    <p className={cx('flex-none py-[5px] px-3 rounded-full border text-[0.875rem] font-normal', f ? 'border-line-dark' : 'border-line')}>{c.days} {ui.days}</p>
                  </div>
                  <p className={cx('min-h-[3.4em] max-md:min-h-0', f ? 'text-on-dark-muted' : 'text-muted')}>{c.for}</p>
                  <p className={cx('text-[0.875rem]', f ? 'text-on-dark-muted' : 'text-soft')}><span className={cx('block font-serif italic font-normal text-[clamp(2.25rem,1.8rem+1.2vw,2.875rem)] leading-none mb-1.5 max-md:text-[2.125rem]', f ? 'text-on-dark' : 'text-ink')}>{mad(c.price)} MAD</span> {ui.perPerson} · {c.euro} € · {ui.lodging}</p>
                  <ul className={cx('flex gap-0 border-y', f ? 'border-line-dark' : 'border-line')}>
                    <li className={cx('flex-1 py-3 text-[0.9375rem]', f ? 'text-on-dark-muted' : 'text-muted')}><strong className={cx('font-normal text-[1.125rem] mr-1', f ? 'text-on-dark' : 'text-ink')}>{c.treatments}</strong> {ui.treatments}</li>
                    <li className={cx('flex-1 py-3 pl-4 border-l text-[0.9375rem]', f ? 'border-line-dark text-on-dark-muted' : 'border-line text-muted')}><strong className={cx('font-normal text-[1.125rem] mr-1', f ? 'text-on-dark' : 'text-ink')}>{c.hours} h</strong> {ui.hoursOf}</li>
                  </ul>
                  <button type="button" className={cx('group/toggle hidden max-md:flex items-center justify-between w-full py-3 border-b bg-transparent font-sans font-normal text-[0.9375rem] leading-[normal] tracking-normal text-inherit cursor-pointer', f ? 'border-line-dark' : 'border-line')} aria-expanded={open} aria-controls={`inc-${c.key}`} onClick={() => setOpenOffer(open ? null : c.key)}>
                    {ui.included}<span className="w-2 h-2 border-r-[1.5px] border-b-[1.5px] border-current [transform:rotate(45deg)_translateY(-2px)] transition-transform duration-300 ease-brand group-aria-expanded/toggle:[transform:rotate(-135deg)_translateY(-2px)]" aria-hidden="true" />
                  </button>
                  <ul className={cx('grid gap-[9px] max-md:pt-1', open ? 'max-md:animate-inc-open' : 'max-md:hidden')} id={`inc-${c.key}`}>
                    {c.includes.map((i) => <li key={i} className="relative pl-7 text-[0.9375rem] before:content-[''] before:absolute before:left-0.5 before:top-[0.45em] before:w-[11px] before:h-[6px] before:border-l-[1.5px] before:border-b-[1.5px] before:border-current before:[transform:rotate(-45deg)]">{i}</li>)}
                  </ul>
                  <div className="mt-auto pt-2 grid gap-3.5 justify-items-center max-md:pt-1">
                    <a className={pill(f ? 'light' : 'dark', { block: true })} href="#reserver" onClick={pick(c.key, 'reserver')}>{ui.reserve(c.name)}</a>
                    <a className={cx(link, f && 'text-on-dark')} href="#programme" onClick={pick(c.key, 'programme')}>{ui.seeProgramme}</a>
                  </div>
                </div>
              </article>
              )
            })}
          </div>
          <p className="text-center mt-9 text-[0.875rem] text-soft">{curesHead.note}</p>
        </section>

        {/* Pour qui : texte à gauche, photographie à droite */}
        <section className={split} id="pour-qui" aria-labelledby="intro-title">
          <div className={splitPanel}>
            <div className={panel()}>
              <Title id="intro-title" em={intro.em} caps={intro.caps} size="split" />
              <p className={panelText} data-reveal>{intro.text}</p>
              <Gains items={intro.signs} />
              <p className={panelText} data-reveal>{intro.after}</p>
              {intro.guide.length > 0 ? (
                <ul className="grid gap-3 w-full" data-reveal>
                  {intro.guide.map(([text, key, label]) => (
                    <li key={key} className="grid gap-0.5 text-muted text-[0.9375rem]">{text} <a className={link} href={`#${key}`} onClick={go(key)}>{label}</a></li>
                  ))}
                </ul>
              ) : (
                <a className={link} href="#cures" onClick={go('cures')} data-reveal>{intro.link}</a>
              )}
            </div>
          </div>
          <figure className={splitMedia()} data-clip>
            <img className={splitImg} data-drift src="/images/dc-thermes/thermes-arches.webp" width="2400" height="1350" alt={ui.introAlt} loading="lazy" style={{ objectPosition: '42% 50%' }} />
          </figure>
        </section>

        {/* Les bienfaits : le Dakhla Club vu du ciel, et ce que la cure apporte */}
        <section className={split} id="bienfaits" aria-labelledby="benefits-title">
          <figure className={splitMedia()} data-clip>
            <img className={splitImg} data-drift src="/images/dc-thermes/dakhla-club-lagune.webp" width="1800" height="1013" alt={benefits.alt} loading="lazy" />
            <figcaption className="absolute left-[clamp(20px,3vw,40px)] bottom-[clamp(20px,3vw,36px)] z-1 py-2 px-3.5 rounded-full bg-[rgb(28_27_25/0.35)] backdrop-blur-[10px] text-page text-[0.8125rem] tracking-[0.04em]">{benefits.caption}</figcaption>
          </figure>
          <div className={splitPanel}>
            <div className={panel()}>
              <Title id="benefits-title" em={benefits.em} caps={benefits.caps} size="split" />
              <p className={panelText} data-reveal>{benefits.lead}</p>
              <Gains items={benefits.items} />
              <p className={panelText} data-reveal>{benefits.after}</p>
              <a className={link} href="#programme" onClick={go('programme')} data-reveal>{ui.seeProgramme}</a>
            </div>
          </div>
        </section>

        <Programme cureKey={progKey} onCureChange={setProgKey} onBook={(e) => pick(progKey, 'reserver')(e)} />

        {/* Réserver */}
        <section className="py-section px-m bg-panel" id="reserver" aria-labelledby="booking-title">
          <div className={blockHead}>
            <Title id="booking-title" em={booking.em} caps={booking.caps} center />
            <p data-reveal>{booking.sub}</p>
          </div>
          <Planner cureKey={bookKey} onCureChange={setBookKey} funnel={funnel} />
        </section>

        {/* Ce qui fait la différence : le film à gauche */}
        <section className={split} aria-labelledby="why-title">
          <figure className={cx('film', splitMedia(false, true))} data-clip>
            <video className={splitImg} data-src="/videos/dc-thermes/dc-thermes.mp4" poster="/images/dc-thermes/soin-affusion.webp" muted loop playsInline preload="none" aria-label={ui.filmLabel} />
          </figure>
          <div className={splitPanel}>
            <div className={panel()}>
              <Title id="why-title" em={why.em} caps={why.caps} size="split" />
              <dl className="grid gap-[26px] w-full mt-2">
                {why.items.map(([t, d]) => (
                  <div key={t} className="border-t border-line pt-5 grid gap-1.5" data-reveal><dt className="text-[0.8125rem] tracking-[0.16em] uppercase">{t}</dt><dd className="text-muted max-w-[42ch]">{d}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Offrir */}
        <section className={split} id="offrir" aria-labelledby="gift-title">
          <figure className={splitMedia(true)} data-clip>
            <img className={splitImg} data-drift src="/images/dc-thermes/curiste-bassin.webp" alt={ui.giftAlt} loading="lazy" />
          </figure>
          <div className={splitPanel}>
            <div className={panel(true)}>
              <Title id="gift-title" em={gift.em} caps={gift.caps} center size="split" />
              <p className={panelText} data-reveal>{gift.text}</p>
              <p className="text-[0.875rem] text-soft" data-reveal>{gift.validity} · {ui.byEmail}</p>
              <a className={pill('dark')} href={site.giftPage()} data-reveal>{gift.cta}</a>
            </div>
          </div>
        </section>

        <Reviews />

        {/* Questions */}
        <section className="py-section px-m bg-page" id="questions" aria-labelledby="faq-title">
          <div className={blockHead}>
            <Title id="faq-title" em={faq.em} caps={faq.caps} center />
          </div>
          <div className="max-w-[820px] mx-auto border-t border-line">
            {faq.items.map(([q, a]) => (
              <details className="qa group border-b border-line" key={q}>
                <summary className="flex justify-between items-center gap-6 py-6 cursor-pointer text-[1.1875rem] font-normal max-md:py-5 max-md:text-[1.0625rem]">{q}<span className={qaIcon} aria-hidden="true" /></summary>
                <div className="qa__body overflow-hidden pr-10 text-muted max-w-[64ch] max-md:pr-0">
                  {a.map((block, i) => {
                    if (typeof block === 'string') return <p key={i} className={qaGap}>{block}</p>
                    const List = block.ol ? 'ol' : 'ul'
                    return (
                      <List key={i} className={cx(qaList, block.ol && '[counter-reset:step]')}>
                        {(block.ol || block.ul).map((li) => {
                          const cls = block.ol
                            ? "relative pl-[26px] [counter-increment:step] before:content-[counter(step,decimal-leading-zero)] before:absolute before:left-0 before:top-[0.1em] before:text-[0.75rem] before:tracking-[0.08em] before:text-soft"
                            : "relative pl-[26px] before:content-[''] before:absolute before:left-1 before:top-[0.72em] before:w-2.5 before:h-px before:bg-soft"
                          return Array.isArray(li)
                            ? <li key={li[0]} className={cls}><strong className="font-medium text-ink">{li[0]}</strong> {li[1]}</li>
                            : <li key={li} className={cls}>{li}</li>
                        })}
                      </List>
                    )
                  })}
                </div>
              </details>
            ))}
          </div>
          <div className="max-w-[560px] mx-auto mt-[clamp(56px,7vw,96px)] text-center grid gap-6 justify-items-center" data-reveal>
            <p className="text-muted">{faq.contact}</p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              <a className={pill('dark')} href={site.contactLink} target={site.contactLink.startsWith('http') ? '_blank' : undefined} rel="noopener">{ui.writeUs}</a>
              <a className={pill('outline')} href={site.tel}>{ui.call} {site.phone}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-page px-m pb-[calc(env(safe-area-inset-bottom,0px)+32px)] text-[0.9375rem] max-md:pb-[calc(env(safe-area-inset-bottom,0px)+96px)]">
        <div className="max-w-[1200px] mx-auto bg-white rounded-[16px] p-[clamp(36px,4vw,56px)] grid grid-cols-[1.5fr_0.9fr_1fr_1.3fr_0.8fr] gap-y-10 gap-x-gap max-xl:grid-cols-4 max-md:grid-cols-2 max-md:gap-y-8 max-md:gap-x-5">
          <div className={cx(footCol, 'max-xl:col-[1/-1]')}>
            <Logo alt={ui.logoAlt} className="h-16 mb-1.5" />
            <p className="text-muted">{ui.footerTag}</p>
            <a className="no-underline w-fit text-ink inline-flex items-center gap-2.5 mt-2 pb-1 border-b border-current" href={site.brochure} download target="_blank" rel="noopener">{ui.brochure}<span className={arrow()} aria-hidden="true" /></a>
          </div>
          <div className={footCol}>
            <p className={cx(footTitle, 'mb-1')}>{ui.footerNav}</p>
            {nav.map(([id, label, url]) => url
            ? <a key={id} className={footLink} href={url} target="_blank" rel="noopener">{label}</a>
            : <a key={id} className={footLink} href={`#${id}`} onClick={go(id)}>{label}</a>)}
            <a className={footLink} href="#questions" onClick={go('questions')}>{ui.mobileNav.find(([id]) => id === 'questions')?.[1]}</a>
          </div>
          <div className={cx(footCol, 'max-md:col-[1/-1] max-md:order-2')}>
            <p className={cx(footTitle, 'mb-1')}>{ui.footerCures}</p>
            {cures.map((c) => <a key={c.key} className={footLink} href={`#${c.key}`} onClick={go(c.key)}>{c.name} · {c.days} {ui.days}</a>)}
          </div>
          <div className={cx(footCol, 'max-md:col-[1/-1] max-md:order-2')}>
            <p className={cx(footTitle, 'mb-1')}>{ui.footerContact}</p>
            <a className={footLink} href={`mailto:${site.email}`}>{site.email}</a>
            <a className={footLink} href={site.tel}>{site.phone}</a>
            <a className={footLink} href="https://maps.google.com/?q=Dakhla+Club+Hotel+%26+Spa" target="_blank" rel="noopener">{site.address.join(', ')}</a>
          </div>
          <div className={cx(footCol, 'justify-items-center text-center max-md:order-1')}>
            <p className={cx(footTitle, 'mb-1')}>{ui.footerFollow}</p>
            <div className="grid gap-2.5 justify-items-center mt-0.5">
              {site.social.map(([name, url]) => (
                <a key={name} className="grid place-items-center w-[22px] h-[22.5px] no-underline text-ink opacity-85 transition-[opacity,transform] duration-300 ease-brand hover:opacity-100 hover:[transform:translateY(-2px)]" href={url} target="_blank" rel="noopener" aria-label={name} title={name}>
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">{socialIcons[name]}</svg>
                </a>
              ))}
            </div>
          </div>
          <div className="col-[1/-1] border-t border-line pt-7 flex flex-wrap items-center content-start justify-between gap-2.5 max-md:grid max-md:justify-start max-md:order-3">
            <p className={footTitle}>{ui.footerPay}</p>
            <ul className="flex flex-wrap gap-[18px] items-center">
              <li><img className="h-6 w-auto" src="/images/dc-thermes/cmi.webp" alt="CMI" width="160" height="126" loading="lazy" /></li>
              <li><img className="h-6 w-auto" src="/images/dc-thermes/visa.webp" alt="Verified by Visa" width="200" height="88" loading="lazy" /></li>
              <li><img className="h-6 w-auto" src="/images/dc-thermes/mastercard.webp" alt="Mastercard SecureCode" width="200" height="92" loading="lazy" /></li>
              <li><img className="h-6 w-auto" src="/images/dc-thermes/amex.webp" alt="American Express" width="167" height="169" loading="lazy" /></li>
              <li><img className="h-6 w-auto" src="/images/dc-thermes/marocpay.webp" alt="MarocPay" width="256" height="220" loading="lazy" /></li>
              <li><img className="h-6 w-auto" src="/images/dc-thermes/unionpay.webp" alt="UnionPay" width="256" height="178" loading="lazy" /></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto mt-6 flex justify-between flex-wrap gap-3 text-[0.8125rem] text-soft">
          <p>{ui.copyright}</p>
          <p className="flex flex-wrap gap-y-2 gap-x-5">
            <a className="no-underline w-fit text-soft hover:underline hover:underline-offset-3" href={ui.termsUrl} target="_blank" rel="noopener">{ui.terms}</a>
            <a className="no-underline w-fit text-soft hover:underline hover:underline-offset-3" href={ui.privacyUrl} target="_blank" rel="noopener">{ui.privacy}</a>
            <a className="no-underline w-fit text-soft hover:underline hover:underline-offset-3" href={ui.cookiesUrl} target="_blank" rel="noopener">{ui.cookies}</a>
          </p>
        </div>
      </footer>

      <nav className="hidden max-md:flex fixed z-40 left-3 right-3 bottom-[calc(env(safe-area-inset-bottom,0px)+12px)] items-center justify-between gap-1 py-1.5 pr-1.5 pl-2 rounded-full bg-white/94 border border-line backdrop-blur-[14px] [transform:translateY(160%)] transition-transform duration-[450ms] ease-brand in-[.is-scrolled]:[transform:none]" aria-label={ui.navLabel}>
        {ui.mobileNav.map(([id, label]) => <a key={id} className="p-2.5 text-[0.875rem] no-underline text-ink rounded-full whitespace-nowrap active:bg-panel" href={`#${id}`} onClick={go(id)}>{label}</a>)}
        <a className={cx(pill('dark', { small: true }), 'ml-auto')} href="#reserver" onClick={go('reserver')}>{ui.book}</a>
      </nav>
    </div>
    </LangContext.Provider>
  )
}

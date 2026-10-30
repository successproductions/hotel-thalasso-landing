import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Défilement lissé (Lenis) branché sur GSAP. Désactivé au toucher et quand l'utilisateur réduit les animations.
let lenis: Lenis | null = null

export function useSmoothScroll() {
  useEffect(() => {
    document.documentElement.classList.add('js')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches
    if (reduce || touch) return

    const instance = new Lenis({ lerp: 0.12, wheelMultiplier: 1 })
    lenis = instance
    instance.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      instance.destroy()
      lenis = null
    }
  }, [])
}

// Bloque le défilement pendant qu'une vidéo est ouverte en plein écran
export function lockScroll(on: boolean) {
  document.documentElement.style.overflow = on ? 'hidden' : ''
  if (on) lenis?.stop()
  else lenis?.start()
}

export function scrollToId(id: string) {
  const el = id === 'top' ? document.body : document.getElementById(id)
  if (!el) return
  const offset = id === 'top' ? 0 : -64
  if (lenis) lenis.scrollTo(id === 'top' ? 0 : el, { offset, duration: 0.75, easing: (t) => 1 - Math.pow(1 - t, 3) })
  else window.scrollTo({ top: id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' })
  if (id !== 'top') history.replaceState(null, '', `#${id}`)
}

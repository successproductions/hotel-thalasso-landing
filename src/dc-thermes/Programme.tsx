import { useRef } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useT, number } from './i18n'
import { Title } from './Title'
import { cx, pill, blockHead } from './ui'
import type { CureKey } from './types'

// Le programme : on choisit la cure, et tous ses jours s'affichent sur deux lignes, une carte par jour.
// Chaque soin montre sa photo et s'ouvre sur sa description d'un clic.

// Le + du soin : deux traits, le vertical se couche quand le soin est ouvert
const plus =
  "relative w-2.5 h-2.5 flex-none before:content-[''] before:absolute before:left-0 before:top-[4.5px] before:w-2.5 before:h-px before:bg-current before:transition-transform before:duration-[450ms] before:ease-brand after:content-[''] after:absolute after:left-0 after:top-[4.5px] after:w-2.5 after:h-px after:bg-current after:transition-transform after:duration-[450ms] after:ease-brand after:rotate-90 group-open/tr:after:rotate-0"

// Carte d'un jour ; la dernière (end) est sombre et porte la réservation
const day = (end: boolean) =>
  cx('day rounded-[18px] pt-6 px-[22px] pb-[18px] flex flex-col max-md:pt-5 max-md:px-[18px] max-md:pb-3.5', end ? 'bg-dark text-on-dark justify-end gap-3' : 'bg-white')
const dayNum = (end: boolean) => cx('text-[0.75rem] tracking-[0.16em] uppercase', end ? 'text-on-dark-muted' : 'text-soft')
const dayName = (end: boolean) => cx('font-serif italic font-normal text-[1.875rem] leading-[1.1] mt-1', end ? 'mb-0' : 'mb-3.5')

function Treatment({ id }: { id: string }) {
  const { glossary } = useT()
  const [name, text, , img] = glossary[id]
  return (
    <details className="tr group/tr border-t border-line">
      <summary className="group/sum flex items-center gap-3 py-2.5 cursor-pointer">
        <span className="w-11 h-11 flex-none overflow-hidden rounded-lg bg-panel" aria-hidden="true">{img && <img className="w-full h-full object-cover transition-transform duration-[800ms] ease-brand group-hover/sum:scale-110" src={img} alt="" loading="lazy" />}</span>
        <span className="flex-1 min-w-0 text-[0.9375rem] font-normal leading-[1.3]">{name}</span>
        <span className={plus} aria-hidden="true" />
      </summary>
      <p className="overflow-hidden pt-0 pr-0 pb-3 pl-14 text-muted text-[0.875rem] leading-[1.55] max-md:pl-0">{text}</p>
    </details>
  )
}

type ProgrammeProps = {
  cureKey: CureKey
  onCureChange: (key: CureKey) => void
  onBook: (e: MouseEvent) => void
}

export default function Programme({ cureKey, onCureChange, onBook }: ProgrammeProps) {
  const t = useT()
  const { cures, programmes, programme, ui } = t
  const track = useRef<HTMLDivElement>(null)
  const cure = cures.find((c) => c.key === cureKey) || cures[1]
  const days = programmes[cure.key]

  // Les cartes des jours arrivent en glissant quand on change de cure
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.day', { y: 30, opacity: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05, clearProps: 'all' })
    },
    { scope: track, dependencies: [cure.key], revertOnUpdate: true }
  )

  return (
    <section className="py-section bg-page" id="programme" aria-labelledby="programme-title">
      <div className={cx(blockHead, 'gap-4! px-m')}>
        <Title id="programme-title" em={programme.em} caps={programme.caps} center />
        <p data-reveal>{programme.sub}</p>
      </div>

      <div className="max-w-[1320px] mx-auto mb-7 px-m box-content flex flex-wrap items-center justify-center gap-x-6 gap-y-4 max-md:text-center" data-reveal>
        <div className="inline-flex p-1 rounded-full bg-panel" role="tablist" aria-label={ui.chooseCure}>
          {cures.map((c) => (
            <button key={c.key} type="button" role="tab" id={`tab-${c.key}`} aria-selected={c.key === cure.key} aria-controls="programme-panel" className="border-0 bg-transparent py-2.5 px-[18px] max-sm:px-3.5 rounded-full cursor-pointer text-[0.9375rem] font-normal text-muted transition-[background-color,color] duration-[350ms] ease-brand aria-selected:bg-white aria-selected:text-ink aria-selected:shadow-[0_1px_3px_rgb(0_0_0/0.08)]" onClick={() => onCureChange(c.key)}>
              {c.name} <span className="text-[0.8125rem] text-soft ml-0.5 max-sm:hidden">{c.days} {ui.daysShort}</span>
            </button>
          ))}
        </div>
        <p className="text-[0.9375rem] text-muted">{cure.treatments} {ui.treatments} · {cure.hours} {ui.hoursShort} · {number(t, cure.price)} MAD</p>
      </div>

      {cure.tagline && (
        <div className="max-w-[720px] mx-auto mb-7 px-m text-center grid gap-1" data-reveal>
          <p className="font-serif italic font-normal text-[1.5rem] leading-[1.2]">{cure.tagline}</p>
          <p className="text-muted text-[0.9375rem]">{cure.promise}</p>
        </div>
      )}

      <div className="max-w-[1320px] mx-auto px-m box-content grid grid-cols-[repeat(var(--cols,4),minmax(0,1fr))] gap-4 items-stretch max-xl:grid-cols-2 max-sm:grid-cols-1" id="programme-panel" role="tabpanel" aria-labelledby={`tab-${cure.key}`} ref={track} style={{ '--cols': days.length + 1 <= 4 ? days.length + 1 : Math.min(4, Math.ceil((days.length + 1) / 2)) } as CSSProperties}>
        {days.map(([name, items], i) => (
          <article className={day(false)} key={`${cure.key}-${i}`}>
            <p className={dayNum(false)}>{ui.day(i + 1)}</p>
            <h3 className={dayName(false)}>{name}</h3>
            <div className="grid">
              {items.map((id) => <Treatment id={id} key={id} />)}
            </div>
          </article>
        ))}
        <article className={day(true)}>
          <p className={dayNum(true)}>{ui.ready}</p>
          <h3 className={dayName(true)}>{cure.name}</h3>
          <p className="text-on-dark-muted text-[0.9375rem]">{ui.endText(cure)}</p>
          <a className={cx(pill('dark'), 'bg-white! text-ink! self-start mt-2')} href="#reserver" onClick={onBook}>{ui.reserve(cure.name)}</a>
        </article>
      </div>
    </section>
  )
}

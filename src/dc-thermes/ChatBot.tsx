'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { number } from './i18n'
import type { Pack } from './i18n'
import { cx } from './ui'
import type { CureKey, Funnel } from './types'

// Assistant des pages /dc-thermes/paiement et /dc-thermes/contact (FR et EN) : le parcours de l'assistant de /evasion
// (programmes, tarifs, questions, réservation, WhatsApp), sans saisie libre, aux prix et au style de cette page.
// « Réserver » choisit la cure dans le formulaire de la page (#reserver) et y descend, comme /evasion ouvre son formulaire.
// Une minute après l'arrivée, si l'assistant n'a pas été ouvert, une pastille « 1 » l'annonce : il s'ouvre alors sur la relance.

type Step = 'menu' | 'relance' | 'programs' | 'prices' | 'faq' | 'toBooking' | 'toWhatsapp' | `cure:${CureKey}` | `details:${CureKey}`
type Action = Step | 'book' | `book:${CureKey}` | 'advisor' | `whatsapp:${CureKey}`
type Choice = [action: Action, label: string, primary?: boolean]
type Msg = { id: number; from: 'bot'; step: Step } | { id: number; from: 'user'; text: string }

const RELANCE_AFTER = 60_000
const TYPING = 700

// Le bouton passe au-dessus de la barre du bas des téléphones (App.tsx), qui n'apparaît qu'une fois la page défilée.
// La fenêtre ouverte, elle, recouvre cette barre.
const corner = (lift: boolean) =>
  cx(
    'fixed z-[60] right-[clamp(16px,2.4vw,32px)] bottom-[calc(env(safe-area-inset-bottom,0px)+clamp(16px,2.4vw,32px))] transition-[bottom] duration-[450ms] ease-brand',
    lift && 'max-md:in-[.is-scrolled]:bottom-[calc(env(safe-area-inset-bottom,0px)+84px)]'
  )
const fab =
  'relative grid place-items-center size-14 rounded-full bg-ink text-white shadow-[0_14px_34px_-12px_rgb(28_27_25/0.55)] cursor-pointer transition-[background-color,scale] duration-300 ease-brand hover:bg-black active:scale-95 focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-4'
const panelBox =
  'grid grid-rows-[auto_minmax(0,1fr)] w-[min(390px,calc(100vw-32px))] h-[min(640px,calc(100dvh-48px))] rounded-[18px] bg-page border border-line overflow-hidden shadow-[0_30px_70px_-24px_rgb(28_27_25/0.5)] outline-none transition-[opacity,translate] duration-[450ms] ease-brand starting:opacity-0 starting:translate-y-3 max-sm:fixed max-sm:inset-x-2 max-sm:w-auto max-sm:bottom-[calc(env(safe-area-inset-bottom,0px)+8px)] max-sm:h-[calc(100dvh-16px-env(safe-area-inset-top,0px))]'
const botBubble = 'justify-self-start max-w-[90%] grid gap-2.5 py-3 px-4 rounded-[16px] rounded-bl-[4px] bg-white text-ink text-[0.9375rem] leading-[1.55]'
const userBubble = 'justify-self-end max-w-[80%] m-0 py-2.5 px-4 rounded-[16px] rounded-br-[4px] bg-ink text-white text-[0.9375rem] leading-[1.45]'
const eyebrow = 'm-0 pt-1 text-[0.6875rem] tracking-[0.16em] uppercase text-soft'
const choiceBtn = (primary?: boolean) =>
  cx(
    'w-full min-h-11 py-2.5 px-[18px] rounded-full border text-left text-[0.875rem] leading-[1.3] cursor-pointer transition-[background-color,border-color,color] duration-300 ease-brand focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2',
    primary ? 'bg-ink border-ink text-white hover:bg-black' : 'bg-transparent border-ink/25 text-ink hover:border-ink hover:bg-white'
  )

function BubbleIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12c0-4.1 3.6-7.4 8-7.4s8 3.3 8 7.4-3.6 7.4-8 7.4c-1.1 0-2.2-.2-3.2-.6L4.6 20l1.1-3.4C4.6 15.3 4 13.7 4 12z" />
      <circle cx="8.6" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function ChatBot({ t, funnel, onBook }: { t: Pack; funnel: Funnel; onBook: (cure?: CureKey) => void }) {
  const { chat: c, cures, site } = t
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [typing, setTyping] = useState(false)
  const [badge, setBadge] = useState(false)
  const opened = useRef(false)
  const nextId = useRef(0)
  const typingTimer = useRef(0)
  const focusChoices = useRef(false)
  const list = useRef<HTMLDivElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  // Relance : la pastille ne s'affiche que si l'assistant n'a jamais été ouvert
  useEffect(() => {
    const relance = window.setTimeout(() => !opened.current && setBadge(true), RELANCE_AFTER)
    return () => {
      window.clearTimeout(relance)
      window.clearTimeout(typingTimer.current)
    }
  }, [])

  // Le nouveau message s'affiche depuis son début (les détails d'une cure sont plus hauts que la fenêtre)
  useEffect(() => {
    const box = list.current
    if (!box) return
    const bots = box.querySelectorAll<HTMLElement>('[data-bot]')
    const lastBot = bots[bots.length - 1]
    const last = msgs[msgs.length - 1]
    const top = typing || !lastBot || last?.from === 'user' ? box.scrollHeight : lastBot.offsetTop - 12
    box.scrollTo({ top, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    // Au clavier, le focus passe aux boutons du nouveau message (ceux du message précédent ont disparu)
    if (focusChoices.current && !typing && last?.from === 'bot') {
      focusChoices.current = false
      box.querySelector<HTMLButtonElement>('[data-choices] button')?.focus({ preventScroll: true })
    }
  }, [msgs, typing])

  const say = (step: Step) => {
    setTyping(true)
    window.clearTimeout(typingTimer.current)
    typingTimer.current = window.setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: nextId.current++, from: 'bot', step }])
    }, TYPING)
  }

  const show = () => {
    setOpen(true)
    if (!opened.current) {
      opened.current = true
      say(badge ? 'relance' : 'menu')
    }
    setBadge(false)
    requestAnimationFrame(() => panel.current?.focus({ preventScroll: true }))
  }

  const hide = () => {
    setOpen(false)
    requestAnimationFrame(() => toggle.current?.focus({ preventScroll: true }))
  }

  const act = ([action, label]: Choice) => {
    setMsgs((m) => [...m, { id: nextId.current++, from: 'user', text: label }])
    focusChoices.current = true
    const [kind, key] = action.split(':') as [string, CureKey | undefined]
    if (kind === 'book') {
      onBook(key)
      say('toBooking')
      // Sur téléphone, l'assistant se ferme pour laisser voir le formulaire
      if (window.matchMedia('(max-width: 768px)').matches) window.setTimeout(() => setOpen(false), TYPING + 600)
      return
    }
    if (kind === 'advisor' || kind === 'whatsapp') {
      const cure = cures.find((x) => x.key === key)
      const text = cure ? c.whatsappCure(cure.name, cure.days) : c.whatsappAdvisor
      window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
      say('toWhatsapp')
      return
    }
    say(action as Step)
  }

  const cureLabel = (key: CureKey) => {
    const x = cures.find((y) => y.key === key)!
    return c.cureLabel(x.name, x.days)
  }

  // Contenu et boutons de chaque étape
  function bot(step: Step): { body: ReactNode; choices: Choice[] } {
    switch (step) {
      case 'menu':
        return {
          body: <p className="m-0 whitespace-pre-line">{c.welcome}</p>,
          choices: [['programs', c.programs], ['prices', c.prices], ['faq', c.faqLabel], ['book', c.book, true]],
        }
      case 'relance':
        return {
          body: <p className="m-0 whitespace-pre-line">{c.relance}</p>,
          choices: [['programs', c.programs], ['book', c.bookNow, true]],
        }
      case 'programs':
        return {
          body: <p className="m-0 whitespace-pre-line">{c.programsText}</p>,
          choices: [...cures.map((x): Choice => [`cure:${x.key}`, cureLabel(x.key)]), ['menu', c.menu]],
        }
      case 'prices':
        return {
          body: (
            <>
              <p className="m-0">{c.pricesText}</p>
              <dl className="m-0 grid">
                {cures.map((x) => (
                  <div key={x.key} className="flex items-baseline justify-between gap-3 py-2 border-t border-line first:border-t-0">
                    <dt>{cureLabel(x.key)}</dt>
                    <dd className="m-0 text-right whitespace-nowrap">
                      <span className="font-serif italic text-[1.25rem] leading-none">{number(t, x.price)} MAD</span>
                      <span className="block text-[0.75rem] text-soft">{number(t, x.euro)} €</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="m-0 text-[0.875rem] text-muted">{c.pricesNote}</p>
            </>
          ),
          choices: [['book', c.bookNow, true], ['advisor', c.talk], ['menu', c.menu]],
        }
      case 'faq':
        return {
          body: (
            <dl className="m-0 grid gap-3">
              {[...c.faq, [c.howToBook, c.howToBookAnswer[funnel === 'lead' ? 'lead' : 'cmi']] as [string, string]].map(([q, a]) => (
                <div key={q} className="grid gap-1">
                  <dt className="font-medium">{q}</dt>
                  <dd className="m-0 text-muted">{a}</dd>
                </div>
              ))}
            </dl>
          ),
          choices: [['book', c.book, true], ['advisor', c.advisor], ['menu', c.menu]],
        }
      case 'toBooking':
      case 'toWhatsapp':
        return { body: <p className="m-0">{step === 'toBooking' ? c.toBooking : c.toWhatsapp}</p>, choices: [['menu', c.menu]] }
    }
    const [kind, key] = step.split(':') as ['cure' | 'details', CureKey]
    if (kind === 'cure') {
      return { body: <p className="m-0">{c.choose}</p>, choices: [[`whatsapp:${key}`, c.getWhatsapp], [`details:${key}`, c.seeDetails]] }
    }
    const d = c.details[key]
    const treatments = cures.find((x) => x.key === key)!.treatments
    return {
      body: (
        <>
          <p className="m-0 font-serif italic text-[1.5rem] leading-[1.1]">{cureLabel(key)}</p>
          <p className="m-0">{d.intro}</p>
          <p className={eyebrow}>{c.resultsTitle}</p>
          <ul className="m-0 p-0 list-none grid gap-1">
            {d.results.map((r) => (
              <li key={r} className="relative pl-4 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:size-[5px] before:rounded-full before:bg-soft">{r}</li>
            ))}
          </ul>
          <p className={eyebrow}>{c.careTitle(treatments)}</p>
          <p className="m-0 text-muted">{d.care}</p>
        </>
      ),
      choices: [[`book:${key}`, c.bookThis, true], ['advisor', c.advisor], ['programs', c.backPrograms]],
    }
  }

  const lastIndex = msgs.length - 1

  if (!open) {
    return (
      <div className={corner(true)}>
        <button ref={toggle} type="button" className={fab} onClick={show} aria-label={badge ? `${c.open} · ${c.newMessage}` : c.open} aria-haspopup="dialog">
          <BubbleIcon />
          {badge && (
            <span className="absolute -top-0.5 -right-0.5 grid place-items-center size-5 rounded-full bg-error text-white text-[0.6875rem] font-medium leading-none ring-2 ring-page" aria-hidden="true">
              1
            </span>
          )}
        </button>
      </div>
    )
  }

  return (
    <div className={corner(false)}>
      <div ref={panel} className={panelBox} role="dialog" aria-labelledby="chat-title" tabIndex={-1} onKeyDown={(e) => e.key === 'Escape' && hide()}>
        <div className="flex items-center justify-between gap-3 py-3.5 pr-3.5 pl-5 bg-dark text-on-dark">
          <div className="grid gap-0.5 min-w-0">
            <p id="chat-title" className="m-0 font-serif italic text-[1.5rem] leading-none">{c.title}</p>
            <p className="m-0 text-[0.6875rem] tracking-[0.16em] uppercase text-on-dark-muted">{c.subtitle}</p>
          </div>
          <button type="button" className="flex-none grid place-items-center size-10 rounded-full border border-line-dark cursor-pointer transition-[background-color] duration-300 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-on-dark focus-visible:outline-offset-2" onClick={hide} aria-label={c.close}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        {/* data-lenis-prevent : la molette fait défiler la conversation, pas la page */}
        <div ref={list} className="relative overflow-y-auto overscroll-contain grid content-start gap-3 px-4 pt-5 pb-6" data-lenis-prevent aria-live="polite">
          {msgs.map((m, i) => {
            if (m.from === 'user') return <p key={m.id} className={userBubble}>{m.text}</p>
            const { body, choices } = bot(m.step)
            return (
              <div key={m.id} className="grid gap-2.5" data-bot>
                <div className={botBubble}>{body}</div>
                {i === lastIndex && !typing && (
                  <div className="grid gap-2 w-full" data-choices>
                    {choices.map((choice) => (
                      <button key={choice[0]} type="button" className={choiceBtn(choice[2])} onClick={() => act(choice)}>
                        {choice[1]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          {typing && (
            <div className={cx(botBubble, 'flex items-center gap-1.5 py-4')}>
              <span className="sr-only">{c.typing}</span>
              {[0, 150, 300].map((delay) => (
                <span key={delay} className="size-1.5 rounded-full bg-soft motion-safe:animate-bounce" style={{ animationDelay: `${delay}ms` }} aria-hidden="true" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

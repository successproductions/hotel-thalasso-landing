'use client'

import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { cx } from './ui'
import { pf, pfLabel, pfInput, tel } from './forms'
import { countryFromNumber, flagSrc, phoneNumber, phoneRules } from './phone'
import type { CountryKey } from './phone'
import type { Pack } from './i18n'

// Téléphone des formulaires (réservation, offrir) : le pays avec son drapeau, puis le numéro, vérifié selon le pays.
// La liste est faite main : un <select> n'affiche pas d'image. Clavier comme un <select> (flèches, Entrée,
// Échap, Tab, première lettre du pays ou indicatif tapé). Un numéro qui ne convient pas bloque l'envoi
// (setCustomValidity) et un message s'affiche sous le champ.
// Le formulaire reçoit telephone_complet (« +212 612345678 ») et pays (code ISO, vide pour « Autre pays »).

const flag = 'flex-none w-6 h-4 rounded-[2px] object-cover shadow-[0_0_0_1px_rgb(38_40_43/0.12)]'
const plain = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

export function PhoneField({ id, b }: { id: string; b: Pack['bookingPage'] }) {
  const list = b.countries
  const [country, setCountry] = useState<CountryKey>(list[0][0])
  const [value, setValue] = useState('')
  const [touched, setTouched] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const box = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const typed = useRef({ text: '', timer: 0 })

  const rule = phoneRules[country]
  const full = phoneNumber(country, value)
  const message = value.trim() && !full ? b.phoneInvalid(rule.dial, rule.example) : ''
  const showError = touched && !!message
  const selected = Math.max(0, list.findIndex(([key]) => key === country))
  const optionId = (i: number) => `${id}-pays-${list[i][0]}`
  const activeId = optionId(active)

  // Le navigateur refuse l'envoi tant que le numéro ne convient pas au pays
  useEffect(() => input.current?.setCustomValidity(message), [message])

  // Liste ouverte : l'option active reste visible, un clic ailleurs la ferme
  useEffect(() => {
    if (open) document.getElementById(activeId)?.scrollIntoView({ block: 'nearest' })
  }, [open, activeId])
  useEffect(() => {
    if (!open) return
    const close = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [open])

  const show = (i: number) => {
    setActive(i)
    setOpen(true)
  }
  const choose = (i: number, focusNumber = true) => {
    setCountry(list[i][0])
    setOpen(false)
    if (focusNumber) input.current?.focus()
  }
  // Lettres tapées sur la liste : « m » pour Maroc, « +33 » pour la France.
  // La recherche part du pays en surbrillance (liste ouverte) ou du pays choisi (liste fermée).
  const find = (key: string) => {
    window.clearTimeout(typed.current.timer)
    typed.current.timer = window.setTimeout(() => (typed.current.text = ''), 700)
    const text = (typed.current.text += key.toLowerCase())
    const current = open ? active : selected
    const from = text.length === 1 ? current + 1 : current
    for (let n = 0; n < list.length; n++) {
      const i = (from + n) % list.length
      if (plain(list[i][1]).startsWith(text) || phoneRules[list[i][0]].dial.startsWith(text)) return i
    }
    return -1
  }

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = list.length - 1
    if (e.key === 'Tab') {
      if (open) choose(active, false)
      return
    }
    const keys: Record<string, () => void> = open
      ? {
          ArrowDown: () => setActive(Math.min(active + 1, last)),
          ArrowUp: () => (e.altKey ? choose(active) : setActive(Math.max(active - 1, 0))),
          Home: () => setActive(0),
          End: () => setActive(last),
          Enter: () => choose(active),
          ' ': () => choose(active),
          Escape: () => setOpen(false),
        }
      : { ArrowDown: () => show(selected), ArrowUp: () => show(selected), Enter: () => show(selected), ' ': () => show(selected), Home: () => show(0), End: () => show(last) }
    if (keys[e.key]) {
      e.preventDefault()
      keys[e.key]()
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const i = find(e.key)
      if (i >= 0) show(i)
    }
  }

  return (
    <div className={pf}>
      <span className={pfLabel} id={`${id}-label`}>{b.phone}</span>
      <div className={tel} role="group" aria-labelledby={`${id}-label`}>
        <div className="relative" ref={box}>
          <div
            className={cx(pfInput({ inGroup: true }), 'flex items-center gap-2 px-[14px]! cursor-pointer select-none')}
            role="combobox"
            tabIndex={0}
            aria-label={b.dial}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={`${id}-pays`}
            aria-activedescendant={open ? activeId : undefined}
            onClick={() => (open ? setOpen(false) : show(selected))}
            onKeyDown={onKey}
          >
            <img className={flag} src={flagSrc(country)} alt="" width="24" height="16" />
            <span className="flex-1 min-w-0 truncate">
              {rule.dial ? <>{rule.dial}<span className="sr-only"> {list[selected][1]}</span></> : b.otherCountry}
            </span>
            <span className={cx('flex-none size-[7px] border-r-[1.5px] border-b-[1.5px] border-current transition-transform duration-300 ease-brand', open ? '-rotate-[135deg] translate-y-[2px]' : 'rotate-45 -translate-y-[2px]')} aria-hidden="true" />
          </div>
          <ul
            id={`${id}-pays`}
            role="listbox"
            aria-label={b.dial}
            hidden={!open}
            className="absolute z-30 top-[calc(100%+6px)] left-0 w-[min(320px,calc(100vw-64px))] max-h-[min(340px,55vh)] overflow-y-auto overscroll-contain m-0 p-[6px] list-none bg-white border border-line rounded-[12px] shadow-[0_18px_40px_-12px_rgb(28_27_25/0.28)]"
          >
            {list.map(([key, label], i) => (
              <li
                key={key}
                id={optionId(i)}
                role="option"
                aria-selected={key === country}
                className={cx('flex items-center gap-3 py-[10px] px-3 rounded-[8px] cursor-pointer text-[0.9375rem]', i === active && 'bg-page', key === country && 'font-medium')}
                onPointerMove={() => i !== active && setActive(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => choose(i)}
              >
                <img className={flag} src={flagSrc(key)} alt="" width="24" height="16" />
                <span className="flex-1 min-w-0">{label}</span>
                <span className="text-muted tabular-nums">{phoneRules[key].dial}</span>
              </li>
            ))}
          </ul>
        </div>
        <input
          ref={input}
          className={cx(pfInput({ inGroup: true }), showError && 'border-error!')}
          id={id}
          name="telephone"
          type="tel"
          autoComplete={country === 'other' ? 'tel' : 'tel-national'}
          required
          inputMode="tel"
          aria-label={b.phoneLabel}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-erreur` : undefined}
          placeholder={rule.example}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            // Un numéro collé avec son indicatif (+33 6 …) choisit le pays
            const found = countryFromNumber(e.target.value, country)
            if (found) setCountry(found)
          }}
          onBlur={() => setTouched(true)}
          onInvalid={() => setTouched(true)}
        />
      </div>
      {showError && <p className="-mt-1 text-[0.875rem] text-error" id={`${id}-erreur`}>{message}</p>}
      <input type="hidden" name="telephone_complet" value={full || ''} />
      <input type="hidden" name="pays" value={country === 'other' ? '' : country} />
    </div>
  )
}

'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { packs, money, longDate as ld } from './i18n'
import { Title } from './Title'
import { cx, pill, arrow, logo } from './ui'
import type { CureKey } from './types'
import { pf, pfRow, pfLabel, pfOptional, pfInput, choice, choiceItem, hiddenInput, choiceTitle, choiceMeta, stepper, stepperBtn, stepperOut, addon, addonBox, addonTitle, addonMeta, ticketTitle, ticketSub, ticketRows, ticketRow, bkPage, bkHeader, bkBack, bkBackArrow, bkLogoLink, bkLogo, bkHelp, bkMain, bkIntro, bkIntroText, bkSteps, bkStep, bkForm, bkGroup, bkLegend, tel, bkPay, bkSecure, lock, bkSummary, bkCard, bkTrust, bkTrustItem } from './forms'

// Page de réservation : dernière étape avant le paiement CMI.
// Reprend les champs du panier actuel (nom, e-mail, téléphone, date, personnes, CGV, offres)
// et les choix faits sur la page (cure, premier jour, curistes, totalité ou acompte, chambre).
// Avec une chambre, la réservation continue sur Direct-Book (tarif pack) : coordonnées et paiement y sont demandés.

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

// Cases à cocher natives (CGV, offres)
const check = 'flex gap-3 items-start text-[0.9375rem] text-muted cursor-pointer'
const checkInput = 'flex-none size-[18px] mt-[3px] mx-0 mb-0 accent-ink'


export default function Booking() {
  // La langue vient du lien : /dc-thermes/reservation?lang=en pour l'anglais
  const lang = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'fr'
  const t = packs[lang]
  const { cures, site, ui, bookingPage: b } = t
  const mad = (n: number) => money(t, n)
  const longDate = (d: Date) => ld(t, d)
  const [cureKey, setCureKey] = useState<CureKey>('regeneration')
  const [start, setStart] = useState('')
  const [minDate, setMinDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [deposit, setDeposit] = useState(false)
  const [room, setRoom] = useState(false)
  const [sent, setSent] = useState(false)

  // Reprend les choix faits sur la page des cures
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.bookingTitle
    const q = new URLSearchParams(window.location.search)
    const today = new Date()
    setMinDate(iso(addDays(today, 2)))
    const wanted = cures.find((c) => c.key === q.get('cure'))
    if (wanted) setCureKey(wanted.key)
    const debut = q.get('debut')
    setStart(debut && /^\d{4}-\d{2}-\d{2}$/.test(debut) ? debut : iso(addDays(today, 14)))
    const g = Number(q.get('curistes'))
    if (Number.isInteger(g) && g >= 1) setGuests(g)
    setDeposit(q.get('paiement') === 'acompte')
    setRoom(q.get('chambre') === '1')
  }, [])

  const cure = cures.find((c) => c.key === cureKey) || cures[1]
  const total = cure.price * guests
  const base = deposit ? total / 2 : total
  const fee = Math.round(base * site.cmiFee)
  const now = base + fee
  const balance = total - base
  const nights = site.nights(cure.days)

  const plan = useMemo(() => {
    if (!start) return null
    const first = parse(start)
    const last = addDays(first, cure.days - 1)
    const checkIn = addDays(first, -1)
    return { first, last, checkIn, checkOut: addDays(checkIn, nights) }
  }, [start, cure.days, nights])

  const hotelUrl = plan ? site.hotel({ checkIn: iso(plan.checkIn), checkOut: iso(plan.checkOut), adults: guests, rateId: site.packRateId }) : null

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setSent(true)
    // À BRANCHER par le développeur du site : transmettre ces informations au tunnel CMI existant.
    // En attendant, la réservation continue sur le panier actuel de la cure choisie.
    window.location.href = site.checkout(cure.key)
  }

  return (
    <div className={bkPage}>
      <header className={bkHeader}>
        <a href={lang === 'en' ? '/dc-thermes/en' : '/dc-thermes'} className={bkBack}><span className={cx(arrow(true), bkBackArrow)} aria-hidden="true" /> {b.back}</a>
        <a className={bkLogoLink} href={lang === 'en' ? '/dc-thermes/en' : '/dc-thermes'} aria-label={ui.logoAlt}><img className={cx(logo(), bkLogo)} src="/images/dc-thermes/logo-dc.webp" width="600" height="296" alt={ui.logoAlt} /></a>
        <a className={bkHelp} href={site.tel}>{b.help}</a>
      </header>

      <main className={bkMain}>
        <div className={bkIntro}>
          <Title as="h1" id="bk-title" em={b.em} caps={b.caps} />
          <p className={bkIntroText}>{room ? b.introPack : b.intro}</p>
          {!room && <ol className={bkSteps} aria-label={b.stepsLabel}>
            {b.steps.map((step, i) => <li key={step} className={bkStep(i === 0)}>{step}</li>)}
          </ol>}
        </div>

        <form className={bkForm} onSubmit={submit} noValidate={false} aria-labelledby="bk-title">
          <fieldset className={bkGroup()}>
            <legend className={bkLegend}>{b.yourCure}</legend>
            <div className={choice(3)}>
              {cures.map((c) => (
                <label key={c.key} className={choiceItem({ on: c.key === cure.key, inGroup: true })}>
                  <input className={hiddenInput} type="radio" name="cure" value={c.key} checked={c.key === cure.key} onChange={() => setCureKey(c.key)} />
                  <span className={choiceTitle}>{c.name}</span>
                  <span className={choiceMeta}>{c.days} {ui.days}</span>
                </label>
              ))}
            </div>
            <div className={pfRow}>
              <label className={pf} htmlFor="bk-start">
                <span className={pfLabel}>{ui.firstDay}</span>
                <input className={pfInput({ inGroup: true })} id="bk-start" name="debut" type="date" required value={start} min={minDate} onChange={(e) => e.target.value && setStart(e.target.value)} />
              </label>
              <div className={pf}>
                <span className={pfLabel} id="bk-guests">{ui.guests}</span>
                <div className={stepper(true)} role="group" aria-labelledby="bk-guests">
                  <button className={stepperBtn} type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} aria-label={ui.lessGuest}>−</button>
                  <output className={stepperOut} aria-live="polite">{ui.person(guests)}</output>
                  <button className={stepperBtn} type="button" onClick={() => setGuests((g) => g + 1)} aria-label={ui.moreGuest}>+</button>
                </div>
              </div>
            </div>
            {!room && <div className={choice()}>
              <label className={choiceItem({ on: !deposit, inGroup: true })}>
                <input className={hiddenInput} type="radio" name="paiement" checked={!deposit} onChange={() => setDeposit(false)} />
                <span className={choiceTitle}>{ui.full}</span>
                <span className={choiceMeta}>{ui.fullMeta}</span>
              </label>
              <label className={choiceItem({ on: deposit, inGroup: true })}>
                <input className={hiddenInput} type="radio" name="paiement" checked={deposit} onChange={() => setDeposit(true)} />
                <span className={choiceTitle}>{ui.deposit}</span>
                <span className={choiceMeta}>{ui.depositMeta}</span>
              </label>
            </div>}
            <label className={addon({ on: room, inGroup: true })}>
              <input className={hiddenInput} type="checkbox" checked={room} onChange={(e) => setRoom(e.target.checked)} />
              <span className={addonBox(room)} aria-hidden="true" />
              <span>
                <span className={addonTitle}>{b.roomTitle}</span>
                <span className={addonMeta}>{room ? b.roomOn : b.roomOff}</span>
              </span>
            </label>
          </fieldset>

          {room ? (
            <>
              <a className={cx(pill('dark', { block: true }), bkPay)} href={hotelUrl || undefined}>{ui.packCta}</a>
              <p className={bkSecure}><span className={lock} aria-hidden="true" />{ui.packTicketNote}</p>
            </>
          ) : (
          <>
          <fieldset className={bkGroup()}>
            <legend className={bkLegend}>{b.details}</legend>
            <div className={pfRow}>
              <label className={pf} htmlFor="bk-first"><span className={pfLabel}>{b.firstName}</span><input className={pfInput({ inGroup: true })} id="bk-first" name="prenom" autoComplete="given-name" required /></label>
              <label className={pf} htmlFor="bk-last"><span className={pfLabel}>{b.lastName}</span><input className={pfInput({ inGroup: true })} id="bk-last" name="nom" autoComplete="family-name" required /></label>
            </div>
            <label className={pf} htmlFor="bk-mail"><span className={pfLabel}>{b.email}</span><input className={pfInput({ inGroup: true })} id="bk-mail" name="email" type="email" autoComplete="email" required placeholder={b.emailPh} /></label>
            <div className={pf}>
              <span className={pfLabel} id="bk-tel-label">{b.phone}</span>
              <div className={tel} role="group" aria-labelledby="bk-tel-label">
                <select className={pfInput({ inGroup: true })} name="indicatif" aria-label={b.dial} defaultValue={b.dialCodes[0][0]}>
                  {b.dialCodes.map(([code, country]) => <option key={code} value={code}>{code} {country}</option>)}
                </select>
                <input className={pfInput({ inGroup: true })} id="bk-tel" name="telephone" type="tel" autoComplete="tel-national" required inputMode="tel" aria-label={b.phoneLabel} placeholder={b.phonePh} />
              </div>
            </div>
            <label className={pf} htmlFor="bk-note"><span className={pfLabel}>{b.note} <em className={pfOptional}>{b.optional}</em></span><textarea className={pfInput({ inGroup: true, area: true })} id="bk-note" name="message" rows={3} placeholder={b.notePh} /></label>
          </fieldset>

          <div className="grid gap-[14px] px-1">
            <label className={check}><input className={checkInput} type="checkbox" name="cgv" required /><span>{b.cgv[0]}<a className="text-ink underline underline-offset-3" href={ui.termsUrl} target="_blank" rel="noopener">{b.cgv[1]}</a>{b.cgv[2]}</span></label>
            <label className={check}><input className={checkInput} type="checkbox" name="offres" /><span>{b.offers}</span></label>
          </div>

          <button className={cx(pill('dark', { block: true }), bkPay)} type="submit" disabled={sent}>
            {sent ? b.sending : b.pay(mad(now))}
          </button>
          <p className={bkSecure}><span className={lock} aria-hidden="true" />{b.secure}</p>
          </>
          )}
        </form>

        <aside className={bkSummary()} aria-label={b.summary}>
          <figure className="aspect-video overflow-hidden max-lg:aspect-[21/9]"><img className="w-full h-full object-cover" src={cure.img} alt={cure.alt} style={cure.imgPos ? { objectPosition: cure.imgPos } : undefined} /></figure>
          <div className={bkCard()}>
            <p className={cx(ticketTitle, 'text-ink')}>{cure.name}</p>
            <p className={ticketSub}>{cure.days} {ui.days} · {cure.treatments} {ui.treatments} · {cure.hours} {ui.hoursShort} · {b.access}</p>
            <dl className={ticketRows}>
              {plan && room && <div className={ticketRow()}><dt>{ui.arrival}</dt><dd>{longDate(plan.checkIn)}</dd></div>}
              {plan && <div className={ticketRow()}><dt>{ui.firstTreatment}</dt><dd>{longDate(plan.first)}</dd></div>}
              {plan && <div className={ticketRow()}><dt>{ui.lastTreatment}</dt><dd>{longDate(plan.last)}</dd></div>}
              {plan && room && <div className={ticketRow()}><dt>{ui.departure}</dt><dd>{longDate(plan.checkOut)}</dd></div>}
              <div className={ticketRow()}><dt>{ui.guests}</dt><dd>{guests}</dd></div>
            </dl>
            {room ? (
              <>
                <dl className={ticketRows}>
                  <div className={ticketRow({ money: true })}><dt>{ui.packRow(nights)}</dt><dd>{ui.packPrice}</dd></div>
                </dl>
                <p className="text-[0.875rem] text-muted">{ui.packNote}</p>
              </>
            ) : (
            <dl className={ticketRows}>
              <div className={ticketRow({ money: true })}><dt>{b.times(mad(cure.price), guests)}</dt><dd>{mad(total)}</dd></div>
              {deposit && <div className={ticketRow({ money: true })}><dt>{ui.depositLine}</dt><dd>{mad(base)}</dd></div>}
              <div className={ticketRow({ money: true })}><dt>{ui.fee}</dt><dd>{mad(fee)}</dd></div>
              <div className={ticketRow({ money: true, due: true })}><dt>{ui.due}</dt><dd>{mad(now)}</dd></div>
              {deposit && <div className={ticketRow({ money: true })}><dt>{ui.balance}</dt><dd>{mad(balance)}</dd></div>}
            </dl>
            )}
            <ul className={bkTrust}>
              {b.trust.map((x) => <li key={x} className={bkTrustItem}>{x}</li>)}
            </ul>
            {!room && <ul className="flex flex-wrap gap-[18px] items-center list-none m-0 p-0" aria-label={ui.footerPay}>
              <li><img className="h-6 w-auto" src="/images/dc-thermes/cmi.webp" alt="CMI" width="160" height="126" /></li>
              <li><img className="h-6 w-auto" src="/images/dc-thermes/visa.webp" alt="Verified by Visa" width="200" height="88" /></li>
              <li><img className="h-6 w-auto" src="/images/dc-thermes/mastercard.webp" alt="Mastercard SecureCode" width="200" height="92" /></li>
            </ul>}
          </div>
        </aside>
      </main>
    </div>
  )
}

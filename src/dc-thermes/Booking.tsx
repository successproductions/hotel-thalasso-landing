'use client'

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { packs, money, longDate as ld } from './i18n'
import { Title } from './Title'
import { cx, pill, arrow, logo } from './ui'
import { amounts, landingHref } from './funnel'
import { captureAttribution, getAttribution } from '@/lib/metaTracking'
import type { CureKey, Funnel } from './types'
import { PhoneField } from './PhoneField'
import { orderStorageKey } from './order'
import type { ConfirmedOrder } from './order'
import { pf, pfRow, pfLabel, pfOptional, pfInput, choice, choiceItem, hiddenInput, choiceTitle, choiceMeta, stepper, stepperBtn, stepperOut, addon, addonBox, addonTitle, addonMeta, ticketTitle, ticketSub, ticketRows, ticketRow, bkPage, bkHeader, bkBack, bkBackArrow, bkLogoLink, bkLogo, bkHelp, bkMain, bkIntro, bkIntroText, bkSteps, bkStep, bkForm, bkGroup, bkLegend, bkPay, bkSecure, lock, bkSummary, bkCard, bkTrust, bkTrustItem } from './forms'

// Page de réservation : dernière étape avant le paiement CMI.
// Reprend les champs des paniers des cures (nom, e-mail, téléphone, date, personnes, CGV, offres)
// et les choix faits sur la page (cure, premier jour, curistes, totalité ou acompte, chambre).
// Avec une chambre, la réservation continue sur Direct-Book (tarif pack) : coordonnées et paiement y sont demandés.
// Selon la version de la page (funnel.ts) : paiement CMI direct (main, cmi) ou demande sans paiement (lead).

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

// Cases à cocher natives (CGV, offres)
const check = 'flex gap-3 items-start text-[0.9375rem] text-muted cursor-pointer'
const checkInput = 'flex-none size-[18px] mt-[3px] mx-0 mb-0 accent-ink'
const doneText = 'max-w-[52ch] text-muted'

// Préfixe des commandes CMI : après le paiement, il renvoie vers la page de remerciement de la cure
const orderPrefix: Record<CureKey, string> = { vitalite: 'VIT', regeneration: 'REG', renaissance: 'REN' }
const postJson = (url: string, body: object) =>
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })


export default function Booking({ funnel = 'main' }: { funnel?: Funnel }) {
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
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const lead = funnel === 'lead'

  // Reprend les choix faits sur la page des cures
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = lead ? t.meta.leadTitle : t.meta.bookingTitle
    const q = new URLSearchParams(window.location.search)
    const today = new Date()
    setMinDate(iso(addDays(today, 2)))
    const wanted = cures.find((c) => c.key === q.get('cure'))
    if (wanted) setCureKey(wanted.key)
    const debut = q.get('debut')
    setStart(debut && /^\d{4}-\d{2}-\d{2}$/.test(debut) ? debut : iso(addDays(today, 14)))
    const g = Number(q.get('curistes'))
    if (Number.isInteger(g) && g >= 1) setGuests(g)
    setDeposit(!lead && q.get('paiement') === 'acompte')
    setRoom(q.get('chambre') === '1')
    captureAttribution()
    // Retour depuis la page de paiement : le bouton redevient actif
    const reset = (e: PageTransitionEvent) => e.persisted && setSent(false)
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [])

  const cure = cures.find((c) => c.key === cureKey) || cures[1]
  const { total, base, fee, now, balance } = amounts(cure.price, guests, deposit, site.cmiFee)
  const nights = site.nights(cure.days)

  const plan = useMemo(() => {
    if (!start) return null
    const first = parse(start)
    const last = addDays(first, cure.days - 1)
    const checkIn = addDays(first, -1)
    return { first, last, checkIn, checkOut: addDays(checkIn, nights) }
  }, [start, cure.days, nights])

  const hotelUrl = plan ? site.hotel({ checkIn: iso(plan.checkIn), checkOut: iso(plan.checkOut), adults: guests, rateId: site.packRateId }) : null

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    setSent(true)
    setError('')

    const f = new FormData(form)
    const field = (name: string) => String(f.get(name) || '').trim()
    const contact = {
      fullName: `${field('prenom')} ${field('nom')}`,
      email: field('email'),
      // Vérifié selon le pays par PhoneField : « +212 612345678 »
      phone: field('telephone_complet'),
      numberOfPeople: String(guests),
      arrivalDate: start,
      optIn: f.get('offres') === 'on',
    }

    // Enregistrée dans le Google Sheet (un onglet par version) et dans Brevo, avec les 8 champs d'attribution Meta.
    // Événement Meta : Lead pour une demande, InitiateCheckout pour une réservation qui part au paiement.
    const meta = getAttribution(field('pays'))
    const booking = { ...contact, cure: cure.key, message: field('message'), lang, ...meta, event_name: lead ? meta.event_name : 'InitiateCheckout' }

    try {
      // Demande sans paiement : l'équipe rappelle
      if (lead) {
        const res = await postJson('/api/dc-thermes/reservation', { ...booking, funnel: 'lead' })
        if (!res.ok) throw new Error(await res.text())
        setDone(true)
        window.scrollTo(0, 0)
        return
      }

      // Paiement direct : la réservation est enregistrée « En attente », puis le formulaire CMI est envoyé.
      // Numéro de commande : DCT- (après le paiement, CMI ramène sur les pages de /dc-thermes, voir Confirmation.tsx),
      // puis le format des paniers, qui donne le nom de la cure dans les e-mails ; ACOMPTE : le solde reste dû.
      const orderId = `DCT-${orderPrefix[cure.key]}${cure.days}-${deposit ? 'ACOMPTE-' : ''}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.toUpperCase()
      const paymentPlan = deposit ? 'acompte' : 'total'
      const saved = await postJson('/api/dc-thermes/reservation', { ...booking, funnel: 'cmi', orderId, paymentPlan })
      if (!saved.ok) console.error('Réservation non enregistrée :', await saved.text())
      const res = await postJson('/api/payment/initiate', { ...contact, selectedOffer: String(cure.days), pageSlug: cure.key, orderId, paymentPlan })
      if (!res.ok) throw new Error(await res.text())
      const payment = await res.json()
      if (!payment.success) throw new Error('Réponse de paiement invalide')
      sessionStorage.setItem('bookingInfo', JSON.stringify(payment.bookingInfo))
      // Pour la page de confirmation, dans la langue de la réservation
      const order: ConfirmedOrder = { orderId, lang, cure: cure.key, start, guests, firstName: field('prenom'), paid: now, balance: deposit ? balance : 0 }
      sessionStorage.setItem(orderStorageKey, JSON.stringify(order))
      const cmi = document.createElement('form')
      cmi.method = 'POST'
      cmi.action = payment.gatewayUrl
      for (const [name, value] of Object.entries(payment.params as Record<string, string>)) {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = value
        cmi.appendChild(input)
      }
      document.body.appendChild(cmi)
      cmi.submit()
    } catch (err) {
      console.error(err)
      setSent(false)
      setError(lead ? b.leadError : b.payError)
    }
  }

  return (
    <div className={bkPage}>
      <header className={bkHeader}>
        <a href={landingHref(funnel, lang)} className={bkBack}><span className={cx(arrow(true), bkBackArrow)} aria-hidden="true" /> {b.back}</a>
        <a className={bkLogoLink} href={landingHref(funnel, lang)} aria-label={ui.logoAlt}><img className={cx(logo(), bkLogo)} src="/images/dc-thermes/logo-dc.webp" width="600" height="296" alt={ui.logoAlt} /></a>
        <a className={bkHelp} href={site.tel}>{b.help}</a>
      </header>

      <main className={bkMain}>
        <div className={bkIntro}>
          <Title as="h1" id="bk-title" em={b.em} caps={lead ? b.leadCaps : b.caps} />
          <p className={bkIntroText}>{room ? b.introPack : lead ? b.leadIntro : b.intro}</p>
          {!room && <ol className={bkSteps} aria-label={b.stepsLabel}>
            {(lead ? b.leadSteps : b.steps).map((step, i) => <li key={step} className={bkStep(i === (done ? 1 : 0))}>{step}</li>)}
          </ol>}
          {/* Demande envoyée : la confirmation prend la place du formulaire, juste sous les étapes */}
          {done && (
            <div className={cx(bkGroup('gap-[14px]'), 'mt-4')} role="status">
              <p className="max-w-[52ch] font-sans font-normal text-[1.5rem] leading-[1.2] tracking-[0.08em] uppercase text-ink">{b.leadDone}</p>
              <p className={doneText}>{b.leadDoneText}</p>
            </div>
          )}
        </div>

        <form className={bkForm} onSubmit={submit} noValidate={false} aria-labelledby="bk-title" hidden={done}>
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
            {!room && !lead && <div className={choice()}>
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
            <PhoneField id="bk-tel" b={b} />
            <label className={pf} htmlFor="bk-note"><span className={pfLabel}>{b.note} <em className={pfOptional}>{b.optional}</em></span><textarea className={pfInput({ inGroup: true, area: true })} id="bk-note" name="message" rows={3} placeholder={b.notePh} /></label>
          </fieldset>

          <div className="grid gap-[14px] px-1">
            {!lead && <label className={check}><input className={checkInput} type="checkbox" name="cgv" required /><span>{b.cgv[0]}<a className="text-ink underline underline-offset-3" href={ui.termsUrl} target="_blank" rel="noopener">{b.cgv[1]}</a>{b.cgv[2]}</span></label>}
            <label className={check}><input className={checkInput} type="checkbox" name="offres" /><span>{b.offers}</span></label>
          </div>

          {error && <p className="px-1 text-[0.9375rem] text-ink" role="alert">{error}</p>}
          <button className={cx(pill('dark', { block: true }), bkPay)} type="submit" disabled={sent}>
            {lead ? (sent ? b.leadSending : b.leadSubmit) : sent ? b.sending : b.pay(mad(now))}
          </button>
          {lead
            ? <p className={bkSecure}>{b.leadNote}</p>
            : <p className={bkSecure}><span className={lock} aria-hidden="true" />{b.secure}</p>}
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
            ) : lead ? (
            <dl className={ticketRows}>
              <div className={ticketRow({ money: true })}><dt>{b.times(mad(cure.price), guests)}</dt><dd>{mad(total)}</dd></div>
              <div className={ticketRow({ money: true, due: true })}><dt>{ui.total}</dt><dd>{mad(total)}</dd></div>
            </dl>
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
              {(lead ? b.leadTrust : b.trust).map((x) => <li key={x} className={bkTrustItem}>{x}</li>)}
            </ul>
            {!room && !lead && <ul className="flex flex-wrap gap-[18px] items-center list-none m-0 p-0" aria-label={ui.footerPay}>
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

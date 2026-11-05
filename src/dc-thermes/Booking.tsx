'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { packs, money, longDate as ld, shortDate } from './i18n'
import { Title } from './Title'
import { WhatsAppHelp } from './WhatsAppHelp'
import { cx, pill, arrow, logo } from './ui'
import { amounts, landingHref } from './funnel'
import { captureAttribution, getAttribution } from '@/lib/metaTracking'
import type { CureKey, Funnel } from './types'
import { PhoneField } from './PhoneField'
import { RoomGallery } from './RoomGallery'
import { orderStorageKey } from './order'
import type { ConfirmedOrder } from './order'
import { pf, pfRow, pfLabel, pfOptional, pfInput, choice, choiceItem, hiddenInput, choiceTitle, choiceMeta, stepper, stepperBtn, stepperOut, addon, addonBox, addonTitle, addonMeta, ticketTitle, ticketSub, ticketRows, ticketRow, bkPage, bkHeader, bkBack, bkBackArrow, bkLogoLink, bkLogo, bkMain, bkIntro, bkIntroText, bkSteps, bkStep, bkForm, bkGroup, bkLegend, bkPay, bkSecure, lock, bkSummary, bkCard, bkTrust, bkTrustItem } from './forms'

// Page de réservation : dernière étape avant le paiement CMI.
// Reprend les champs des paniers des cures (nom, e-mail, téléphone, date, personnes, CGV, offres)
// et les choix faits sur la page (cure, date d'arrivée, curistes, totalité ou acompte, chambre).
// Sur /dc-thermes/paiement (cmi) : la cure (nombre de curistes), puis, si le client coche l'hôtel, son séjour :
// date de départ (au moins les nuits de la cure), nombre de participants dans la chambre et chambre choisie parmi
// celles de SiteMinder, prix en direct (/api/dc-thermes/rooms, tarif Public Rate). Cure et chambre se paient sur CMI.
// Ailleurs, avec une chambre, la réservation continue sur Direct-Book (tarif pack), où coordonnées et paiement sont demandés.
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
// Une chambre proposée par /api/dc-thermes/rooms (prix SiteMinder ; pay = ce que CMI encaisse, frais compris)
type Offer = { roomRateUuid: string; room: string; plan: string; size: string; photo: string | null; photos: string[]; available: number; gross: number; pay: number }
const roomCard = (on: boolean) =>
  cx(choiceItem({ on, inGroup: true }), 'grid-cols-[96px_minmax(0,1fr)_auto] items-center gap-x-4 py-3 pl-3 max-sm:grid-cols-[72px_minmax(0,1fr)]')

// /dc-thermes/paiement : dix curistes au plus par session ; un séjour en ligne de 30 nuits au plus (comme le serveur)
const MAX_CURISTES = 10
const MAX_NIGHTS = 30
const DAY = 24 * 60 * 60 * 1000

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
  const [arrival, setArrival] = useState('')
  const [minDate, setMinDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [deposit, setDeposit] = useState(false)
  const [room, setRoom] = useState(false)
  const [sent, setSent] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [offers, setOffers] = useState<Offer[]>([])
  // Chambre dont la galerie de photos est ouverte
  const [gallery, setGallery] = useState<Offer | null>(null)
  const [roomsState, setRoomsState] = useState<'loading' | 'ready' | 'error'>('loading')
  const [roomRate, setRoomRate] = useState('')
  const [roomsReload, setRoomsReload] = useState(0)
  // Hôtel : nuits choisies par le client (null : celles de la cure) et personnes dans la chambre
  const [chosenNights, setChosenNights] = useState<number | null>(null)
  const [participants, setParticipants] = useState(1)
  const departureInput = useRef<HTMLInputElement>(null)
  const lead = funnel === 'lead'
  // /dc-thermes/paiement : la chambre se choisit et se paie ici (packs SiteMinder), sans passer par Direct-Book
  const live = funnel === 'cmi'

  // Reprend les choix faits sur la page des cures
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = lead ? t.meta.leadTitle : t.meta.bookingTitle
    const q = new URLSearchParams(window.location.search)
    const today = new Date()
    // Arrivée au plus tôt demain : le premier soin, le lendemain, reste à deux jours au moins
    setMinDate(iso(addDays(today, 1)))
    const wanted = cures.find((c) => c.key === q.get('cure'))
    if (wanted) setCureKey(wanted.key)
    // debut : date d'arrivée choisie sur la page des cures
    const debut = q.get('debut')
    const start = debut && /^\d{4}-\d{2}-\d{2}$/.test(debut) ? debut : iso(addDays(today, 14))
    setArrival(start)
    const g = Number(q.get('curistes'))
    const curistes = Number.isInteger(g) && g >= 1 ? (live ? Math.min(g, MAX_CURISTES) : g) : 1
    setGuests(curistes)
    setDeposit(!lead && q.get('paiement') === 'acompte')
    setRoom(q.get('chambre') === '1')
    // Reprise d'une réservation avec l'hôtel (paiement refusé) : date de départ et participants
    const p = Number(q.get('participants'))
    setParticipants(Number.isInteger(p) && p >= 1 && p <= 4 ? p : Math.min(curistes, 4))
    const depart = q.get('depart')
    if (depart && /^\d{4}-\d{2}-\d{2}$/.test(depart)) setChosenNights(Math.round((parse(depart).getTime() - parse(start).getTime()) / DAY))
    captureAttribution()
    // Retour depuis la page de paiement : le bouton redevient actif
    const reset = (e: PageTransitionEvent) => e.persisted && setSent(false)
    window.addEventListener('pageshow', reset)
    return () => window.removeEventListener('pageshow', reset)
  }, [])

  const cure = cures.find((c) => c.key === cureKey) || cures[1]
  // Acompte de 50 % : pour la cure seule, et sur /dc-thermes/paiement aussi avec la chambre (50 % de chacune)
  const payDeposit = deposit && (live || !room)
  const { total, base, fee, now, balance } = amounts(cure.price, guests, payDeposit, site.cmiFee)
  const nights = site.nights(cure.days)
  const pack = live && room
  // Nuits à l'hôtel : choisies par le client sur /dc-thermes/paiement, sinon celles de la cure
  const stayNights = pack ? chosenNights ?? nights : nights

  // Le client choisit sa date d'arrivée ; le premier soin a lieu le lendemain, le départ le lendemain du dernier soin
  // (ou à la date choisie pour l'hôtel)
  const plan = useMemo(() => {
    if (!arrival) return null
    const checkIn = parse(arrival)
    const first = addDays(checkIn, 1)
    const last = addDays(first, cure.days - 1)
    return { first, last, checkIn, checkOut: addDays(checkIn, stayNights) }
  }, [arrival, cure.days, stayNights])
  const departure = plan ? iso(plan.checkOut) : ''

  // Séjour trop court pour la cure (date tapée à la main malgré le calendrier) ou trop long pour la réservation en ligne
  const stayError = !pack ? '' : stayNights < nights ? b.tooShort(cure.name, nights) : stayNights > MAX_NIGHTS ? b.tooLong(MAX_NIGHTS) : ''
  useEffect(() => departureInput.current?.setCustomValidity(stayError), [stayError, pack])
  const pickDeparture = (value: string) => {
    if (value && plan) setChosenNights(Math.round((parse(value).getTime() - plan.checkIn.getTime()) / DAY))
  }
  // « 6 nuits · du 19 au 25 novembre » (le mois une seule fois s'il ne change pas)
  const stayText = plan
    ? b.stayLength(
        stayNights,
        plan.checkIn.getMonth() === plan.checkOut.getMonth() && plan.checkIn.getFullYear() === plan.checkOut.getFullYear()
          ? String(plan.checkIn.getDate())
          : shortDate(t, plan.checkIn),
        shortDate(t, plan.checkOut),
      )
    : ''

  const hotelUrl = plan ? site.hotel({ checkIn: iso(plan.checkIn), checkOut: iso(plan.checkOut), adults: guests }) : null

  // Chambres libres pour ces dates et ce nombre de participants, en direct de SiteMinder (une chambre par réservation, 4 personnes au plus)
  useEffect(() => {
    if (!pack || !departure || stayError) return
    const abort = new AbortController()
    setRoomsState('loading')
    const wait = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/dc-thermes/rooms?${new URLSearchParams({ cure: cure.key, arrival, departure, participants: String(participants) })}`, { signal: abort.signal })
        if (!res.ok) throw new Error(String(res.status))
        const data = (await res.json()) as { offers: Offer[] }
        setOffers(data.offers)
        setRoomRate((current) => (data.offers.some((o) => o.roomRateUuid === current) ? current : ''))
        setRoomsState('ready')
      } catch {
        if (!abort.signal.aborted) setRoomsState('error')
      }
    }, 250)
    return () => {
      abort.abort()
      window.clearTimeout(wait)
    }
  }, [pack, cure.key, arrival, departure, participants, stayError, roomsReload])
  const offer = pack ? offers.find((o) => o.roomRateUuid === roomRate) : undefined
  // Avec l'hôtel : la cure et la chambre (en totalité, ou 50 % de chacune, la moitié de la chambre arrondie au dirham
  // supérieur), chacune avec les frais CMI arrondis à l'inférieur comme sur le serveur
  const roomBase = offer ? (payDeposit ? Math.ceil(offer.gross / 2) : offer.gross) : 0
  const due = now + (offer ? Math.floor(roomBase * (1 + site.cmiFee)) : 0)
  const totalAll = total + (offer ? offer.gross : 0)
  const baseAll = base + roomBase
  const feeAll = due - baseAll
  const balanceAll = totalAll - baseAll

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
      arrivalDate: arrival,
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
      // PACK : cure + chambre SiteMinder, réglées en totalité ; le serveur reprend le prix de la chambre chez SiteMinder.
      if (pack && (!offer || stayError)) throw new Error('Aucune chambre choisie')
      const orderId = `DCT-${orderPrefix[cure.key]}${cure.days}-${pack ? 'PACK-' : payDeposit ? 'ACOMPTE-' : ''}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.toUpperCase()
      const paymentPlan = payDeposit ? 'acompte' : 'total'
      // numberOfPeople : les curistes ; participants : les personnes dans la chambre
      const hotel = offer ? { roomRateUuid: offer.roomRateUuid, departureDate: departure, participants } : {}
      const saved = await postJson('/api/dc-thermes/reservation', { ...booking, funnel: 'cmi', orderId, paymentPlan, ...hotel })
      if (!saved.ok) console.error('Réservation non enregistrée :', await saved.text())
      const res = await postJson('/api/payment/initiate', { ...contact, selectedOffer: String(cure.days), pageSlug: cure.key, orderId, paymentPlan, ...hotel })
      // La chambre vient d'être prise : la liste est rechargée et le client en choisit une autre
      if (res.status === 409) {
        setSent(false)
        setRoomRate('')
        setRoomsReload((n) => n + 1)
        setError(b.roomTaken)
        return
      }
      if (!res.ok) throw new Error(await res.text())
      const payment = await res.json()
      if (!payment.success) throw new Error('Réponse de paiement invalide')
      sessionStorage.setItem('bookingInfo', JSON.stringify(payment.bookingInfo))
      // Pour la page de confirmation, dans la langue de la réservation
      const order: ConfirmedOrder = offer
        ? { orderId, lang, cure: cure.key, arrival, guests, firstName: field('prenom'), paid: due, balance: payDeposit ? balanceAll : 0, room: offer.room, departure, participants }
        : { orderId, lang, cure: cure.key, arrival, guests, firstName: field('prenom'), paid: now, balance: payDeposit ? balance : 0 }
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
        <WhatsAppHelp t={t} />
      </header>

      <main className={bkMain}>
        <div className={bkIntro}>
          <Title as="h1" id="bk-title" em={b.em} caps={lead ? b.leadCaps : b.caps} />
          <p className={bkIntroText}>{pack ? b.introRooms : room ? b.introPack : lead ? b.leadIntro : b.intro}</p>
          {(!room || live) && <ol className={bkSteps} aria-label={b.stepsLabel}>
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
                  <input className={hiddenInput} type="radio" name="cure" value={c.key} checked={c.key === cure.key} onChange={() => {
                    setCureKey(c.key)
                    // Une cure plus longue allonge le séjour choisi jusqu'à son minimum
                    setChosenNights((n) => (n !== null && n < site.nights(c.days) ? site.nights(c.days) : n))
                  }} />
                  <span className={choiceTitle}>{c.name}</span>
                  <span className={choiceMeta}>{c.days} {ui.days}</span>
                </label>
              ))}
            </div>
            <div className={pfRow}>
              <label className={pf} htmlFor="bk-start">
                <span className={pfLabel}>{ui.arrivalDate}</span>
                <input className={pfInput({ inGroup: true })} id="bk-start" name="debut" type="date" required value={arrival} min={minDate} onChange={(e) => e.target.value && setArrival(e.target.value)} />
              </label>
              <div className={pf}>
                <span className={pfLabel} id="bk-guests">{live ? b.curistes : ui.guests}</span>
                <div className={stepper(true)} role="group" aria-labelledby="bk-guests">
                  <button className={stepperBtn} type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} aria-label={live ? b.lessCuriste : ui.lessGuest}>−</button>
                  <output className={stepperOut} aria-live="polite">{live ? b.curiste(guests) : ui.person(guests)}</output>
                  <button className={stepperBtn} type="button" onClick={() => setGuests((g) => (live ? Math.min(MAX_CURISTES, g + 1) : g + 1))} disabled={live && guests >= MAX_CURISTES} aria-label={live ? b.moreCuriste : ui.moreGuest}>+</button>
                </div>
              </div>
            </div>
            {live && guests >= MAX_CURISTES && <p className="-mt-2 text-[0.875rem] text-muted">{b.curistesMax}</p>}
            {(!room || live) && !lead && <div className={choice()}>
              <label className={choiceItem({ on: !deposit, inGroup: true })}>
                <input className={hiddenInput} type="radio" name="paiement" checked={!deposit} onChange={() => setDeposit(false)} />
                <span className={choiceTitle}>{ui.full}</span>
                {!live && <span className={choiceMeta}>{ui.fullMeta}</span>}
              </label>
              <label className={choiceItem({ on: deposit, inGroup: true })}>
                <input className={hiddenInput} type="radio" name="paiement" checked={deposit} onChange={() => setDeposit(true)} />
                <span className={choiceTitle}>{ui.deposit}</span>
                <span className={choiceMeta}>{pack ? b.depositMetaStay : ui.depositMeta}</span>
              </label>
            </div>}
            <label className={addon({ on: room, inGroup: true })}>
              <input className={hiddenInput} type="checkbox" checked={room} onChange={(e) => {
                setRoom(e.target.checked)
                // Par défaut, autant de personnes dans la chambre que de curistes (4 au plus)
                if (e.target.checked && live) setParticipants(Math.min(guests, 4))
              }} />
              <span className={addonBox(room)} aria-hidden="true" />
              <span>
                <span className={addonTitle}>{live ? b.stayTitle : b.roomTitle}</span>
                <span className={addonMeta}>{live ? (room ? b.stayOn : b.stayOff) : room ? b.roomOn : b.roomOff}</span>
              </span>
            </label>
          </fieldset>

          {pack && (
            <fieldset className={bkGroup()} aria-busy={roomsState === 'loading'}>
              <legend className={bkLegend}>{b.roomsTitle}</legend>
              <div className={pfRow}>
                <label className={pf} htmlFor="bk-checkin">
                  <span className={pfLabel}>{ui.arrivalDate}</span>
                  <input className={cx(pfInput({ inGroup: true }), 'text-muted cursor-default')} id="bk-checkin" type="text" readOnly value={plan ? longDate(plan.checkIn) : ''} />
                </label>
                <label className={pf} htmlFor="bk-end">
                  <span className={pfLabel}>{b.departureDate}</span>
                  <input
                    ref={departureInput}
                    className={cx(pfInput({ inGroup: true }), stayError && 'border-error!')}
                    id="bk-end"
                    name="depart"
                    type="date"
                    required
                    value={departure}
                    min={plan ? iso(addDays(plan.checkIn, nights)) : undefined}
                    max={plan ? iso(addDays(plan.checkIn, MAX_NIGHTS)) : undefined}
                    aria-invalid={!!stayError}
                    aria-describedby="bk-stay"
                    onChange={(e) => pickDeparture(e.target.value)}
                  />
                </label>
              </div>
              <p id="bk-stay" className={cx('-mt-2 text-[0.9375rem]', stayError ? 'text-error' : 'text-ink')} aria-live="polite">{stayError || stayText}</p>
              <div className={pfRow}>
                <div className={pf}>
                  <span className={pfLabel} id="bk-people">{b.participants}</span>
                  <span className="-mt-1 text-[0.9375rem] text-muted" id="bk-people-hint">{b.participantsHint}</span>
                  <div className={stepper(true)} role="group" aria-labelledby="bk-people" aria-describedby="bk-people-hint">
                    <button className={stepperBtn} type="button" onClick={() => setParticipants((n) => Math.max(1, n - 1))} disabled={participants <= 1} aria-label={b.lessParticipant}>−</button>
                    <output className={stepperOut} aria-live="polite">{b.participant(participants)}</output>
                    <button className={stepperBtn} type="button" onClick={() => setParticipants((n) => Math.min(4, n + 1))} disabled={participants >= 4} aria-label={b.moreParticipant}>+</button>
                  </div>
                </div>
              </div>
              {!stayError && (
                <div className="grid gap-3" role="radiogroup" aria-labelledby="bk-room-type">
                  <span className={pfLabel} id="bk-room-type">{b.roomType}</span>
                  {roomsState === 'loading' ? (
                    <p className="text-muted" role="status">{b.roomsLoading}</p>
                  ) : roomsState === 'error' ? (
                    <p className="text-ink" role="alert">{b.roomsError}</p>
                  ) : offers.length === 0 ? (
                    <p className="text-muted" role="status">{b.roomsEmpty}</p>
                  ) : (
                    offers.map((o) => (
                      <label key={o.roomRateUuid} className={roomCard(o.roomRateUuid === roomRate)}>
                        <input className={hiddenInput} type="radio" name="chambre" value={o.roomRateUuid} checked={o.roomRateUuid === roomRate} onChange={() => setRoomRate(o.roomRateUuid)} required />
                        {/* La photo et le lien ouvrent la galerie (au-dessus du bouton radio, ils ne choisissent pas la chambre) */}
                        <button
                          type="button"
                          className="relative z-[1] row-span-2 aspect-[4/3] overflow-hidden rounded-[8px] bg-panel cursor-zoom-in max-sm:row-span-3 max-sm:self-start max-sm:mt-1 focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
                          onClick={() => setGallery(o)}
                          disabled={!o.photos.length}
                          aria-label={b.photosOpen(o.room, o.photos.length)}
                        >
                          {o.photo && <img className="w-full h-full object-cover" src={o.photo} alt="" loading="lazy" />}
                          {o.photos.length > 1 && <span className="absolute right-1 bottom-1 py-[2px] px-[6px] rounded-full bg-[rgb(28_27_25/0.72)] text-white text-[0.6875rem] leading-[1.4] tabular-nums" aria-hidden="true">{o.photos.length}</span>}
                        </button>
                        <span className="grid gap-1 min-w-0">
                          <span className={choiceTitle}>{o.room}</span>
                          <span className={choiceMeta}>{[o.size, b.roomsIncl(stayNights)].filter(Boolean).join(' · ')}</span>
                          {o.available <= 3 && <span className="text-[0.8125rem] text-ink">{b.roomsLeft(o.available)}</span>}
                          {o.photos.length > 0 && (
                            <button type="button" className="relative z-[1] w-fit p-0 text-left text-[0.8125rem] text-ink underline underline-offset-3 cursor-pointer" onClick={() => setGallery(o)}>
                              {b.photosLink(o.photos.length)}
                            </button>
                          )}
                        </span>
                        <span className="text-right text-[1.125rem] whitespace-nowrap max-sm:col-start-2 max-sm:text-left">{mad(o.gross)}</span>
                      </label>
                    ))
                  )}
                </div>
              )}
            </fieldset>
          )}

          {room && !live ? (
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
          <button className={cx(pill('dark', { block: true }), bkPay)} type="submit" disabled={sent || (pack && (!offer || !!stayError))}>
            {lead ? (sent ? b.leadSending : b.leadSubmit) : sent ? b.sending : pack ? (offer && !stayError ? b.pay(mad(due)) : b.roomsPick) : b.pay(mad(now))}
          </button>
          {lead
            ? <p className={bkSecure}>{b.leadNote}</p>
            : <p className={bkSecure}><span className={lock} aria-hidden="true" />{b.secure}</p>}
          </>
          )}
        </form>

        {gallery && (
          <RoomGallery
            room={gallery.room}
            meta={[gallery.size, b.roomsIncl(stayNights)].filter(Boolean).join(' · ')}
            price={mad(gallery.gross)}
            photos={gallery.photos}
            chosen={gallery.roomRateUuid === roomRate}
            b={b}
            onChoose={() => setRoomRate(gallery.roomRateUuid)}
            onClose={() => setGallery(null)}
          />
        )}

        <aside className={bkSummary()} aria-label={b.summary}>
          <figure className="aspect-video overflow-hidden max-lg:aspect-[21/9]"><img className="w-full h-full object-cover" src={cure.img} alt={cure.alt} style={cure.imgPos ? { objectPosition: cure.imgPos } : undefined} /></figure>
          <div className={bkCard()}>
            <p className={cx(ticketTitle, 'text-ink')}>{cure.name}</p>
            <p className={ticketSub}>{cure.days} {ui.days} · {cure.treatments} {ui.treatments} · {cure.hours} {ui.hoursShort} · {b.access}</p>
            {live ? (
              <>
                <dl className={ticketRows}>
                  {plan && <div className={ticketRow()}><dt>{ui.arrival}</dt><dd>{longDate(plan.checkIn)}</dd></div>}
                  {plan && <div className={ticketRow()}><dt>{ui.firstTreatment}</dt><dd>{longDate(plan.first)}</dd></div>}
                  {plan && <div className={ticketRow()}><dt>{ui.lastTreatment}</dt><dd>{longDate(plan.last)}</dd></div>}
                  {plan && <div className={ticketRow()}><dt>{b.departure}</dt><dd>{longDate(plan.checkOut)}</dd></div>}
                </dl>
                {/* Panier : la cure, puis l'hébergement (ou « Sans hébergement »), puis total, frais bancaires et montant du jour */}
                <dl className={ticketRows}>
                  <div className={ticketRow({ money: true })}><dt><span className="block text-ink">{cure.name} · {b.curiste(guests)}</span></dt><dd>{mad(total)}</dd></div>
                  {pack ? (
                    <div className={ticketRow({ money: true })}>
                      <dt>
                        <span className="block text-ink">{offer ? offer.room : b.cartStayPick} · {b.participant(participants)}</span>
                        {!stayError && <span className="block">{stayText}</span>}
                      </dt>
                      <dd>{offer ? mad(offer.gross) : b.cartStayPickPrice}</dd>
                    </div>
                  ) : (
                    <div className={ticketRow({ money: true })}>
                      <dt><span className="block text-ink">{b.cartNoStay}</span><span className="block">{b.stayOff}</span></dt>
                      <dd>—</dd>
                    </div>
                  )}
                </dl>
                {pack && !offer ? (
                  <p className="text-[0.875rem] text-muted">{b.cartTotalLater}</p>
                ) : (
                  <dl className={ticketRows}>
                    <div className={ticketRow({ money: true })}><dt>{pack ? b.cartTotalStay : ui.total}</dt><dd>{mad(totalAll)}</dd></div>
                    {payDeposit && <div className={ticketRow({ money: true })}><dt>{ui.depositLine}</dt><dd>{mad(baseAll)}</dd></div>}
                    <div className={ticketRow({ money: true })}><dt>{b.bankFee}</dt><dd>{mad(feeAll)}</dd></div>
                    <div className={ticketRow({ money: true, due: true })}><dt>{ui.due}</dt><dd>{mad(due)}</dd></div>
                    {payDeposit && <div className={ticketRow({ money: true })}><dt>{pack ? b.balanceStay : ui.balance}</dt><dd>{mad(balanceAll)}</dd></div>}
                  </dl>
                )}
              </>
            ) : (
            <>
            <dl className={ticketRows}>
              {plan && <div className={ticketRow()}><dt>{ui.arrival}</dt><dd>{longDate(plan.checkIn)}</dd></div>}
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
            </>
            )}
            <ul className={bkTrust}>
              {(lead ? b.leadTrust : b.trust).map((x) => <li key={x} className={bkTrustItem}>{x}</li>)}
            </ul>
            {(!room || live) && !lead && <ul className="flex flex-wrap gap-[18px] items-center list-none m-0 p-0" aria-label={ui.footerPay}>
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

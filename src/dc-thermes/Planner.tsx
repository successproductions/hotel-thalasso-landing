import { useEffect, useMemo, useState } from 'react'
import { useT, money, longDate as ld } from './i18n'
import { pill } from './ui'
import { amounts, bookingHref } from './funnel'
import type { CureKey, Funnel } from './types'
import { pf, pfRow, pfLabel, pfInput, choice, choiceItem, hiddenInput, choiceTitle, choiceMeta, stepper, stepperBtn, stepperOut, addon, addonBox, addonTitle, addonMeta, ticketTitle, ticketSub, ticketRows, ticketRow } from './forms'

// Le composeur de cure : cure, date d'arrivée, nombre de curistes, acompte ou totalité, chambre en option.
// Il calcule les dates de soins et ce qui est réglé aujourd'hui puis à l'arrivée.
// Avec une chambre, cure et chambre se réservent ensemble sur Direct-Book (tarif pack, prix et disponibilités affichés là-bas).
// Version « contact » (lead) : pas de choix de règlement, seulement le prix de la cure et le lien vers la demande.

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

type PlannerProps = {
  cureKey: CureKey
  onCureChange: (key: CureKey) => void
  funnel: Funnel
}

export default function Planner({ cureKey, onCureChange, funnel }: PlannerProps) {
  const t = useT()
  const { cures, site, ui } = t
  const mad = (n: number) => money(t, n)
  const longDate = (d: Date) => ld(t, d)
  const [arrival, setArrival] = useState('')
  const [minDate, setMinDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [deposit, setDeposit] = useState(false)
  const [room, setRoom] = useState(false)

  // Dates calculées dans le navigateur seulement, pour que le HTML pré-rendu reste identique
  useEffect(() => {
    const today = new Date()
    // Arrivée au plus tôt demain : le premier soin, le lendemain, reste à deux jours au moins
    setMinDate(iso(addDays(today, 1)))
    setArrival(iso(addDays(today, 14)))
  }, [])

  const cure = cures.find((c) => c.key === cureKey) || cures[1]
  const lead = funnel === 'lead'
  const { total, base, fee, now, balance } = amounts(cure.price, guests, deposit && !lead, site.cmiFee)
  const nights = site.nights(cure.days)

  // Le client choisit sa date d'arrivée ; le premier soin a lieu le lendemain, le départ le lendemain du dernier soin
  const plan = useMemo(() => {
    if (!arrival) return null
    const checkIn = parse(arrival)
    const first = addDays(checkIn, 1)
    const last = addDays(first, cure.days - 1)
    return { first, last, checkIn, checkOut: addDays(checkIn, nights) }
  }, [arrival, cure.days, nights])

  const hotelUrl = plan ? site.hotel({ checkIn: iso(plan.checkIn), checkOut: iso(plan.checkOut), adults: guests }) : null

  return (
    <div className="grid grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-[clamp(24px,3vw,48px)] max-w-[1200px] mx-auto items-start max-xl:grid-cols-[minmax(0,1fr)]">
      <form className="grid gap-[34px]" onSubmit={(e) => e.preventDefault()} aria-label={ui.cure}>
        <fieldset className={pf}>
          <legend className={pfLabel}>{ui.cure}</legend>
          <div className={choice(3)}>
            {cures.map((c) => (
              <label key={c.key} className={choiceItem({ on: c.key === cure.key })}>
                <input className={hiddenInput} type="radio" name="cure" value={c.key} checked={c.key === cure.key} onChange={() => onCureChange(c.key)} />
                <span className={choiceTitle}>{c.name}</span>
                <span className={choiceMeta}>{c.days} {ui.days}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={pfRow}>
          <label className={pf} htmlFor="planner-start">
            <span className={pfLabel}>{ui.arrivalDate}</span>
            <input className={pfInput()} id="planner-start" type="date" value={arrival} min={minDate} onChange={(e) => e.target.value && setArrival(e.target.value)} />
          </label>
          <div className={pf}>
            <span className={pfLabel} id="guests-label">{ui.guests}</span>
            <div className={stepper()} role="group" aria-labelledby="guests-label">
              <button className={stepperBtn} type="button" onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} aria-label={ui.lessGuest}>−</button>
              <output className={stepperOut} aria-live="polite">{ui.person(guests)}</output>
              <button className={stepperBtn} type="button" onClick={() => setGuests((g) => g + 1)} aria-label={ui.moreGuest}>+</button>
            </div>
          </div>
        </div>

        <fieldset className={pf}>
          <legend className={pfLabel}>{ui.lodgingField}</legend>
          <label className={addon({ on: room })}>
            <input className={hiddenInput} type="checkbox" checked={room} onChange={(e) => setRoom(e.target.checked)} />
            <span className={addonBox(room)} aria-hidden="true" />
            <span>
              <span className={addonTitle}>{ui.roomTitle}</span>
              <span className={addonMeta}>
                {room ? ui.roomOn : ui.roomOff}
              </span>
            </span>
          </label>
        </fieldset>

        {!room && !lead && <fieldset className={pf}>
          <legend className={pfLabel}>{ui.payment}</legend>
          <div className={choice()}>
            <label className={choiceItem({ on: !deposit })}>
              <input className={hiddenInput} type="radio" name="deposit" checked={!deposit} onChange={() => setDeposit(false)} />
              <span className={choiceTitle}>{ui.full}</span>
              <span className={choiceMeta}>{ui.fullMeta}</span>
            </label>
            <label className={choiceItem({ on: deposit })}>
              <input className={hiddenInput} type="radio" name="deposit" checked={deposit} onChange={() => setDeposit(true)} />
              <span className={choiceTitle}>{ui.deposit}</span>
              <span className={choiceMeta}>{ui.depositMeta}</span>
            </label>
          </div>
        </fieldset>}

      </form>

      <aside className="sticky top-[100px] grid gap-5 p-[clamp(26px,3vw,40px)] bg-white rounded-[16px] max-xl:static" aria-live="polite">
        <p className={ticketTitle}>{cure.name}</p>
        <p className={ticketSub}>{cure.days} {ui.days} · {cure.treatments} {ui.treatments} · {ui.guestCount(guests)}</p>
        <dl className={ticketRows}>
          {plan ? (
            <>
              <div className={ticketRow()}><dt>{ui.arrival}</dt><dd>{longDate(plan.checkIn)}</dd></div>
              <div className={ticketRow()}><dt>{ui.firstTreatment}</dt><dd>{longDate(plan.first)}</dd></div>
              <div className={ticketRow()}><dt>{ui.lastTreatment}</dt><dd>{longDate(plan.last)}</dd></div>
              {room && <div className={ticketRow()}><dt>{ui.departure}</dt><dd>{longDate(plan.checkOut)}</dd></div>}
            </>
          ) : (
            <div className={ticketRow()}><dt>{ui.dates}</dt><dd>{ui.pickDay}</dd></div>
          )}
        </dl>
        {room ? (
          <>
            <dl className={ticketRows}>
              <div className={ticketRow({ money: true })}><dt>{ui.packRow(nights)}</dt><dd>{ui.packPrice}</dd></div>
            </dl>
            <p className="text-[0.875rem] text-muted">{ui.packNote}</p>
            <a className={pill('dark', { block: true })} href={hotelUrl || undefined}>{ui.packCta}</a>
          </>
        ) : (
          <>
        <dl className={ticketRows}>
          <div className={ticketRow({ money: true, due: lead })}><dt>{ui.total}</dt><dd>{mad(total)}</dd></div>
          {!lead && <>
          {deposit && <div className={ticketRow({ money: true })}><dt>{ui.balance}</dt><dd>{mad(balance)}</dd></div>}
          {deposit && <div className={ticketRow({ money: true })}><dt>{ui.depositLine}</dt><dd>{mad(base)}</dd></div>}
          <div className={ticketRow({ money: true })}><dt>{ui.fee}</dt><dd>{mad(fee)}</dd></div>
          <div className={ticketRow({ money: true, due: true })}><dt>{ui.due}</dt><dd>{mad(now)}</dd></div>
          </>}
        </dl>
        <a className={pill('dark', { block: true })} href={bookingHref(funnel, t.lang, { cure: cure.key, debut: arrival, curistes: String(guests), paiement: deposit && !lead ? 'acompte' : 'total', chambre: room ? '1' : '0' })}>
          {lead ? ui.ctaLead : deposit ? ui.ctaDeposit : ui.ctaFull}
        </a>
          </>
        )}
        <p className="text-[0.8125rem] text-soft">{room ? ui.packTicketNote : lead ? ui.leadTicketNote : ui.ticketNote}</p>
      </aside>
    </div>
  )
}

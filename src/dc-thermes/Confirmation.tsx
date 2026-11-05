'use client'

import { useEffect } from 'react'
import { packs, money, longDate as ld } from './i18n'
import { Title } from './Title'
import { cx, pill, arrow, logo } from './ui'
import { bookingHref, landingHref } from './funnel'
import { cureFromOrderId, readOrder } from './order'
import { ticketTitle, ticketSub, ticketRows, ticketRow, bkPage, bkHeader, bkBack, bkBackArrow, bkLogoLink, bkLogo, bkHelp, bkMain, bkIntro, bkIntroText, bkSteps, bkStep, bkGroup, bkLegend, bkSummary, bkCard, bkTrustItem } from './forms'

// Retour du paiement CMI pour les commandes DC Thermes (numéro DCT-…), à la place des pages des paniers :
// /dc-thermes/merci (paid) ou /dc-thermes/paiement-echoue. /api/payment/success et /api/payment/fail y renvoient.
// La réservation vient du navigateur (order.ts) : langue, dates, montants. Sans elle, la cure se lit dans le numéro.

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n)

// Photo de la carte « Prochaine étape », jusqu'aux bords de la carte (même marge que bkGroup)
const hotelImg = '-mx-[clamp(22px,2.6vw,36px)] -mt-[clamp(22px,2.6vw,36px)] aspect-[21/9] overflow-hidden'

export default function Confirmation({ paid }: { paid: boolean }) {
  const q = new URLSearchParams(window.location.search)
  const orderId = (q.get('order') || '').slice(0, 60)
  const order = readOrder(orderId)
  const lang = order?.lang || (q.get('lang') === 'en' ? 'en' : 'fr')
  const t = packs[lang]
  const { cures, site, ui, bookingPage: b, confirmPage: c } = t
  const cure = cures.find((x) => x.key === (order?.cure || cureFromOrderId(orderId)))
  const mad = (n: number) => money(t, n)
  const first = order?.arrival ? addDays(parse(order.arrival), 1) : null

  useEffect(() => {
    document.documentElement.lang = lang
    // La page est statique, son titre est en français : React le remet pendant le premier rendu,
    // le titre de la langue de la réservation est donc posé juste après
    const title = window.setTimeout(() => (document.title = paid ? c.title : c.failTitle), 0)
    return () => window.clearTimeout(title)
  }, [])

  // Hôtel : arrivée la veille du premier soin, départ le lendemain du dernier, comme le pack de la page de réservation.
  // Sans la réservation en mémoire, Direct-Book demande les dates.
  const checkIn = first && cure ? addDays(first, -1) : null
  const checkOut = checkIn && cure ? addDays(checkIn, site.nights(cure.days)) : null
  const hotelHref = checkIn && checkOut && order
    ? site.hotel({ checkIn: iso(checkIn), checkOut: iso(checkOut), adults: order.guests })
    : site.hotel({ adults: 2 })

  // Réessayer : la page de réservation reprend la cure, les dates et le règlement choisis
  // Un pack (chambre SiteMinder) se reprend sur /dc-thermes/paiement, où la liste des chambres s'affiche
  const packOrder = !!order?.room || orderId.includes('-PACK-')
  const retryHref = bookingHref(packOrder ? 'cmi' : 'main', lang, order
    ? { cure: order.cure, debut: order.arrival, curistes: String(order.guests), paiement: order.balance ? 'acompte' : 'total', ...(packOrder ? { chambre: '1' } : {}) }
    : cure ? { cure: cure.key, ...(packOrder ? { chambre: '1' } : {}) } : {})

  return (
    <div className={bkPage}>
      <header className={bkHeader}>
        <a href={landingHref('main', lang)} className={bkBack}><span className={cx(arrow(true), bkBackArrow)} aria-hidden="true" /> {c.back}</a>
        <a className={bkLogoLink} href={landingHref('main', lang)} aria-label={ui.logoAlt}><img className={cx(logo(), bkLogo)} src="/images/dc-thermes/logo-dc.webp" width="600" height="296" alt={ui.logoAlt} /></a>
        <a className={bkHelp} href={site.tel}>{b.help}</a>
      </header>

      <main className={bkMain}>
        <div className={bkIntro}>
          <Title as="h1" em={paid ? c.em : ''} caps={paid ? c.caps : c.failCaps} />
          <p className={bkIntroText}>{paid ? c.intro(order?.firstName || '') : c.failIntro}</p>
          <ol className={bkSteps} aria-label={b.stepsLabel}>
            {b.steps.map((step, i) => <li key={step} className={bkStep(i === (paid ? 2 : 1))}>{step}</li>)}
          </ol>

          {/* Pack (chambre comprise) : rien à réserver en plus */}
          {paid && !packOrder && (
            <section className={cx(bkGroup('gap-5'), 'mt-4 overflow-hidden')} aria-labelledby="ok-hotel">
              <figure className={hotelImg}><img className="w-full h-full object-cover" src="/images/dc-thermes/dakhla-club-lagune.webp" width="1800" height="1013" alt="" /></figure>
              <h2 className={bkLegend} id="ok-hotel">{c.hotelTitle}</h2>
              <p className="text-muted">{c.hotelText}</p>
              {checkIn && checkOut && (
                <>
                  <dl className={ticketRows}>
                    <div className={ticketRow()}><dt>{ui.arrival}</dt><dd>{ld(t, checkIn)}</dd></div>
                    <div className={ticketRow()}><dt>{ui.departure}</dt><dd>{ld(t, checkOut)}</dd></div>
                  </dl>
                  <p className="text-sm text-muted">{c.hotelDates}</p>
                </>
              )}
              <a className={cx(pill('dark'), 'w-fit')} href={hotelHref} target="_blank" rel="noopener">{c.hotelCta}</a>
            </section>
          )}

          {paid ? (
            <section className={cx(bkGroup('gap-5'), 'mt-4')} aria-labelledby="ok-next">
              <h2 className={bkLegend} id="ok-next">{c.nextTitle}</h2>
              <ul className="grid gap-3 list-none m-0 p-0">
                {c.next.map((x) => <li key={x} className={bkTrustItem}>{x}</li>)}
                {order && order.balance > 0 && <li className={bkTrustItem}>{c.balanceNext(mad(order.balance))}</li>}
              </ul>
              <p className="text-muted">{c.question}</p>
              <div className="flex flex-wrap gap-3">
                <a className={pill('outline')} href={site.tel}>{site.phone}</a>
                <a className={pill('outline')} href={site.contactLink} target="_blank" rel="noopener">{c.whatsapp}</a>
              </div>
            </section>
          ) : (
            <div className="flex flex-wrap gap-3 mt-4">
              <a className={pill('dark')} href={retryHref}>{c.retry}</a>
              <a className={pill('outline')} href={site.tel}>{site.phone}</a>
            </div>
          )}
        </div>

        {cure && (
          <aside className={bkSummary()} aria-label={b.summary}>
            <figure className="aspect-video overflow-hidden max-lg:aspect-[21/9]"><img className="w-full h-full object-cover" src={cure.img} alt={cure.alt} style={cure.imgPos ? { objectPosition: cure.imgPos } : undefined} /></figure>
            <div className={bkCard()}>
              <p className={cx(ticketTitle, 'text-ink')}>{cure.name}</p>
              <p className={ticketSub}>{cure.days} {ui.days} · {cure.treatments} {ui.treatments} · {cure.hours} {ui.hoursShort} · {b.access}</p>
              <dl className={ticketRows}>
                {orderId && <div className={ticketRow()}><dt>{c.reference}</dt><dd className="break-all text-right">{orderId}</dd></div>}
                {first && <div className={ticketRow()}><dt>{ui.firstTreatment}</dt><dd>{ld(t, first)}</dd></div>}
                {first && <div className={ticketRow()}><dt>{ui.lastTreatment}</dt><dd>{ld(t, addDays(first, cure.days - 1))}</dd></div>}
                {order && <div className={ticketRow()}><dt>{ui.guests}</dt><dd>{order.guests}</dd></div>}
                {order?.room && <div className={ticketRow()}><dt>{ui.lodgingField}</dt><dd className="text-right">{order.room}</dd></div>}
              </dl>
              {paid && order && (
                <dl className={ticketRows}>
                  <div className={ticketRow({ money: true, due: true })}><dt>{c.paid}</dt><dd>{mad(order.paid)}</dd></div>
                  {order.balance > 0 && <div className={ticketRow({ money: true })}><dt>{ui.balance}</dt><dd>{mad(order.balance)}</dd></div>}
                </dl>
              )}
            </div>
          </aside>
        )}
      </main>
    </div>
  )
}

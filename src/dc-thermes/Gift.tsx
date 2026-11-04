'use client'

import { useEffect, useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import { packs, money, longDate as ld } from './i18n'
import { Title } from './Title'
import { cx, pill, arrow, logo } from './ui'
import type { CureKey } from './types'
import { PhoneField } from './PhoneField'
import { pf, pfRow, pfLabel, pfOptional, pfInput, choice, choiceItem, hiddenInput, choiceTitle, choiceMeta, stepper, stepperBtn, stepperOut, addon, addonBox, addonTitle, addonMeta, ticketRows, ticketRow, bkPage, bkHeader, bkBack, bkBackArrow, bkLogoLink, bkLogo, bkHelp, bkMain, bkIntro, bkIntroText, bkSteps, bkStep, bkForm, bkGroup, bkLegend, bkPay, bkSecure, lock, bkSummary, bkCard, bkTrust, bkTrustItem, chip } from './forms'

// Page « Offrir une cure » : on compose le bon, l'aperçu se met à jour en direct,
// puis la demande part à l'équipe par e-mail (ou par WhatsApp). Le règlement se fait ensuite avec l'équipe.

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const MAX_MESSAGE = 220

// Le bon cadeau : dégradé sombre, filet intérieur en ::before.
// Sous 960px il passe avant le formulaire (le résumé devient display: contents).
const voucher =
  "relative flex flex-col items-center gap-[10px] aspect-[4/5] p-[clamp(28px,3vw,40px)] overflow-hidden rounded-[18px] text-center text-on-dark bg-[radial-gradient(120%_80%_at_50%_0%,#3a3631_0%,var(--color-dark)_60%)] shadow-[0_30px_60px_-30px_rgb(28_27_25/0.55)] animate-[story-in_0.6s_var(--ease-brand)_both] before:content-[''] before:absolute before:inset-3 before:border before:border-[rgb(243_242_239/0.18)] before:rounded-[12px] before:pointer-events-none max-lg:order-1 max-lg:aspect-auto max-lg:min-h-0 max-lg:gap-2"
const voucherMeta = 'text-[0.8125rem] text-[rgb(243_242_239/0.6)]'
const sentText = 'text-muted max-w-[52ch]'

export default function Gift() {
  const lang = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('lang') === 'en' ? 'en' : 'fr'
  const t = packs[lang]
  const { cures, site, ui, bookingPage: b, giftPage: g } = t
  const mad = (n: number) => money(t, n)

  const [cureKey, setCureKey] = useState<CureKey>('regeneration')
  const [guests, setGuests] = useState(1)
  const [room, setRoom] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [occasion, setOccasion] = useState('')
  const [otherOccasion, setOtherOccasion] = useState('')
  const [message, setMessage] = useState('')
  const [delivery, setDelivery] = useState('moi')
  const [firstName, setFirstName] = useState('')
  const [today, setToday] = useState('')
  const [sent, setSent] = useState<'mail' | 'posted' | 'whatsapp' | null>(null)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = g.title
    setToday(iso(new Date()))
    const q = new URLSearchParams(window.location.search)
    const wanted = cures.find((c) => c.key === q.get('cure'))
    if (wanted) setCureKey(wanted.key)
  }, [])

  const cure = cures.find((c) => c.key === cureKey) || cures[1]
  // « Autre » laisse écrire l'occasion librement
  const occasionText = occasion === g.otherOccasion ? otherOccasion.trim() : occasion
  const total = cure.price * guests

  // Le texte de la demande, lisible tel quel dans un e-mail ou un message WhatsApp
  const compose = (form: HTMLFormElement) => {
    const f = new FormData(form)
    const m = g.mail
    const date = f.get('envoi') ? ld(t, parse(String(f.get('envoi')))) : ''
    return [
      m.hello,
      '',
      `${m.cure} : ${cure.name} (${cure.days} ${ui.days}), ${g.persons(guests)}, ${mad(total)}`,
      `${m.room} : ${room ? m.roomYes(cure.days) : m.roomNo}`,
      `${m.for} : ${recipient}`,
      occasionText ? `${m.occasion} : ${occasionText}` : null,
      message ? `${m.message} : ${ui.quoteOpen}${message}${ui.quoteClose}` : null,
      `${m.delivery} : ${delivery === 'moi' ? m.toMe : m.toThem(String(f.get('email_destinataire')), date)}`,
      '',
      `${m.from} : ${f.get('prenom')} ${f.get('nom')}`,
      `${f.get('email')} · ${f.get('telephone_complet')}`,
      f.get('precision') ? `\n${f.get('precision')}` : null,
      '',
      m.thanks,
    ].filter((l) => l !== null).join('\n').replace(/ : /g, lang === 'en' ? ': ' : ' : ')
  }

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    const text = compose(form)
    if (site.giftEndpoint) {
      try {
        const res = await fetch(site.giftEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ _subject: g.mail.subject, message: text, email: new FormData(form).get('email') }) })
        if (res.ok) return setSent('posted')
      } catch {}
    }
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${g.mail.subject} · ${cure.name}`)}&body=${encodeURIComponent(text)}`
    setSent('mail')
  }

  const sendWhatsapp = (e: MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form
    if (!form || !form.reportValidity()) return
    window.open(`https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(compose(form))}`, '_blank', 'noopener')
    setSent('whatsapp')
  }

  return (
    <div className={bkPage}>
      <header className={bkHeader}>
        <a href={lang === 'en' ? '/dc-thermes/en#offrir' : '/dc-thermes#offrir'} className={bkBack}><span className={cx(arrow(true), bkBackArrow)} aria-hidden="true" /> {g.back}</a>
        <a className={bkLogoLink} href={lang === 'en' ? '/dc-thermes/en' : '/dc-thermes'} aria-label={ui.logoAlt}><img className={cx(logo(), bkLogo)} src="/images/dc-thermes/logo-dc.webp" width="600" height="296" alt={ui.logoAlt} /></a>
        <a className={bkHelp} href={site.tel}>{g.help}</a>
      </header>

      <main className={bkMain}>
        <div className={bkIntro}>
          <Title as="h1" id="gift-title" em={g.em} caps={g.caps} />
          <p className={bkIntroText}>{g.intro}</p>
          <ol className={bkSteps} aria-label={g.stepsLabel}>
            {g.steps.map((step, i) => <li key={step} className={bkStep(sent ? i === 1 : i === 0)}>{step}</li>)}
          </ol>
        </div>

        {sent && (
          <section className={bkForm} aria-live="polite">
            <div className={bkGroup('gap-[14px]')}>
              <p className="max-w-[52ch] font-sans font-normal text-[1.5rem] leading-[1.2] tracking-[0.08em] uppercase text-ink">{g.sentTitle}</p>
              <p className={sentText}>{sent === 'posted' ? g.sentPosted : sent === 'whatsapp' ? g.sentWhatsapp : g.sentText}</p>
              {sent === 'mail' && <p className={cx(sentText, 'text-[0.875rem]')}>{g.sentFallback(site.email)}</p>}
              <button type="button" className="justify-self-start w-fit p-0 border-0 bg-none tracking-normal text-ink no-underline cursor-pointer" onClick={() => setSent(null)}>{g.edit}</button>
            </div>
          </section>
        )}
        {/* Le formulaire reste en place pendant la confirmation : « Modifier » retrouve tout ce qui a été saisi */}
        <form className={bkForm} onSubmit={send} aria-labelledby="gift-title" hidden={!!sent}>
            <fieldset className={bkGroup()}>
              <legend className={bkLegend}>{g.cureGroup}</legend>
              <div className={choice(3)}>
                {cures.map((c) => (
                  <label key={c.key} className={choiceItem({ on: c.key === cure.key, inGroup: true })}>
                    <input className={hiddenInput} type="radio" name="cure" value={c.key} checked={c.key === cure.key} onChange={() => setCureKey(c.key)} />
                    <span className={choiceTitle}>{c.name}</span>
                    <span className={choiceMeta}>{c.days} {ui.days} · {mad(c.price)}</span>
                  </label>
                ))}
              </div>
              <div className={pf}>
                <span className={pfLabel} id="gift-guests">{g.guests}</span>
                <div className={stepper(true)} role="group" aria-labelledby="gift-guests">
                  <button className={stepperBtn} type="button" onClick={() => setGuests((n) => Math.max(1, n - 1))} disabled={guests <= 1} aria-label={ui.lessGuest}>−</button>
                  <output className={stepperOut} aria-live="polite">{g.persons(guests)}</output>
                  <button className={stepperBtn} type="button" onClick={() => setGuests((n) => n + 1)} aria-label={ui.moreGuest}>+</button>
                </div>
              </div>
              {/* Hébergement en option : la chambre se règle avec l'équipe, au tarif de l'hôtel */}
              <label className={addon({ on: room, inGroup: true })}>
                <input className={hiddenInput} type="checkbox" name="hebergement" checked={room} onChange={(e) => setRoom(e.target.checked)} />
                <span className={addonBox(room)} aria-hidden="true" />
                <span>
                  <span className={addonTitle}>{g.roomTitle}</span>
                  <span className={addonMeta}>{room ? g.roomOn(cure.days) : g.roomOff}</span>
                </span>
              </label>
            </fieldset>

            <fieldset className={bkGroup()}>
              <legend className={bkLegend}>{g.forGroup}</legend>
              <label className={pf} htmlFor="gift-recipient"><span className={pfLabel}>{g.recipient}</span>
                <input className={pfInput({ inGroup: true })} id="gift-recipient" name="destinataire" required maxLength={40} placeholder={g.recipientPh} value={recipient} onChange={(e) => setRecipient(e.target.value)} />
              </label>
              <div className={pf}>
                <span className={pfLabel} id="gift-occasion">{g.occasion} <em className={pfOptional}>{b.optional}</em></span>
                <div className="flex flex-wrap gap-2" role="group" aria-labelledby="gift-occasion">
                  {[...g.occasions, g.otherOccasion].map((o) => (
                    <button type="button" key={o} className={chip(occasion === o)} aria-pressed={occasion === o} onClick={() => setOccasion(occasion === o ? '' : o)}>{o}</button>
                  ))}
                </div>
                {occasion === g.otherOccasion && (
                  <input className={cx(pfInput({ inGroup: true }), 'animate-story-in')} name="occasion_libre" maxLength={40} autoFocus aria-label={g.otherOccasionLabel} placeholder={g.otherOccasionPh} value={otherOccasion} onChange={(e) => setOtherOccasion(e.target.value)} />
                )}
              </div>
              <label className={pf} htmlFor="gift-message">
                <span className={pfLabel}>{g.message} <em className={pfOptional}>{b.optional}</em></span>
                <textarea className={pfInput({ inGroup: true, area: true })} id="gift-message" name="mot" rows={3} maxLength={MAX_MESSAGE} placeholder={g.messagePh} value={message} onChange={(e) => setMessage(e.target.value)} />
                <span className="justify-self-end -mt-[6px] text-[0.75rem] text-soft tabular-nums" aria-hidden="true">{message.length} / {MAX_MESSAGE}</span>
              </label>
            </fieldset>

            <fieldset className={bkGroup()}>
              <legend className={bkLegend}>{g.deliveryGroup}</legend>
              <div className={choice()}>
                {g.delivery.map(([key, title, meta]) => (
                  <label key={key} className={choiceItem({ on: delivery === key, inGroup: true })}>
                    <input className={hiddenInput} type="radio" name="livraison" value={key} checked={delivery === key} onChange={() => setDelivery(key)} />
                    <span className={choiceTitle}>{title}</span>
                    <span className={choiceMeta}>{meta}</span>
                  </label>
                ))}
              </div>
              {delivery === 'destinataire' && (
                <div className={cx(pfRow, 'animate-story-in')}>
                  <label className={pf} htmlFor="gift-to"><span className={pfLabel}>{g.recipientEmail}</span><input className={pfInput({ inGroup: true })} id="gift-to" name="email_destinataire" type="email" required /></label>
                  <label className={pf} htmlFor="gift-date"><span className={pfLabel}>{g.sendDate}</span><input className={pfInput({ inGroup: true })} id="gift-date" name="envoi" type="date" min={today} required /></label>
                </div>
              )}
            </fieldset>

            <fieldset className={bkGroup()}>
              <legend className={bkLegend}>{g.details}</legend>
              <div className={pfRow}>
                <label className={pf} htmlFor="gift-first"><span className={pfLabel}>{b.firstName}</span><input className={pfInput({ inGroup: true })} id="gift-first" name="prenom" autoComplete="given-name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} /></label>
                <label className={pf} htmlFor="gift-last"><span className={pfLabel}>{b.lastName}</span><input className={pfInput({ inGroup: true })} id="gift-last" name="nom" autoComplete="family-name" required /></label>
              </div>
              <label className={pf} htmlFor="gift-mail"><span className={pfLabel}>{b.email}</span><input className={pfInput({ inGroup: true })} id="gift-mail" name="email" type="email" autoComplete="email" required /></label>
              <PhoneField id="gift-tel" b={b} />
              <label className={pf} htmlFor="gift-note"><span className={pfLabel}>{b.note} <em className={pfOptional}>{b.optional}</em></span><textarea className={pfInput({ inGroup: true, area: true })} id="gift-note" name="precision" rows={2} /></label>
            </fieldset>

            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-[14px] max-sm:grid-cols-[minmax(0,1fr)] max-sm:text-center max-sm:gap-[10px]">
              <button className={cx(pill('dark', { block: true }), bkPay)} type="submit">{g.sendMail}</button>
              <span className="text-[0.8125rem] text-soft">{g.or}</span>
              <button className={cx(pill('outline', { block: true }), bkPay)} type="button" onClick={sendWhatsapp}>{g.sendWhatsapp}</button>
            </div>
            <p className={bkSecure}><span className={lock} aria-hidden="true" />{g.note}</p>
        </form>

        <aside className={bkSummary(true)} aria-label={g.preview}>
          <p className="text-[0.75rem] tracking-[0.18em] uppercase text-soft max-lg:order-1">{g.preview}</p>
          <div className={voucher} key={cure.key}>
            <img className={cx(logo(true), 'h-[54px] mb-auto max-xl:h-[46px] max-lg:mb-[14px]')} src="/images/dc-thermes/logo-dc.webp" width="600" height="296" alt="" />
            <p className="text-[0.75rem] tracking-[0.3em] uppercase text-[rgb(243_242_239/0.6)]">{g.voucher}</p>
            <p className="font-sans font-normal text-[clamp(1.75rem,1.2rem+1.4vw,2.5rem)] leading-[1.05] tracking-[0.08em] uppercase">{cure.name}</p>
            <p className={voucherMeta}>{cure.days} {ui.days} · {cure.treatments} {ui.treatments} · {g.persons(guests)}</p>
            {room && <p className={voucherMeta}>{g.voucherRoom(cure.days)}</p>}
            {message && <p className="max-w-[26ch] mt-2 mx-0 mb-0 font-serif italic font-normal text-[1.25rem] leading-[1.35] wrap-anywhere">{ui.quoteOpen}{message}{ui.quoteClose}</p>}
            <dl className="grid grid-cols-[1fr_1fr] gap-4 w-full mt-auto mx-0 mb-0 pt-[18px] border-t border-[rgb(243_242_239/0.18)] max-lg:mt-[14px] [&_dt]:text-[0.6875rem] [&_dt]:tracking-[0.2em] [&_dt]:uppercase [&_dt]:text-[rgb(243_242_239/0.55)] [&_dd]:mt-1 [&_dd]:mx-0 [&_dd]:mb-0 [&_dd]:font-serif [&_dd]:italic [&_dd]:font-normal [&_dd]:text-[1.25rem] [&_dd]:leading-[1.2] [&_dd]:wrap-anywhere">
              <div><dt>{g.forLabel}</dt><dd>{recipient || g.someone}</dd></div>
              <div><dt>{g.fromLabel}</dt><dd>{firstName || g.you}</dd></div>
            </dl>
            <p className="text-[0.75rem] text-[rgb(243_242_239/0.5)]">{occasionText ? `${occasionText} · ` : ''}{g.trust[1].split(',')[0]}</p>
          </div>
          <div className={bkCard(true)}>
            <dl className={ticketRows}>
              <div className={ticketRow({ money: true })}><dt>{mad(cure.price)} × {guests}</dt><dd>{mad(total)}</dd></div>
              {room && <div className={ticketRow({ money: true })}><dt>{g.roomRow(cure.days)}</dt><dd>{g.onQuote}</dd></div>}
              <div className={ticketRow({ money: true, due: true })}><dt>{room ? g.valueCure : g.value}</dt><dd>{mad(total)}</dd></div>
            </dl>
            <ul className={bkTrust}>
              {g.trust.map((x) => <li key={x} className={bkTrustItem}>{x}</li>)}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  )
}

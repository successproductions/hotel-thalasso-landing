import type { Funnel, Lang } from './types'

// Les trois versions de la page. Même contenu, seule la fin du parcours change :
// main : réservation puis paiement CMI direct, en totalité ou par acompte (/dc-thermes)
// cmi  : le même parcours de paiement, à une autre adresse (/dc-thermes/paiement)
// lead : demande sans paiement, enregistrée pour que l'équipe rappelle (/dc-thermes/contact)
const paths: Record<Funnel, string> = { main: '', cmi: '/paiement', lead: '/contact' }

export const landingHref = (funnel: Funnel, lang: Lang) => `/dc-thermes${lang === 'en' ? '/en' : ''}${paths[funnel]}`
// La page de réservation lit sa langue dans le lien (?lang=en)
export const bookingHref = (funnel: Funnel, lang: Lang, q: Record<string, string>) =>
  `/dc-thermes${paths[funnel]}/reservation?` + new URLSearchParams(lang === 'en' ? { lang: 'en', ...q } : q).toString()

// Ce qui est réglé aujourd'hui, calculé comme dans /api/payment/initiate
// (prix par personne frais compris, arrondi à l'inférieur) pour afficher exactement ce que CMI encaisse.
export function amounts(price: number, guests: number, deposit: boolean, cmiFee: number) {
  const total = price * guests
  const base = deposit ? total / 2 : total
  const now = Math.floor((deposit ? price / 2 : price) * (1 + cmiFee)) * guests
  return { total, base, fee: now - base, now, balance: total - base }
}

import type { CureKey, Lang } from './types'

// La réservation qui part au paiement, gardée dans le navigateur (sessionStorage) par Booking.tsx
// pour que la page de confirmation, au retour de CMI, l'affiche dans la langue choisie.
export const orderStorageKey = 'dcThermesOrder'

export type ConfirmedOrder = {
  orderId: string
  lang: Lang
  cure: CureKey
  arrival: string // date d'arrivée (AAAA-MM-JJ) ; le premier soin a lieu le lendemain
  guests: number
  firstName: string
  paid: number
  balance: number
  room?: string // pack payé sur /dc-thermes/paiement : chambre SiteMinder comprise
}

// Sans réservation en mémoire (autre onglet, autre appareil), la cure se lit dans le numéro : DCT-REG5-…
const cureByPrefix: Record<string, CureKey> = { VIT: 'vitalite', REG: 'regeneration', REN: 'renaissance' }
export const cureFromOrderId = (orderId: string): CureKey | undefined => cureByPrefix[orderId.slice(4, 7)]

export function readOrder(orderId: string): ConfirmedOrder | null {
  try {
    const order = JSON.parse(sessionStorage.getItem(orderStorageKey) || 'null') as ConfirmedOrder | null
    return order && order.orderId === orderId ? order : null
  } catch {
    return null
  }
}

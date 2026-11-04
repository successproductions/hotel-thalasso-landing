'use client'

import dynamic from 'next/dynamic'

// Ces deux pages lisent la langue et les choix dans l'URL dès le premier rendu : elles s'affichent dans le navigateur
export const BookingClient = dynamic(() => import('./Booking'), { ssr: false })
export const GiftClient = dynamic(() => import('./Gift'), { ssr: false })
// Retour du paiement : la réservation est lue dans le navigateur (sessionStorage)
export const ConfirmationClient = dynamic(() => import('./Confirmation'), { ssr: false })

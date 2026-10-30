import { createContext, useContext } from 'react'
import * as fr from './content'
import * as en from './content.en'
import type { Lang } from './types'

// Les deux langues de la page. Chaque composant lit les textes de la langue en cours avec useT().
export type Pack = Omit<typeof fr, 'band'>
export const packs: Record<Lang, Pack> = { fr, en }
export const LangContext = createContext<Lang>('fr')
export const useT = () => packs[useContext(LangContext)] || fr

// Montants et dates au format de la langue : « 4 950 MAD » en français, « 4,950 MAD » en anglais
export const money = (t: Pack, n: number) => new Intl.NumberFormat(t.locale).format(n).replace(/ /g, ' ') + ' MAD'
export const number = (t: Pack, n: number) => new Intl.NumberFormat(t.locale).format(n).replace(/ /g, ' ')
export const longDate = (t: Pack, d: Date) => d.toLocaleDateString(t.locale, { weekday: 'long', day: 'numeric', month: 'long' })
export const shortDate = (t: Pack, d: Date) => d.toLocaleDateString(t.locale, { day: 'numeric', month: 'long' })

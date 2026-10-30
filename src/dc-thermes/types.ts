// Types partagés par les textes (content.ts, content.en.ts) et les composants

export type Lang = 'fr' | 'en'
export type CureKey = 'vitalite' | 'regeneration' | 'renaissance'

// Identifiant de section, libellé, et lien externe s'il y en a un
export type NavItem = [id: string, label: string, url?: string]
export type GlossaryEntry = [name: string, text: string, category: string, img?: string]
export type ProgrammeDay = [name: string, treatments: string[]]

export type Cure = {
  key: CureKey
  name: string
  days: number
  treatments: number
  hours: number
  for: string
  includes: string[]
  price: number
  euro: number
  img: string
  alt: string
  imgPos?: string
  label?: string
  // Promesse de la cure, affichée au-dessus de son programme
  tagline?: string
  promise?: string
}

// FAQ : une réponse est une suite de paragraphes et de listes
export type ListItem = string | [strong: string, text: string]
export type FaqBlock = string | { ol: ListItem[]; ul?: undefined } | { ul: ListItem[]; ol?: undefined }
export type FaqItem = [question: string, answer: FaqBlock[]]
export type Faq = { em: string; caps: string; items: FaqItem[]; contact: string }

export type Rating = {
  platform: string
  logo: string
  score: string
  scale: string
  count: string
  url: string
  wide?: boolean
  color?: boolean
}
export type Video = { src: string; poster: string; label: string }

export type HotelQuery = { checkIn: string; checkOut: string; adults: number; rateId?: number }

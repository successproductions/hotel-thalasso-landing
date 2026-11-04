// English version of the page: a translation of content.ts, which is the reference. Same structure; each fact appears only once.
// Items marked "TO CONFIRM" must be checked before going live.

import type { Cure, CureKey, Faq, GlossaryEntry, HotelQuery, Lang, NavItem, ProgrammeDay, Rating } from './types'
import type { CountryKey } from './phone'
import { cures as curesFr, glossary as glossaryFr, programmes as programmesFr, site as siteFr, proof as proofFr } from './content'

const mail = (subject: string) => 'mailto:reservation@dakhlaclub.com?subject=' + encodeURIComponent(subject)

export const lang: Lang = 'en'
export const locale: string = 'en-GB'

export const site = {
  ...siteFr,
  url: 'https://offer.dakhlaclub.com/dc-thermes/en',
  contactMail: mail('DC Luxury Thermes programmes: a question'),
  giftMail: mail('DC Luxury Thermes gift voucher'),
  address: ['Dakhla Club', 'Point de Dragon, PK 28', 'Dakhla, Morocco'],
  hotel: (q: HotelQuery) => siteFr.hotel(q).replace('locale=fr', 'locale=en'),
  brochure: 'https://offer.dakhlaclub.com/brochure/BROCHURE-EN.pdf',
  giftPage: (q: Record<string, string> = {}) => '/dc-thermes/offrir?' + new URLSearchParams({ lang: 'en', ...q }).toString(),
}

export const meta = {
  title: 'Wellness programmes in Dakhla, Morocco | DC Luxury Thermes',
  description: 'Discover DC Luxury Thermes in Dakhla, Morocco: holistic programmes of 3, 5 or 7 days, marine treatments, Moroccan hammam and full-board stays.',
  ogTitle: 'DC Luxury Thermes · Holistic centre in Dakhla, Morocco',
  ogDescription: 'Facing the Dakhla lagoon, programmes of 3, 5 or 7 days shaped by marine treatments, massages and the Moroccan hammam ritual.',
  canonical: 'https://offer.dakhlaclub.com/dc-thermes/en',
  ogLocale: 'en_GB',
  bookingTitle: 'Book your programme · DC Luxury Thermes',
  leadTitle: 'Request your programme · DC Luxury Thermes',
}

export const nav: NavItem[] = [
  ['cures', 'Programmes'],
  ['programme', 'Treatments'],
  ['hotel', 'The hotel', 'https://dakhlaclub.com/en'],
  ['offrir', 'Gift'],
]

export const hero = {
  eyebrow: '',
  em: '',
  caps: 'Here, the place is part of the treatment.',
  lead: 'Facing the Dakhla lagoon, enjoy a 3, 5 or 7-day break shaped by marine treatments, massages and the ancestral ritual of the Moroccan hammam. A stay to slow down and recover your energy and serenity.',
  cta: 'Discover our programmes',
}

export const intro = {
  em: '',
  caps: 'If these signs sound familiar',
  text: 'Lasting fatigue, unrefreshing sleep, muscle tension: when the body struggles to recover, a few days of supervised treatments help it find its balance again.',
  signs: [
    ['Persistent fatigue', 'A feeling of exhaustion, even after several days of rest.'],
    ['Unrefreshing sleep', 'Disturbed nights and waking in the night, without ever feeling truly rested.'],
    ['A mind on alert', 'Finding it hard to switch off and release the pressure, even on holiday.'],
    ['Built-up tension', 'Stress that settles in, emotions that are hard to calm and a constant feeling of pressure.'],
    ['The need to slow down', 'The wish to take a real break, far from everyday obligations.'],
  ],
  after: '“Many of our guests arrive exhausted, without always knowing why. Our role is to listen to them, then adjust each treatment to what their body is telling us.”',
  link: 'Discover the programmes',
  // Which programme for which need: text, card id, link
  guide: [
    ['Passing fatigue, the wish to catch your breath:', 'vitalite', 'Vitalité · 3 days'],
    ['Settled fatigue, tension that lingers:', 'regeneration', 'Régénération · 5 days'],
    ['The need to stop completely:', 'renaissance', 'Renaissance · 7 days'],
  ],
}

const g = (key: string, name: string, text: string): GlossaryEntry => [name, text, glossaryFr[key][2], glossaryFr[key][3]]
export const glossary: Record<string, GlossaryEntry> = {
  bol: g('bol', 'Bol d’air Jacquier', 'A few minutes of breathing air enriched with pine resin essence. A gentle oxygenation method that opens each morning, for a feeling of relaxation and calm.'),
  piscine: g('piscine', 'Thermal pool', 'A heated pool and its circuit of jets, which target the neck, back and legs. Free access throughout your programme.'),
  jet: g('jet', 'Jet shower', 'A high-pressure jet of water, directed by the hydrotherapist from the feet up to the neck. An invigorating treatment that stimulates circulation and relaxes the muscles.'),
  hydro: g('hydro', 'Hydromassage bath', 'Immersed in warm water, the body is swept by underwater jets, from the soles of the feet to the neck. A relaxing hydromassage that helps the body absorb the mineral salts of the seawater.'),
  affusion: g('affusion', 'Affusion massage', 'Lying down, you are massaged from the feet to the neck under a fine rain of warm seawater. Massage and hydrotherapy combined, deeply relaxing.'),
  hammamDesert: g('hammamDesert', 'Desert Secret hammam', 'The ancestral ritual of the Moroccan hammam: steam, black soap, then a kessa-glove scrub. The skin is purified, soft and ready for the treatments to come.'),
  // TO CONFIRM with the treatment team: exact sequence
  hammam1001: g('hammam1001', 'Thousand and One Nights hammam', 'The most generous version of the ritual: steam, black soap and a kessa-glove scrub, followed by a scented moment of rest.'),
  gommageSel: g('gommageSel', 'Himalayan salt scrub', 'A body exfoliation with salt crystals and oils that removes dead skin cells, refines the skin and prepares it for the massage.'),
  sauna: g('sauna', 'Sauna', 'A few minutes of dry heat that encourage sweating, relax the body and prepare the muscles for the treatments that follow.'),
  froid: g('froid', 'Cold bath', 'A brief immersion in cold water, always supervised by the team. After the heat of the sauna or hammam, the cold tightens the blood vessels and tones the body.'),
  algues: g('algues', 'Seaweed wrap', 'The body is covered with a preparation of marine seaweed applied warm, followed by a moment of rest. A remineralising treatment that purifies, soothes and recharges the body.'),
  relaxant: g('relaxant', 'Relaxing massage', 'Gentle, flowing movements combined with gliding pressure, to release tension and help you let go.'),
  tonique: g('tonique', 'Toning massage', 'Firm, rhythmic movements that loosen the muscles and restore tone to the body.'),
  kite: g('kite', 'After-kite massage', 'A recovery massage focused on the shoulders, arms and legs, originally designed for the lagoon’s athletes.'),
  // TO CONFIRM with the treatment team: exact sequence
  massageSel: g('massageSel', 'Himalayan salt massage', 'An oil massage that follows the Himalayan salt scrub, for soft skin and a relaxed body.'),
  pochons: g('pochons', 'Warm herbal poultice massage', 'Heated pouches of herbs and spices, applied to the body with pressing and rolling movements. Their spreading warmth releases tension.'),
  cupDos: g('cupDos', 'Back cupping', 'Placed on the back, the cups create a light suction that relaxes the muscles and stimulates circulation.'),
  cupFeu: g('cupFeu', 'Cupping and hot towel', 'A cupping session, followed by a hot towel laid on the back to deepen the relaxation.'),
  argan: g('argan', 'Argan oil face massage', 'This complete ritual brings total relaxation from the head to the shoulders. It uses pure Moroccan argan oil, known for its highly nourishing and soothing properties.'),
  hyalu: g('hyalu', 'Hyalu-Procollagen plumping facial', 'Combining hyaluronic acid and procollagen with targeted massage techniques, this exceptional treatment deeply hydrates and plumps the skin while visibly smoothing the features.'),
  silicium: g('silicium', 'Silicium Lift firming facial', 'This facial combines marine silicium with a lifting massage. The skin becomes firmer, the contours of the face look redefined and the features appear more rested.'),
  spiruline: g('spiruline', 'Spirulina smoothing facial', 'A facial with spirulina, a micro-alga rich in vitamins and antioxidants. Combined with a gentle draining massage, for a fresh, radiant complexion.'),
  pieds: g('pieds', 'Foot care', 'Soak, scrub, nail care and a soothing massage: a ritual that softens skin dried by salt, sand and sun, and leaves the feet feeling light.'),
}

export const benefits = {
  em: '',
  caps: 'What you take home',
  lead: 'A programme does not end with the last treatment. With the support of our therapists, the body finds its balance again, and the benefits last long after you return home.',
  items: [
    ['A relaxed body', 'Massages, the warmth of the hammam and hydrotherapy release muscle tension.'],
    ['More peaceful nights', 'Days shaped by treatments, away from screens, for calmer nights.'],
    ['A calm mind', 'With no schedule or obligations, the mind sheds the weight of everyday life and regains its clarity.'],
  ],
  after: 'A few days entirely devoted to your wellbeing, without having to organise every moment.',
  caption: 'Dakhla Club, between lagoon and desert',
  alt: 'Aerial view of Dakhla Club: the pool, the bungalows and the Dakhla lagoon at the foot of the dunes',
}

const cure = (key: CureKey, extra: Partial<Cure>): Cure => ({ ...curesFr.find((c) => c.key === key)!, ...extra })
export const cures: Cure[] = [
  cure('vitalite', {
    for: 'Away from everyday life, three days entirely devoted to your wellbeing, to catch your breath and leave with renewed energy. The warmth of the hammam, the seaweed wrap and the massages follow one another to release tension and bring a pleasant feeling of lightness.',
    tagline: 'Vitalité · Energy and radiance',
    promise: 'A first getaway to breathe and take care of yourself.',
    includes: ['Desert Secret hammam', 'Marine seaweed wrap', 'Argan oil face massage', 'Free access to the baths'],
    alt: 'A guest relaxing in the stone lounge of the thermal baths',
  }),
  cure('regeneration', {
    for: 'Five days to recover your drive and give yourself a revitalising break. This fitness protocol alternates hot and cold, invigorating hydrotherapy and targeted massages to relax the muscles and restore the body’s balance.',
    tagline: 'Régénération · Recovery and tone',
    promise: 'A restorative break to slow down and recover gently.',
    includes: ['Thousand and One Nights hammam', 'Himalayan salt scrub and massage', 'Warm herbal poultice massage', 'Free access to the baths'],
    label: 'Most popular', // TO CONFIRM
    alt: 'A guest in a bathrobe beside the thermal pool',
  }),
  cure('renaissance', {
    for: 'For one week, body and mind adopt a different rhythm. Seven days for deep recovery and a serenity that grows day after day.',
    tagline: 'Renaissance · Serenity and fulfilment',
    promise: 'A complete break to let go and find yourself again.',
    includes: ['Hammam, salt scrub and massage', 'Sauna and cold bath', 'Two facials, argan and spirulina', 'Free access to the baths'],
    alt: 'Two guests in bathrobes in the relaxation lounge, over tea',
  }),
]

export const curesHead = {
  em: '',
  caps: 'DC Luxury Thermes · Holistic centre',
  sub: 'Programmes of 3, 5 or 7 days where the benefits of the sea and hydrotherapy come together with the art of massage and the Moroccan hammam ritual. Discover the treatments day by day and choose how much time you want to give yourself.',
  note: 'Prices per person. Secure online payment, in full or with a 50% deposit, free cancellation up to 30 days before arrival. To preserve the quality of care, each session welcomes ten guests at most.',
}

const reviewLinks = {
  tripadvisor: 'https://www.tripadvisor.com/Hotel_Review-g479761-d12457574-Reviews-Dakhla_Club_Hotel_Spa-Dakhla_Dakhla_Oued_Ed_Dahab.html',
  booking: 'https://www.booking.com/hotel/ma/dakhla-club.en-gb.html#tab-reviews',
  hotels: 'https://www.hotels.com/ho682902944/dakhla-club-hotel-spa-dakhla-morocco/',
  kayak: 'https://www.kayak.com/Dakhla-Hotels-Dakhla-Club-Hotel-Spa.3697843.ksp',
}

export const proof = {
  em: '',
  caps: 'In our guests’ words',
  sub: 'Their stay, filmed by themselves. Hover for a preview, click to turn on the sound.',
  // Tripadvisor reviews about the spa, translated from French
  quotes: [
    ['We came with 12 friends for a thalasso stay. Special mention to Nisrine, Imane and the whole spa team for their kindness and the quality of their treatments.', 'Isabelle D.', 'October 2026'],
    ['The spa was exceptional. True professionals.', 'Karim M.', 'October 2026'],
    ['Nisrine and her team take wonderful care of you, for a truly peaceful moment.', 'Charline V.', 'October 2026'],
    ['Top-quality spa treatments in Fatima’s hands.', 'Ghislaine D.', 'October 2026'],
    ['Great massage and spa with jacuzzi. Special mention to Nisrine and her team!', 'amaurysolenn', 'October 2026'],
  ],
  quotesLink: reviewLinks.tripadvisor,
  videos: proofFr.videos.map((v, i) => ({ ...v, label: ['Friends at the baths', 'A day of treatments', 'Sauna and bath', 'The wrap', 'The magnesium bath'][i] })),
  ratings: <Rating[]>[
    { platform: 'Tripadvisor', logo: '/images/dc-thermes/logos/tripadvisor.svg', score: '4.8', scale: '/5', count: '1,236 reviews', url: reviewLinks.tripadvisor },
    { platform: 'Booking.com', logo: '/images/dc-thermes/logos/booking.svg', score: '8.2', scale: '/10', count: '473 reviews', url: reviewLinks.booking, wide: true },
    { platform: 'Hotels.com', logo: '/images/dc-thermes/logos/hotelsdotcom.svg', score: '9.2', scale: '/10', count: '57 reviews', url: reviewLinks.hotels },
    { platform: 'Kayak', logo: '/images/dc-thermes/logos/kayak.png', score: '8.2', scale: '/10', count: '776 reviews', url: reviewLinks.kayak, wide: true, color: true },
  ],
  awards: [
    { img: '/images/dc-thermes/logos/badge-tripadvisor-2025.webp', alt: 'Tripadvisor Travellers’ Choice Awards 2025' },
    { img: '/images/dc-thermes/logos/badge-kayak-awards.webp', alt: 'Kayak Travel Awards winner' },
  ],
  note: 'Public ratings of Dakhla Club Hotel & Spa, home to the thermal baths.',
}

const dayNames: Record<string, string> = { 'Se poser': 'Arrive', 'Relâcher': 'Release', 'Rééquilibrer': 'Rebalance', 'Alléger': 'Lighten', 'Nourrir': 'Nourish', 'Réveiller': 'Awaken', 'Repartir': 'Leave renewed' }
export const programmes = Object.fromEntries(
  Object.entries(programmesFr).map(([key, days]) => [key, days.map(([name, items]): ProgrammeDay => [dayNames[name] || name, items])])
) as Record<CureKey, ProgrammeDay[]>

export const programme = {
  em: '',
  caps: 'The treatment journey',
  sub: 'An escape, a journey through time. Protocols that bring together the hammam ritual, marine hydrotherapy, hands-on and beauty treatments, working in synergy to rebalance the body and release tension. Complete letting go, for body and mind alike.',
}

export const booking = {
  em: '',
  caps: 'Book your programme',
  sub: 'Step into the world of our holistic programmes and find the journey that meets your needs.',
}

export const why = {
  em: '',
  caps: 'A structured approach',
  items: [
    ['A qualified team', 'Experienced hydrotherapists and practitioners look after you from the first treatment to the last.'],
    ['An exceptional setting', 'Pools, hammam and relaxation rooms, facing the Dakhla lagoon.'],
    ['The sea and tradition', 'Marine hydrotherapy and the Moroccan hammam ritual, brought together in every protocol.'],
    ['Ten guests at most', 'A deliberately limited number of places, for attentive care.'],
  ],
}

export const gift = {
  em: '',
  caps: 'Give a programme',
  text: 'Give the person of your choice a few days of treatments facing the Dakhla lagoon. The gift voucher, with your message, is sent to them by email or handed over in person.',
  validity: 'Valid for 12 months from the date of purchase',
  cta: 'Give the experience',
}

export const faq: Faq = {
  em: '',
  caps: 'Your questions',
  // One answer = a list of blocks: text = paragraph, { ul: [...] } = bullet list, { ol: [...] } = numbered steps.
  items: [
    ['What is a programme at the Dakhla Club holistic centre?', [
      'A stay of three, five or seven days, each day shaped by a treatment protocol combining marine hydrotherapy, the Moroccan hammam ritual, massages and facials. The centre is located within Dakhla Club Hotel & Spa, in Dakhla, in southern Morocco, where you stay on a full-board basis.',
    ]],
    ['What is the difference between the 3, 5 and 7-day programmes?', [
      // TO CONFIRM: the copy proposal gives 15 and 27 treatments; the cards show 14 and 29 (see cures)
      { ul: [
        ['Vitalité · Energy and radiance:', '3 days of treatments, 4 nights, 14 treatments.'],
        ['Régénération · Strength and balance:', '5 days of treatments, 6 nights, 29 treatments, built around alternating hot and cold.'],
        ['Renaissance · Serenity and fulfilment:', '7 days of treatments, 8 nights, 33 treatments, for a complete recharge.'],
      ] },
      'Each programme can be booked with or without accommodation.',
    ]],
    ['Which treatments are included?', [
      'All the treatments in the protocol, a Bol d’air Jacquier session every morning and free access to the pool, hammam and relaxation rooms throughout your programme. The day-by-day detail is shown in the treatments section.',
    ]],
    ['Can I do a programme if I have never tried thalasso?', [
      'Yes. Our protocols are suited to a first experience, and the team adapts the intensity of each treatment to how you feel.',
    ]],
    ['Who are our programmes for?', [
      'Anyone who wants to take a break: persistent fatigue, less restful sleep, built-up tension, or simply the wish to take time for yourself. Treatments are open to anyone aged 18 and over.',
    ]],
    ['Can I stay at the hotel during my programme?', [
      'Yes, and it is the option we recommend. The centre is located within Dakhla Club Hotel & Spa, a hundred metres from the shore. Six types of accommodation, from the Medina room to the private villa, are offered on a full-board basis, with transfer from Dakhla airport. If you stay elsewhere, a shuttle runs every day.',
    ]],
    ['How do booking and payment work?', [
      'You choose your programme, your dates and your option, then pay online, in full or with a 50% deposit. Your booking confirmation is sent by email, and an advisor contacts you to prepare your arrival. Cancellation is free up to 30 days before arrival.',
    ]],
    ['Why are places limited?', [
      'Each session welcomes ten guests at most, so that everyone receives attentive care and the centre stays calm. We recommend booking ahead.',
    ]],
    ['What should I bring?', [
      // TO CONFIRM: the copy proposal added towels and sandals; the brochure confirms bathrobe and slippers
      'A swimsuit is all you need: bathrobe and slippers are provided. A medical certificate confirming there is no contraindication is recommended. Timings and the details of your transfer are sent to you as soon as your booking is confirmed.',
    ]],
    ['Are there any contraindications?', [
      'A medical certificate confirming there is no contraindication is recommended. The programmes are not advised during pregnancy. Please tell us about any health issue when you book.',
    ]],
    ['What are the cancellation terms?', [
      'Free cancellation up to 30 days before arrival; after that, the deposit is not refunded. Changes are possible up to 30 days before arrival.',
    ]],
    ['Where is Dakhla and how do I get there?', [
      'In southern Morocco, on the Atlantic coast. Direct flights connect Dakhla with Casablanca, Rabat, Marrakech, Agadir, Laâyoune, Paris-Orly and Las Palmas, as well as Marseille and Madrid from October to March.',
    ]],
    ['Is the airport transfer included?', [
      'Yes, the return transfer is free for any stay at the hotel.',
    ]],
    ['How much does a complete stay cost?', [
      'The Vitalité programme with 4 nights in a Medina room, full board, costs 8,902 MAD per person in a double room (low season 2026). The brochure details all the prices.',
    ]],
  ],
  contact: 'A question before booking? Our team will help you choose the programme, the dates and the accommodation.',
}

export const ui = {
  skip: 'Skip to programmes',
  navLabel: 'Sections',
  home: 'Back to top',
  logoAlt: 'DC Luxury Thermes',
  book: 'Book',
  switchLabel: 'Français',
  switchShort: 'FR',
  heroAlt: 'The DC Luxury Thermes thermal pool beneath the glass roof, between stone arches',
  scrollNext: 'Scroll to continue',
  days: 'days',
  daysShort: 'd',
  perPerson: 'per person',
  included: 'What’s included',
  lodging: 'Programme only or a full-board stay',
  compareLabel: 'The three programmes at a glance',
  mobileNav: [['cures', 'Programmes'], ['programme', 'Treatments'], ['questions', 'Questions']],
  treatments: 'treatments',
  hoursOf: 'of treatments',
  reserve: (() => 'Book this programme') as (name: string) => string,
  seeProgramme: 'Discover the programme',
  introAlt: 'The stone arches and thermal pool of DC Luxury Thermes',
  filmLabel: 'Film: a day of treatments at DC Luxury Thermes',
  giftAlt: 'A guest in a DC bathrobe, sitting at the edge of the thermal pool',
  byEmail: 'Sent by email or WhatsApp',
  writeUs: 'Message us on WhatsApp',
  call: 'Call',
  footerTag: 'DC Luxury Thermes, the holistic centre of Dakhla Club Hotel & Spa · Dakhla, Morocco',
  footerNav: 'Navigation',
  footerCures: 'Programmes',
  footerContact: 'Contact',
  footerPay: 'Secure payment',
  footerFollow: 'Follow us',
  brochure: 'Download the brochure',
  copyright: '© 2026 DC Luxury Thermes · Dakhla Club Hotel & Spa',
  terms: 'Terms and conditions',
  termsUrl: 'https://offer.dakhlaclub.com/en/legal/cgv',
  privacy: 'Privacy policy',
  privacyUrl: 'https://offer.dakhlaclub.com/en/legal/privacy',
  cookies: 'Cookie policy',
  cookiesUrl: 'https://offer.dakhlaclub.com/en/legal/cookies',
  from: 'From',
  chooseCure: 'Choose a programme',
  day: (n: number) => `Day ${n}`,
  ready: 'Ready?',
  endText: (c: Cure) => `${c.days} days, ${c.treatments} treatments, and time to do nothing in between.`,
  hoursShort: 'h of treatments',
  cure: 'Programme',
  arrivalDate: 'Arrival date',
  guests: 'Guests',
  lodgingField: 'Accommodation',
  person: (n: number) => `${n} ${n > 1 ? 'people' : 'person'}`,
  guestCount: (n: number) => `${n} ${n > 1 ? 'guests' : 'guest'}`,
  lessGuest: 'One guest fewer',
  moreGuest: 'One more guest',
  payment: 'Payment',
  full: 'Full payment',
  fullMeta: 'Everything is paid today',
  deposit: '50% deposit',
  depositMeta: 'The balance is paid at the baths, on arrival',
  roomTitle: 'Stay at Dakhla Club Hotel & Spa · full board, free airport transfer',
  roomOn: 'Arrival the day before your first treatment, from 3 pm. Our driver meets you at Dakhla airport.',
  roomOff: 'Without accommodation, a shuttle runs every day between Dakhla and the baths.',
  arrival: 'Arrival',
  firstTreatment: 'First treatment',
  lastTreatment: 'Last treatment',
  dates: 'Dates',
  pickDay: 'Choose your arrival date',
  total: 'Programme total',
  depositLine: '50% deposit',
  fee: 'CMI payment fee (2.97%)',
  due: 'Due today',
  balance: 'Balance at the baths, on arrival',
  ctaDeposit: 'Book with a 50% deposit',
  ctaFull: 'Book and pay in full',
  ctaLead: 'Request my booking',
  departure: 'Hotel departure',
  packRow: (n: number) => `Programme and full-board accommodation, ${n} nights`,
  packPrice: 'Price on Direct-Book',
  packNote: 'The package price, programme and room included, appears at the next step for the room you choose. If no room is free on these dates, Direct-Book tells you: choose another arrival date, or book the programme only.',
  packCta: 'Choose my room and see the price',
  packTicketNote: 'Your accommodation is booked together with your programme on Direct-Book, Dakhla Club’s official site · Booking confirmation by email',
  ticketNote: 'Secure CMI payment · Booking confirmation by email · Free cancellation up to 30 days before arrival',
  leadTicketNote: 'No commitment, no online payment · Our team calls you to confirm your dates',
  reviewsLabel: 'Guest reviews',
  reviewN: (n: number, total: number) => `Review ${n} of ${total}`,
  tripadvisorReview: 'Tripadvisor review',
  translated: 'translated from French',
  scoreAria: (r: Rating) => `${r.platform}: ${r.score}${r.scale}, ${r.count}. Read the reviews (new tab)`,
  watch: (label: string) => `Watch: ${label}`,
  closeVideo: 'Close the video',
  quoteOpen: '“',
  quoteClose: '”',
  carousel: 'carousel',
}

export const giftPage = {
  title: 'Give a programme · DC Luxury Thermes',
  back: 'Back to the programmes',
  help: 'A question? +212 652 881 921',
  em: '',
  caps: 'Give a programme',
  intro: 'Give a few days of treatments facing the Dakhla lagoon. Choose the programme, add your message: we prepare the gift voucher.',
  steps: ['Compose the voucher', 'Send the request', 'Pay and receive the voucher'],
  stepsLabel: 'Steps',
  cureGroup: 'The programme you are giving',
  guests: 'Number of people',
  forGroup: 'Who is it for?',
  roomTitle: 'Add accommodation at Dakhla Club',
  roomOn: (n: number) => `${n} nights, from the evening before the first treatment to the last day. The room rate is sent to you with the payment details.`,
  roomOff: 'Without accommodation, they stay wherever they like: a shuttle takes them to the baths every day.',
  voucherRoom: (n: number) => `Accommodation included · ${n} nights at Dakhla Club`,
  roomRow: (n: number) => `Accommodation · ${n} nights`,
  onQuote: 'On request',
  valueCure: 'Programme value',
  recipient: 'Their first name',
  recipientPh: 'Sarah',
  occasion: 'The occasion',
  occasions: ['Birthday', 'Mother’s Day', 'Wedding', 'New baby', 'Thank you', 'Just because'],
  otherOccasion: 'Other…',
  otherOccasionLabel: 'Describe the occasion',
  otherOccasionPh: 'E.g. retirement, Valentine’s Day…',
  message: 'Your words, printed on the voucher',
  messagePh: 'To finally give you some time just for you…',
  deliveryGroup: 'Sending the voucher',
  delivery: [
    ['moi', 'To me', 'I’ll hand it over in person'],
    ['destinataire', 'Straight to them', 'By email, on the date you choose'],
  ],
  recipientEmail: 'Their email',
  sendDate: 'Sending date',
  details: 'Your details',
  sendMail: 'Send my request',
  sendWhatsapp: 'Send via WhatsApp',
  or: 'or',
  note: 'No payment at this stage. Our team contacts you within 24 hours for secure payment, then sends you the voucher.', // TO CONFIRM: timing
  sentTitle: 'Thank you, your request is ready',
  sentText: 'Your email app has opened with the request already written: all that’s left is to send it. Our team will contact you within 24 hours.',
  sentWhatsapp: 'WhatsApp has opened with your request already written: all that’s left is to send it. Our team will reply within 24 hours.',
  sentPosted: 'We have received your request. Our team will contact you within 24 hours to finalise the voucher.',
  sentFallback: (mail: string) => `Nothing opened? Write to us at ${mail}, or send the request via WhatsApp.`,
  edit: 'Edit the request',
  preview: 'Voucher preview',
  voucher: 'Gift voucher',
  forLabel: 'For',
  fromLabel: 'From',
  someone: 'someone dear',
  you: 'you',
  value: 'Voucher value',
  persons: (n: number) => `${n} ${n > 1 ? 'people' : 'person'}`,
  trust: ['An elegant gift voucher, to print or to send', 'Valid for 12 months, on the dates they choose', 'Accommodation and shuttle available as extras'],
  mail: {
    subject: 'DC Luxury Thermes gift voucher',
    hello: 'Hello, I would like to give a DC Luxury Thermes programme as a gift.',
    cure: 'Programme',
    for: 'For',
    occasion: 'Occasion',
    room: 'Accommodation',
    roomYes: (n: number) => `yes, ${n} nights at Dakhla Club (please send me the rate)`,
    roomNo: 'no, the programme only',
    message: 'Message on the voucher',
    delivery: 'Delivery',
    toMe: 'to me, I’ll hand it over in person',
    toThem: (email: string, date: string) => `straight to ${email}${date ? `, on ${date}` : ''}`,
    from: 'From',
    thanks: 'Please contact me about payment.',
  },
}

export const bookingPage = {
  back: 'Back to the programmes',
  help: 'A question? +212 652 881 921',
  em: '',
  caps: 'Final step',
  intro: 'Enter your details, then pay on the secure CMI platform. Your place is reserved as soon as you pay.',
  introPack: 'With a room, your booking is completed on Direct-Book, the hotel’s site: choose the room there, see the package price and availability, then pay online.',
  steps: ['Your details', 'Secure payment', 'Confirmation'],
  stepsLabel: 'Steps',
  yourCure: 'Your programme',
  roomTitle: 'I’m staying at Dakhla Club Hotel & Spa',
  roomOn: 'Arrival the day before from 3 pm, full board, free airport transfer.',
  roomOff: 'A shuttle takes you from Dakhla to the baths every day.',
  details: 'Your details',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  emailPh: 'to receive your confirmation',
  phone: 'Phone',
  dial: 'Country code',
  phoneLabel: 'Phone number',
  otherCountry: 'Other',
  phoneInvalid: (dial: string, example: string) => dial ? `This number is incomplete or incorrect for ${dial}. Example: ${example}` : `Enter the full number, with the country code. Example: ${example}`,
  note: 'A request or a contraindication to tell us about?',
  optional: 'Optional',
  notePh: 'Pregnancy, back problems, arrival time…',
  cgv: ['I have read and accept the ', 'terms and conditions', '.'],
  offers: 'I would like to receive news from DC Luxury Thermes and Dakhla Club Hotel & Spa.',
  pay: (amount: string) => `Pay ${amount}`,
  sending: 'Redirecting to payment…',
  secure: 'Secure CMI payment. You are redirected to the official CMI platform. Your card details never pass through our site.',
  payError: `The payment could not start. Please try again, or call us on ${site.phone}.`,
  leadCaps: 'Your request',
  leadIntro: 'Leave your details: our team will call you to confirm your dates, answer your questions and arrange payment. No payment is taken at this stage.',
  leadSteps: ['Your request', 'Our call', 'Confirmation'],
  leadSubmit: 'Send my request',
  leadSending: 'Sending…',
  leadNote: 'No commitment. Your details are only used to contact you about your programme.',
  leadTrust: ['No commitment, no online payment', 'An advisor calls you to set your dates', 'Ten guests at most per session'],
  leadDone: 'Request sent',
  leadDoneText: `Thank you. Our team will call you to confirm your dates and arrange payment. Any question in the meantime: ${site.phone}.`,
  leadError: `Your request could not be sent. Please try again, or call us on ${site.phone}.`,
  summary: 'Summary',
  access: 'programme and access to the baths',
  times: (price: string, n: number) => `${price} × ${n}`,
  trust: ['Instant confirmation by email', 'An advisor calls you before you arrive', 'Ten guests at most per session', 'Free cancellation up to 30 days before arrival'],
  countries: [['GB', 'United Kingdom'], ['US', 'United States'], ['CA', 'Canada'], ['FR', 'France'], ['MA', 'Morocco'], ['ES', 'Spain'], ['DE', 'Germany'], ['IT', 'Italy'], ['BE', 'Belgium'], ['NL', 'Netherlands'], ['SA', 'Saudi Arabia'], ['AE', 'United Arab Emirates'], ['other', 'Other country']] as [CountryKey, string][],
}

// Back from the CMI payment (Confirmation.tsx): /dc-thermes/merci, or /dc-thermes/paiement-echoue if the bank declines
export const confirmPage = {
  title: 'Payment confirmed · DC Luxury Thermes',
  failTitle: 'Payment not completed · DC Luxury Thermes',
  back: 'Back to the site',
  em: 'Thank you',
  caps: 'Your programme is booked',
  intro: (firstName: string) => `${firstName ? `${firstName}, your` : 'Your'} payment is confirmed. We look forward to welcoming you to the baths.`,
  hotelTitle: 'Extend your experience in Dakhla',
  hotelText: 'Your programme is confirmed. To make the most of your wellness getaway, choose your accommodation at Dakhla Club Hotel & Spa now.',
  hotelDates: 'Arrival the day before your first treatment, departure the day after the last: these dates are already selected on Direct-Book.',
  hotelCta: 'Discover our accommodation',
  nextTitle: 'What happens next',
  next: ['A confirmation email has been sent to you, with your reference.', 'An advisor will call you before you arrive to prepare your programme.'],
  balanceNext: (amount: string) => `The balance of ${amount} is paid at the baths, on arrival.`,
  question: 'A question before you come?',
  whatsapp: 'Contact us on WhatsApp',
  reference: 'Reference',
  paid: 'Paid today',
  failCaps: 'Payment not completed',
  failIntro: `The payment was not approved, so your programme is not booked yet. You can try again, with the same card or another one, or call us on ${site.phone}.`,
  retry: 'Try the payment again',
}

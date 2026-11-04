// English version of the page. Same structure as content.js; each fact appears only once.
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
  contactMail: mail('DC Therme programmes: a question'),
  contactLink: mail('DC Therme programmes: a question'),
  giftMail: mail('DC Therme gift voucher'),
  address: ['Dakhla Club', 'Point de Dragon, PK 28', 'Dakhla, Morocco'],
  hotel: (q: HotelQuery) => siteFr.hotel(q).replace('locale=fr', 'locale=en'),
  brochure: 'https://offer.dakhlaclub.com/brochure/BROCHURE-EN.pdf',
  giftPage: (q: Record<string, string> = {}) => '/dc-thermes/offrir?' + new URLSearchParams({ lang: 'en', ...q }).toString(),
}

export const meta = {
  title: 'Thalassotherapy in Dakhla · 3, 5 or 7-day programmes | DC Therme',
  description: 'Thalassotherapy programmes at Dakhla Club, between desert and ocean. Marine treatments, 32 °C thermal water, ten guests per session. From 4,950 MAD.',
  ogTitle: 'DC Therme · Thalassotherapy in Dakhla',
  ogDescription: 'Release the stress, restore your energy. Programmes of 3, 5 or 7 days, 32 °C thermal water.',
  canonical: 'https://offer.dakhlaclub.com/dc-thermes/en',
  ogLocale: 'en_GB',
  bookingTitle: 'Book your programme · DC Therme',
  leadTitle: 'Request your programme · DC Therme',
}

export const nav: NavItem[] = [
  ['cures', 'Programmes'],
  ['programme', 'Treatments'],
  ['offrir', 'Gift'],
  ['hotel', 'Dakhla Club', 'https://dakhlaclub.com/en'],
]

export const hero = {
  eyebrow: '',
  em: 'Release the stress,',
  caps: 'restore your energy',
  lead: 'Thalassotherapy programmes of 3, 5 or 7 days, between desert and ocean. Marine treatments, thermal rituals and real rest, to calm the nervous system, deepen sleep and restore vitality.',
  cta: 'Discover the programmes',
}

export const intro = {
  guide: [] as string[][],
  em: '',
  caps: 'What if you finally took time for yourself?',
  text: 'Tiredness lingers after the weekend. Nights feel less restful. Tension settles in. You feel the need to stop for a few days and take care of yourself.',
  signs: [
    ['Fatigue', 'Tiredness that lingers, even after rest.'],
    ['Restless nights', 'Light, broken, unrefreshing sleep.'],
    ['Nervous system', 'Always on alert, never truly at rest.'],
    ['Tension', 'Emotional tension that builds up and never releases.'],
    ['The need to slow down', 'A deep need to breathe and truly recover.'],
  ],
  after: 'A programme gives you that time. Our therapists welcome you, adjust the programme when you arrive and stay with you throughout your stay.',
  link: 'Discover the programmes',
}

const g = (key: string, name: string, text: string): GlossaryEntry => [name, text, glossaryFr[key][2], glossaryFr[key][3]]
export const glossary: Record<string, GlossaryEntry> = {
  bol: g('bol', 'Bol d’air Jacquier', 'A few minutes of breathing over a diffuser of pine resin essence. The ritual that opens every morning.'),
  piscine: g('piscine', 'Thermal pool', 'Warm water and a circuit of jets for the neck, back and legs. Open to you throughout your stay.'),
  jet: g('jet', 'Jet shower', 'The therapist guides a powerful jet of water from your feet up to your neck. Invigorating, it wakes the body in minutes.'),
  hydro: g('hydro', 'Hydromassage bath', 'A warm bath alive with bubbles and jets, massaging the body from the soles of the feet to the shoulders.'),
  affusion: g('affusion', 'Affusion massage', 'Lying down, you receive a gentle rain of warm water while the therapist massages your back and legs.'),
  hammamDesert: g('hammamDesert', 'Desert Secret hammam', 'Steam, black soap, then a kessa-glove scrub in the Moroccan tradition. Skin comes out soft, the mind lighter.'),
  // TO CONFIRM with the treatment team: exact sequence
  hammam1001: g('hammam1001', 'Thousand and One Nights hammam', 'The hammam at its most generous: steam, black soap, scrub, then a scented moment of rest.'),
  gommageSel: g('gommageSel', 'Himalayan salt scrub', 'Salt and oils smooth the skin of the whole body, leaving it soft and ready for the massage that follows.'),
  sauna: g('sauna', 'Sauna', 'A few minutes of dry heat to relax the muscles and prepare the body for the treatments ahead.'),
  froid: g('froid', 'Cold bath', 'A brief immersion in cold water, always with the team beside you. The shock lasts seconds, the freshness far longer.'),
  algues: g('algues', 'Seaweed wrap', 'A warm preparation of marine algae applied to the body, then you rest, wrapped and still.'),
  relaxant: g('relaxant', 'Relaxing massage', 'A slow full-body massage with oils, to release accumulated tension.'),
  tonique: g('tonique', 'Toning massage', 'Firmer, rhythmic movements to loosen the muscles and restore energy.'),
  kite: g('kite', 'After-kite massage', 'Designed for the lagoon’s kite riders: shoulders, forearms and legs, wherever effort settles.'),
  // TO CONFIRM with the treatment team: exact sequence
  massageSel: g('massageSel', 'Himalayan salt massage', 'An oil massage that follows on from the scrub, with Himalayan salt.'),
  pochons: g('pochons', 'Warm herbal poultice massage', 'Pouches of warmed herbs and spices pressed and rolled over the body. The heat goes deep and melts tension.'),
  cupDos: g('cupDos', 'Back cupping', 'Cups placed on the back create a gentle suction that releases the muscles in depth.'),
  cupFeu: g('cupFeu', 'Cupping and hot towel', 'Cupping, followed by a very warm towel laid over the back to prolong the heat and the release.'),
  argan: g('argan', 'Argan oil face massage', 'A massage of the face, neck and scalp with Moroccan argan oil.'),
  hyalu: g('hyalu', 'Hyalu-Procollagen plumping facial', 'A hyaluronic acid facial for plumper skin and smoother features.'),
  silicium: g('silicium', 'Silicium Lift firming facial', 'A silicium facial for firmer skin and a clearer complexion.'),
  spiruline: g('spiruline', 'Spirulina smoothing facial', 'A facial with spirulina, a nutrient-rich micro-alga. The complexion comes out fresh and luminous.'),
  pieds: g('pieds', 'Foot care', 'Soak, scrub and care for feet and nails. Welcome after days barefoot between the pools and the beach.'),
}

export const benefits = {
  em: '',
  caps: 'A few days to reconnect with yourself',
  lead: 'Your programme is built around treatments and rest. For a few days, you can slow down and devote time to your wellbeing.',
  items: [
    ['Switch off', 'Set everyday life aside and make room for rest.'],
    ['Let go', 'Enjoy massages, baths and the warmth of the hammam to relax the body.'],
    ['Rest', 'Take breaks between treatments and enjoy quiet evenings.'],
    ['Take care of yourself', 'Find a treatment programme prepared for you, every day.'],
    ['Escape', 'Discover the Dakhla Club baths, between the lagoon and the desert.'],
  ],
  after: 'From three to seven days, choose the length that lets you make the most of this pause.',
  caption: 'Dakhla Club, between lagoon and desert',
  alt: 'Aerial view of Dakhla Club: the pool, the bungalows and the Dakhla lagoon at the foot of the dunes',
}

const cure = (key: CureKey, extra: Partial<Cure>): Cure => ({ ...curesFr.find((c) => c.key === key)!, ...extra })
export const cures: Cure[] = [
  cure('vitalite', {
    for: 'Three days to pause and discover the baths. From the Desert Secret hammam to the argan face massage, enjoy a 14-treatment programme combining baths, massages and facials.',
    includes: ['Desert Secret hammam', 'Marine seaweed wrap', 'Argan oil face massage', 'Free access to the baths'],
    alt: 'A guest relaxing in the stone lounge of the thermal baths',
  }),
  cure('regeneration', {
    for: 'Five days to give yourself a real break. The Thousand and One Nights hammam, a seaweed wrap, a Himalayan salt massage and warm herbal poultices make up a 29-treatment programme, with 16 hours devoted to your wellbeing.',
    includes: ['Thousand and One Nights hammam', 'Himalayan salt scrub and massage', 'Warm herbal poultice massage', 'Free access to the baths'],
    label: 'Most chosen', // TO CONFIRM
    alt: 'A guest in a bathrobe beside the thermal pool',
  }),
  cure('renaissance', {
    for: 'A whole week to take your time at the baths. This 33-treatment programme combines baths, hammam, massages and argan and spirulina facials, with 21 hours of treatments spread over seven days.',
    includes: ['Hammam, salt scrub and massage', 'Sauna and cold bath', 'Two facials, argan and spirulina', 'Free access to the baths'],
    alt: 'Two guests in bathrobes in the relaxation lounge, over tea',
  }),
]

export const curesHead = {
  em: '',
  caps: 'Our thalasso programmes',
  sub: 'Three lengths, of 3, 5 or 7 days, for a restorative experience at your own pace. Explore our treatment programmes and choose the wellness retreat that meets your wishes and your needs.',
  note: 'Price per person, accommodation optional. Pay online in full or with a 50% deposit, plus a 2.97% CMI fee. Ten guests at most per session.',
}

const reviewLinks = {
  tripadvisor: 'https://www.tripadvisor.com/Hotel_Review-g479761-d12457574-Reviews-Dakhla_Club_Hotel_Spa-Dakhla_Dakhla_Oued_Ed_Dahab.html',
  booking: 'https://www.booking.com/hotel/ma/dakhla-club.en-gb.html#tab-reviews',
  hotels: 'https://www.hotels.com/ho682902944/dakhla-club-hotel-spa-dakhla-morocco/',
  kayak: 'https://www.kayak.com/Dakhla-Hotels-Dakhla-Club-Hotel-Spa.3697843.ksp',
}

export const proof = {
  em: '',
  caps: 'They share their experience',
  // Tripadvisor reviews about the spa, translated from French
  quotes: [
    ['We came with 12 friends for a thalasso stay. Special mention to Nisrine, Imane and the whole spa team for their kindness and the quality of their treatments.', 'Isabelle D.', 'October 2026'],
    ['The spa was exceptional. True professionals.', 'Karim M.', 'October 2026'],
    ['Nisrine and her team take wonderful care of you, for a truly peaceful moment.', 'Charline V.', 'October 2026'],
    ['Top-quality spa treatments in Fatima’s hands.', 'Ghislaine D.', 'October 2026'],
    ['Great massage and spa with jacuzzi. Special mention to Nisrine and her team!', 'amaurysolenn', 'October 2026'],
  ],
  sub: '',
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
  caps: 'every treatment',
  sub: 'Discover the treatments planned for each day and open their description to see how they unfold. Every morning begins with the Bol d’air Jacquier and the thermal pool. Our therapists adjust the programme when you arrive.',
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
    ['Certified therapists', 'An attentive team that looks after you from the first treatment to the last.'],
    ['A setting to slow down', 'The pools beneath the glass roof, the stone arches and the relaxation areas are part of the pleasure of your stay.'],
    ['Sea and ritual', 'Modern marine treatments and ancestral Moroccan rituals, brought together in one programme.'],
    ['A programme organised day by day', 'Treatments vary over your stay: baths, hammam, wraps, massages and facials are spread out according to the programme you choose.'],
  ],
}

export const gift = {
  em: '',
  caps: 'Give a programme',
  text: 'The programme of your choice, on the dates that suit the person receiving it. A gift voucher sent by email, ready to print, with a few words from you.',
  validity: 'Valid for 12 months', // TO CONFIRM
  cta: 'Give a programme',
}

export const faq: Faq = {
  em: '',
  caps: 'Your questions',
  items: [
    ['What is a thalasso stay at Dakhla Club?', [
      'A structured wellness experience that draws on seawater, marine treatments and hydrotherapy to ease stress, improve sleep and restore energy.',
      'Unlike a simple spa visit, our programmes unfold over several days, so the body can gradually let go of tension and find a better physical and mental balance.',
      'Choose the length that suits your needs and continue to booking.',
    ]],
    ['What is the difference between the 3, 5 and 7-day programmes?', [
      'The three programmes differ in length and content:',
      { ul: [
        ['Vitalité:', '3 days, 14 treatments and 7 hours of care. For a first experience of the baths or a short break.'],
        ['Régénération:', '5 days, 29 treatments and 16 hours of care. To spend more time on baths, massages and hammam rituals.'],
        ['Renaissance:', '7 days, 33 treatments and 21 hours of care. To spend a week at the baths, including argan and spirulina facials.'],
      ] },
      'See the day-by-day programme to compare the treatments included. Accommodation is available as an option for all three programmes.',
    ]],
    ['Which treatments are included?', [
      'The programmes combine thalassotherapy and hydrotherapy:',
      { ul: ['marine treatments', 'therapeutic baths and showers', 'body wraps', 'targeted massages', 'access to the wellness facilities: pool, hammam, relaxation areas'] },
      'Treatments follow your rhythm, never overloaded, to support natural recovery. The day-by-day detail of each programme is shown above.',
    ]],
    ['Is it suitable if I have never tried thalassotherapy?', [
      'Absolutely. Our stays are designed to be accessible, even for a first experience.',
      'Guidance is gradual, treatments are adapted and our team is on hand throughout your stay. No particular fitness is required.',
    ]],
    ['Who is this stay for?', [
      'For anyone who:',
      { ul: ['feels stressed or tired', 'sleeps badly or struggles to recover', 'needs a physical and mental break', 'wants to take care of themselves in a calm, structured setting'] },
      'It suits busy professionals as much as people in a period of transition or rest. You do not need a medical condition to benefit.',
    ]],
    ['Where will I stay during my thalasso stay in Dakhla?', [
      'The thalasso stay is offered in partnership with Dakhla Club Hotel & Spa.',
      'Once your programme is booked, our team helps you reserve your accommodation, so that treatments and rest time fit together smoothly.',
      'Accommodation is booked separately.',
    ]],
    ['How do booking and payment work?', [
      'Booking takes a few simple steps:',
      { ol: ['Choose your programme (3, 5 or 7 days)', 'Pay securely online', 'Receive confirmation of your stay', 'Our team contacts you to prepare your arrival'] },
      'Payment is 100% secure and your booking is confirmed immediately.',
    ]],
    ['Why are places limited?', [
      'To protect the quality of care and keep every guest personally looked after, numbers are deliberately limited for each session. The atmosphere stays calm, unhurried and respectful of everyone’s pace.',
      'We recommend booking ahead.',
    ]],
    ['What should I prepare before arriving?', [
      'Once your booking is confirmed, our team sends you everything you need: what to wear, timings, how the stay is organised. Simply bring:',
      { ul: ['comfortable clothes', 'a swimsuit', 'a willingness to let go'] },
    ]],
    ['Can I ask a question before booking?', [
      'Of course. Our team will answer your questions and help you choose the programme that suits you best.',
      'Message us directly, or continue your booking online.',
    ]],
  ],
  contact: 'Our team knows every treatment. They will help you choose the programme, the dates and the room.',
}

export const ui = {
  skip: 'Skip to programmes',
  navLabel: 'Sections',
  home: 'Back to top',
  logoAlt: 'DC Therme, Luxury Thermes Spa',
  book: 'Book',
  switchLabel: 'Français',
  switchShort: 'FR',
  heroAlt: 'The DC Therme thermal pool beneath the glass roof, between stone arches',
  scrollNext: 'Scroll to continue',
  days: 'days',
  daysShort: 'd',
  perPerson: 'per person',
  included: 'What’s included',
  lodging: 'Accommodation optional',
  compareLabel: 'The three programmes at a glance',
  mobileNav: [['cures', 'Programmes'], ['programme', 'Treatments'], ['questions', 'FAQ']],
  treatments: 'treatments',
  hoursOf: 'of treatments',
  reserve: (name: string) => `Book ${name}`,
  seeProgramme: 'See the day-by-day programme',
  introAlt: 'The stone arches and thermal pool of DC Therme',
  filmLabel: 'Film: a day of treatments at DC Therme',
  giftAlt: 'A guest in a DC bathrobe, sitting at the edge of the thermal pool',
  byEmail: 'Sent by email',
  writeUs: 'Email us',
  call: '',
  footerTag: 'The thermal baths of Dakhla Club. Thalassotherapy programmes between desert and ocean.',
  footerNav: 'Navigation',
  footerCures: 'Programmes',
  footerContact: 'Contact',
  footerPay: '100% secure payment',
  footerFollow: 'Follow us',
  brochure: 'Download the brochure',
  copyright: '© 2026 Dakhla Club · Luxury Fitness, Health & Wellness Retreat',
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
  firstDay: 'First day of treatments',
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
  depositMeta: 'The balance is paid at the baths on arrival',
  roomTitle: 'Add a room at Dakhla Club',
  roomOn: 'Arrival the day before your first treatment, departure the day after the last. Programme and room are booked together on Direct-Book, the hotel’s booking site.',
  roomOff: 'Without a room, our shuttle takes you from Dakhla to the baths every day.',
  arrival: 'Hotel arrival',
  firstTreatment: 'First treatment',
  lastTreatment: 'Last treatment',
  dates: 'Dates',
  pickDay: 'Choose your first day',
  total: 'Programme total',
  depositLine: '50% deposit',
  fee: 'CMI payment fee (2.97%)',
  due: 'Due today',
  balance: 'Balance at the baths, on arrival',
  ctaDeposit: 'Book with a 50% deposit',
  ctaFull: 'Book and pay in full',
  ctaLead: 'Request my booking',
  departure: 'Hotel departure',
  packRow: (n: number) => `Programme and room, ${n} nights`,
  packPrice: 'Price on Direct-Book',
  packNote: 'The package price, programme and room included, appears at the next step for the room you choose. If no room is free on these dates, Direct-Book tells you: pick another first day, or book the programme only.',
  packCta: 'Choose my room and see the price',
  packTicketNote: 'Booking and payment on Direct-Book, Dakhla Club’s official booking site · Instant email confirmation',
  ticketNote: 'Secure CMI payment · Instant email confirmation',
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
  title: 'Give a programme · DC Therme',
  back: 'Back to the programmes',
  help: 'A question? +212 652 881 921',
  em: '',
  caps: 'Give a programme',
  intro: 'A few days entirely their own, between desert and ocean. Choose the programme, add your words: we prepare a gift voucher worthy of the moment.',
  steps: ['Compose the voucher', 'Send the request', 'Pay, and it is sent'],
  stepsLabel: 'Steps',
  cureGroup: 'The programme',
  guests: 'Number of people',
  forGroup: 'Who is it for?',
  roomTitle: 'Add accommodation at Dakhla Club',
  roomOn: (n: number) => `${n} nights, from the evening before the first treatment to the last day. The room rate is shared with you at payment.`,
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
  messagePh: 'So that you finally take time to breathe…',
  deliveryGroup: 'Delivery',
  delivery: [
    ['moi', 'To me', 'I’ll hand it over myself'],
    ['destinataire', 'Straight to them', 'By email, on the date you choose'],
  ],
  recipientEmail: 'Their email',
  sendDate: 'Sending date',
  details: 'Your details',
  sendMail: 'Send my request',
  sendWhatsapp: 'Send via WhatsApp',
  or: 'or',
  note: 'No payment at this stage. Our team contacts you within 24 hours for secure payment, then sends you the voucher.', // TO CONFIRM: timing
  sentTitle: 'Thank you, almost there',
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
  trust: ['An elegant voucher, to print or to send', 'Valid for 12 months, on the dates they choose', 'Room and shuttle available as extras'], // TO CONFIRM: validity
  mail: {
    subject: 'DC Therme gift voucher',
    hello: 'Hello, I would like to give a DC Therme programme as a gift.',
    cure: 'Programme',
    for: 'For',
    occasion: 'Occasion',
    room: 'Accommodation',
    roomYes: (n: number) => `yes, ${n} nights at Dakhla Club (please send me the rate)`,
    roomNo: 'no, the programme only',
    message: 'Message on the voucher',
    delivery: 'Delivery',
    toMe: 'to me, I’ll hand it over myself',
    toThem: (email: string, date: string) => `straight to ${email}${date ? `, on ${date}` : ''}`,
    from: 'From',
    thanks: 'Please contact me for payment.',
  },
}

export const bookingPage = {
  back: 'Back to the programmes',
  help: 'A question? +212 652 881 921',
  em: '',
  caps: 'Final step',
  intro: 'Your details, then payment on the secure CMI platform, and your place is reserved.',
  introPack: 'With a room, your booking is completed on Direct-Book, the hotel’s site: choose the room there, see the package price and availability, then pay online.',
  steps: ['Your details', 'Secure payment', 'Confirmation'],
  stepsLabel: 'Steps',
  yourCure: 'Your programme',
  roomTitle: 'I would also like a room at Dakhla Club',
  roomOn: 'Arrival the day before your first treatment, departure the day after the last. Programme and room are booked together on Direct-Book, where your details and payment are taken.',
  roomOff: 'Without a room, a shuttle takes you from Dakhla to the baths every day.',
  details: 'Your details',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  emailPh: 'to receive your confirmation',
  phone: 'Phone',
  dial: 'Country code',
  phoneLabel: 'Phone number',
  otherCountry: 'Other',
  phoneInvalid: (dial: string, example: string) => dial ? `This number looks incomplete or incorrect for ${dial}. Example: ${example}` : `Enter the full number, with the country code. Example: ${example}`,
  note: 'A request, a contraindication?',
  optional: 'Optional',
  notePh: 'Pregnancy, back problems, arrival time…',
  cgv: ['I have read and accept the ', 'terms and conditions', '.'],
  offers: 'I would like to receive offers and news from DC Therme and Dakhla Club.',
  pay: (amount: string) => `Pay ${amount} securely`,
  sending: 'Redirecting to payment…',
  secure: 'You will be redirected to the official CMI platform. Your card details never pass through our site.',
  payError: `The payment could not start. Please try again, or call us on ${site.phone}.`,
  leadCaps: 'Your request',
  leadIntro: 'Leave your details: our team will call you to confirm your dates, answer your questions and arrange payment. No payment is taken at this stage.',
  leadSteps: ['Your request', 'Our call', 'Confirmation'],
  leadSubmit: 'Send my request',
  leadSending: 'Sending…',
  leadNote: 'No commitment. Your details are used to contact you about your programme.',
  leadTrust: ['No commitment, no online payment', 'An advisor calls you to set your dates', 'Ten guests at most per session'],
  leadDone: 'Request sent',
  leadDoneText: `Thank you. Our team will call you to confirm your dates and arrange payment. Any question in the meantime: ${site.phone}.`,
  leadError: `Your request could not be sent. Please try again, or call us on ${site.phone}.`,
  summary: 'Summary',
  access: 'access to the baths',
  times: (price: string, n: number) => `${price} × ${n}`,
  trust: ['Instant confirmation by email', 'An advisor calls you before you arrive', 'Ten guests at most per session'],
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
  nextTitle: 'What happens next',
  next: ['A confirmation email has been sent to you, with your reference.', 'An advisor will call you before you arrive to prepare your programme.'],
  balanceNext: (amount: string) => `The balance of ${amount} is paid at the baths, on arrival.`,
  question: 'A question before you come?',
  whatsapp: 'Message us on WhatsApp',
  reference: 'Reference',
  paid: 'Paid today',
  failCaps: 'Payment not completed',
  failIntro: `The payment was not approved, so your programme is not booked yet. You can try again, with the same card or another one, or call us on ${site.phone}.`,
  retry: 'Try the payment again',
}

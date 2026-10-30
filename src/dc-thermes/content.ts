// Tout le texte de la page. Chaque information n'apparaît qu'à un seul endroit.
// Les éléments marqués « À CONFIRMER » doivent être vérifiés avant la mise en ligne.

import type { Cure, CureKey, Faq, GlossaryEntry, HotelQuery, Lang, NavItem, ProgrammeDay, Rating } from './types'

const mail = (subject: string) => 'mailto:reservation@dakhlaclub.com?subject=' + encodeURIComponent(subject)

export const site = {
  url: 'https://offer.dakhlaclub.com/dc-thermes',
  // À CONFIRMER : la proposition de copywriting donne le +212 6 63 68 04 25. Pour en changer, modifier phone, tel et whatsappNumber.
  phone: '+212 652 881 921',
  tel: 'tel:+212652881921',
  email: 'reservation@dakhlaclub.com',
  contactMail: mail('Cures DC Luxury Thermes : une question'),
  contactLink: 'https://wa.me/212652881921',
  giftMail: mail('Bon cadeau DC Luxury Thermes'),
  // Repris du pied de page du site actuel
  brochure: 'https://offer.dakhlaclub.com/brochure/BROCHURE_CH_NUMERIQUE_FR_compressed.pdf',
  social: [
    ['Instagram', 'https://www.instagram.com/hoteldakhlaclub/'],
    ['Facebook', 'https://www.facebook.com/DakhlaClub/'],
    ['YouTube', 'https://youtube.com/@dakhlaclub1745'],
  ],
  address: ['Dakhla Club', 'Point de Dragon, PK 28', 'Dakhla, Maroc'],
  // Paiement des cures : tunnel CMI existant, un panier par cure
  checkout: (key: string) => `https://offer.dakhlaclub.com/fr/panier/${key}`,
  // Cure avec chambre : moteur Direct-Book du Dakhla Club, tarif « pack thalasso » présélectionné.
  // Un seul tarif pour les trois cures : la durée du séjour choisit le pack (4 nuits = 3 jours, 6 = 5, 8 = 7).
  // Direct-Book affiche le prix selon la chambre choisie, ou indique qu'aucune chambre n'est libre.
  packRateId: 999765,
  nights: (days: number) => days + 1, // arrivée la veille du premier soin, départ le lendemain du dernier
  hotel: ({ checkIn, checkOut, adults, rateId }: HotelQuery) =>
    `https://direct-book.com/properties/DakhlaClubDIRECT?locale=fr&items[0][adults]=${adults}&items[0][children]=0&items[0][infants]=0${rateId ? `&items[0][rateId]=${rateId}` : ''}&currency=MAD&checkInDate=${checkIn}&checkOutDate=${checkOut}&trackPage=yes${rateId ? '&selected=0' : ''}`,
  cmiFee: 0.0297, // frais de transaction CMI ajoutés au paiement en ligne, comme sur le panier actuel
  // Page « Offrir » : la demande part par e-mail à l'équipe, ou par WhatsApp
  giftPage: (q: Record<string, string> = {}) => '/dc-thermes/offrir' + (Object.keys(q).length ? '?' + new URLSearchParams(q).toString() : ''),
  whatsappNumber: '212652881921',
  // À BRANCHER (facultatif) : adresse d'un service d'envoi de formulaire. Vide = la messagerie du visiteur s'ouvre.
  giftEndpoint: '',
  // Page de réservation de cette landing page (étape avant le paiement CMI)
  booking: (q: Record<string, string>) => '/dc-thermes/reservation?' + new URLSearchParams(q).toString(),
}

export const nav: NavItem[] = [
  ['cures', 'Les cures'],
  ['programme', 'Les soins'],
  ['hotel', 'L’hôtel', 'https://dakhlaclub.com/'],
  ['offrir', 'Offrir'],
]

// Titres : courts, en capitales espacées (em = première ligne, facultative)
export const hero = {
  eyebrow: 'DC Luxury Thermes · Centre holistique',
  em: '',
  caps: 'Ici, le lieu fait partie du soin.',
  lead: 'Face à la lagune de Dakhla, vivez une parenthèse de 3, 5 ou 7 jours au rythme des soins marins, des massages et du rituel ancestral du hammam marocain. Un séjour pour ralentir et retrouver énergie et sérénité.',
  cta: 'Découvrir nos cures',
}

export const intro = {
  em: '',
  caps: 'Si ces signes vous parlent',
  text: 'Fatigue durable, sommeil peu réparateur, tensions musculaires ; lorsque l’organisme peine à récupérer, quelques jours de soins encadrés l’aident à retrouver son équilibre.',
  signs: [
    ['Fatigue persistante', 'Une sensation d’épuisement, même après plusieurs jours de repos.'],
    ['Sommeil peu réparateur', 'Des nuits perturbées, des réveils nocturnes, sans véritable sensation de repos.'],
    ['Esprit en alerte', 'Une difficulté à déconnecter et à relâcher la pression, même pendant les vacances.'],
    ['Tensions accumulées', 'Un stress qui s’installe, des émotions difficiles à apaiser et une sensation de pression constante.'],
    ['Besoin de ralentir', 'L’envie de faire une vraie pause, loin des obligations du quotidien.'],
  ],
  after: '« Beaucoup de nos curistes arrivent épuisés, sans toujours savoir pourquoi. Notre rôle est de les écouter, puis d’ajuster chaque soin à ce que leur corps exprime. »',
  link: 'Découvrir les cures',
  // Quelle cure pour quel besoin : texte, identifiant de la carte, lien
  guide: [
    ['Une fatigue passagère, l’envie de souffler :', 'vitalite', 'Vitalité · 3 jours'],
    ['Une fatigue installée, des tensions qui persistent :', 'regeneration', 'Régénération · 5 jours'],
    ['Le besoin de s’arrêter complètement :', 'renaissance', 'Renaissance · 7 jours'],
  ],
}

// Les univers de soins. Chacun porte sa photographie ; ceux qui n'en ont pas encore montrent les thermes.
export const glossary: Record<string, GlossaryEntry> = {
  bol: ['Bol d’air Jacquier', 'Quelques minutes de respiration d’un air enrichi en essence de résine de pin. Une méthode d’oxygénation douce qui ouvre chaque matinée, pour une sensation de détente et d’apaisement.', 'air', '/images/dc-thermes/soins/respiration.webp'],
  piscine: ['Piscine thermale', 'Un bassin d’eau chauffée et son parcours de jets, qui ciblent la nuque, le dos et les jambes. En accès libre pendant toute la cure.', 'thermes', '/images/dc-thermes/bassins.webp'],
  jet: ['Douche à jet', 'Un jet d’eau à forte pression, dirigé par l’hydrothérapeute, des pieds vers la nuque. Un soin tonifiant, qui active la circulation et décontracte les muscles.', 'eau', '/images/dc-thermes/soin-douche-jet.webp'],
  hydro: ['Bain hydromassant', 'Immergé dans une eau chaude, le corps est balayé par des jets sous-marins, de la plante des pieds à la nuque. Un hydromassage relaxant, propice à l’absorption des sels minéraux de l’eau de mer.', 'eau', '/images/dc-thermes/soin-bain-therapeute.webp'],
  affusion: ['Modelage sous affusion', 'Allongé, le corps est massé des pieds à la nuque sous une fine pluie d’eau de mer chauffée. L’alliance du massage et de l’hydrothérapie, profondément relaxante.', 'eau', '/images/dc-thermes/soin-affusion-rail.webp'],
  hammamDesert: ['Hammam Secret du Désert', 'Le rituel ancestral du hammam marocain : vapeur, savon noir, puis exfoliation au gant kessa. La peau est purifiée, douce et prête à recevoir les soins.', 'hammam', '/images/dc-thermes/soins/hammam.webp'],
  // À CONFIRMER par l'équipe soins : déroulé exact
  hammam1001: ['Hammam des Mille et Une Nuits', 'La version la plus généreuse du rituel : vapeur, savon noir et gommage au gant kessa, prolongés par un temps de repos parfumé.', 'hammam', '/images/dc-thermes/soins/hammam.webp'],
  gommageSel: ['Gommage au sel de l’Himalaya', 'Une exfoliation du corps aux cristaux de sel et aux huiles, qui élimine les cellules mortes, affine le grain de peau et la prépare au massage.', 'hammam', '/images/dc-thermes/soins/hammam.webp'],
  sauna: ['Sauna', 'Quelques minutes de chaleur sèche, qui favorisent la sudation, détendent et préparent les muscles aux soins suivants.', 'contraste', '/images/dc-thermes/soins/sauna-dc.webp'],
  froid: ['Bain froid', 'Une immersion brève en eau froide, toujours encadrée par l’équipe. Après la chaleur du sauna ou du hammam, le froid resserre les vaisseaux et tonifie l’organisme.', 'contraste', '/images/dc-thermes/soins/froid.webp'],
  algues: ['Enveloppement aux algues', 'Le corps est recouvert d’une préparation d’algues marines appliquée chaude sur le corps, suivie d’un temps de repos. Un soin reminéralisant, qui purifie, apaise et recharge l’organisme.', 'mer', '/images/dc-thermes/soin-enveloppement.webp'],
  relaxant: ['Massage relaxant', 'Des mouvements doux et harmonieux, associés à des pressions glissées, pour libérer les tensions et inviter au lâcher-prise.', 'mains', '/images/dc-thermes/soin-massage-mains.webp'],
  tonique: ['Massage tonique', 'Des gestes appuyés et rythmés, qui dénouent les muscles et redonnent du tonus au corps.', 'mains', '/images/dc-thermes/soin-massage-mains.webp'],
  kite: ['Massage After Kite', 'Un massage de récupération ciblé sur les épaules, les bras et les jambes, conçu à l’origine pour les sportifs de la lagune.', 'mains', '/images/dc-thermes/soin-massage-mains.webp'],
  // À CONFIRMER par l'équipe soins : déroulé exact
  massageSel: ['Massage au sel de l’Himalaya', 'Un massage aux huiles qui prolonge le gommage au sel de l’Himalaya, pour une peau douce et un corps détendu.', 'mains', '/images/dc-thermes/soin-massage-mains.webp'],
  pochons: ['Massage aux pochons chauds', 'Des pochons d’herbes et d’épices chauffés, appliqués sur le corps par pressions et roulements. Leur chaleur diffuse dénoue les tensions.', 'mains', '/images/dc-thermes/soins/pochons.webp'],
  cupDos: ['Ventouses sur le dos', 'Posées sur le dos, les ventouses exercent une légère aspiration qui détend la musculature et stimule la circulation.', 'mains', '/images/dc-thermes/soins/cupping.webp'],
  cupFeu: ['Ventouses et serviette chaude', 'Une séance de ventouses, prolongée par une serviette chaude posée sur le dos pour approfondir la détente.', 'mains', '/images/dc-thermes/soins/ventouses.webp'],
  argan: ['Massage du visage à l’huile d’argan', 'Ce rituel global offre une relaxation absolue de la tête aux épaules. Réalisé à l’huile d’argan pure du Maroc, reconnue pour ses propriétés hautement nourrissantes et apaisantes.', 'visage', '/images/dc-thermes/soins/argan.webp'],
  hyalu: ['Soin combleur Hyalu-Procollagène', 'Associant l’acide hyaluronique et le procollagène à des techniques de modelage ciblées, ce soin d’exception hydrate intensément, repulpe la peau tout en lissant visiblement les traits.', 'visage', '/images/dc-thermes/soins/visage.webp'],
  silicium: ['Soin raffermissant Silicium Lift', 'Ce soin du visage associe le silicium marin à un modelage liftant. La peau gagne en fermeté, l’ovale du visage paraît redessiné, et les traits semblent plus reposés.', 'visage', '/images/dc-thermes/soins/visage.webp'],
  spiruline: ['Soin lissant à la spiruline', 'Un soin du visage à la spiruline, micro-algue riche en vitamines et en antioxydants. Associé à un modelage doux et drainant, pour un teint frais et lumineux.', 'visage', '/images/dc-thermes/soins/masque.webp'],
  pieds: ['Soin des pieds', 'Bain, gommage, soin des ongles et modelage apaisant : un rituel qui adoucit la peau desséchée par le sel, le sable et le soleil, et laisse les pieds légers.', 'visage', '/images/dc-thermes/soins/pieds.webp'],
}

// Les bienfaits, repris du site actuel et resserrés
export const benefits = {
  em: '',
  caps: 'Ce que vous emportez',
  lead: 'Une cure ne s’arrête pas au dernier soin. Avec l’accompagnement de nos thérapeutes, l’organisme se rééquilibre, et ces bienfaits se prolongent bien après le retour.',
  items: [
    ['Un corps détendu', 'Massages, chaleur du hammam et hydrothérapie dénouent les tensions musculaires.'],
    ['Des nuits plus paisibles', 'Des journées au rythme des soins, loin des écrans, propices à des nuits plus sereines.'],
    ['L’esprit au calme', 'Sans agenda ni obligations, l’esprit se défait de la charge du quotidien et retrouve sa clarté.'],
  ],
  after: 'Quelques jours entièrement consacrés à votre bien-être, sans avoir à organiser chaque instant.',
  caption: 'Le Dakhla Club, entre lagune et désert',
  alt: 'Vue aérienne du Dakhla Club : la piscine, les bungalows et la lagune de Dakhla au pied des dunes',
}

export const cures: Cure[] = [
  {
    key: 'vitalite',
    name: 'Vitalité',
    days: 3,
    treatments: 14,
    hours: 7,
    for: 'Loin du quotidien, trois jours entièrement consacrés à votre bien-être, pour souffler et repartir avec une énergie nouvelle. La chaleur du hammam, l’enveloppement d’algues et les massages se succèdent pour relâcher les tensions et procurer une agréable sensation de légèreté.',
    tagline: 'Vitalité · Énergie et éclat',
    promise: 'Une première escapade pour respirer et prendre soin de soi.',
    includes: ['Hammam Secret du Désert', 'Enveloppement aux algues marines', 'Massage du visage à l’huile d’argan', 'Accès libre aux thermes'],
    price: 4950,
    euro: 495,
    img: '/images/dc-thermes/cure-vitalite.webp',
    alt: 'Un curiste détendu dans le salon de pierre des thermes',
    imgPos: '50% 40%',
  },
  {
    key: 'regeneration',
    name: 'Régénération',
    days: 5,
    treatments: 29,
    hours: 16,
    for: 'Cinq jours pour retrouver votre élan et vous accorder une pause revitalisante. Ce protocole de remise en forme alterne le chaud et le froid, hydrothérapie tonique et massages ciblés pour détendre les muscles et redonner au corps son équilibre.',
    tagline: 'Régénération · Récupération et tonus',
    promise: 'Une pause réparatrice pour se poser et récupérer en douceur.',
    includes: ['Hammam des Mille et Une Nuits', 'Gommage et massage au sel de l’Himalaya', 'Massage aux pochons chauds', 'Accès libre aux thermes'],
    price: 9270,
    euro: 927,
    label: 'La plus choisie', // À CONFIRMER
    img: '/images/dc-thermes/cure-regeneration.webp',
    alt: 'Une curiste en peignoir au bord de la piscine thermale',
    imgPos: '50% 30%',
  },
  {
    key: 'renaissance',
    name: 'Renaissance',
    days: 7,
    treatments: 33,
    hours: 21,
    for: 'Le temps d’une semaine, le corps et l’esprit adoptent un autre rythme. Sept jours pour une récupération en profondeur et une sérénité qui s’installe jour après jour.',
    tagline: 'Renaissance · Sérénité et plénitude',
    promise: 'Une coupure complète pour lâcher prise et se retrouver.',
    includes: ['Hammam, gommage et massage au sel', 'Sauna et bain froid', 'Deux soins du visage, argan et spiruline', 'Accès libre aux thermes'],
    price: 10620,
    euro: 1062,
    img: '/images/dc-thermes/cure-renaissance.webp',
    alt: 'Deux curistes en peignoir au salon de repos, autour d’un thé',
    imgPos: '50% 50%',
  },
]

export const curesHead = {
  em: '',
  caps: 'DC Luxury Thermes · Centre holistique',
  sub: 'Des cures de 3, 5 ou 7 jours où les bienfaits de la mer et de l’hydrothérapie s’unissent à l’art du massage et au rituel du hammam marocain. Découvrez les soins jour par jour et choisissez le temps que vous souhaitez vous accorder.',
  note: 'Tarifs par personne. Règlement en ligne sécurisé, en totalité ou par un acompte de 50 %, annulation sans frais jusqu’à 30 jours avant l’arrivée. Pour préserver la qualité de l’accompagnement, chaque session accueille dix curistes au maximum.',
}

// Avis et notes publics du Dakhla Club Hotel & Spa, relevés le 27/10/2026 sur chaque plateforme.
const reviewLinks = {
  tripadvisor: 'https://www.tripadvisor.fr/Hotel_Review-g479761-d12457574-Reviews-Dakhla_Club_Hotel_Spa-Dakhla_Dakhla_Oued_Ed_Dahab.html',
  booking: 'https://www.booking.com/hotel/ma/dakhla-club.fr.html#tab-reviews',
  hotels: 'https://fr.hotels.com/ho682902944/dakhla-club-hotel-spa-dakhla-maroc/',
  kayak: 'https://www.kayak.fr/Dakhla-Hotels-Dakhla-Club-Hotel-Spa.3697843.ksp',
}

export const proof = {
  em: '',
  caps: 'Nos curistes en parlent',
  sub: 'Leur séjour, filmé par eux. Survolez pour un aperçu, cliquez pour activer le son.',
  // Extraits d'avis Tripadvisor qui parlent du spa, cités mot pour mot
  quotes: [
    ['Nous sommes venues avec 12 amies pour un séjour thalasso. Mention spéciale à Nisrine, Imane et toute l’équipe du spa pour leur gentillesse et la qualité de leurs soins.', 'Isabelle D.', 'octobre 2026'],
    ['Le SPA était exceptionnel. Des vrais professionnels.', 'Karim M.', 'octobre 2026'],
    ['Nisrine et son équipe sont à vos petits soins pour passer un véritable moment zen.', 'Charline V.', 'octobre 2026'],
    ['Soins SPA au top dans les mains de Fatima.', 'Ghislaine D.', 'octobre 2026'],
    ['Super massage et spa avec jacuzzi Mention spéciale à Nisrine et son équipe !', 'amaurysolenn', 'octobre 2026'],
  ],
  quotesLink: reviewLinks.tripadvisor,
  // Vidéos de créateurs tournées aux thermes (reprises du site actuel)
  videos: [
    { src: '/videos/dc-thermes/temoignages/video1.mp4', poster: '/images/dc-thermes/temoignage-1.webp', label: 'Entre amies aux thermes' },
    { src: '/videos/dc-thermes/temoignages/video2.mp4', poster: '/images/dc-thermes/temoignage-2.webp', label: 'Une journée de soins' },
    { src: '/videos/dc-thermes/temoignages/video3.mp4', poster: '/images/dc-thermes/temoignage-3.webp', label: 'Sauna et bain' },
    { src: '/videos/dc-thermes/temoignages/video4.mp4', poster: '/images/dc-thermes/temoignage-4.webp', label: 'L’enveloppement' },
    { src: '/videos/dc-thermes/temoignages/video5.mp4', poster: '/images/dc-thermes/temoignage-5.webp', label: 'Le bain au magnésium' },
  ],
  ratings: <Rating[]>[
    { platform: 'Tripadvisor', logo: '/images/dc-thermes/logos/tripadvisor.svg', score: '4,8', scale: '/5', count: '1 236 avis', url: reviewLinks.tripadvisor },
    { platform: 'Booking.com', logo: '/images/dc-thermes/logos/booking.svg', score: '8,2', scale: '/10', count: '473 avis', url: reviewLinks.booking, wide: true },
    { platform: 'Hotels.com', logo: '/images/dc-thermes/logos/hotelsdotcom.svg', score: '9,2', scale: '/10', count: '57 avis', url: reviewLinks.hotels },
    { platform: 'Kayak', logo: '/images/dc-thermes/logos/kayak.png', score: '8,2', scale: '/10', count: '776 avis', url: reviewLinks.kayak, wide: true, color: true },
  ],
  awards: [
    { img: '/images/dc-thermes/logos/badge-tripadvisor-2025.webp', alt: 'Tripadvisor Travellers’ Choice Awards 2025' },
    { img: '/images/dc-thermes/logos/badge-kayak-awards.webp', alt: 'Kayak Travel Awards, lauréat' },
  ],
  note: 'Notes publiques du Dakhla Club Hotel & Spa, qui abrite les thermes.',
}

export const band = {
  figures: [
    [32, '°C', 'Eau thermale, toute l’année'],
    [570, 'm²', 'De thermes sous la verrière'],
    [10, '', 'Curistes au plus par session'],
  ],
  text: 'Dix places, pour que les soins s’enchaînent sans attente et que les thermes restent silencieux.',
}

export const programmes: Record<CureKey, ProgrammeDay[]> = {
  vitalite: [
    ['Se poser', ['hammamDesert', 'tonique']],
    ['Relâcher', ['sauna', 'hydro', 'algues', 'affusion']],
    ['Repartir', ['argan', 'hyalu', 'cupDos']],
  ],
  regeneration: [
    ['Se poser', ['jet', 'froid', 'hammam1001', 'relaxant']],
    ['Relâcher', ['jet', 'hydro', 'algues', 'affusion']],
    ['Rééquilibrer', ['jet', 'pieds', 'kite']],
    ['Alléger', ['sauna', 'gommageSel', 'massageSel']],
    ['Repartir', ['pochons', 'silicium', 'cupFeu']],
  ],
  renaissance: [
    ['Se poser', ['jet', 'hammam1001', 'relaxant']],
    ['Relâcher', ['jet', 'hydro', 'algues', 'affusion']],
    ['Rééquilibrer', ['jet', 'kite']],
    ['Alléger', ['gommageSel', 'massageSel']],
    ['Nourrir', ['jet', 'pochons']],
    ['Réveiller', ['froid', 'sauna', 'pieds', 'argan']],
    ['Repartir', ['spiruline', 'cupFeu']],
  ],
}

export const programme = {
  em: '',
  caps: 'Le parcours de soins',
  sub: 'Une évasion, un voyage dans le temps. Des protocoles qui conjuguent et associent en synergie le rituel du hammam, l’hydrothérapie marine, les soins manuels et esthétiques pour rééquilibrer l’organisme et dénouer les tensions. Un lâcher-prise complet, pour le corps comme pour l’esprit.',
}

export const booking = {
  em: '',
  caps: 'Réserver votre cure',
  sub: 'Plongez dans l’univers de nos cures holistiques et trouvez le parcours qui répond à vos besoins.',
}

export const why = {
  em: '',
  caps: 'Une approche structurée',
  items: [
    ['Une équipe qualifiée', 'Hydrothérapeutes et praticiens expérimentés vous accompagnent du premier au dernier soin.'],
    ['Un lieu d’exception', 'Bassins, hammam et salles de repos, face à la lagune de Dakhla.'],
    ['La mer et la tradition', 'Hydrothérapie marine et rituel du hammam marocain, réunis dans chaque protocole.'],
    ['Dix curistes au maximum', 'Un nombre de places volontairement limité, pour un accompagnement attentif.'],
  ],
}

export const gift = {
  em: '',
  caps: 'Offrir une cure',
  text: 'Offrez à la personne de votre choix quelques jours de soins face à la lagune de Dakhla. Le bon cadeau, accompagné de votre message, lui est envoyé par e-mail ou remis en main propre.',
  validity: 'Valable 12 mois à compter de la date d’achat',
  cta: 'Offrir l’expérience',
}

export const faq: Faq = {
  em: '',
  caps: 'Vos questions',
  // Reprise de la FAQ du site actuel (offer.dakhlaclub.com). Une réponse = une liste de blocs :
  // texte = paragraphe, { ul: [...] } = liste à puces, { ol: [...] } = étapes numérotées.
  items: [
    ['Qu’est-ce qu’une cure au centre holistique du Dakhla Club ?', [
      'Un séjour de trois, cinq ou sept jours, rythmé chaque jour par un protocole de soins associant hydrothérapie marine, rituel du hammam marocain, massages et soins du visage. Le centre se trouve au sein du Dakhla Club Hotel & Spa, à Dakhla, au sud du Maroc, où vous séjournez en pension complète.',
    ]],
    ['Quelle différence entre les cures de 3, 5 et 7 jours ?', [
      // À CONFIRMER : la proposition donne 15 et 27 soins ; les cartes affichent 14 et 29 (voir cures)
      { ul: [
        ['Vitalité · Énergie et éclat :', '3 jours de soins, 4 nuits, 14 soins.'],
        ['Régénération · Force et équilibre :', '5 jours de soins, 6 nuits, 29 soins, autour de l’alternance du chaud et du froid.'],
        ['Renaissance · Sérénité et plénitude :', '7 jours de soins, 8 nuits, 33 soins, pour un ressourcement complet.'],
      ] },
      'Chaque cure se réserve avec ou sans hébergement.',
    ]],
    ['Quels soins sont inclus ?', [
      'L’ensemble des soins du protocole, une séance de bol d’air Jacquier chaque matin et l’accès libre à la piscine, au hammam et aux salles de repos pendant toute la cure. Le détail figure, jour par jour, dans la section consacrée aux soins.',
    ]],
    ['Puis-je faire une cure si je n’ai jamais fait de thalasso ?', [
      'Oui. Nos protocoles conviennent à une première expérience, et l’équipe adapte l’intensité de chaque soin à votre ressenti.',
    ]],
    ['À qui s’adressent nos cures ?', [
      'À toute personne qui souhaite s’accorder une pause : fatigue persistante, sommeil moins réparateur, tensions accumulées, ou simplement l’envie de prendre du temps pour soi. Les soins sont accessibles à partir de 18 ans.',
    ]],
    ['Puis-je séjourner à l’hôtel pendant ma cure ?', [
      'Oui, c’est la formule que nous recommandons. Le centre se trouve au sein du Dakhla Club Hotel & Spa, à cent mètres du rivage. Six hébergements, de la chambre Medina à la villa privée, vous sont proposés en pension complète, avec le transfert depuis l’aéroport de Dakhla. Si vous logez ailleurs, une navette assure chaque jour le trajet.',
    ]],
    ['Comment se déroulent la réservation et le paiement ?', [
      'Vous choisissez votre cure, vos dates et votre formule, puis réglez en ligne, en totalité ou par un acompte de 50 %. La confirmation de réservation vous est adressée par e-mail, et une conseillère vous contacte pour préparer votre arrivée. L’annulation est sans frais jusqu’à 30 jours avant l’arrivée.',
    ]],
    ['Pourquoi le nombre de places est-il limité ?', [
      'Chaque session accueille dix curistes au maximum, afin que chacun bénéficie d’un accompagnement attentif et que le centre conserve son calme. Nous vous conseillons de réserver à l’avance.',
    ]],
    ['Que dois-je prévoir ?', [
      // À CONFIRMER : la proposition ajoutait serviettes et sandales ; la brochure confirme peignoir et chaussons
      'Un maillot de bain suffit : peignoir et chaussons vous sont fournis. Un certificat médical de non-contre-indication est recommandé. Les horaires et l’organisation de votre transfert vous sont communiqués dès la confirmation.',
    ]],
    ['Y a-t-il des contre-indications ?', [
      'Un certificat médical de non-contre-indication est recommandé. Les cures sont déconseillées pendant la grossesse. Signalez-nous tout problème de santé lors de la réservation.',
    ]],
    ['Quelles sont les conditions d’annulation ?', [
      'Annulation sans frais jusqu’à 30 jours avant l’arrivée ; au-delà, l’acompte n’est pas remboursé. Modifications possibles jusqu’à 30 jours avant l’arrivée.',
    ]],
    ['Où se trouve Dakhla et comment s’y rendre ?', [
      'Au sud du Maroc, sur la côte atlantique. Des vols directs relient Dakhla à Casablanca, Rabat, Marrakech, Agadir, Laâyoune, Paris-Orly et Las Palmas, ainsi qu’à Marseille et Madrid d’octobre à mars.',
    ]],
    ['Le transfert depuis l’aéroport est-il inclus ?', [
      'Oui, pour tout séjour à l’hôtel, le transfert aller-retour est offert.',
    ]],
    ['Combien coûte un séjour complet ?', [
      'La cure Vitalité avec 4 nuits en chambre Medina, en pension complète, revient à 8 902 MAD par personne en chambre double (basse saison 2026). La brochure détaille tous les tarifs.',
    ]],
  ],
  contact: 'Une question avant de réserver ? Notre équipe vous aide à choisir la cure, les dates et l’hébergement.',
}

// Langue, formats et textes d'interface (boutons, libellés, textes alternatifs)
export const lang: Lang = 'fr'
export const locale: string = 'fr-FR'

export const meta = {
  title: 'Cure bien-être à Dakhla, Maroc | DC Luxury Thermes',
  description: 'Découvrez DC Luxury Thermes à Dakhla, au Maroc : cures holistiques de 3, 5 ou 7 jours, soins marins, hammam marocain et séjour en pension complète.',
  ogTitle: 'DC Luxury Thermes · Centre holistique à Dakhla, Maroc',
  ogDescription: 'Face à la lagune de Dakhla, des cures de 3, 5 ou 7 jours au rythme des soins marins, des massages et du rituel du hammam marocain.',
  canonical: 'https://offer.dakhlaclub.com/dc-thermes',
  ogLocale: 'fr_FR',
  bookingTitle: 'Réserver votre cure · DC Luxury Thermes',
}

export const ui = {
  skip: 'Aller aux cures',
  navLabel: 'Sections',
  home: 'Haut de page',
  logoAlt: 'DC Luxury Thermes',
  book: 'Réserver',
  switchLabel: 'English',
  switchShort: 'EN',
  switchHref: '/dc-thermes/en',
  heroAlt: 'La piscine thermale de DC Luxury Thermes, sous la verrière, entre les arches de pierre',
  scrollNext: 'Défiler vers la suite',
  days: 'jours',
  daysShort: 'j',
  perPerson: 'par personne',
  included: 'Ce qui est inclus',
  lodging: 'Cure seule ou séjour en pension complète',
  compareLabel: 'Les trois cures en un coup d’œil',
  mobileNav: [['cures', 'Cures'], ['programme', 'Soins'], ['questions', 'Questions']],
  treatments: 'soins',
  hoursOf: 'de soins',
  reserve: (() => 'Réserver cette cure') as (name: string) => string,
  seeProgramme: 'Découvrir le programme',
  introAlt: 'Les arches de pierre et la piscine thermale de DC Luxury Thermes',
  filmLabel: 'Film : une journée de soins à DC Luxury Thermes',
  giftAlt: 'Une curiste en peignoir DC, assise au bord de la piscine thermale',
  byEmail: 'Envoi par e-mail ou WhatsApp',
  writeUs: 'Écrire sur WhatsApp',
  call: 'Appeler le',
  footerTag: 'DC Luxury Thermes, centre holistique du Dakhla Club Hotel & Spa · Dakhla, Maroc',
  footerNav: 'Navigation',
  footerCures: 'Les cures',
  footerContact: 'Contact',
  footerPay: 'Paiement sécurisé',
  footerFollow: 'Nous suivre',
  brochure: 'Télécharger la brochure',
  copyright: '© 2026 DC Luxury Thermes · Dakhla Club Hotel & Spa',
  terms: 'Conditions générales de vente',
  termsUrl: 'https://offer.dakhlaclub.com/fr/legal/cgv',
  privacy: 'Politique de confidentialité',
  privacyUrl: 'https://offer.dakhlaclub.com/fr/legal/privacy',
  cookies: 'Politique de cookies',
  cookiesUrl: 'https://offer.dakhlaclub.com/fr/legal/cookies',
  from: 'Dès',
  // Programme
  chooseCure: 'Choisir une cure',
  day: (n: number) => `Jour ${n}`,
  ready: 'Prêt(e) ?',
  endText: (c: Cure) => `${c.days} jours, ${c.treatments} soins, et le temps de ne rien faire entre deux.`,
  hoursShort: 'h de soins',
  // Composeur et réservation
  cure: 'La cure',
  firstDay: 'Premier jour de soins',
  guests: 'Participants',
  lodgingField: 'Hébergement',
  person: (n: number) => `${n} ${n > 1 ? 'personnes' : 'personne'}`,
  guestCount: (n: number) => `${n} ${n > 1 ? 'curistes' : 'curiste'}`,
  lessGuest: 'Un participant de moins',
  moreGuest: 'Un participant de plus',
  payment: 'Paiement',
  full: 'Règlement intégral',
  fullMeta: 'Tout est réglé aujourd’hui',
  deposit: 'Acompte de 50 %',
  depositMeta: 'Le solde se règle aux thermes, à l’arrivée',
  roomTitle: 'Séjourner au Dakhla Club Hotel & Spa · pension complète, transfert aéroport offert',
  roomOn: 'Arrivée la veille du premier soin, à partir de 15 h. Notre chauffeur vous accueille à l’aéroport de Dakhla.',
  roomOff: 'Sans hébergement, une navette assure chaque jour le trajet entre Dakhla et les thermes.',
  arrival: 'Arrivée',
  firstTreatment: 'Premier soin',
  lastTreatment: 'Dernier soin',
  dates: 'Dates',
  pickDay: 'Choisissez votre premier jour',
  total: 'Total de la cure',
  depositLine: 'Acompte de 50 %',
  fee: 'Frais de paiement CMI (2,97 %)',
  due: 'À régler aujourd’hui',
  balance: 'Solde aux thermes, à l’arrivée',
  ctaDeposit: 'Réserver avec un acompte de 50 %',
  ctaFull: 'Réserver et régler la totalité',
  departure: 'Départ de l’hôtel',
  packRow: (n: number) => `Cure et hébergement en pension complète, ${n} nuits`,
  packPrice: 'Prix sur Direct-Book',
  packNote: 'Le prix du pack, cure et chambre comprises, s’affiche à l’étape suivante selon la chambre choisie. Si aucune chambre n’est libre à ces dates, Direct-Book vous l’indique : choisissez un autre premier jour, ou réservez la cure seule.',
  packCta: 'Choisir ma chambre et voir le prix',
  packTicketNote: 'Votre hébergement est réservé en même temps que votre cure, sur Direct-Book, le site officiel du Dakhla Club · Confirmation de réservation par e-mail',
  ticketNote: 'Paiement sécurisé CMI · Confirmation de réservation par e-mail · Annulation sans frais jusqu’à 30 jours avant l’arrivée',
  // Avis
  reviewsLabel: 'Avis de nos hôtes',
  reviewN: (n: number, total: number) => `Avis ${n} sur ${total}`,
  tripadvisorReview: 'avis Tripadvisor',
  translated: '',
  scoreAria: (r: Rating) => `${r.platform} : ${r.score}${r.scale}, ${r.count}. Lire les avis (nouvel onglet)`,
  watch: (label: string) => `Regarder : ${label}`,
  closeVideo: 'Fermer la vidéo',
  quoteOpen: '« ',
  quoteClose: ' »',
  carousel: 'carrousel',
}

// Page « Offrir une cure »
export const giftPage = {
  title: 'Offrir une cure · DC Luxury Thermes',
  back: 'Retour aux cures',
  help: `Une question ? ${site.phone}`,
  em: '',
  caps: 'Offrir une cure',
  intro: 'Offrez quelques jours de soins face à la lagune de Dakhla. Choisissez la cure, ajoutez votre message : nous préparons le bon cadeau.',
  steps: ['Composez le bon', 'Envoyez la demande', 'Réglez et recevez le bon'],
  stepsLabel: 'Étapes',
  cureGroup: 'La cure offerte',
  guests: 'Nombre de personnes',
  forGroup: 'Pour qui ?',
  roomTitle: 'Ajouter l’hébergement au Dakhla Club',
  roomOn: (n: number) => `${n} nuits, de la veille du premier soin au dernier jour. Le tarif de la chambre vous est communiqué avec le règlement.`,
  roomOff: 'Sans hébergement, la personne loge où elle le souhaite : une navette la conduit chaque jour aux thermes.',
  voucherRoom: (n: number) => `Hébergement inclus · ${n} nuits au Dakhla Club`,
  roomRow: (n: number) => `Hébergement · ${n} nuits`,
  onQuote: 'Sur devis',
  valueCure: 'Valeur de la cure',
  recipient: 'Son prénom',
  recipientPh: 'Sarah',
  occasion: 'L’occasion',
  occasions: ['Anniversaire', 'Fête des mères', 'Mariage', 'Naissance', 'Remerciement', 'Simplement'],
  otherOccasion: 'Autre…',
  otherOccasionLabel: 'Précisez l’occasion',
  otherOccasionPh: 'Ex. : départ à la retraite, Saint-Valentin…',
  message: 'Vos mots, imprimés sur le bon',
  messagePh: 'Pour t’offrir enfin un temps rien qu’à toi…',
  deliveryGroup: 'Envoi du bon',
  delivery: [
    ['moi', 'À moi', 'Je l’offre en main propre'],
    ['destinataire', 'Directement à la personne', 'Par e-mail, à la date de votre choix'],
  ],
  recipientEmail: 'Son e-mail',
  sendDate: 'Date d’envoi',
  details: 'Vos coordonnées',
  sendMail: 'Envoyer ma demande',
  sendWhatsapp: 'Envoyer par WhatsApp',
  or: 'ou',
  note: 'Aucun paiement à cette étape. Notre équipe vous recontacte sous 24 heures pour le règlement sécurisé, puis vous envoie le bon.', // À CONFIRMER : délai
  sentTitle: 'Merci, votre demande est prête',
  sentText: 'Votre messagerie s’est ouverte avec la demande rédigée : il ne reste qu’à l’envoyer. Notre équipe vous recontacte sous 24 heures.',
  sentWhatsapp: 'WhatsApp s’est ouvert avec votre demande déjà rédigée : il ne reste qu’à l’envoyer. Notre équipe vous répond sous 24 heures.',
  sentPosted: 'Votre demande nous est bien parvenue. Notre équipe vous recontacte sous 24 heures pour finaliser le bon.',
  sentFallback: (mail: string) => `Rien ne s’est ouvert ? Écrivez-nous à ${mail}, ou envoyez la demande par WhatsApp.`,
  edit: 'Modifier la demande',
  preview: 'Aperçu du bon',
  voucher: 'Bon cadeau',
  forLabel: 'Pour',
  fromLabel: 'De la part de',
  someone: 'une personne chère',
  you: 'vous',
  value: 'Valeur du bon',
  persons: (n: number) => `${n} ${n > 1 ? 'personnes' : 'personne'}`,
  trust: ['Un bon cadeau élégant, à imprimer ou à envoyer', 'Valable 12 mois, aux dates choisies par la personne', 'Hébergement et navette possibles en complément'],
  // Texte de la demande envoyée à l'équipe
  mail: {
    subject: 'Bon cadeau DC Luxury Thermes',
    hello: 'Bonjour, je souhaite offrir une cure DC Luxury Thermes.',
    cure: 'Cure',
    for: 'Pour',
    occasion: 'Occasion',
    room: 'Hébergement',
    roomYes: (n: number) => `oui, ${n} nuits au Dakhla Club (merci de me communiquer le tarif)`,
    roomNo: 'non, la cure seule',
    message: 'Message sur le bon',
    delivery: 'Envoi',
    toMe: 'à moi, je l’offre en main propre',
    toThem: (email: string, date: string) => `directement à ${email}${date ? `, le ${date}` : ''}`,
    from: 'De la part de',
    thanks: 'Merci de me recontacter pour le règlement.',
  },
}

// Page de réservation
export const bookingPage = {
  back: 'Retour aux cures',
  help: `Une question ? ${site.phone}`,
  em: '',
  caps: 'Dernière étape',
  intro: 'Renseignez vos coordonnées, puis réglez sur la plateforme sécurisée CMI. Votre place est réservée dès le paiement.',
  introPack: 'Avec une chambre, la réservation se termine sur Direct-Book, le site de l’hôtel : vous y choisissez la chambre, voyez le prix du pack et les disponibilités, puis réglez en ligne.',
  steps: ['Vos coordonnées', 'Paiement sécurisé', 'Confirmation'],
  stepsLabel: 'Étapes',
  yourCure: 'Votre cure',
  roomTitle: 'Je séjourne au Dakhla Club Hotel & Spa',
  roomOn: 'Arrivée la veille à partir de 15 h, pension complète, transfert aéroport offert.',
  roomOff: 'Une navette vous conduit chaque jour de Dakhla aux thermes.',
  details: 'Vos coordonnées',
  firstName: 'Prénom',
  lastName: 'Nom',
  email: 'E-mail',
  emailPh: 'pour recevoir votre confirmation',
  phone: 'Téléphone',
  dial: 'Indicatif du pays',
  phoneLabel: 'Numéro de téléphone',
  phonePh: '6 12 34 56 78',
  note: 'Un souhait, une contre-indication à nous signaler ?',
  optional: 'Facultatif',
  notePh: 'Grossesse, problème de dos, heure d’arrivée…',
  cgv: ['J’ai lu et j’accepte les ', 'conditions générales de vente', '.'],
  offers: 'Je souhaite recevoir les actualités de DC Luxury Thermes et du Dakhla Club Hotel & Spa.',
  pay: (amount: string) => `Payer ${amount}`,
  sending: 'Redirection vers le paiement…',
  secure: 'Paiement sécurisé CMI. Vous êtes redirigé(e) vers la plateforme officielle CMI. Vos données bancaires ne transitent jamais par notre site.',
  summary: 'Récapitulatif',
  access: 'cure et accès aux thermes',
  times: (price: string, n: number) => `${price} × ${n}`,
  trust: ['Confirmation immédiate par e-mail', 'Une conseillère vous appelle avant votre arrivée', 'Dix curistes au maximum par session', 'Annulation sans frais jusqu’à 30 jours avant l’arrivée'],
  dialCodes: [['+212', 'Maroc'], ['+33', 'France'], ['+34', 'Espagne'], ['+1', 'États-Unis, Canada'], ['+44', 'Royaume-Uni'], ['+49', 'Allemagne'], ['+39', 'Italie'], ['+32', 'Belgique'], ['+31', 'Pays-Bas'], ['+966', 'Arabie saoudite'], ['+971', 'Émirats arabes unis']],
}

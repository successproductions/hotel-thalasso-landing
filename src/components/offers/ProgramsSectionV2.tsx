'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ReservationPopup from '@/components/offers/ReservationPopup';

interface ServiceItem {
  title: string;
}

export function ProgramsSectionV2() {
  const t = useTranslations();
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'fr';
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Content for both languages
  const content = {
    fr: {
      sectionTitle: 'Nos Programmes Thalasso',
      learnMore: 'En savoir plus',
      seeLess: 'Voir moins',
      forYouIfTitle: 'CE PROGRAMME EST POUR VOUS SI :',
      benefitsTitle: 'BIENFAITS :',
      detailsTitle: 'DÉTAILS DU PROGRAMME :',
      offers: [
        {
          id: 'offer3',
          title: 'THALASSO VITALITÉ 3 JOURS',
          subtitle: 'On Relâche',
          description: 'Une parenthèse courte, mais profondément régénérante<br/>Trois jours pour ralentir le rythme, relâcher les tensions et laisser le corps retrouver son équilibre naturel<br/>Ici, rien à performer, rien à optimiser simplement s\'abandonner à un enchaînement de soins marins, de repos guidé et de rituels conçus pour apaiser le système nerveux et relancer l\'énergie en douceur',
          image: '/images/offer-3/dji2.jpg',
          programTitle: 'PROGRAMME THALASSO VITALITÉ:',
          programDays: 'Programme 3 jours',
          intro: [
            'Ce programme est fait pour vous si vous vous sentez fatigué(e), physiquement et mentalement, même après le repos, si votre sommeil manque de profondeur ou de régularité, si votre système nerveux est constamment sollicité, ou si vous ressentez le besoin réel de ralentir et de récupérer, sans pression ni contrainte',
          ],
          forYouIf: [
            'vous vous sentez fatigué(e), physiquement et mentalement, même après le repos',
            'votre sommeil manque de profondeur ou de régularité',
            'votre système nerveux est constamment sollicité',
            'vous ressentez le besoin réel de ralentir et de récupérer, sans pression ni contrainte',
          ],
          benefits: [
            'un relâchement progressif des tensions',
            'un apaisement durable du système nerveux',
            'une respiration plus calme, plus fluide',
            'une énergie plus stable, plus disponible',
          ],
          translationKey: 'servicesTable',
          reserveButton: 'Je m’accorde cette pause maintenant',
        },
        {
          id: 'offer5',
          title: 'THALASSO RÉGÉNÉRATION 5 JOURS',
          subtitle: 'On Rééquilibre',
          description: 'Une cure progressive et structurée, pensée pour relâcher en profondeur et permettre au corps comme à l\'esprit de se rééquilibrer durablement <br/><br/>Ici, on ne cherche pas la performance ni l\'intensité On laisse le rythme ralentir. Le corps relâche. Le système nerveux redescend<br/><br/>Les soins marins et sensoriels accompagnent ce mouvement naturel. La circulation se relance. Les tensions s\'estompent L\'esprit devient plus clair',
          image: '/images/offer-3/dji12.jpg',
          programTitle: 'PROGRAMME THALASSO RÉGÉNÉRATION:',
          programDays: 'Programme 5 jours',
          intro: [
            'Une approche thalasso structurée et cohérente : Thérapeutes certifiés et attentifs, environnement naturel qui favorise le lâcher-prise, synergie entre soins marins modernes et rituels essentiels, enchaînement conçu selon une logique physiologique et émotionnelle',
            'Pourquoi ce format de 5 jours ? Parce que le corps a besoin de temps. Assez pour ralentir. Assez pour relâcher. Assez pour laisser les bénéfices s\'installer au-delà du séjour',
          ],
          forYouIf: [
            'Vous ressentez une fatigue physique et mentale persistante, même après le repos',
            'Votre sommeil manque de profondeur ou de régularité',
            'Vous avez l\'impression que votre système nerveux est constamment sollicité',
            'Les tensions s\'accumulent, sans jamais vraiment se libérer',
            'Vous ressentez un besoin réel de ralentir, de récupérer, sans contrainte',
          ],
          benefits: [
            'Un apaisement durable, qui ne disparaît pas au retour',
            'Une sensation de relâchement profond, physique et mental',
            'Un sommeil plus stable et plus réparateur',
            'Un corps plus fluide, moins tendu',
            'Une énergie plus calme, plus régulière',
            'Une impression de reset intérieur, sans effort',
          ],
          translationKey: 'offer5.servicesTable5',
          reserveButton: 'Je commence mon reset profond',
        },
        {
          id: 'offer7',
          title: 'THALASSO RENAISSANCE 7 JOURS',
          subtitle: 'On Détoxifie & On Libère',
          description: 'Une immersion complète pour restaurer le corps en profondeur Ici, on ne fait pas une pause On remet les compteurs à zéro<br/><br/>Jour après jour, les soins nettoient, drainent et réoxygènent les tissus. Le système interne se rééquilibre. L\'énergie revient, stable, durable. Le corps retrouve sa capacité naturelle à se régénérer L\'esprit se libère du bruit de fond',
          image: '/images/offer-3/dji7.jpg',
          programTitle: 'PROGRAMME REVITALISATION COMPLÈTE:',
          programDays: 'Programme 7 jours',
          intro: [
            'Ce programme s\'adresse à celles et ceux qui ne veulent plus "tenir", mais retrouver un fonctionnement optimal, à l\'intérieur comme à l\'extérieur',
            'Sur 6 jours, le corps entre dans un cycle complet de détoxification, de relance métabolique et de récupération profonde. Les soins agissent en synergie pour alléger la charge physique, clarifier les fonctions internes et restaurer une énergie vitale stable',
            'Ici, on ne stimule pas artificiellement. On répare, nettoie et relance',
          ],
          forYouIf: [
            'Vous vous sentez épuisé malgré le repos',
            'Vous ressentez une lourdeur physique ou interne persistante',
            'Votre corps a besoin d\'un nettoyage en profondeur',
            'Vous cherchez une régénération réelle, pas un simple bien-être temporaire',
            'Vous souhaitez renforcer votre terrain et votre vitalité globale',
          ],
          benefits: [
            'Un corps plus léger',
            'Une digestion plus fluide',
            'Une énergie plus constante',
            'Une sensation de clarté et de renouveau durable, qui continue d\'agir bien après le séjour',
            'Vous ne repartez pas "reposée". Vous repartez réinitialisée',
          ],
          translationKey: 'offer7.servicesTable7',
          reserveButton: 'Je m’offre une vraie renaissance',
        },
      ],
    },
    en: {
      sectionTitle: 'Our Thalasso Programs',
      learnMore: 'Learn more',
      seeLess: 'See less',
      forYouIfTitle: 'THIS PROGRAM IS FOR YOU IF:',
      benefitsTitle: 'BENEFITS:',
      detailsTitle: 'PROGRAM DETAILS:',
      offers: [
        {
          id: 'offer3',
          title: 'ESCAPE 3 NIGHTS',
          subtitle: 'Release & Relax',
          description: 'A 3-night escape to disconnect, breathe, and be reborn. <br/>The body begins to settle. <br/>The nervous system slows down. <br/>Breathing calms',
          image: '/images/offer-3/dji2.jpg',
          programTitle: 'RELAXATION & WELLNESS PROGRAM:',
          programDays: '3-Day Program',
          intro: [
            'Is your daily life marked by a hectic pace, a flood of responsibilities and challenges, leaving little room for relaxation? This intense lifestyle negatively impacts your mental and physical health, your performance and your overall well-being',
            'We have designed a program especially for you: the Relaxation and Wellness Program. You can disconnect, release pressure and find deep serenity through proven holistic therapies and personalized treatments',
            'Guided by a team of wellness experts, each step of your stay will be adapted to your specific needs',
          ],
          forYouIf: [
            'You have a stressful lifestyle',
            'You suffer from anxiety',
            'You struggle to create a healthy and balanced routine',
            'You want to learn how to manage your stress',
            'You want to relax and enjoy soothing therapies',
          ],
          benefits: [
            'Feel peace in your body and mind',
            'Experience a feeling of lightness and vitality',
            'Discover emotional and mental balance',
            'Improve your concentration and mental clarity',
            'Reconnect with yourself',
          ],
          translationKey: 'servicesTable',
          reserveButton: 'Book this offer',
        },
        {
          id: 'offer5',
          title: 'ESCAPE 5 NIGHTS',
          subtitle: 'Rebalance',
          description: 'A powerful and progressive cure, designed for a deep reset. <br/>Marine and sensory treatments restart circulation. <br/>Muscle tensions dissolve. <br/>The mind becomes clearer.',
          image: '/images/THERMALE.png',
          programTitle: 'DISCOVERY & RENAISSANCE PROGRAM:',
          programDays: '5-Day Program',
          intro: [
            'Ready to embark on a transformative journey of self-discovery? Our Discovery program is designed for those who want to explore the full spectrum of wellness experiences.',
            'This comprehensive program introduces you to various therapeutic modalities, from traditional thalassotherapy to modern wellness techniques.',
            'Our team of experts will guide you through each experience, helping you discover what resonates most with your body and mind.',
          ],
          forYouIf: [
            'You are curious about holistic wellness',
            'You want to try different therapeutic approaches',
            'You are looking for a complete introduction to wellness',
            'You are open to new experiences',
            'You want to find your ideal wellness routine',
          ],
          benefits: [
            'Discover new wellness modalities',
            'Awaken dormant senses',
            'Find personalized wellness approaches',
            'Build a foundation for ongoing self-care',
            'Gain confidence in your wellness journey',
          ],
          translationKey: 'offer5.servicesTable5',
          reserveButton: 'Book this offer',
        },
        {
          id: 'offer7',
          title: 'ESCAPE 7 NIGHTS',
          subtitle: 'Detox & Release',
          description: 'The complete experience for total body and mind regeneration. <br/>Treatments cleanse, drain and re-oxygenate tissues. <br/>Energy gradually returns. <br/>The body breathes. The mind lightens.',
          image: '/images/offer-3/dji7.jpg',
          programTitle: 'COMPLETE REVITALIZATION PROGRAM:',
          programDays: '7-Day Program',
          intro: [
            'Do you feel exhausted, drained of your energy? The Revitalization program is specially designed to restore your vital energy and bring you back to your optimal state.',
            'This intensive but caring program combines powerful regenerative treatments with restorative practices.',
            'Leave feeling renewed, recharged and ready to face life with vigor and enthusiasm.',
          ],
          forYouIf: [
            'You want to eliminate toxins from your body',
            'You feel heavy and need purification',
            'You are looking for deep cleansing and renewal',
            'You want to strengthen your immune system',
          ],
          benefits: [
            'Complete body detoxification',
            'Skin rejuvenation and glow',
            'Improved digestion and metabolism',
            'Feeling of lightness and renewal',
          ],
          translationKey: 'offer7.servicesTable7',
          reserveButton: 'Book this offer',
        },
      ],
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;
  const offers = currentContent.offers;

  // Service descriptions for the program details table
  const serviceDescriptions: Record<string, string> = {
    // Common services across all programs
    "Bol d'air Jacquier": 'Oxygénation naturelle des cellules par inhalation de principes actifs de résine de pin. Facilite la récupération musculaire, réduit le stress et améliore la concentration et le sommeil.',
    'Piscine thermale': 'Bain en eau de mer chauffée à 32°C pour la détente musculaire et l\'activation de la circulation.',
    'Sauna': 'Chaleur sèche pour éliminer les toxines, purifier la peau et favoriser la relaxation profonde.',
    'Bain hydromassant': 'Hydromassage multi-jets avec chromothérapie pour détendre les muscles et apaiser le système nerveux.',
    'Enveloppement algue': 'Enveloppement aux algues marines riches en minéraux pour détoxifier, reminéraliser et raffermir la peau.',
    'Modelage douche affusion': 'Massage sous une pluie d\'eau thermale pour une détente profonde et une relaxation sensorielle.',
    'Modelage affusion': 'Massage sous affusion d\'eau thermale pour une relaxation optimale et une détente sensorielle complète.',
    'Douche à jet': 'Massage par pression d\'eau pour stimuler la circulation, drainer les toxines et tonifier les tissus.',
    'Bain magnésium': 'Bain enrichi en magnésium marin pour une relaxation musculaire profonde et un apaisement du système nerveux.',
    'cupping therapie': 'Thérapie par ventouses pour détoxifier, relancer la circulation et relâcher les tensions profondes.',
    'hammam secret du desert': 'Rituel de hammam traditionnel du désert avec vapeur, gommage et relaxation dans une ambiance orientale.',
    'Massage relaxant': 'Massage complet du corps aux huiles essentielles pour une relaxation profonde et un lâcher-prise total.',
    'Massage Tonique': 'Massage dynamisant et tonifiant pour réveiller le corps, stimuler la circulation et relancer l\'énergie vitale.',
    'Massage Visage': 'Soin du visage relaxant et rajeunissant pour détendre les traits, stimuler la circulation et illuminer le teint.',
    
    // Yoga & Wellness activities
    'Yoga': 'Séance de yoga adaptée pour renforcer la conscience corporelle, améliorer la souplesse et calmer l\'esprit.',
    'Yoga stretching': 'Séance de yoga axée sur les étirements pour assouplir le corps, libérer les tensions et favoriser la circulation énergétique.',
    'streching': 'Séance d\'étirements guidés pour assouplir les muscles, améliorer la mobilité et prévenir les tensions.',
    'sport coaching class': 'Séance de coaching sportif personnalisé pour renforcer le corps, améliorer la condition physique et booster l\'énergie.',
    'coaching sport class': 'Cours de sport en groupe pour dynamiser le corps, renforcer la vitalité et favoriser la cohésion.',
    'marche meditative marine': 'Marche méditative au bord de l\'océan pour se reconnecter à la nature, apaiser l\'esprit et ancrer le corps.',
    
    // Himalayan salt treatments
    'scrub detox sel hymalaly': 'Gommage détoxifiant au sel rose de l\'Himalaya pour exfolier, purifier et reminéraliser la peau en profondeur.',
    'massage detox sel himalaya': 'Massage aux cristaux de sel de l\'Himalaya pour drainer les toxines, stimuler la circulation et revitaliser le corps.',
    
    // Massage treatments
    'Massage Traditionnel Relaxant': 'Massage complet aux techniques ancestrales pour un relâchement musculaire profond et un rééquilibrage énergétique.',
    
    // Facial & beauty treatments
    'Soin lissant detoxifiant spiruline': 'Soin visage détoxifiant à la spiruline pour purifier, oxygéner et illuminer la peau.',
    
    // Cupping therapies
    'Cupping therapie serviette de feu': 'Technique avancée de cupping combinée à des serviettes chaudes pour une détoxification intense et un relâchement profond.',
    'cupping thérapie classique et serviette de feu': 'Combinaison de cupping traditionnel et de serviettes chaudes pour une détoxification maximale et un relâchement complet.',
    
    // Hammam experiences
    'Hamam mille et une nuit': 'Expérience hammam orientale complète avec vapeur, gommage au savon noir et relaxation dans une ambiance des mille et une nuits.',
    
    // Baths
    'Bain algue': 'Bain thermal enrichi aux algues marines pour une reminéralisation profonde et une revitalisation cellulaire.',
    'ice bath': 'Immersion en eau froide pour stimuler la circulation, renforcer le système immunitaire et favoriser la récupération musculaire.',
  };

  // Function to get services with their session counts from translations
  const getServicesForOffer = (translationKey: string) => {
    try {
      const services = t.raw(`${translationKey}.services`) as ServiceItem[];
      const availability = t.raw(`${translationKey}.availability`) as Record<string, number[]>;

      if (!services || !availability) return [];

      return services.map((service) => {
        const sessions = availability[service.title];
        const totalSessions = sessions ? sessions.reduce((sum: number, val: number) => sum + val, 0) : 0;
        return {
          name: service.title,
          description: serviceDescriptions[service.title] || '',
          sessions: totalSessions,
        };
      }).filter(s => s.sessions > 0);
    } catch {
      return [];
    }
  };

  // Background slide variants
  const bgVariant = (fromLeft: boolean) => ({
    hidden: { x: fromLeft ? '-100%' : '100%' },
    show: {
      x: '0%',
      transition: { duration: 3, ease: 'easeOut' },
    },
  });

  return (
    <>
    <section id="services" className="overflow-hidden">
      {/* Header Section */}
      <div className="mx-auto max-w-6xl px-4 py-1 md:text-center md:py-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.42, 0, 0.58, 1] } },
          }}
        >
          <h2 className="mb-4 text-[23px] font-normal uppercase text-gray-800 md:text-4xl">
            Nos Programmes Thalasso
          </h2>
        </motion.div>
      </div>

      {/* Offer Programs - Alternating Layout */}
      {offers.map((offer, i) => {
        const fromLeft = i % 2 === 0;
        const isOdd = i % 2 === 1;
        const isExpanded = expandedOffer === offer.id;

        return (
          <div key={offer.id}>
            {/* Offer Card */}
            <div className="relative py-2 md:py-6 xl:py-8">
              {/* full-width, pale-green bg sliding in */}
              <motion.div
                className="absolute inset-x-0 inset-y-0 bg-[#faf9f5]"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={bgVariant(fromLeft) as Variants}
              />

              {/* content sits above the bg */}
              <div
                className={`relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-4 ${
                  isOdd ? 'md:grid-flow-col-dense md:grid-cols-2' : 'md:grid-cols-2'
                } `}
              >
                {/* Image */}
                <div className={`-mx-4 md:mx-0 ${isOdd ? 'md:col-start-2' : ''} relative`}>
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    width={600}
                    height={400}
                    className="h-64 w-full rounded-none object-cover shadow-lg md:h-[34rem]"
                  />
                  
                  {/* Reserve Button - Mobile Only - Overlapping Image */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center md:hidden" style={{ transform: 'translateY(50%)' }}>
                    <button
                      onClick={() => setIsPopupOpen(true)}
                      className="flex items-center justify-center gap-2 bg-white border border-gray-950 px-8 py-3 text-base font-medium text-gray-950 shadow-lg transition-all duration-300 hover:text-white hover:bg-gray-950"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {offer.reserveButton}
                    </button>
                  </div>
                </div>

                {/* Text */}
                <motion.div
                  className={`${isOdd ? 'md:col-start-1' : ''} mt-8 md:mt-0`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                    },
                  }}
                >
                  <div className="mb-2">
                    <span className="text-[23px] md:text-3xl font-medium uppercase tracking-wide text-teal-950">
                      {offer.title}
                    </span>
                  </div>

                  {/* <h3 className="mb-2 text-2xl font-normal text-gray-900 md:text-3xl">
                    {offer.subtitle.toUpperCase()}
                  </h3> */}

                  <p
                    className="mb-6 leading-relaxed text-[16px] font-extralight text-gray-700"
                    dangerouslySetInnerHTML={{ __html: offer.description }}
                  />

                  {/* Learn More Button */}
                  <button
                    onClick={() => setExpandedOffer(isExpanded ? null : offer.id)}
                    className="inline-flex items-center gap-2 border border-gray-900 px-6 py-2 text-[16px] md:text-lg font-medium text-gray-800 transition-all duration-300 hover:bg-gray-950  hover:text-white"
                  >
                    {isExpanded ? currentContent.seeLess : currentContent.learnMore}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Expanded Content - Matching the reference design */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden bg-white"
                >
                  <div className="mx-auto max-w-6xl px-6 py-4 md:px-4 font-extralight ">
                    {/* Program Title */}
                    <h3 className="mb-8 text-lg font-normal tracking-wide text-black md:text-2xl">
                      {offer.programTitle}
                    </h3>

                    {/* Intro Paragraphs */}
                    <div className="mb-10 space-y-6">
                      {offer.intro.map((paragraph, idx) => (
                        <p key={idx} className="text-[15px] md:text-[16px] leading-relaxed text-gray-700">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* CE PROGRAMME EST POUR VOUS SI */}
                    <div className="mb-10">
                      <h4 className="mb-6 text-lg font-normal tracking-wide text-black">
                        {currentContent.forYouIfTitle}
                      </h4>
                      <ul className="space-y-3 pl-4">
                        {offer.forYouIf.map((item, idx) => (
                          <li key={idx} className="flex items-start text-[15px] md:text-[16px] text-gray-700">
                            <span className="mr-4 text-gray-400">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* BIENFAITS */}
                    <div className="mb-12">
                      <h4 className="mb-6 text-lg font-normal tracking-wide text-black">
                        {currentContent.benefitsTitle}
                      </h4>
                      <ul className="space-y-3 pl-4">
                        {offer.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start text-[15px] md:text-[16px] text-gray-700">
                            <span className="mr-4 text-gray-400">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* DÉTAILS DU PROGRAMME */}
                    <div>
                      <h4 className="mb-8 text-lg font-normal tracking-wide text-black">
                        {currentContent.detailsTitle}
                      </h4>

                      {/* Table Container */}
                      <div className="border border-gray-200">
                        {/* Table Header with Logo left and Title right */}
                        <div className="flex items-center justify-between border-b-2 px-4 py-4 md:px-6 md:py-6">
                          <Image
                            src="/images/LogoDakhla.png"
                            alt="Dakhla Club Logo"
                            width={60}
                            height={45}
                            className="object-contain md:w-[80px] md:h-[60px]"
                          />
                          <h5 className="text-base font-light text-[#010a17] md:text-2xl" style={{ fontFamily: 'serif' }}>
                            {offer.programDays}
                          </h5>
                        </div>

                        {/* Table Rows - Two boxes layout */}
                        <div className="divide-y divide-gray-200">
                          {getServicesForOffer(offer.translationKey).map((row, idx) => (
                            <div
                              key={idx}
                              className="flex border-l-4 border-gray-100"
                            >
                              {/* Left box - Service info */}
                              <div className="flex-1 border-r border-gray-200 px-6 py-5">
                                <h6 className="font-semibold text-[#010a17] text-[15px] md:text-[16px]">
                                  {row.name}
                                </h6>
                                {row.description && (
                                  <p className="mt-1 text-[13px] md:text-[14px] italic text-gray-500 leading-relaxed">
                                    {row.description}
                                  </p>
                                )}
                              </div>
                              {/* Right box - Session count */}
                              <div className="flex w-24 items-center justify-center">
                                <span className="text-lg text-gray-700">{row.sessions}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Reserve Button */}
                    <div className="mt-10 text-center">
                      <button
                        onClick={() => setIsPopupOpen(true)}
                        className="inline-flex items-center gap-2 bg-gray-950 px-8 py-3 text-sm md:text-lg font-medium rounded-sm text-white transition-all duration-300 hover:bg-gray-900"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {offer.reserveButton}
                      </button>
                    
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </section>

      {/* Reservation Popup */}
      <ReservationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}

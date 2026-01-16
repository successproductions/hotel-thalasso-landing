'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ReservationPopup from '@/components/offers/ReservationPopup';

interface ServiceItem {
  title: string;
}

interface OfferData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  programTitle: string;
  programDays: string;
  intro: string[];
  forYouIf: string[];
  benefits: string[];
  translationKey: string;
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
      reserveButton: 'Réserver cette offre',
      offers: [
        {
          id: 'offer3',
          title: 'ÉVASION 3 NUITS',
          subtitle: 'On Relâche',
          description: 'Une parenthèse de 3 nuits pour déconnecter, respirer, renaître. <br/>Le corps commence à se déposer. <br/>Le système nerveux ralentit. <br/>La respiration s\'apaise.',
          image: '/images/offer-3/dji2.jpg',
          programTitle: 'PROGRAMME DE RELAXATION ET DÉTENTE:',
          programDays: 'Programme 3 jours',
          intro: [
            'Votre quotidien est marqué par un rythme effréné, un flot de responsabilités et de défis, laissant peu de place à la détente ? Ce mode de vie intense impacte négativement votre santé mentale et physique, vos performances et votre bien-être général.',
            'Nous avons conçu un programme spécialement pour vous : le Programme Relaxation et Détente. Vous pouvez vous déconnecter, relâcher la pression et trouver une sérénité profonde grâce à des thérapies holistiques éprouvées et des soins personnalisés.',
            'Guidé par une équipe d\'experts en bien-être, chaque étape de votre séjour sera adaptée à vos besoins spécifiques.',
          ],
          forYouIf: [
            'Vous avez un mode de vie stressant.',
            'Vous souffrez d\'anxiété.',
            'Vous avez du mal à créer une routine saine et équilibrée.',
            'Vous voulez apprendre à gérer votre stress.',
            'Vous souhaitez vous détendre et profiter de thérapies apaisantes.',
          ],
          benefits: [
            'Ressentir la paix dans votre corps et votre esprit.',
            'Expérimenter un sentiment de légèreté et de vitalité.',
            'Découvrir l\'équilibre émotionnel et mental.',
            'Améliorer votre concentration et votre clarté mentale.',
            'Vous reconnecter avec vous-même.',
          ],
          translationKey: 'servicesTable',
        },
        {
          id: 'offer5',
          title: 'ÉVASION 5 NUITS',
          subtitle: 'On Rééquilibre',
          description: 'Une cure puissante et progressive, conçue pour un reset profond. <br/>Les soins marins et sensoriels relancent la circulation. <br/>Les tensions musculaires se dissolvent. <br/>L\'esprit devient plus clair.',
          image: '/images/THERMALE.png',
          programTitle: 'PROGRAMME DÉCOUVERTE ET RENAISSANCE:',
          programDays: 'Programme 5 jours',
          intro: [
            'Prêt à vous lancer dans un voyage transformateur de découverte de soi ? Notre programme Découverte est conçu pour ceux qui veulent explorer tout le spectre des expériences de bien-être.',
            'Ce programme complet vous initie à diverses modalités thérapeutiques, de la thalassothérapie traditionnelle aux techniques de bien-être modernes.',
            'Notre équipe d\'experts vous guidera à travers chaque expérience, vous aidant à découvrir ce qui résonne le plus avec votre corps et votre esprit.',
          ],
          forYouIf: [
            'Vous êtes curieux du bien-être holistique.',
            'Vous voulez essayer différentes approches thérapeutiques.',
            'Vous cherchez une introduction complète au bien-être.',
            'Vous êtes ouvert aux nouvelles expériences.',
            'Vous voulez trouver votre routine de bien-être idéale.',
          ],
          benefits: [
            'Découvrir de nouvelles modalités de bien-être.',
            'Éveiller des sens endormis.',
            'Trouver des approches de bien-être personnalisées.',
            'Bâtir une base pour un auto-soin continu.',
            'Gagner en confiance dans votre parcours de bien-être.',
          ],
          translationKey: 'offer5.servicesTable5',
        },
        {
          id: 'offer7',
          title: 'ÉVASION 7 NUITS',
          subtitle: 'On Détoxifie & On Libère',
          description: 'L\'expérience complète pour une régénération totale corps et esprit. <br/>Les soins nettoient, drainent et réoxygènent les tissus. <br/>L\'énergie revient progressivement. <br/>Le corps respire. L\'esprit s\'allège.',
          image: '/images/offer-3/dji7.jpg',
          programTitle: 'PROGRAMME REVITALISATION COMPLÈTE:',
          programDays: 'Programme 7 jours',
          intro: [
            'Vous vous sentez épuisé, vidé de votre énergie ? Le programme Revitalisation est spécialement conçu pour restaurer votre énergie vitale et vous ramener à votre état optimal.',
            'Ce programme intensif mais bienveillant combine des traitements régénératifs puissants avec des pratiques restauratrices.',
            'Repartez en vous sentant renouvelé, rechargé et prêt à affronter la vie avec vigueur et enthousiasme.',
          ],
          forYouIf: [
            'Vous voulez éliminer les toxines de votre corps.',
            'Vous vous sentez lourd et avez besoin de purification.',
            'Vous cherchez un nettoyage et un renouvellement profonds.',
            'Vous voulez renforcer votre système immunitaire.',
          ],
          benefits: [
            'Détoxification complète du corps.',
            'Rajeunissement et éclat de la peau.',
            'Amélioration de la digestion et du métabolisme.',
            'Sensation de légèreté et de renouveau.',
          ],
          translationKey: 'offer7.servicesTable7',
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
      reserveButton: 'Book this offer',
      offers: [
        {
          id: 'offer3',
          title: 'ESCAPE 3 NIGHTS',
          subtitle: 'Release & Relax',
          description: 'A 3-night escape to disconnect, breathe, and be reborn. <br/>The body begins to settle. <br/>The nervous system slows down. <br/>Breathing calms.',
          image: '/images/offer-3/dji2.jpg',
          programTitle: 'RELAXATION & WELLNESS PROGRAM:',
          programDays: '3-Day Program',
          intro: [
            'Is your daily life marked by a hectic pace, a flood of responsibilities and challenges, leaving little room for relaxation? This intense lifestyle negatively impacts your mental and physical health, your performance and your overall well-being.',
            'We have designed a program especially for you: the Relaxation and Wellness Program. You can disconnect, release pressure and find deep serenity through proven holistic therapies and personalized treatments.',
            'Guided by a team of wellness experts, each step of your stay will be adapted to your specific needs.',
          ],
          forYouIf: [
            'You have a stressful lifestyle.',
            'You suffer from anxiety.',
            'You struggle to create a healthy and balanced routine.',
            'You want to learn how to manage your stress.',
            'You want to relax and enjoy soothing therapies.',
          ],
          benefits: [
            'Feel peace in your body and mind.',
            'Experience a feeling of lightness and vitality.',
            'Discover emotional and mental balance.',
            'Improve your concentration and mental clarity.',
            'Reconnect with yourself.',
          ],
          translationKey: 'servicesTable',
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
            'You are curious about holistic wellness.',
            'You want to try different therapeutic approaches.',
            'You are looking for a complete introduction to wellness.',
            'You are open to new experiences.',
            'You want to find your ideal wellness routine.',
          ],
          benefits: [
            'Discover new wellness modalities.',
            'Awaken dormant senses.',
            'Find personalized wellness approaches.',
            'Build a foundation for ongoing self-care.',
            'Gain confidence in your wellness journey.',
          ],
          translationKey: 'offer5.servicesTable5',
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
            'You want to eliminate toxins from your body.',
            'You feel heavy and need purification.',
            'You are looking for deep cleansing and renewal.',
            'You want to strengthen your immune system.',
          ],
          benefits: [
            'Complete body detoxification.',
            'Skin rejuvenation and glow.',
            'Improved digestion and metabolism.',
            'Feeling of lightness and renewal.',
          ],
          translationKey: 'offer7.servicesTable7',
        },
      ],
    },
  };

  const currentContent = locale === 'en' ? content.en : content.fr;
  const offers = currentContent.offers;

  // Service descriptions for the program details table
  const serviceDescriptions: Record<string, string> = {
    // Offer 3
    'Accueil personnalisé': 'Prise en charge personnalisée dès votre arrivée.',
    'Infusion détox': 'Boisson détoxifiante aux plantes naturelles.',
    'Installation bungalow vue nature/océan': 'Hébergement confortable avec vue exceptionnelle.',
    "Bol d'Air Jacquier": 'Oxygénation naturelle des cellules par inhalation de principes actifs de résine de pin. Facilite la récupération musculaire, réduit le stress et améliore la concentration et le sommeil.',
    'Piscine thermale': 'Bain en eau de mer chauffée pour la détente musculaire.',
    'ICE BATH ou Sauna': 'Thérapie par contraste de température pour la circulation.',
    'Bain magnésium': 'Absorption minérale pour une relaxation profonde.',
    'Hammam': 'Bain de vapeur traditionnel pour la détoxification.',
    'Massage tonique': 'Massage énergisant pour relancer la circulation.',
    'Douche à jet': 'Massage par pression d\'eau pour améliorer la circulation.',
    'Enveloppement algue': 'Enveloppement aux algues marines pour détoxifier le corps.',
    'Bain sel minéraux': 'Bain reminéralisant pour la santé cellulaire.',
    'Massage relaxant': 'Massage complet du corps pour la relaxation.',
    'Modelage douche affusion': 'Massage sous affusion d\'eau pour une détente profonde.',
    'Cupping Thérapie Classique': 'Technique traditionnelle de détoxification par ventouses.',
    // Offer 5
    "Infusion d'ancrage": 'Boisson aux plantes pour recentrer corps et esprit.',
    'Bungalow vue nature/océan': 'Hébergement premium avec vue panoramique.',
    "Bol d'air Jacquier": 'Oxygénation cellulaire par principes actifs de pin.',
    'Ice Bath ou sauna': 'Thérapie thermique pour stimuler la circulation.',
    'Hamam mille et une nuit': 'Expérience hammam traditionnelle orientale.',
    'Massage Traditionnel tonique': 'Massage énergisant aux techniques ancestrales.',
    'Massage visage': 'Soin du visage relaxant et rajeunissant.',
    'Bain hydromassant': 'Hydromassage multi-jets avec chromothérapie.',
    'Modelage sous affusion': 'Massage sous eau pour une relaxation optimale.',
    'Scrub detox sel Himalaya': 'Gommage détoxifiant au sel de l\'Himalaya.',
    'Bain sel Hymalaya': 'Bain reminéralisant aux sels de l\'Himalaya.',
    'Massage sel Himalaya': 'Massage aux cristaux de sel pour purifier le corps.',
    'Sauna': 'Séance de sauna pour éliminer les toxines.',
    'Manicure Pédicure': 'Soins des mains et des pieds.',
    'Massage pochon': 'Massage aux pochons chauds d\'herbes aromatiques.',
    'Cupping thérapie serviette de feu': 'Technique avancée de cupping avec chaleur.',
    'Rituel de clôture': 'Cérémonie de fermeture pour ancrer les bienfaits.',
    'Conseils d\'intégration': 'Recommandations personnalisées pour le quotidien.',
    'Carnet bien-être à emporter': 'Guide pratique pour continuer chez vous.',
    // Offer 7
    'Hammam mille et une nuit': 'Expérience hammam orientale complète.',
    'Modelage affusion': 'Massage sous eau thermale.',
    'Massage Tonique': 'Massage dynamisant pour réveiller le corps.',
    'Massage Visage': 'Soin visage anti-âge relaxant.',
    'Massage pierre chaude': 'Massage aux pierres volcaniques chaudes.',
    'Soin de visage': 'Traitement facial complet personnalisé.',
    'Manucure': 'Soin des ongles et des mains.',
    'Pédicure': 'Soin des pieds et des ongles.',
    'Scrub sel Himalaya': 'Exfoliation purifiante au sel rose.',
    'Bain Sel Himalaya': 'Immersion reminéralisante aux sels purs.',
    'Rituel de fermeture': 'Cérémonie finale pour sceller les bienfaits.',
    'Carnet bien-être': 'Guide personnalisé à emporter.',
    'Départ en conscience': 'Accompagnement pour un retour serein.',
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
          <h2 className="mb-4 text-[27px] font-normal uppercase text-gray-800 md:text-4xl">
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
                <div className={`-mx-4 md:mx-0 ${isOdd ? 'md:col-start-2' : ''}`}>
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    width={600}
                    height={400}
                    className="h-64 w-full rounded-none object-cover shadow-lg md:h-[34rem]"
                  />
                </div>

                {/* Text */}
                <motion.div
                  className={isOdd ? 'md:col-start-1' : ''}
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
                    <span className="text-sm md:text-3xl font-medium uppercase tracking-wide text-teal-950">
                      {offer.title}
                    </span>
                  </div>

                  {/* <h3 className="mb-2 text-2xl font-normal text-gray-900 md:text-3xl">
                    {offer.subtitle.toUpperCase()}
                  </h3> */}

                  <p
                    className="mb-6 leading-relaxed text-[18px] font-extralight text-gray-700"
                    dangerouslySetInnerHTML={{ __html: offer.description }}
                  />

                  {/* Learn More Button */}
                  <button
                    onClick={() => setExpandedOffer(isExpanded ? null : offer.id)}
                    className="inline-flex items-center gap-2 border border-gray-900 px-6 py-2 text-sm font-medium text-gray-800 transition-all duration-300 hover:bg-[#d6bb8e] hover:border-[#d6bb8e] hover:text-white"
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
                    <h3 className="mb-8 text-xl font-normal tracking-wide text-black md:text-2xl">
                      {offer.programTitle}
                    </h3>

                    {/* Intro Paragraphs */}
                    <div className="mb-10 space-y-6">
                      {offer.intro.map((paragraph, idx) => (
                        <p key={idx} className="text-[15px] md:text-[18px] leading-relaxed text-gray-700">
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
                          <li key={idx} className="flex items-start text-[15px] md:text-[18px] text-gray-700">
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
                          <li key={idx} className="flex items-start text-[15px] md:text-[18px] text-gray-700">
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
                        className="inline-flex items-center gap-2 bg-[#d6bb8e] px-8 py-3 text-sm md:text-lg font-medium rounded-sm text-white transition-all duration-300 hover:bg-[#139584]"
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
                        {currentContent.reserveButton}
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

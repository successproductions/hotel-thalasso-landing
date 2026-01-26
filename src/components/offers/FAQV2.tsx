'use client';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import Script from 'next/script';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSectionV2() {
  const t = useTranslations('faq');
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'fr';

  const content = {
    fr: {
      title: 'FAQ',
      contact: {
        alt: 'centre thalasso Dakhla'
      },
      items: [
        {
          question: "Qu'est-ce qu'un séjour thalasso au Dakhla Club ?",
          answer: "Un séjour thalasso au Dakhla Club est une expérience de bien-être structurée qui utilise les bienfaits de l'eau de mer, des soins marins et de l'hydrothérapie pour réduire le stress, améliorer le sommeil et relancer l'énergie.\n\nContrairement à un simple spa, nos programmes sont organisés sur plusieurs jours afin de permettre au corps de lâcher progressivement les tensions et de retrouver un meilleur équilibre physique et mental.\n\n Choisissez la durée qui correspond à votre besoin et poursuivez votre réservation."
        },
        {
          question: "Quelle est la différence entre les séjours Thalasso 3, 5 et 7 jours ?",
          answer: "Chaque programme correspond à un niveau de profondeur différent :\n\n• Thalasso VITALITÉ – 3 jours\nPour relâcher rapidement le stress, améliorer le sommeil et retrouver de l'énergie.\n\n• Thalasso RÉGÉNÉRATION – 5 jours\nPour une récupération plus profonde, une meilleure régulation du système nerveux et une vraie sensation de repos durable.\n\n• Thalasso RENAISSANCE – 7 jours\nPour une transformation complète : corps, mental et rythme de vie.\n\n Sélectionnez votre programme selon le temps dont vous disposez et votre objectif."
        },
        {
          question: "Quels soins sont inclus dans les programmes thalasso ?",
          answer: "Les programmes combinent différents soins de thalassothérapie et d'hydrothérapie, tels que :\n\n• soins marins\n• bains et douches thérapeutiques\n• enveloppements\n• massages ciblés\n• accès aux installations bien-être (piscine, hammam, espaces de repos)\n\nLes soins sont organisés pour respecter votre rythme, sans surcharge, afin de favoriser une récupération naturelle.\n\n Le détail du programme est communiqué lors de la confirmation de votre séjour."
        },
        {
          question: "Ce séjour est-il adapté si je n'ai jamais fait de thalasso ou de cure bien-être ?",
          answer: "Oui, parfaitement.\nNos séjours sont conçus pour être accessibles, même si c'est votre première expérience en thalasso.\n\nL'accompagnement est progressif, les soins sont adaptés et notre équipe reste disponible pour vous guider tout au long de votre séjour.\n\n Aucune condition physique particulière n'est requise."
        },
        {
          question: "À qui s'adresse ce séjour thalasso ?",
          answer: "Ce séjour s'adresse aux personnes qui :\n\n• ressentent du stress ou de la fatigue\n• dorment mal ou récupèrent difficilement\n• ont besoin de faire une pause physique et mentale\n• souhaitent prendre soin d'elles dans un cadre calme et structuré\n\nIl convient aussi bien aux actifs qu'aux personnes en période de transition ou de repos.\n\n Il n'est pas nécessaire d'avoir un problème médical pour en bénéficier."
        },
        {
          question: "Où vais-je loger pendant mon séjour thalasso à Dakhla ?",
          answer: "Le séjour thalasso est proposé en lien avec le Dakhla Club Hotel & Spa.\n\nAprès la réservation de votre programme, notre équipe vous accompagne pour réserver votre hébergement afin d'assurer une organisation fluide entre les soins et les temps de repos.\n\n L'hébergement est réservé séparément."
        },
        {
          question: "Comment se déroule la réservation et le paiement ?",
          answer: "La réservation se fait en plusieurs étapes simples :\n\n1. Choix du programme (3, 5 ou 7 jours)\n2. Paiement sécurisé en ligne\n3. Confirmation de votre séjour\n4. Contact de notre équipe pour préparer votre arrivée\n\nLe paiement est 100 % sécurisé et votre réservation est confirmée immédiatement."
        },
        {
          question: "Pourquoi le nombre de places est-il limité ?",
          answer: "Pour préserver la qualité des soins et garantir un accompagnement personnalisé, le nombre de participants est volontairement limité par session.\n\nCela permet de maintenir une atmosphère calme, fluide et respectueuse du rythme de chacun.\n\n Nous recommandons de réserver à l'avance."
        },
        {
          question: "Que dois-je prévoir avant mon arrivée à Dakhla ?",
          answer: "Une fois votre réservation confirmée, notre équipe vous communiquera toutes les informations utiles (tenue, horaires, organisation du séjour).\n\nDe manière générale, il est recommandé de prévoir :\n\n• des vêtements confortables\n• un maillot de bain\n• une envie de lâcher prise 🙂"
        },
        {
          question: "Puis-je contacter quelqu'un si j'ai une question avant de réserver ?",
          answer: "Bien sûr.\nNotre équipe est disponible pour répondre à vos questions et vous accompagner dans le choix du programme le plus adapté à vos besoins.\n\n Contactez-nous directement ou poursuivez votre réservation en ligne."
        }
      ]
    },
    en: {
      title: 'FAQ',
      contact: {
        alt: 'Dakhla thalasso center'
      },
      items: [
        {
          question: "What is a thalasso stay at Dakhla Club?",
          answer: "A thalasso stay at Dakhla Club is a structured wellness experience that uses the benefits of seawater, marine treatments and hydrotherapy to reduce stress, improve sleep and boost energy.\n\nUnlike a simple spa, our programs are organized over several days to allow the body to gradually release tension and regain better physical and mental balance.\n\n Choose the duration that suits your needs and continue with your booking."
        },
        {
          question: "What is the difference between 3, 5 and 7-day Thalasso stays?",
          answer: "Each program corresponds to a different level of depth:\n\n• VITALITY Thalasso – 3 days\nTo quickly release stress, improve sleep and regain energy.\n\n• REGENERATION Thalasso – 5 days\nFor deeper recovery, better nervous system regulation and a real sense of lasting rest.\n\n• RENAISSANCE Thalasso – 7 days\nFor complete transformation: body, mind and lifestyle.\n\n Select your program according to your available time and objective."
        },
        {
          question: "What treatments are included in the thalasso programs?",
          answer: "The programs combine different thalassotherapy and hydrotherapy treatments, such as:\n\n• marine treatments\n• therapeutic baths and showers\n• wraps\n• targeted massages\n• access to wellness facilities (pool, hammam, rest areas)\n\nTreatments are organized to respect your rhythm, without overload, to promote natural recovery.\n\n Program details are provided upon confirmation of your stay."
        },
        {
          question: "Is this stay suitable if I have never done thalasso or wellness treatment?",
          answer: "Yes, perfectly.\nOur stays are designed to be accessible, even if this is your first thalasso experience.\n\nThe support is progressive, treatments are adapted and our team remains available to guide you throughout your stay.\n\n No specific physical condition is required."
        },
        {
          question: "Who is this thalasso stay for?",
          answer: "This stay is for people who:\n\n• feel stress or fatigue\n• sleep poorly or recover with difficulty\n• need a physical and mental break\n• want to take care of themselves in a calm and structured setting\n\nIt suits both active people and those in transition or rest periods.\n\n It is not necessary to have a medical problem to benefit."
        },
        {
          question: "Where will I stay during my thalasso stay in Dakhla?",
          answer: "The thalasso stay is offered in connection with the Dakhla Club Hotel & Spa.\n\nAfter booking your program, our team will help you book your accommodation to ensure smooth organization between treatments and rest times.\n\n Accommodation is booked separately."
        },
        {
          question: "How does booking and payment work?",
          answer: "Booking is done in several simple steps:\n\n1. Choice of program (3, 5 or 7 days)\n2. Secure online payment\n3. Confirmation of your stay\n4. Contact from our team to prepare your arrival\n\nPayment is 100% secure and your booking is confirmed immediately."
        },
        {
          question: "Why is the number of places limited?",
          answer: "To preserve the quality of treatments and guarantee personalized support, the number of participants is deliberately limited per session.\n\nThis maintains a calm, fluid atmosphere that respects everyone's rhythm.\n\n We recommend booking in advance."
        },
        {
          question: "What should I plan before arriving in Dakhla?",
          answer: "Once your booking is confirmed, our team will provide you with all useful information (attire, schedules, stay organization).\n\nIn general, it is recommended to bring:\n\n• comfortable clothing\n• a swimsuit\n• a desire to let go 🙂"
        },
        {
          question: "Can I contact someone if I have a question before booking?",
          answer: "Of course.\nOur team is available to answer your questions and help you choose the program best suited to your needs.\n\n Contact us directly or continue your booking online."
        }
      ]
    }
  };

  const { contact, items } = content[locale as 'fr' | 'en'] || content.fr;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };

  // Background slide animation (same as ProgramsSection)
  const bgVariant: Variants = {
    hidden: { x: '-100%' },
    show: {
      x: '0%',
      transition: { duration: 3, ease: 'easeOut' },
    },
  };

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item: FAQItem) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <>
      {/* SEO: FAQPage Schema JSON-LD */}
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section id="faq" className="overflow-hidden">
      {/* Animated Background */}
      <div className="relative py-12 md:pt-14 md:pb-20">
        {/* Full-width pale background sliding in from left (same as ProgramsSection) */}
        <motion.div
          className="absolute inset-x-0 inset-y-0 bg-[#faf9f5]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={bgVariant}
        />

        {/* Content sits above the background */}
        <motion.div
          className="relative z-10 mx-auto max-w-6xl md:px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Header Section - Only on mobile */}
          <motion.div className="mb-5 px-6 text-center lg:hidden" variants={itemVariants}>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="mb-4 text-5xl font-normal tracking-tight text-slate-800 dark:text-slate-100 md:text-5xl">
                {t('title')}
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-slate-800 dark:bg-slate-100"></div>
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid items-start gap-6 md:gap-6 lg:grid-cols-5">
            {/* Image Section - Left Side */}
            <motion.div className="lg:col-span-2" variants={imageVariants}>
              <div className="lg:sticky lg:top-8">
                <motion.div
                  className="group relative h-full"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute -inset-4 rotate-3 transform rounded-3xl "></div>
                  <div className="relative h-64 overflow-hidden rounded-sm shadow-2xl lg:w-full lg:h-[500px] xl:h-[820px]">
                    <Image
                      src="/images/centrethalassoDakhla.jpg"
                      alt={contact.alt}
                      fill
                      className="contrast-110 object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* FAQ Section - Right Side */}
            <motion.div className="px-6 md:px-0 lg:col-span-3" variants={itemVariants}>
              {/* Header Section - Only on desktop */}
              <motion.div className="mb-8 hidden text-center lg:block" variants={itemVariants}>
                <motion.div
                  className="inline-block"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <h2 className="mb-4 text-5xl font-normal tracking-tight text-slate-800 dark:text-slate-100">
                    {t('title')}
                  </h2>
                  <div className="mx-auto h-1 w-24 rounded-full bg-slate-800 dark:bg-slate-100"></div>
                </motion.div>
              </motion.div>

              <div className="space-y-3">
                {items.map((item: FAQItem, index: number) => (
                  <motion.div key={index} variants={itemVariants} className="group">
                    <Accordion
                      type="single"
                      collapsible
                      value={openItem}
                      onValueChange={setOpenItem}
                    >
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <motion.div
                          className="overflow-hidden rounded-sm border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                          whileHover={{
                            boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
                            y: -2,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <AccordionTrigger className="px-6 py-4 text-left font-medium text-slate-800 transition-colors duration-200 dark:text-slate-100 dark:hover:bg-slate-600">
                            <div className="flex w-full items-center justify-between dark:hover:bg-slate-600">
                              <span className="pr-4 text-base md:text-lg">{item.question}</span>
                              <motion.div
                                animate={{
                                  rotate: openItem === `item-${index}` ? 45 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0"
                              ></motion.div>
                            </div>
                          </AccordionTrigger>

                          {/* SEO Fix: Answer always in HTML, visually hidden when collapsed */}
                          <div 
                            className="overflow-hidden transition-all duration-300 ease-in-out"
                            style={{
                              maxHeight: openItem === `item-${index}` ? '1000px' : '0',
                              opacity: openItem === `item-${index}` ? 1 : 0
                            }}
                          >
                            <div className="px-6 pb-5">
                              <div className="leading-relaxed text-slate-600 dark:text-slate-300">
                                <div className="border-t border-slate-100 pt-2 whitespace-pre-line">{item.answer}</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AccordionItem>
                    </Accordion>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
}

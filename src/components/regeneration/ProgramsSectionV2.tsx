'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export function ProgramsSectionV2() {
  const locale = useLocale();

  // Content for both languages organized by days
  const content = {
    fr: {
      headerTitle: 'Programme Thalasso Régénération 5 Jours',
      soinsLabel: 'Soins inclus :',
      objectifLabel: 'Objectif :',
      days: [
        {
          dayNumber: 1,
          title: 'JOUR 1',
          subtitle: 'ON RELÂCHE',
          description: 'Le corps commence à se poser. Le système nerveux ralentit. La respiration se calme.',
          services: [
            "Bol d'air Jacquier",
            "Douche à jet",
            "Piscine thermale",
            "Ice bath",
            "Hammam mille et une nuit",
            "Massage relaxant"
          ],
          objectif: 'Relâchement initial, apaisement du système nerveux.'
        },
        {
          dayNumber: 2,
          title: 'JOUR 2',
          subtitle: 'ON RÉÉQUILIBRE',
          description: 'Les soins marins et sensoriels relancent la circulation. Les tensions musculaires se dissolvent. L\'esprit devient plus clair.',
          services: [
            "Bol d'air Jacquier",
            "Piscine thermale",
            "Douche à jet",
            "Bain hydromassant",
            "Enveloppement algue",
            "Modelage affusion"
          ],
          objectif: 'Harmonisation intérieure, rééquilibrage profond.'
        },
        {
          dayNumber: 3,
          title: 'JOUR 3',
          subtitle: 'ON PURIFIE',
          description: 'Le corps entre dans une phase de nettoyage. Les soins détox éliminent les toxines accumulées. L\'énergie commence à circuler plus librement.',
          services: [
            "Bol d'air Jacquier",
            "Piscine thermale",
            "Douche à jet",
            "Pédicure",
            "Massage After kite"
          ],
          objectif: 'Détoxification active, purification en profondeur.'
        },
        {
          dayNumber: 4,
          title: 'JOUR 4',
          subtitle: 'ON RÉGÉNÈRE',
          description: 'Les tissus se régénèrent. Le corps se reconstruit de l\'intérieur. La vitalité se réinstalle progressivement.',
          services: [
            "Bol d'air Jacquier",
            "Piscine thermale",
            "Sauna",
            "Scrub detox sel Himalaya",
            "Massage detox sel Himalaya"
          ],
          objectif: 'Régénération cellulaire, relance métabolique.'
        },
        {
          dayNumber: 5,
          title: 'JOUR 5',
          subtitle: 'ON RECHARGE',
          description: 'L\'énergie revient, stable et durable. Le corps retrouve sa capacité naturelle à se régénérer. Vous repartez rééquilibré(e), réinitialisé(e).',
          services: [
            "Bol d'air Jacquier",
            "Piscine thermale",
            "Massage pouchons",
            "Soin raffirmissant siliciuam lift",
            "Cupping + serviette de feu"
          ],
          objectif: 'Vitalité durable, reset complet.'
        }
      ],
    },
    en: {
      headerTitle: 'Thalasso Regeneration Program 5 Days',
      soinsLabel: 'Included treatments:',
      objectifLabel: 'Objective:',
      days: [
        {
          dayNumber: 1,
          title: 'DAY 1',
          subtitle: 'RELEASE',
          description: 'The body begins to settle. The nervous system slows down. Breathing calms.',
          services: [
            "Bol d'air Jacquier",
            "Jet shower",
            "Thermal pool",
            "Ice bath",
            "Hammam Arabian Nights",
            "Relaxing massage"
          ],
          objectif: 'Initial release, nervous system soothing.'
        },
        {
          dayNumber: 2,
          title: 'DAY 2',
          subtitle: 'REBALANCE',
          description: 'Marine and sensory treatments boost circulation. Muscle tensions dissolve. The mind becomes clearer.',
          services: [
            "Bol d'air Jacquier",
            "Thermal pool",
            "Jet shower",
            "Hydromassage bath",
            "Seaweed wrap",
            "Affusion shower massage"
          ],
          objectif: 'Inner harmonization, deep rebalancing.'
        },
        {
          dayNumber: 3,
          title: 'DAY 3',
          subtitle: 'PURIFY',
          description: 'The body enters a cleansing phase. Detox treatments eliminate accumulated toxins. Energy begins to flow more freely.',
          services: [
            "Bol d'air Jacquier",
            "Thermal pool",
            "Jet shower",
            "Pedicure",
            "Massage After kite"
          ],
          objectif: 'Active detoxification, deep purification.'
        },
        {
          dayNumber: 4,
          title: 'DAY 4',
          subtitle: 'REGENERATE',
          description: 'Tissues regenerate. The body rebuilds from within. Vitality gradually returns.',
          services: [
            "Bol d'air Jacquier",
            "Thermal pool",
            "Sauna",
            "Himalayan salt detox scrub",
            "Himalayan salt detox massage"
          ],
          objectif: 'Cellular regeneration, metabolic boost.'
        },
        {
          dayNumber: 5,
          title: 'DAY 5',
          subtitle: 'RECHARGE',
          description: 'Energy returns, stable and lasting. The body regains its natural ability to regenerate. You leave rebalanced, reset.',
          services: [
            "Bol d'air Jacquier",
            "Thermal pool",
            "Hot poultice massage",
            "Silicium lift firming treatment",
            "Cupping + fire towel"
          ],
          objectif: 'Lasting vitality, complete reset.'
        }
      ],
    },
  };

  const currentContent = content[locale as keyof typeof content] || content.fr;

  const dayImages = [
    '/images/offer-5/DSC08186.jpg',
    '/images/offer-5/DSC09716.jpg',
    '/images/offer-5/DSC09732.jpg',
    '/images/offer-5/DSC09719.jpg',
    '/images/offer-5/DSC07579.JPG',
  ];

  const programs = currentContent.days.map((day, index) => ({
    ...day,
    image: dayImages[index],
  }));

  // Background slide variants
  const bgVariant = (fromLeft: boolean) => ({
    hidden: { x: fromLeft ? '-100%' : '100%' },
    show: {
      x: '0%',
      transition: { duration: 3, ease: 'easeOut' },
    },
  });

  return (
    <section id="services" className="overflow-hidden">
      {/* Header Section */}
      <div className="mx-auto max-w-6xl px-4 py-1 text-center md:py-8">
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
            {currentContent.headerTitle}
          </h2>
        </motion.div>
      </div>

      {/* Program Content */}
      {programs.map((program, i) => {
        const fromLeft = i % 2 === 0;
        const isOdd = i % 2 === 1;

        return (
          <div key={i} className="relative py-2 md:py-6 xl:py-8">
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
              className={`relative z-10 md:mx-auto grid max-w-6xl items-center gap-8 md:px-4 ${
                isOdd ? 'md:grid-flow-col-dense md:grid-cols-2' : 'md:grid-cols-2'
              } `}
            >
              {/* Image */}
              <div className={isOdd ? 'md:col-start-2' : ''}>
                <Image
                  src={program.image}
                  alt={program.title}
                  width={800}
                  height={500}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  priority={i === 0}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2Y1ZjVmNSIvPjwvc3ZnPg=="
                  className="w-full object-cover shadow-lg md:h-[500px]"
                />
              </div>

              {/* Text */}
              <motion.div
                className={isOdd ? 'md:col-start-1 px-4' : 'px-4'}
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
                  <span className="text-sm font-semibold uppercase tracking-wide text-gray-800">
                    {program.title}
                  </span>
                </div>

                <h3 className="mb-4 text-[28px] font-normal text-gray-800 md:text-[32px]">
                  {program.subtitle}
                </h3>

                <p 
                  className="mb-6 text-[16px] font-extralight leading-relaxed text-gray-700 md:text-lg"
                  dangerouslySetInnerHTML={{ __html: program.description.replace(/\n/g, '<br/>') }}
                />

                {/* Services */}
                <div className="mb-6">
                  <h5 className="mb-3 text-[18px] font-semibold text-gray-800 md:text-xl">
                    {currentContent.soinsLabel}
                  </h5>
                  <ul className="list-disc space-y-2 pl-5">
                    {program.services.map((service: string, idx: number) => (
                      <li key={idx} className="text-[16px] font-extralight text-gray-700 md:text-lg">
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Objectif */}
                <div className="mb-6">
                  <h5 className="mb-3 text-[18px] font-semibold text-gray-800 md:text-xl">
                    {currentContent.objectifLabel}
                  </h5>
                  <p className="text-[16px] font-light italic text-gray-700 md:text-lg">
                    {program.objectif}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

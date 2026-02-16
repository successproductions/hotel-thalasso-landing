'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useLocale } from 'next-intl';

export function ProgramsSectionV2() {
  const locale = useLocale();

  // Content for both languages organized by days
  const content = {
    fr: {
      headerTitle: 'Programme Thalasso Renaissance 7 Jours',
      soinsLabel: 'Soins inclus :',
      objectifLabel: 'Objectif :',
      days: [
        {
          dayNumber: 1,
          title: 'JOUR 1',
          subtitle: 'ON SE POSE',
          description: 'Le corps commence à se déposer. Le système nerveux ralentit. La respiration s\'apaise. On entre dans le processus.',
          services: [
            "Sport coaching class",
            "Douche à jet",
            "Piscine thermale",
            "Hammam mille et une nuit"
          ],
          objectif: 'Décompression immédiate, sortie du mode "alerte".'
        },
        {
          dayNumber: 2,
          title: 'JOUR 2',
          subtitle: 'ON RELÂCHE',
          description: 'Les tensions profondes commencent à se libérer. Le corps retrouve sa mobilité. L\'esprit s\'allège.',
          services: [
            "Yoga",
            "Bol d'air Jacquier",
            "Bain hydromassant",
            "Enveloppement algue"
          ],
          objectif: 'Relâchement musculaire profond, libération des tensions.'
        },
        {
          dayNumber: 3,
          title: 'JOUR 3',
          subtitle: 'ON RÉÉQUILIBRE',
          description: 'Les soins marins et sensoriels relancent la circulation. Les tensions musculaires se dissolvent. L\'esprit devient plus clair.',
          services: [
            "Yoga",
            "Bol d'air Jacquier",
            "Modelage affusion",
            "Sauna",
            "Massage traditionnel relaxant"
          ],
          objectif: 'Harmonisation intérieure, rééquilibrage profond.'
        },
        {
          dayNumber: 4,
          title: 'JOUR 4',
          subtitle: 'ON DÉTOXIFIE',
          description: 'Les soins nettoient, drainent et réoxygènent les tissus. L\'énergie revient progressivement. Le corps respire. L\'esprit s\'allège.',
          services: [
            "Scrub detox sel Himalaya",
            "Massage detox sel Himalaya",
            "Piscine thermale",
            "Sauna"
          ],
          objectif: 'Détoxification active, purification en profondeur.'
        },
        {
          dayNumber: 5,
          title: 'JOUR 5',
          subtitle: 'ON RÉGÉNÈRE',
          description: 'Les tissus se régénèrent. Le corps se reconstruit de l\'intérieur. La vitalité se réinstalle progressivement.',
          services: [
            "Sport coaching class",
            "Massage pochons",
            "Marche méditative marine",
            "Piscine thermale"
          ],
          objectif: 'Régénération cellulaire, relance métabolique.'
        },
        {
          dayNumber: 6,
          title: 'JOUR 6',
          subtitle: 'ON LIBÈRE',
          description: 'Le corps entre dans une phase de nettoyage profond. Les blocages se lèvent. L\'énergie circule librement.',
          services: [
            "Yoga stretching",
            "Ice bath",
            "Massage visage huile d'argan",
            "Bain magnésium",
            "Sauna"
          ],
          objectif: 'Libération complète, fluidité retrouvée.'
        },
        {
          dayNumber: 7,
          title: 'JOUR 7',
          subtitle: 'ON RECHARGE',
          description: 'L\'énergie revient, stable et durable. Le corps retrouve sa capacité naturelle à se régénérer. Vous repartez réinitialisé(e).',
          services: [
            "Stretching",
            "Bol d'air Jacquier",
            "Cupping + serviette de feu",
            "Soin lissant spiruline",
            "Douche à jet"
          ],
          objectif: 'Vitalité durable, renaissance complète.'
        }
      ],
    },
    en: {
      headerTitle: 'Thalasso Renaissance Program 7 Days',
      soinsLabel: 'Included treatments:',
      objectifLabel: 'Objective:',
      days: [
        {
          dayNumber: 1,
          title: 'DAY 1',
          subtitle: 'SETTLE IN',
          description: 'The body begins to settle. The nervous system slows down. Breathing calms. The process begins.',
          services: [
            "Sport coaching class",
            "Jet shower",
            "Thermal pool",
            "Hammam Arabian Nights"
          ],
          objectif: 'Immediate decompression, switching off "alert mode".'
        },
        {
          dayNumber: 2,
          title: 'DAY 2',
          subtitle: 'RELEASE',
          description: 'Deep tensions begin to release. The body regains its mobility. The mind lightens.',
          services: [
            "Yoga",
            "Bol d'air Jacquier",
            "Hydromassage bath",
            "Seaweed wrap"
          ],
          objectif: 'Deep muscle release, tension liberation.'
        },
        {
          dayNumber: 3,
          title: 'DAY 3',
          subtitle: 'REBALANCE',
          description: 'Marine and sensory treatments boost circulation. Muscle tensions dissolve. The mind becomes clearer.',
          services: [
            "Yoga",
            "Bol d'air Jacquier",
            "Affusion shower massage",
            "Sauna",
            "Traditional relaxing massage"
          ],
          objectif: 'Inner harmonization, deep rebalancing.'
        },
        {
          dayNumber: 4,
          title: 'DAY 4',
          subtitle: 'DETOXIFY',
          description: 'Treatments cleanse, drain and re-oxygenate tissues. Energy gradually returns. The body breathes. The mind lightens.',
          services: [
            "Himalayan salt detox scrub",
            "Himalayan salt detox massage",
            "Thermal pool",
            "Sauna"
          ],
          objectif: 'Active detoxification, deep purification.'
        },
        {
          dayNumber: 5,
          title: 'DAY 5',
          subtitle: 'REGENERATE',
          description: 'Tissues regenerate. The body rebuilds from within. Vitality gradually returns.',
          services: [
            "Sport coaching class",
            "Hot poultice massage",
            "Meditative ocean walk",
            "Thermal pool"
          ],
          objectif: 'Cellular regeneration, metabolic boost.'
        },
        {
          dayNumber: 6,
          title: 'DAY 6',
          subtitle: 'LIBERATE',
          description: 'The body enters a deep cleansing phase. Blockages lift. Energy flows freely.',
          services: [
            "Yoga stretching",
            "Ice bath",
            "Argan oil facial massage",
            "Magnesium bath",
            "Sauna"
          ],
          objectif: 'Complete liberation, restored fluidity.'
        },
        {
          dayNumber: 7,
          title: 'DAY 7',
          subtitle: 'RECHARGE',
          description: 'Energy returns, stable and lasting. The body regains its natural ability to regenerate. You leave reset.',
          services: [
            "Stretching",
            "Bol d'air Jacquier",
            "Cupping + fire towel",
            "Spirulina smoothing treatment",
            "Jet shower"
          ],
          objectif: 'Lasting vitality, complete renaissance.'
        }
      ],
    },
  };

  const currentContent = content[locale as keyof typeof content] || content.fr;

  const dayImages = [
    '/images/offer-3/dji7.jpg',
    '/images/offer-7/IMG_6360.jpg',
    '/images/offer-7/DSC07763.jpg',
    '/images/spa/_DSC2297.JPG',
    '/images/spa/_DSC2301.JPG',
    '/images/spa/IMG_9868.JPG',
    '/images/offer-7/DSC02457.jpg',
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

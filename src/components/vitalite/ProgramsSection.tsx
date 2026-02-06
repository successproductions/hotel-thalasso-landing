'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

export function ProgramsSection() {
  const locale = typeof window !== 'undefined' ? window.location.pathname.split('/')[1] : 'fr';

  // Content for both languages organized by days
  const content = {
    fr: {
      headerTitle: 'Programme Thalasso Vitalité 3 Jours',
      soinsLabel: 'Soins inclus :',
      objectifLabel: 'Objectif :',
      days: [
        {
          dayNumber: 1,
          title: 'JOUR 1',
          subtitle: 'ON RELÂCHE',
          description: 'Les tensions s\'évaporent. Le corps retrouve sa légèreté. L\'esprit suit.',
          services: [
            "Bol d'air Jacquier",
            "Piscine thermale",
            "Hammam mille et une nuit",
            "Massage relaxant"
          ],
          objectif: 'Relâchement profond, détente musculaire immédiate.'
        },
        {
          dayNumber: 2,
          title: 'JOUR 2',
          subtitle: 'ON RÉÉQUILIBRE',
          description: 'Les soins marins et sensoriels relancent la circulation. Les tensions musculaires se dissolvent. L\'esprit devient plus clair.',
          services: [
            "Bol d'air Jacquier",
            "Sauna",
            "Piscine thermale",
            "Bain hydromassant",
            "Enveloppement algue",
            "Modelage douche affusion"
          ],
          objectif: 'Harmonisation intérieure, détente profonde.'
        },
        {
          dayNumber: 3,
          title: 'JOUR 3',
          subtitle: 'ON RECHARGE',
          description: 'Le corps se régénère. L\'énergie revient, fluide et stable. Vous repartez ancré(e), disponible.',
          services: [
            "Piscine thermale",
            "Douche à jet",
            "Bain magnésium",
            "Cupping therapie serviette de feu"
          ],
          objectif: 'Régénération cellulaire, vitalité durable.'
        }
      ],
    },
    en: {
      headerTitle: 'Thalasso Vitality Program 3 Days',
      soinsLabel: 'Included treatments:',
      objectifLabel: 'Objective:',
      days: [
        {
          dayNumber: 1,
          title: 'DAY 1',
          subtitle: 'RELEASE',
          description: 'Tensions evaporate. The body regains its lightness. The mind follows.',
          services: [
            "Bol d'air Jacquier",
            "Thermal pool",
            "Hammam Arabian Nights",
            "Relaxing massage"
          ],
          objectif: 'Deep release, immediate muscle relaxation.'
        },
        {
          dayNumber: 2,
          title: 'DAY 2',
          subtitle: 'REBALANCE',
          description: 'Marine and sensory treatments boost circulation. Muscle tensions dissolve. The mind becomes clearer.',
          services: [
            "Bol d'air Jacquier",
            "Sauna",
            "Thermal pool",
            "Hydromassage bath",
            "Seaweed wrap",
            "Affusion shower massage"
          ],
          objectif: 'Inner harmonization, deep relaxation.'
        },
        {
          dayNumber: 3,
          title: 'DAY 3',
          subtitle: 'RECHARGE',
          description: 'The body regenerates. Energy returns, fluid and stable. You leave grounded, available.',
          services: [
            "Thermal pool",
            "Jet shower",
            "Magnesium bath",
            "Cupping therapy with fire towel"
          ],
          objectif: 'Cellular regeneration, lasting vitality.'
        }
      ],
    },
  };

  const currentContent = content[locale as keyof typeof content] || content.fr;

  const dayImages = [
    '/images/spa/_DSC2297.JPG',
    '/images/spa/_DSC2301.JPG',
    '/images/spa/IMG_9868.JPG',
  ];

  const programs = currentContent.days.map((day, index) => ({
    ...day,
    image: dayImages[index],
  }));

  // // Fade + slide up each text block
  // const textAnim = {
  //   hidden: { opacity: 0, y: 20 },
  //   show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  // };

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
                  height={400}
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
                  <span className="text-sm font-semibold uppercase tracking-wide text-teal-600">
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

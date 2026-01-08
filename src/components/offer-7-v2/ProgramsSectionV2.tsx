'use client';

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function ProgramsSectionV2() {
  const t = useTranslations('offer7.programSection');

  const days = ['1', '2', '3', '4', '5', '6', '7', '8'];

  const dayImages = [
    '/images/1.jpg',
    '/images/2.jpg',
    '/images/3.jpg',
    '/images/4.jpg',
    '/images/5.jpg',
    '/images/6.jpg',
    '/images/7.jpg',
    '/images/8.jpg',
  ];

  const programs = days.map((dayNum, index) => {
    const dayData = {
      title: t(`days.${dayNum}.title`),
      description: t(`days.${dayNum}.description`),
      activities: t.raw(`days.${dayNum}.activities`) || [],
      objective: t(`days.${dayNum}.objective`),
      ctaText: t(`days.${dayNum}.ctaText`),
      dayNumber: dayNum,
    };

    return {
      ...dayData,
      image: dayImages[index],
    };
  });

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
          <h2 className="md:mb-4 my-2 text-[27px] font-normal text-gray-800 md:text-4xl">
            {t('header.title')}
          </h2>
          <h3 className="text-xl font-light text-teal-600 md:text-2xl">{t('header.subheading')}</h3>
        </motion.div>
      </div>

      {/* Days Programs */}
      {programs.map((program, i) => {
        const fromLeft = i % 2 === 0;
        const isOdd = i % 2 === 1;

        return (
          <div key={program.dayNumber} className="relative py-2 md:py-6 xl:py-8">
            {/* full-width, pale-green bg sliding in */}
            <motion.div
              className="absolute inset-x-0 inset-y-0 bg-[#f4f4f4]"
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
              <div className={`${isOdd ? 'md:col-start-2' : ''} -mx-4 md:mx-0`}>
                <Image
                  src={program.image}
                  alt={`${t('header.jour')} ${program.dayNumber} - ${program.title}`}
                  width={600}
                  height={400}
                  className="h-[48vh] w-full object-cover shadow-lg md:h-[40] md:rounded-sm lg:h-[47vh] xl:h-[47vh]"
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
                  <span className="text-sm font-semibold uppercase tracking-wide text-teal-600">
                    {t('header.jour')} {program.dayNumber}
                  </span>
                </div>

                <h3 className="mb-2 text-2xl font-normal text-gray-800 md:text-3xl">
                  {program.title.toUpperCase()}
                </h3>

                {/* Activities - only show if activities exist */}
                {program.activities && program.activities.length > 0 && (
                  <div className="mb-6">
                    <h5 className="mb-3 font-semibold text-gray-800">
                      {t('header.activitiesTitle')}
                    </h5>
                    <ul className="space-y-2">
                      {program.activities.map((activity: string, idx: number) => (
                        <li key={idx} className="flex items-start md:text-lg">
                          <span className="mr-2 text-teal-600">•</span>
                          <span className="text-gray-600 font-light">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Objective */}
                <div className="mb-6">
                  <h5 className="mb-3 font-semibold text-gray-800">{t('header.objectiveTitle')}</h5>
                  <p className="font-light text-gray-700">{program.objective}</p>
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
      <div
        className="px-4 text-center md:px-0"
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}
      >
        <a
          href="#contact"
          className='mb-4'
          style={{
            padding: '12px 18px',
            background: '#14b8a6',
            color: '#fff',
            fontSize: '1.325rem',
            fontWeight: 500,
            borderRadius: '2px',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(20,184,166,0.15)',
          }}
        >
          {t('header.callButton')}
        </a>
      </div>
    </section>
  );
}

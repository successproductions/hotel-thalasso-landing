"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export function ProgramsSection5() {
  const t = useTranslations('offer5.programSection');

  const days = ['1', '2', '3', '4','5','6','7'];
  
  const dayImages = [
    '/images/THERMALE.png',     
    '/images/PISCINE_THERMALE_.png',        
    '/images/massagedc.png',     
    '/images/Brown-1.png',
    '/images/BAIN_HYDRO.png' ,
    '/images/relaxing_massage-1.png' ,
    '/images/IMG_2150 (1).png'    
  ];
  
  const programs = days.map((dayNum, index) => {
    const dayData = {
      title: t(`days.${dayNum}.title`),
      description: t(`days.${dayNum}.description`),
      activities: t.raw(`days.${dayNum}.activities`) || [],
      objective: t(`days.${dayNum}.objective`),
      ctaText: t(`days.${dayNum}.ctaText`),
      dayNumber: dayNum
    };

    return {
      ...dayData,
      image: dayImages[index],
    };
  });

  // // Fade + slide up each text block
  // const textAnim = {
  //   hidden: { opacity: 0, y: 20 },
  //   show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  // };

  // Background slide variants
  const bgVariant = (fromLeft: boolean) => ({
    hidden: { x: fromLeft ? "-100%" : "100%" },
    show: { 
      x: "0%", 
      transition: { duration: 3, ease: "easeOut" } 
    },
  });

  return (
    <section id="services" className="overflow-hidden">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto px-4 py-1 md:py-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.42, 0, 0.58, 1] } },
          }}
        >
          <h2 className="text-3xl md:text-4xl font-medium text-gray-800 mb-4">
            {t('header.title')}
          </h2>
          <h3 className="text-xl md:text-2xl  font-light text-teal-600 ">
            {t('header.subheading')}
          </h3>
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
              className={`
                relative z-10
                max-w-6xl mx-auto px-4
                grid gap-8 items-center
                ${isOdd
                  ? "md:grid-cols-2 md:grid-flow-col-dense"
                  : "md:grid-cols-2"}
              `}
            >
              {/* Image */}
              <div className={isOdd ? "md:col-start-2 " : ""}>
                <Image
                  src={program.image}
                  alt={`${t('header.jour')} ${program.dayNumber} - ${program.title}`}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full shadow-lg"
                />
              </div>

              {/* Text */}
              <motion.div
                className={isOdd ? "md:col-start-1" : ""}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                  }
                }}
              >
                <div className="mb-2">
                  <span className="text-teal-600 font-semibold text-sm uppercase tracking-wide">
                    {t('header.jour')} {program.dayNumber}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
                  {program.title.toUpperCase()}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-6">
                  {program.description}
                </p>

                {/* Activities - only show if activities exist */}
                {program.activities && program.activities.length > 0 && (
                  <div className="mb-6">
                    <h5 className="font-semibold text-gray-800 mb-3">
                      {t('header.activitiesTitle')}
                    </h5>
                    <ul className="space-y-2">
                      {program.activities.map((activity: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-teal-600 mr-2">•</span>
                          <span className="text-gray-600">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Objective */}
                <div className="mb-6">
                <h5 className="font-semibold text-gray-800 mb-3">
                      {t('header.objectiveTitle')}
                    </h5>
                  <p className="text-gray-700 font-medium italic">
                    {program.objective}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        );
      })}
    {/* 
      <div className="flex justify-center mt-10">
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-400 text-white text-lg font-semibold rounded-full shadow-lg hover:from-teal-600 hover:to-emerald-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
          Entrer dans l’univers holistique du Dakhla Club
        </a>
      </div>
    */}
    <div  className="md:px-0 px-4 text-center" style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
      <a
        href="#contact"
        style={{
          padding: "12px 32px",
          background: "#14b8a6",
          color: "#fff",
          fontSize: "1.325rem",
          fontWeight: 500,
          borderRadius: "9999px",
          textDecoration: "none",
          boxShadow: "0 2px 8px rgba(20,184,166,0.15)"
        }}
      >
        {t('header.callButton')}
      </a>
    </div>

    </section>
  );
}
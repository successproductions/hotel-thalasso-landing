
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Hourglass, CalendarDays } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ExclusiveOfferSection() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations('exclusiveOffer');

  return (
    <section className="w-full dark:bg-gray-900 py-8 md:py-12 px-4">
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-4xl mx-auto rounded-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm shadow-sm border-t-4 md:border-t-0 md:border-l-4 border-primary-500 flex flex-col md:flex-row items-center gap-5 md:gap-8 px-6 py-6"
      >
        {/* Icon row (mobile) / column (desktop) */}
        <div className="flex md:flex-col gap-4 md:gap-6 items-center justify-center md:justify-start">
          <IconPulse>
            <Hourglass className="w-6 h-6 text-primary-500" />
          </IconPulse>
          <IconPulse delay={0.2}>
            <CalendarDays className="w-6 h-6 text-primary-500" />
          </IconPulse>
        </div>

        {/* Text content */}
        <div className="text-center md:text-left space-y-2 flex-1">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {t('title')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed max-w-prose mx-auto md:mx-0">
            {t('description')}
          </p>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 mt-2">
            <CalendarDays className="w-4 h-4" />
            <span>{t('nextSession')}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// Soft pulse helper
function IconPulse({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      initial={reduceMotion ? undefined : { scale: 0.92, opacity: 0.8 }}
      animate={reduceMotion ? undefined : { scale: [0.92, 1.05, 0.92], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay }}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 shadow-inner"
    >
      {children}
    </motion.span>
  );
}

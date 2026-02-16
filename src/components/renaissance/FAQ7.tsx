'use client';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
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

export default function FAQ7() {
  const t = useTranslations('offer7.faq');
  const [openItem, setOpenItem] = useState<string | undefined>(undefined);

  // ✅ Get FAQ data from your existing translation structure
  const contact = {
    label: t('contact.label'),
    subtext: t('contact.subtext'),
    alt: t('contact.alt'),
  };

  const items = t.raw('items') as FAQItem[];

  // ✅ ENHANCED FAQ SCHEMA with more detailed answers
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item: FAQItem, index: number) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
        // ✅ Add unique identifier for each FAQ item
        '@id': `#faq-${index}`,
        author: {
          '@type': 'Organization',
          name: 'Dakhla Club',
        },
      },
    })),
  };

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

  const bgVariant: Variants = {
    hidden: { x: '-100%' },
    show: {
      x: '0%',
      transition: { duration: 3, ease: 'easeOut' },
    },
  };

  return (
    <section id="faq" className="overflow-hidden" aria-labelledby="faq-heading">
      {/* ✅ ENHANCED FAQ SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Animated Background */}
      <div className="relative py-12 md:py-14">
        <motion.div
          className="absolute inset-x-0 inset-y-0 bg-[#f4f4f4]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={bgVariant}
        />

        <motion.div
          className="relative z-10 mx-auto max-w-6xl px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* ✅ ENHANCED HEADER with proper SEO structure */}
          <motion.div className="mb-4 text-center md:mb-10" variants={itemVariants}>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2
                id="faq-heading"
                className="mb-4 text-5xl font-medium tracking-tight text-slate-800 dark:text-slate-100 md:text-5xl"
              >
                FQA
              </h2>
              <div className="mx-auto h-1 w-24 rounded-full bg-slate-800 dark:bg-slate-100"></div>
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid items-start gap-2 md:gap-5 lg:grid-cols-5">
            {/* ✅ ENHANCED IMAGE SECTION with better SEO */}
            <motion.div className="lg:col-span-2" variants={imageVariants}>
              <motion.div
                className="group relative"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-sm shadow-2xl">
                  <Image
                    src="/images/offer-7/8.jpg"
                    alt={contact.alt}
                    width={600}
                    height={400}
                    className="contrast-110 h-fit w-full object-cover filter md:h-fit"
                    priority={false}
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* ✅ ENHANCED FAQ SECTION with microdata */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                {items.map((item: FAQItem, index: number) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                    itemScope
                    itemType="https://schema.org/Question"
                    id={`faq-${index}`}
                  >
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
                          <AccordionTrigger className="px-6 py-5 text-left font-medium text-slate-800 transition-colors duration-200 dark:text-slate-100 dark:hover:bg-slate-600">
                            <div className="flex w-full items-center justify-between">
                              {/* ✅ ADD itemProp for schema.org */}
                              <h3 itemProp="name" className="pr-4 text-base font-medium md:text-lg">
                                {item.question}
                              </h3>
                              <motion.div
                                animate={{
                                  rotate: openItem === `item-${index}` ? 45 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0"
                              ></motion.div>
                            </div>
                          </AccordionTrigger>

                          <AnimatePresence>
                            <AccordionContent className="px-6 pb-5">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="leading-relaxed text-slate-600 dark:text-slate-300"
                                itemScope
                                itemType="https://schema.org/Answer"
                                itemProp="acceptedAnswer"
                              >
                                <div className="border-t border-slate-100 pt-2" itemProp="text">
                                  {item.answer}
                                </div>
                              </motion.div>
                            </AccordionContent>
                          </AnimatePresence>
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
  );
}

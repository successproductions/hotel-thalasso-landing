"use client"
import Image from "next/image"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations } from "next-intl"
import { useState } from "react"


interface FAQItem {
  question: string
  answer: string
}

export default function FAQ7() {
  const t = useTranslations("offer7.faq")
  const [openItem, setOpenItem] = useState<string | undefined>(undefined)

  // ✅ Get FAQ data from your existing translation structure
  const contact = {
    label: t("contact.label"),
    subtext: t("contact.subtext"), 
    alt: t("contact.alt")
  }

  const items = t.raw("items") as FAQItem[]

  // ✅ ENHANCED FAQ SCHEMA with more detailed answers
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item: FAQItem, index: number) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
        // ✅ Add unique identifier for each FAQ item
        "@id": `#faq-${index}`,
        "author": {
          "@type": "Organization",
          "name": "Dakhla Club"
        }
      }
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const imageVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  }

  const bgVariant: Variants = {
    hidden: { x: "-100%" },
    show: { 
      x: "0%", 
      transition: { duration: 3, ease: "easeOut" } 
    },
  }

  return (
    <section id="faq" className="overflow-hidden" aria-labelledby="faq-heading">
      {/* ✅ ENHANCED FAQ SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
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
          className="relative z-10 max-w-6xl mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* ✅ ENHANCED HEADER with proper SEO structure */}
          <motion.div className="text-center mb-4 md:mb-10" variants={itemVariants}>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 
                id="faq-heading" 
                className="text-5xl md:text-5xl font-medium text-slate-800 dark:text-slate-100 mb-4 tracking-tight"
              >
                FQA
              </h2>
              <div className="w-24 h-1 bg-slate-800 dark:bg-slate-100 mx-auto rounded-full"></div>
              
             
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-2 md:gap-5 items-start">
            {/* ✅ ENHANCED IMAGE SECTION with better SEO */}
            <motion.div className="lg:col-span-2" variants={imageVariants}>
              <motion.div 
                className="relative group" 
                whileHover={{ y: -8 }} 
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src="/images/PISCINE_THERMALE_.png"
                    alt={contact.alt}
                    width={600}
                    height={400}
                    className="object-cover w-full h-fit md:h-fit filter contrast-110"
                    priority={false}
                    loading="lazy"
                  />
                  {/* ✅ ADD IMAGE OVERLAY with CTA */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-medium">Centre de thalassothérapie</p>
                      <p className="text-xs opacity-90">Piscine thermale chauffée à l&apos;eau de mer</p>
                    </div>
                  </div>
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
                    <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
                      <AccordionItem value={`item-${index}`} className="border-none">
                        <motion.div
                          className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                          whileHover={{
                            boxShadow: "0 10px 40px -10px rgba(0, 0, 0, 0.1)",
                            y: -2,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <AccordionTrigger className="px-6 py-5 text-left font-medium text-slate-800 dark:text-slate-100 dark:hover:bg-slate-600 transition-colors duration-200">
                            <div className="flex items-center justify-between w-full">
                              {/* ✅ ADD itemProp for schema.org */}
                              <h3 
                                itemProp="name" 
                                className="text-base md:text-lg pr-4 font-medium"
                              >
                                {item.question}
                              </h3>
                              <motion.div
                                animate={{
                                  rotate: openItem === `item-${index}` ? 45 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                                className="flex-shrink-0"
                              >
                              </motion.div>
                            </div>
                          </AccordionTrigger>

                          <AnimatePresence>
                            <AccordionContent className="px-6 pb-5">
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-slate-600 dark:text-slate-300 leading-relaxed"
                                itemScope 
                                itemType="https://schema.org/Answer" 
                                itemProp="acceptedAnswer"
                              >
                                <div 
                                  className="pt-2 border-t border-slate-100"
                                  itemProp="text"
                                >
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
  )
}
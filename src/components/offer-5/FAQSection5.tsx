"use client"
import Image from "next/image"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations, useMessages } from "next-intl"
import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

export default function FAQ5() {
  const t = useTranslations("offer5.faq")
  const messages = useMessages()
  const [openItem, setOpenItem] = useState<string | undefined>(undefined)

  const { contact, items } = messages.offer5.faq


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

  // Background slide animation (same as ProgramsSection)
  const bgVariant: Variants = {
    hidden: { x: "-100%" },
    show: { 
      x: "0%", 
      transition: { duration: 3, ease: "easeOut" } 
    },
  }

  return (
    <section id="faq" className="overflow-hidden">
      {/* ✅ ADD FAQ SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      {/* Animated Background */}
      <div className="relative py-12 md:py-14">
        {/* Full-width pale background sliding in from left (same as ProgramsSection) */}
        <motion.div
          className="absolute inset-x-0 inset-y-0 bg-[#f4f4f4]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={bgVariant}
        />

        {/* Content sits above the background */}
        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Header Section */}
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <motion.div
              className="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="text-5xl md:text-5xl font-medium text-slate-800 dark:text-slate-100 mb-4 tracking-tight">
                {t("title")}
              </h2>
              <div className="w-24 h-1 bg-slate-800 dark:bg-slate-100 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-2 md:gap-5 items-start">
            {/* Image Section - Left Side */}
            <motion.div className="lg:col-span-2" variants={imageVariants}>
              {/* <div className="sticky top-8"> */}
                <motion.div className="relative group" whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                  {/* <div className="absolute -inset-4  dark:bg-slate-700 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div> */}
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src="/images/sauna_ritual.png"
                      alt={contact.alt}
                      width={600}
                      height={400}
                      className="object-cover w-full h-90 md:h-fit filter contrast-110"
                    />
                  </div>
                </motion.div> 
              {/* </div> */}
            </motion.div>

            {/* FAQ Section - Right Side */}
            <motion.div className="lg:col-span-3" variants={itemVariants}>
              <div className="space-y-4">
                {items.map((item: FAQItem, index: number) => (
                  <motion.div key={index} variants={itemVariants} className="group">
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
                            <div className="flex items-center justify-between w-full dark:hover:bg-slate-600">
                              <span className="text-base md:text-lg pr-4">{item.question}</span>
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
                              >
                                <div className="pt-2 border-t border-slate-100">{item.answer}</div>
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
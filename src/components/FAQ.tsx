"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone } from "lucide-react";
export default function FAQSection() {
  const faqs = [
    {
      question: "Depuis combien de temps votre centre existe-t-il ?",
      answer:
        "Notre centre existe depuis plus de 10 ans à Dakhla, avec des milliers de clients satisfaits ayant bénéficié de nos soins holistiques.",
    },
    {
      question: "Quel est le tarif pour un soin ?",
      answer:
        "Nos séjours incluent l’ensemble des soins. Pour un soin individuel, les tarifs commencent à partir de 400 MAD.",
    },
    {
      question: "Combien de personnes travaillent dans votre équipe ?",
      answer:
        "Nous avons une équipe de 15 thérapeutes certifiés, spécialistes en soins marins et rituels ancestraux.",
    },
    {
      question: "Avez-vous des offres d’emploi en cours ?",
      answer:
        "Nous recrutons régulièrement. Consultez la section Carrières ou contactez-nous directement.",
    },
    {
      question: "Comment prendre rendez-vous avec Femellé ?",
      answer:
        "Vous pouvez réserver en ligne ou nous contacter via le formulaire en bas de page.",
    },
    {
      question: "Quel type de contrats proposez-vous ?",
      answer:
        "Nous proposons des séjours à durée courte (3-5 jours) avec ou sans hébergement inclus.",
    },
  ];

  return (
    <section className="bg-[#f9f8f4] dark:bg-[#080b12] py-20 text-gray-900 dark:text-gray-100 transition-colors">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 items-start">
        {/* Left - Image with Contact Box */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/images/sauna_ritual.png"
              alt="Femme dans l’eau à Dakhla"
              width={700}
              height={700}
              className="object-cover w-full h-auto"
            />
          </div>

          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-900 p-4 pr-6 rounded-xl shadow-md transition-colors">
            <div className="w-10 h-10 bg-green-900 text-white flex items-center justify-center rounded-full">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">Contactez-nous</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">Réponse rapide par téléphone ou email.</p>
            </div>
          </div>
        </div>

        {/* Right - FAQ */}
        <div>
          <h2 className="text-2xl font-trajan text-green-900 dark:text-green-600 mb-4">FAQ</h2>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white dark:bg-gray-900 rounded-md px-4 py-1 shadow-sm transition-colors"
              >
                <AccordionTrigger className="text-left font-medium text-base text-green-900 dark:text-green-600 hover:text-teal-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600 pt-2 leading-relaxed dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

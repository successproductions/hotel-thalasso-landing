"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQSection() {
  const faqs = [
    {
      question: "Qu'est-ce qui est inclus dans les séjours thalasso ?",
      answer:
        "Nos séjours incluent l'hébergement, la pension complète, l'accès aux espaces thalasso, tous les soins mentionnés dans le programme, et l'accompagnement par notre équipe de professionnels.",
    },
    {
      question: "À partir de quel âge peut-on profiter des soins thalasso ?",
      answer:
        "Les soins thalasso sont recommandés à partir de 16 ans. Pour les mineurs, une autorisation parentale est requise.",
    },
    {
      question: "Y a-t-il des contre-indications aux soins thalasso ?",
      answer:
        "Certaines pathologies peuvent être incompatibles. Nous recommandons de consulter votre médecin avant votre séjour.",
    },
    {
      question: "Peut-on personnaliser son programme de soins ?",
      answer:
        "Absolument ! Nos programmes sont modulables selon vos besoins. Un entretien avec notre équipe permet d'adapter votre programme.",
    },
  ]

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
            Questions
            <br />
            <span className="text-teal-600">Fréquemment Posées</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border-0 px-6">
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-teal-600 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

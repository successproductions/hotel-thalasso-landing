import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';

export default function FAQ5() {
  const t = useTranslations('offer5.faq');

  const faqs = t.raw('items') as Array<{ q: string; a: string }>;

  return (
    <section
      id="faq"
      className="py-16 px-4 max-w-3xl mx-auto text-white"
    >
      <h2 className="text-3xl font-semibold mb-6 text-center">
        {t('heading')}
      </h2>
      <Accordion type="single" collapsible>
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`faq${i}`}>
            <AccordionTrigger>{f.q}</AccordionTrigger>
            <AccordionContent>{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

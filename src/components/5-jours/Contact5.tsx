
import ContactForm from '@/components/contact-form';

export default function Contact5() {
  return (
    <section id="reservation" className="py-16 bg-stone-800/80">
      <h2 className="text-3xl font-semibold text-center text-white mb-6">
        Réservez votre séjour
      </h2>
      <div className="max-w-2xl mx-auto">
        <ContactForm />
      </div>
    </section>
  );
}

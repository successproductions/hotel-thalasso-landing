import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Hero } from '@/components/Hero';
import FAQSection from '@/components/FAQ';
import ContactForm from '@/components/contact-form';
import ImageCarousel from '@/components/ImageCarousel';
import ProgramSection from '@/components/ProgramSection';
import ClientsCarousel from '@/components/ClientsCarousel';
import IntroductionSection from '@/components/IntroductionSection';




export default function Home() {



  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Header />
      <Hero />
      <IntroductionSection />
      <ProgramSection/>

      <ImageCarousel />
      <ClientsCarousel />
<FAQSection/>
<ContactForm/>
      <Footer />
    </main>
  );
} 
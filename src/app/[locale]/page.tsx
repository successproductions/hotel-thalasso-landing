

// Import all your components here
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Hero } from '@/components/Hero';
import FAQSection from '@/components/FAQ';
import ContactForm from '@/components/contact-form';
import ImageCarousel from '@/components/ImageCarousel';
import ProgramSection from '@/components/ProgramSection';
import IntroductionSection from '@/components/IntroductionSection';
import ScrollToTop from '@/components/ScrollToTop';
import RewardsSection from '@/components/RewardsSection';
import ClientsCarousel from '@/components/ClientsCarousel';
import ExclusiveOfferSection from '@/components/ExclusiveOfferSection';

export default function Home() {


  return (
    <main className="min-screen bg-background text-foreground transition-colors duration-500">
      <Header />
      <Hero />
      <IntroductionSection />
      <ProgramSection />
      <ImageCarousel />
      <ClientsCarousel />
      <ExclusiveOfferSection />
      <FAQSection />
      <ContactForm />
      <RewardsSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
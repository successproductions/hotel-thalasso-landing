

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import  HeroTest  from '@/components/HeroTest';
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
      <HeroTest />
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
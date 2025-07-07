import Header from '@/components/Header';
import { HealthPrograms } from '@/components/HealthPrograms';
import Hero from '@/components/Hero';
import { About } from '@/components/About';
import { ProgramsSection } from '@/components/ProgramsSection';
import { ServicesTable } from '@/components/ServicesTable';
import { ProgrammeFonctionne } from '@/components/ProgrammeFonctionne';
import { ObjectivesSection } from '@/components/ObjectivesSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQSection from '@/components/FAQ';
import { RewardsSection } from '@/components/RewardsSection';
import { Footer } from '@/components/Footer';
import { NewsletterSection } from '@/components/NewsletterSection';


export default function Home() {


  return (
    <main >
      <Header />
      <Hero />
      <HealthPrograms />
      <About />
      <ProgramsSection />
      <ServicesTable/>
      <ProgrammeFonctionne/>
      <ObjectivesSection/>
      <TestimonialsCarousel/>
      <RewardsSection/>
      <FAQSection/>
      <NewsletterSection/>
      <Footer/>
    </main>
  );
} 
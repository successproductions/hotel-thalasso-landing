import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Hero } from '@/components/Hero';
import FAQSection from '@/components/FAQ';
import ContactForm from '@/components/contact-form';
import ImageCarousel from '@/components/ImageCarousel';
import CopySection from '@/components/CopySection';
import ProgramSection from '@/components/ProgramSection';
import ClientsCarousel from '@/components/ClientsCarousel';




export default function Home() {



  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      <Header />
      <Hero />
      <CopySection />
      <ProgramSection/>
      <ClientsCarousel />

      <ImageCarousel />
      
<FAQSection/>
<ContactForm/>
      <Footer />
    </main>
  );
} 
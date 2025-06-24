
import Hero5 from '@/components/5-jours/Hero5';
import Program5 from '@/components/5-jours/Program5';
import FAQSection from '@/components/FAQ';
import ContactForm from '@/components/contact-form';
import Jumbotron5 from '@/components/5-jours/Jumbotron5';
import { metadata } from './metadata';  
import Header5 from '@/components/5-jours/Header5';
import IntroductionSection5 from '@/components/5-jours/IntroductionSection5';
import Footer from '@/components/Footer';
import RewardsSection from '@/components/RewardsSection';
import LimitedEditionSection from '@/components/5-jours/LimitedEditionSection';
import ClientsCarousel from '@/components/ClientsCarousel';
import MethodologySection5 from '@/components/5-jours/MethodologySection5';




export { metadata };

export default function Page() {
  return (
    <>
    <Header5/>
      <Hero5 />
      <Jumbotron5 />
      <Program5 />
      <IntroductionSection5/>
      <MethodologySection5/>
      <LimitedEditionSection/>
      <ClientsCarousel/>
      <FAQSection />
      <ContactForm />
      <RewardsSection />
      <Footer/>
    </>
  );
}

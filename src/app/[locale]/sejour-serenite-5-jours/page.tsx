
import Hero5 from '@/components/5-jours/Hero5';
import Program5 from '@/components/5-jours/Program5';
import FAQSection from '@/components/FAQ';
import ContactForm from '@/components/contact-form';
import Jumbotron5 from '@/components/5-jours/Jumbotron5';
import { metadata } from './metadata';  
import Header from '@/components/Header';
import IntroductionSection from '@/components/IntroductionSection';
import Footer from '@/components/Footer';
import RewardsSection from '@/components/RewardsSection';


export { metadata };

export default function Page() {
  return (
    <>
    <Header/>
      <Hero5 />
      <Jumbotron5 />
      <Program5 />
      <IntroductionSection/>
      <FAQSection />
      <ContactForm />
      <RewardsSection />
      <Footer/>
    </>
  );
}

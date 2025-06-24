
import Hero5 from '@/components/5-jours/Hero5';
import Program5 from '@/components/5-jours/Program5';
import FAQ5 from '@/components/5-jours/FAQ5';
import ContactForm5 from '@/components/5-jours/Contact-form5';
import Jumbotron5 from '@/components/5-jours/Jumbotron5';
import { metadata } from './metadata';  
import Header5 from '@/components/5-jours/Header5';
import IntroductionSection5 from '@/components/5-jours/IntroductionSection5';

import LimitedEditionSection from '@/components/5-jours/LimitedEditionSection';
import MethodologySection5 from '@/components/5-jours/MethodologySection5';
import ClientsCarousel5 from '@/components/5-jours/ClientsCarousel5';
import Footer5 from '@/components/5-jours/Footer5';
import RewardsSection5 from '@/components/5-jours/RewardsSection5';




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
      <ClientsCarousel5/>
      <FAQ5 />
      <ContactForm5 />
      <RewardsSection5 />
      <Footer5/>
    </>
  );
}

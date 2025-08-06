import type { Metadata } from 'next';
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
import WhatsAppChatbot from '@/components/WhatsAppChatbot';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://offer.dakhlaclub.com';
  
  const metadata3Days = {
    fr: {
      title: "Évasion Holistique 3 Jours à Dakhla – Cure Détox & Bien-être",
      description: "Offrez-vous 3 jours de bien-être au centre DC Thermes à Dakhla. Cure détox, soins thalasso, spa entre désert et océan. Vitalité, clarté et énergie retrouvée.",
      keywords: "séjour bien-être Dakhla, cure détox Maroc, spa haut de gamme Maroc, centre thalasso Dakhla, reset corps esprit, soins detox corps et esprit, spa désert et océan, spa DC Thermes, programme bien-être 3 jours, séjour holistique Maroc"
    },
    en: {
      title: "3-Day Holistic Escape in Dakhla – Detox Cure & Wellness",
      description: "Treat yourself to 3 days of wellness at DC Thermes center in Dakhla. Detox cure, thalasso treatments, spa between desert and ocean. Vitality, clarity and renewed energy.",
      keywords: "Dakhla wellness stay, Morocco detox cure, luxury spa Morocco, Dakhla thalasso center, body mind reset, detox body mind treatments, desert ocean spa, DC Thermes spa, 3-day wellness program, holistic stay Morocco"
    }
  };

  const currentMeta = metadata3Days[locale];
  const currentUrl = locale === 'en' 
    ? `${baseUrl}/en/evasion-holistique-3-jours` 
    : `${baseUrl}/fr/evasion-holistique-3-jours`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: currentUrl,
      siteName: 'Dakhla Club - Évasion Holistique 3 Jours',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/cure-detox-3-jours-dakhla.jpg`,
          width: 1200,
          height: 630,
          alt: currentMeta.title,
          type: 'image/jpeg'
        }
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description,
      images: [`${baseUrl}/images/cure-detox-3-jours-dakhla.jpg`],
    },
    
    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/evasion-holistique-3-jours`,
        'en-US': `${baseUrl}/en/evasion-holistique-3-jours`,
        'x-default': `${baseUrl}/fr/evasion-holistique-3-jours`,
      },
    },
    
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function Page() {
  return (
    <main>
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
      <WhatsAppChatbot/>
      
      {/* ✅ 3-DAY STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Holistic Wellness Retreat",
            "provider": {
              "@type": "HealthAndBeautyBusiness",
              "name": "Dakhla Club",
              "@id": "https://offer.dakhlaclub.com/#business",
              "url": "https://offer.dakhlaclub.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Point de Dragon PK 28",
                "addressLocality": "Dakhla",
                "postalCode": "73000",
                "addressCountry": "MA"
              },
              "telephone": "+212652881921"
            },
            "name": "Évasion Holistique 3 Jours",
            "alternateName": "3-Day Holistic Escape",
            "description": "Programme de bien-être holistique 3 jours combinant cure détox, soins thalasso et relaxation dans l'environnement unique de Dakhla entre désert et océan.",
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "MAD",
              "category": "Wellness Retreat",
              "validFrom": new Date().toISOString(),
              "validThrough": "2025-12-31T23:59:59Z"
            },
            "duration": "P3D",
            "category": ["Wellness", "Spa", "Thalasso", "Holistic Therapy", "Detox"],
            "audience": {
              "@type": "Audience",
              "audienceType": "Adults seeking wellness and relaxation"
            }
          })
        }}
      />
    </main>
  );
}
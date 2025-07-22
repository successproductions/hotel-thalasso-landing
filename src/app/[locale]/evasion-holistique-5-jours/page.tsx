import { Footer } from "@/components/Footer"
import Header from "@/components/Header"
import { About5 } from "@/components/offer-5/About5"
import FAQ5 from "@/components/offer-5/FAQSection5"
import { HealthPrograms5 } from "@/components/offer-5/HealthPrograms5"
import Hero5 from "@/components/offer-5/Hero5"
import { NewsletterSection5 } from "@/components/offer-5/NewsletterSection5"
import { ObjectivesSection5 } from "@/components/offer-5/ObjectivesSection5"
import { ProgramsSection5 } from "@/components/offer-5/ProgramsSection5"
import { ServicesTable5 } from "@/components/offer-5/ServicesTable5"
import WhatsAppChatbot5 from "@/components/offer-5/WhatsAppChatbot5"
import { RewardsSection } from "@/components/RewardsSection"
import TestimonialsCarousel from "@/components/TestimonialsCarousel"


import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://offer.dakhlaclub.com';
  
  const metadata5Days = {
    fr: {
      title: "Évasion Holistique 5 Jours à Dakhla – Transformation Profonde & Bien-être Complet",
      description: "Vivez 5 jours de transformation holistique au Dakhla Club. Cure détox intensive, yoga, méditation et soins thalasso pour une régénération complète corps et esprit.",
      keywords: "retraite bien-être 5 jours Dakhla, transformation holistique complète, cure détox longue Maroc, séjour thalasso 5 jours, retraite yoga intensive Dakhla, programme wellness complet, détox profonde 5 jours, cure régénérante intensive, retraite spirituelle Maroc, spa intensif désert océan"
    },
    en: {
      title: "5-Day Holistic Escape in Dakhla – Deep Transformation & Complete Wellness",
      description: "Experience 5 days of holistic transformation at Dakhla Club. Intensive detox cure, yoga, meditation and thalasso treatments for complete body and mind regeneration.",
      keywords: "5-day wellness retreat Dakhla, holistic transformation Morocco, intensive detox spa, 5-day thalasso program, yoga retreat Morocco, complete wellness transformation, deep detox cure, regenerative spa retreat, spiritual retreat Morocco, intensive desert spa"
    }
  };

  const currentMeta = metadata5Days[locale];
  const currentUrl = locale === 'en' 
    ? `${baseUrl}/en/evasion-holistique-5-jours` 
    : `${baseUrl}/fr/evasion-holistique-5-jours`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    
    keywords: currentMeta.keywords,
    
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: currentUrl,
      siteName: 'Dakhla Club - Évasion Holistique 5 Jours',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/cure-detox-maroc.jpg`,
          width: 1200,
          height: 630,
          alt: currentMeta.title,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description,
      images: [`${baseUrl}/images/cure-detox-maroc.jpg`],
    },
    
    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/evasion-holistique-5-jours`,
        'en-US': `${baseUrl}/en/evasion-holistique-5-jours`,
        'x-default': `${baseUrl}/fr/evasion-holistique-5-jours`,
      },
    },

    // 🆕 SPECIFIC ROBOTS FOR 5-DAY PAGE
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
        <>
            <Header />
            <Hero5/>
            <HealthPrograms5/>
            <About5/>
            <ProgramsSection5/>
            <ServicesTable5/>
            <ObjectivesSection5/>
            <TestimonialsCarousel/>
            <RewardsSection/>
            <FAQ5/>
            <NewsletterSection5/>
            <Footer/>
            <WhatsAppChatbot5/>

            
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Intensive Holistic Wellness Retreat",
                        "provider": {
                            "@type": "HealthAndBeautyBusiness",
                            "name": "Dakhla Club",
                            "@id": "https://offer.dakhlaclub.com"
                        },
                        "name": "Évasion Holistique 5 Jours",
                        "alternateName": "5-Day Holistic Transformation Retreat",
                        "description": "Programme complet de transformation holistique 5 jours combinant cure détox, yoga, méditation et soins thalasso dans l'environnement unique de Dakhla entre désert et océan.",
                        "offers": {
                            "@type": "Offer",
                            "availability": "https://schema.org/InStock",
                            "priceCurrency": "MAD",
                            "category": "Intensive Wellness Retreat",
                            "validFrom": new Date().toISOString(),
                            "validThrough": "2025-12-31T23:59:59Z"
                        },
                        "duration": "P5D",
                        "category": ["Transformation", "Intensive Wellness", "Holistic Healing", "Thalassotherapy", "Yoga Retreat"],
                        "audience": {
                            "@type": "Audience",
                            "audienceType": "Adults seeking deep transformation"
                        }
                    })
                }}
            />
        </>
    )
}
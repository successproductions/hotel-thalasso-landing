import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import Header from '@/components/Header';
import Hero7 from '@/components/offer-7/Hero7';
import { About7 } from '@/components/offer-7/About7';
import { RewardsSection } from '@/components/RewardsSection';
import { OtherOffersSection } from '@/components/OtherOffersSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import { NewsletterSection7 } from '@/components/offer-7/NewsletterSection7';
import { ProgramsSection7 } from '@/components/offer-7/ProgramsSection7';
import { ServicesTable7 } from '@/components/offer-7/ServicesTable7';
import { ProgrammeFonctionne7 } from '@/components/offer-7/ProgrammeFonctionne7';
import { ObjectivesSection7 } from '@/components/offer-7/ObjectivesSection7';
import FAQ7 from '@/components/offer-7/FAQ7';
import WhatsAppChatbot7 from '@/components/offer-7/WhatsAppChatbot7';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://offer.dakhlaclub.com';

  const metadata7Days = {
    fr: {
      title: 'Séjour Thalasso 7 Nuits Dakhla - Retraite Bien-être',

      description:
        "Séjour thalasso 7 nuits à Dakhla. 34 soins détox, yoga face à l'océan, programme wellness complet. Réservez votre retraite bien-être.",

      keywords:
        'séjour thalasso 7 nuits, retraite bien-être Dakhla, cure thalasso Maroc, spa détox océan, yoga wellness Dakhla, programme holistique 7 jours, thalassothérapie Maroc, détox marine, bien-être Sahara océan',
    },
    en: {
      title: '7-Night Thalasso Stay Dakhla - Wellness Retreat',

      description:
        '7-night thalasso stay in Dakhla. 34 detox treatments, ocean yoga, complete wellness program. Book your holistic retreat now.',

      keywords:
        '7-night thalasso stay, wellness retreat Dakhla, thalasso cure Morocco, ocean spa detox, yoga wellness Dakhla, 7-day holistic program, thalassotherapy Morocco, marine detox, Sahara ocean wellness',
    },
  };

  const currentMeta = metadata7Days[locale];
  const currentUrl =
    locale === 'en'
      ? `${baseUrl}/en/evasion-holistique-7-jours`
      : `${baseUrl}/fr/evasion-holistique-7-jours`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,

    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: currentUrl,
      siteName: 'Dakhla Club - Évasion Holistique 7 Jours',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/cure-thalasso-7-jours-maroc.jpg`,
          width: 1200,
          height: 630,
          alt: currentMeta.title,
          type: 'image/jpeg',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description,
      images: [`${baseUrl}/images/cure-thalasso-7-jours-maroc.jpg`],
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/evasion-holistique-7-jours`,
        'en-US': `${baseUrl}/en/evasion-holistique-7-jours`,
        'x-default': `${baseUrl}/fr/evasion-holistique-7-jours`,
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
    <>
      <Header />
      <Hero7 />
      <About7 />
      <ProgramsSection7 />
      <ServicesTable7 />
      <ProgrammeFonctionne7 />
      <ObjectivesSection7 />
      <OtherOffersSection />
      <TestimonialsCarousel />
      <RewardsSection />
      <FAQ7 />
      <NewsletterSection7 />
      <WhatsAppChatbot7 />
      <Footer />

      {/* ✅ 7-DAY STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            serviceType: 'Extended Holistic Wellness Retreat',
            provider: {
              '@type': 'HealthAndBeautyBusiness',
              name: 'Dakhla Club',
              '@id': 'https://offer.dakhlaclub.com/#business',
              url: 'https://offer.dakhlaclub.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Point de Dragon PK 28',
                addressLocality: 'Dakhla',
                postalCode: '73000',
                addressCountry: 'MA',
              },
              telephone: '+212652881921',
            },
            name: 'Évasion Holistique 7 Jours',
            alternateName: '7-Day Holistic Transformation Retreat',
            description:
              "Programme complet de transformation holistique 7 jours avec 34 soins combinant cure détox intensive, yoga, méditation et soins thalasso dans l'environnement unique de Dakhla.",
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              priceCurrency: 'MAD',
              category: 'Extended Wellness Retreat',
              validFrom: new Date().toISOString(),
              validThrough: '2025-12-31T23:59:59Z',
            },
            duration: 'P7D',
            category: [
              'Extended Transformation',
              'Intensive Wellness',
              'Complete Holistic Healing',
              'Thalassotherapy',
              'Yoga Retreat',
            ],
            audience: {
              '@type': 'Audience',
              audienceType: 'Adults seeking extended transformation and deep healing',
            },
          }),
        }}
      />
    </>
  );
}

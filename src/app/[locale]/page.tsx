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
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://offer.dakhlaclub.com';

  const homepageMeta = {
    fr: {
      title: 'Dakhla Club - Retraites Bien-être & Thalasso au Maroc',
      description:
        'Centre de thalassothérapie et bien-être à Dakhla. Séjours holistiques 3, 5 et 7 jours entre désert et océan. Détox, spa, yoga et méditation.',
      keywords:
        'centre thalasso Dakhla, retraite bien-être Maroc, spa Dakhla, cure détox Maroc, séjour wellness désert océan, thalassothérapie Maroc',
    },
    en: {
      title: 'Dakhla Club - Wellness Retreats & Thalasso in Morocco',
      description:
        'Thalassotherapy and wellness center in Dakhla. Holistic stays 3, 5 and 7 days between desert and ocean. Detox, spa, yoga and meditation.',
      keywords:
        'Dakhla thalasso center, Morocco wellness retreat, Dakhla spa, Morocco detox cure, desert ocean wellness stay, thalassotherapy Morocco',
    },
  };

  const currentMeta = homepageMeta[locale];
  const currentUrl = locale === 'en' ? `${baseUrl}/en` : `${baseUrl}/fr`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,

    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: currentUrl,
      siteName: 'Dakhla Club',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/dakhla-club-homepage.jpg`,
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
      images: [`${baseUrl}/images/dakhla-club-homepage.jpg`],
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr`,
        'en-US': `${baseUrl}/en`,
        'x-default': `${baseUrl}/fr`,
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

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HealthPrograms />
      <About />
      <ProgramsSection />
      <ServicesTable />
      <ProgrammeFonctionne />
      <ObjectivesSection />
      <TestimonialsCarousel />
      <RewardsSection />
      <FAQSection />
      <NewsletterSection />
      <Footer />
      <WhatsAppChatbot />

      {/* ✅ HOMEPAGE STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': 'https://offer.dakhlaclub.com/#website',
            url: 'https://offer.dakhlaclub.com',
            name: 'Dakhla Club - Centre de Bien-être Holistique',
            description:
              'Centre de thalassothérapie et bien-être à Dakhla proposant des retraites holistiques entre désert et océan.',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://offer.dakhlaclub.com/search?q={search_term_string}',
              },
              'query-input': 'required name=search_term_string',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Programmes de Bien-être',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Évasion Holistique 3 Jours',
                    url: 'https://offer.dakhlaclub.com/fr/evasion-holistique-3-jours',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Évasion Holistique 5 Jours',
                    url: 'https://offer.dakhlaclub.com/fr/evasion-holistique-5-jours',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Évasion Holistique 7 Jours',
                    url: 'https://offer.dakhlaclub.com/fr/evasion-holistique-7-jours',
                  },
                },
              ],
            },
          }),
        }}
      />
    </main>
  );
}

import type { Metadata } from 'next';
import Script from 'next/script';
import HeaderTest from '@/components/HeaderTest';
import { HealthPrograms } from '@/components/HealthPrograms';
import HeroTest from '@/components/HeroTest';
import { About } from '@/components/About';
import { ProgramsSection } from '@/components/ProgramsSection';
import { ServicesTable } from '@/components/ServicesTable';
import { ProgrammeFonctionne } from '@/components/ProgrammeFonctionne';
import { ObjectivesSection } from '@/components/ObjectivesSection';
import { OtherOffersSection } from '@/components/OtherOffersSection';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import FAQSection from '@/components/FAQ';
import { RewardsSection } from '@/components/RewardsSection';
import { Footer } from '@/components/Footer';
import { NewsletterSectionTest } from '@/components/NewsletterSectionTest';
import WhatsAppChatbot from '@/components/WhatsAppChatbot';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://offer.dakhlaclub.com';

  const metadataTest = {
    fr: {
      title: 'Test - Évasion Holistique 3 Jours à Dakhla – Cure Détox & Bien-être',
      description:
        'Page de test - Offrez-vous 3 jours de bien-être au centre DC Thermes à Dakhla. Cure détox, soins thalasso, spa entre désert et océan.',
      keywords:
        'séjour bien-être Dakhla, cure détox Maroc, spa haut de gamme Maroc, centre thalasso Dakhla',
    },
    en: {
      title: 'Test - 3-Day Holistic Escape in Dakhla – Detox Cure & Wellness',
      description:
        'Test page - Treat yourself to 3 days of wellness at DC Thermes center in Dakhla. Detox cure, thalasso treatments, spa between desert and ocean.',
      keywords:
        'Dakhla wellness stay, Morocco detox cure, luxury spa Morocco, Dakhla thalasso center',
    },
  };

  const currentMeta = metadataTest[locale];
  const currentUrl =
    locale === 'en'
      ? `${baseUrl}/en/evasion-test`
      : `${baseUrl}/fr/evasion-test`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,

    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: currentUrl,
      siteName: 'Dakhla Club - Évasion Holistique Test',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/cure-detox-3-jours-dakhla.jpg`,
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
      images: [`${baseUrl}/images/cure-detox-3-jours-dakhla.jpg`],
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/evasion-test`,
        'en-US': `${baseUrl}/en/evasion-test`,
        'x-default': `${baseUrl}/fr/evasion-test`,
      },
    },

    robots: {
      index: false, // Don't index test page
      follow: false,
    },
  };
}

export default function Page() {
  return (
    <>
      {/* Google Tag Manager - Evasion Test */}
      <Script
        id="gtm-evasion-test"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MFVNMQCG');`,
        }}
      />

      {/* Google Tag Manager (noscript) - Evasion Test */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MFVNMQCG"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      <main>
        <HeaderTest />
        <HeroTest />
        <HealthPrograms />
        <About />
        <ProgramsSection />
        <ServicesTable />
        <ProgrammeFonctionne />
        <ObjectivesSection />
        <OtherOffersSection />
        <TestimonialsCarousel />
        <RewardsSection />
        <FAQSection />
        <NewsletterSectionTest />
        <Footer />
        <WhatsAppChatbot />

        {/* ✅ TEST PAGE STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Holistic Wellness Retreat - Test',
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
              name: 'Évasion Holistique Test',
              alternateName: 'Test - 3-Day Holistic Escape',
              description:
                "Page de test pour le programme de bien-être holistique 3 jours combinant cure détox, soins thalasso et relaxation.",
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'MAD',
                category: 'Wellness Retreat',
                validFrom: new Date().toISOString(),
                validThrough: '2025-12-31T23:59:59Z',
              },
              duration: 'P3D',
              category: ['Wellness', 'Spa', 'Thalasso', 'Holistic Therapy', 'Detox'],
              audience: {
                '@type': 'Audience',
                audienceType: 'Adults seeking wellness and relaxation',
              },
            }),
          }}
        />
      </main>
    </>
  );
}

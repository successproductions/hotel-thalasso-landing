import { Metadata } from 'next';
import Script from 'next/script';
import BlackFridayHero from '@/components/black-friday/BlackFridayHero';
import BlackFridayCountdown from '@/components/black-friday/BlackFridayCountdown';
import BlackFridayExperience from '@/components/black-friday/BlackFridayExperience';
import BlackFridayUrgency from '@/components/black-friday/BlackFridayUrgency';
import BlackFridayFooter from '@/components/black-friday/BlackFridayFooter';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://offer.dakhlaclub.com';
  const currentUrl = `${baseUrl}/${locale}/black-friday`;

  const metaData = {
    fr: {
      title: 'Black Friday Dakhla Club - S�jour Exclusif � -30%',
      description:
        'Profitez de notre offre Black Friday exclusive : -30% sur votre s�jour au Dakhla Club. Entre lagune, oc�an et d�sert. Offre limit�e.',
      keywords:
        'black friday, dakhla club, offre exclusive, r�duction 30%, s�jour luxe, kitesurf, spa, dakhla maroc',
    },
    en: {
      title: 'Black Friday Dakhla Club - Exclusive Stay at -30%',
      description:
        'Take advantage of our exclusive Black Friday offer: -30% on your stay at Dakhla Club. Between lagoon, ocean and desert. Limited offer.',
      keywords:
        'black friday, dakhla club, exclusive offer, 30% discount, luxury stay, kitesurf, spa, dakhla morocco',
    },
  };

  const meta = metaData[locale];

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: currentUrl,
      siteName: 'Dakhla Club',
      images: [
        {
          url: `${baseUrl}/images/black-friday/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Black Friday Dakhla Club',
        },
      ],
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}/images/black-friday/og-image.jpg`],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/black-friday`,
        'en-US': `${baseUrl}/en/black-friday`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlackFridayPage({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}) {
  await params;

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Black Friday Dakhla Club',
    description:
      'Offre Black Friday exclusive : -30% sur votre s�jour au Dakhla Club',
    startDate: '2025-11-10', // Update with actual dates
    endDate: '2025-11-30', // Update with actual dates
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Dakhla Club',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dakhla',
        addressCountry: 'MA',
      },
    },
    offers: {
      '@type': 'Offer',
      url: 'https://offer.dakhlaclub.com/black-friday',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/LimitedAvailability',
      validFrom: '2025-11-20',
      validThrough: '2025-11-30',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: '30',
        priceCurrency: 'PERCENT',
        description: '30% discount on accommodation',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Dakhla Club',
      url: 'https://offer.dakhlaclub.com',
    },
  };

  return (
    <>
      {/* Google Tag Manager */}
      {/* <Script
        id="gtm-black-friday"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-YOUR-ID-HERE');
          `,
        }}
      /> */}

      {/* Structured Data */}
      <Script
        id="structured-data-black-friday"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Page Content */}
      <main className="min-h-screen bg-white">
        <BlackFridayHero />
        <BlackFridayCountdown />
        <BlackFridayExperience />
        <BlackFridayUrgency />
        <BlackFridayFooter />
      </main>
    </>
  );
}

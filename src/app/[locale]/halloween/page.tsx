import type { Metadata } from 'next';
// import Header from '@/components/Header';
// import { Footer } from '@/components/Footer';
import HalloweenHero from '@/components/halloween/HalloweenHero';
import HalloweenOffer from '@/components/halloween/HalloweenOffer';
import HalloweenWhy from '@/components/halloween/HalloweenWhy';
import HalloweenLimitedOffer from '@/components/halloween/HalloweenLimitedOffer';
import HalloweenReservation from '@/components/halloween/HalloweenReservation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://offer.dakhlaclub.com';

  const metadataHalloween = {
    fr: {
      title: 'Halloween à Dakhla Club 2025 – Séjour Thématique Unique',
      description:
        'Vivez un Halloween inoubliable à Dakhla Club du 30 octobre au 2 novembre 2025. Soirée costumée, dîner thématique, animations, spa et détente face à la lagune.',
      keywords:
        'Halloween Dakhla, séjour Halloween Maroc, soirée costumée Dakhla, Halloween 2025, Dakhla Club Halloween, séjour thématique Maroc, vacances Halloween, hôtel Halloween Dakhla, animation Halloween, spa Halloween',
    },
    en: {
      title: 'Halloween at Dakhla Club 2025 – Unique Themed Stay',
      description:
        'Experience an unforgettable Halloween at Dakhla Club from October 30 to November 2, 2025. Costume party, themed dinner, activities, spa and relaxation facing the lagoon.',
      keywords:
        'Halloween Dakhla, Halloween stay Morocco, Dakhla costume party, Halloween 2025, Dakhla Club Halloween, themed stay Morocco, Halloween vacation, Halloween hotel Dakhla, Halloween activities, Halloween spa',
    },
  };

  const currentMeta = metadataHalloween[locale];
  const currentUrl =
    locale === 'en'
      ? `${baseUrl}/en/halloween`
      : `${baseUrl}/fr/halloween`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,

    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: currentUrl,
      siteName: 'Dakhla Club - Halloween 2025',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/halloween-dakhla-2025.jpg`,
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
      images: [`${baseUrl}/images/halloween-dakhla-2025.jpg`],
    },

    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/halloween`,
        'en-US': `${baseUrl}/en/halloween`,
        'x-default': `${baseUrl}/fr/halloween`,
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

export default function HalloweenPage() {
  return (
    <main className="bg-black">
      {/* <Header /> */}
      <HalloweenHero />
      <HalloweenLimitedOffer />
      <HalloweenOffer />
      <HalloweenWhy />
      <HalloweenReservation />
      {/* <Footer /> */}

      {/* HALLOWEEN STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: 'Halloween à Dakhla Club',
            description:
              'Séjour thématique Halloween unique avec soirée costumée, dîner effrayant, animations et détente au bord de la lagune de Dakhla.',
            startDate: '2025-10-30T00:00:00+00:00',
            endDate: '2025-11-02T23:59:59+00:00',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: 'Dakhla Club',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Point de Dragon PK 28',
                addressLocality: 'Dakhla',
                postalCode: '73000',
                addressCountry: 'MA',
              },
            },
            image: [
              'https://offer.dakhlaclub.com/images/halloween-dakhla-2025.jpg',
            ],
            organizer: {
              '@type': 'Organization',
              name: 'Dakhla Club',
              url: 'https://offer.dakhlaclub.com',
              telephone: '+212652881921',
            },
            offers: {
              '@type': 'Offer',
              url: 'https://offer.dakhlaclub.com/fr/halloween',
              availability: 'https://schema.org/LimitedAvailability',
              priceCurrency: 'MAD',
              validFrom: '2025-01-01T00:00:00+00:00',
              validThrough: '2025-11-02T23:59:59+00:00',
            },
            performer: {
              '@type': 'PerformingGroup',
              name: 'DJ Halloween Dakhla Club',
            },
            keywords:
              'Halloween, Dakhla, Maroc, Soirée costumée, Séjour thématique, Spa, Détente, Lagune',
          }),
        }}
      />
    </main>
  );
}

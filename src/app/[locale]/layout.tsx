import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Loading from '../loading';
import { Suspense } from 'react';
import ClientMountGuard from '../ClientMountGuard';

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}


export async function generateMetadata({
  params,
}: {
  params: { locale: 'fr' | 'en' };
}): Promise<Metadata> {
  const { locale } = params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  const baseUrl   = 'https://offer.dakhlaclub.com';
  const localeUrl = locale === 'en' ? `${baseUrl}/en` : `${baseUrl}/fr`;

  return {
    title: messages.meta.title,           
    description: messages.meta.description,

    keywords:
      locale === 'fr'
        ? 'séjour bien-être, cure détox, thalasso Dakhla, spa Maroc'
        : 'spa Morocco, detox retreat, thalasso Dakhla, wellness',

    alternates: {
      canonical: localeUrl,
      languages: {
        fr: `${baseUrl}/fr`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/fr`,
      },
    },

    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: localeUrl,
      siteName: 'Dakhla Club',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [`${baseUrl}/images/og-image-${locale}.jpg`],
    },

    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [`${baseUrl}/images/og-image-${locale}.jpg`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: 'fr' | 'en' }>;
}) {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  // Enhanced JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Dakhla Club - Centre Thalasso & Spa",
    "alternateName": locale === 'en' ? "Dakhla Club - Thalasso & Spa Center" : "Dakhla Club - Centre Thalasso & Spa",
    "description": messages.meta.description,
    "url": locale === "en" ? "https://offer.dakhlaclub.com/en" : "https://offer.dakhlaclub.com/fr",
    "sameAs": [
      "https://www.facebook.com/dakhlaclub",
      "https://www.instagram.com/dakhlaclub",
      "https://www.youtube.com/@dakhlaclub",
      "https://www.tripadvisor.com/dakhlaclub"
    ],
    "openingHours": "Mo-Su 09:00-19:00",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "POINT DE DRAGON PK 28",
      "addressLocality": "Dakhla",
      "postalCode": "73000",
      "addressCountry": "MA",
      "addressRegion": "Dakhla-Oued Ed-Dahab"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.7185",
      "longitude": "-15.9333"
    },
    "telephone": "+212652881921",
    "email": "reservation@dakhlaclub.com",
    "priceRange": "$$",
    "currenciesAccepted": "MAD, EUR",
    "paymentAccepted": "Credit Card, Cash, Bank Transfer",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'en' ? "Wellness Treatments & Retreats" : "Soins Bien-être & Cures",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "3-Day Holistic Retreat" : "Cure Holistique 3 Jours",
            "description": messages.meta.description,
            "provider": {
              "@type": "Organization",
              "name": "Dakhla Club"
            }
          },
          "priceRange": "$$",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": locale === 'en' ? "Thermal Pool" : "Piscine Thermale",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification", 
        "name": locale === 'en' ? "Spa Treatments" : "Soins Spa",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": locale === 'en' ? "Sauna & Hammam" : "Sauna & Hammam", 
        "value": true
      }
    ]
  };

return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Structured Data only */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <meta
          property="og:updated_time"
          content={new Date().toISOString()}
          suppressHydrationWarning
        />
      </head>
      <body>
        <ClientMountGuard>
          <Suspense fallback={<Loading />}>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </ThemeProvider>
          </Suspense>
        </ClientMountGuard>
      </body>
    </html>
  );
}
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

// Generate metadata for each locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  const baseUrl = 'https://offer.dakhlaclub.com';
  const currentUrl = locale === 'en' ? `${baseUrl}/en` : `${baseUrl}/fr`;

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    
    // Basic meta tags
    keywords: locale === 'fr' 
      ? 'séjour bien-être 3 jours Maroc, retraite spa detox courte durée, centre holistique bord de mer, soins énergétiques et thalasso Dakhla, massage detox hammam Maroc, bol d\'air jacquier cupping bain magnésium, thalasso Dakhla, spa bien-être Maroc, cure détox océan désert'
      : 'thalasso Dakhla, spa wellness Morocco, 3-day detox retreat, holistic sea treatments, desert ocean wellness, Jacquier air bowl cupping therapy, magnesium bath Morocco, wellness retreat Morocco, spa treatments Dakhla',
    
    authors: [{ name: 'Dakhla Club' }],
    creator: 'Dakhla Club',
    publisher: 'Dakhla Club',
    
    // Open Graph
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: currentUrl,
      siteName: 'Dakhla Club',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/og-image-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: messages.meta.description,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [`${baseUrl}/images/og-image-${locale}.jpg`],
    },

    // Canonical and alternates
    alternates: {
      canonical: currentUrl,
      languages: {
        'fr': `${baseUrl}/fr`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/fr`,
      },
    },

    // Robots
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

    // Verification
    verification: {
      google: 'your-google-verification-code',
    },

    // Additional meta for better SEO
    other: {
      'geo.region': 'MA',
      'geo.placename': 'Dakhla',
      'geo.position': '23.7185;-15.9333',
      'ICBM': '23.7185, -15.9333',
      'revisit-after': '7 days',
      'distribution': 'global',
      'rating': 'general',
      'language': locale,
      'copyright': 'Dakhla Club',
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
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Title and Description - CRITICAL FOR SEO */}
        <title>{messages.meta.title}</title>
        <meta name="description" content={messages.meta.description} />
        
        {/* Keywords */}
        <meta name="keywords" content={
          locale === 'fr' 
            ? 'séjour bien-être 3 jours Maroc, retraite spa detox courte durée, centre holistique bord de mer, soins énergétiques et thalasso Dakhla, massage detox hammam Maroc, bol d\'air jacquier cupping bain magnésium, thalasso Dakhla, spa bien-être Maroc, cure détox océan désert'
            : 'thalasso Dakhla, spa wellness Morocco, 3-day detox retreat, holistic sea treatments, desert ocean wellness, Jacquier air bowl cupping therapy, magnesium bath Morocco, wellness retreat Morocco, spa treatments Dakhla'
        } />

        {/* Canonical URL */}
        <link rel="canonical" href={locale === 'en' ? 'https://offer.dakhlaclub.com/en' : 'https://offer.dakhlaclub.com/fr'} />

        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="fr" href="https://offer.dakhlaclub.com/fr" />
        <link rel="alternate" hrefLang="en" href="https://offer.dakhlaclub.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://offer.dakhlaclub.com/fr" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={messages.meta.title} />
        <meta property="og:description" content={messages.meta.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={locale === 'en' ? 'https://offer.dakhlaclub.com/en' : 'https://offer.dakhlaclub.com/fr'} />
        <meta property="og:site_name" content="Dakhla Club" />
        <meta property="og:locale" content={locale === 'fr' ? 'fr_FR' : 'en_US'} />
        <meta property="og:image" content={`https://offer.dakhlaclub.com/images/og-image-${locale}.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={messages.meta.description} />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={messages.meta.title} />
        <meta name="twitter:description" content={messages.meta.description} />
        <meta name="twitter:image" content={`https://offer.dakhlaclub.com/images/og-image-${locale}.jpg`} />

        {/* Additional SEO Meta Tags */}
        <meta name="author" content="Dakhla Club" />
        <meta name="creator" content="Dakhla Club" />
        <meta name="publisher" content="Dakhla Club" />
        <meta name="copyright" content="Dakhla Club" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        
        {/* Geographic Meta Tags */}
        <meta name="geo.region" content="MA" />
        <meta name="geo.placename" content="Dakhla" />
        <meta name="geo.position" content="23.7185;-15.9333" />
        <meta name="ICBM" content="23.7185, -15.9333" />
        
        {/* Additional Meta Tags */}
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="language" content={locale} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Updated time for SEO */}
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
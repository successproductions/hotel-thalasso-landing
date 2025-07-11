import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Playfair_Display } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const playfair = Playfair_Display({ subsets: ['latin'] });


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0ea5e9',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    // FIXED: Add metadataBase and canonical for WWW canonicalization
    metadataBase: new URL('https://offer.dakhlaclub.com'),
    alternates: {
      canonical: `https://offer.dakhlaclub.com${locale === 'en' ? '/en' : '/fr'}/evasion-holistique-3-jours`,
      languages: {
        'fr': '/fr/evasion-holistique-3-jours',
        'en': '/en/evasion-holistique-3-jours',
      },
    },

    title: messages.meta.title,
    description: messages.meta.description,
    
    // Enhanced Open Graph
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: locale === "en" ? "https://offer.dakhlaclub.com/en/evasion-holistique-3-jours" : "https://offer.dakhlaclub.com/fr/evasion-holistique-3-jours",
      siteName: 'Dakhla Club',
      locale: locale === 'en' ? 'en_US' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: 'https://offer.dakhlaclub.com/images/cure-detox-maroc.jpg',
          width: 1200,
          height: 630,
          alt: messages.meta.description,
        },
      ],
    },

    // Enhanced Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: ['https://offer.dakhlaclub.com/images/cure-detox-maroc.jpg'],
    },

    // Enhanced keywords
    keywords: locale === 'fr' 
      ? 'évasion holistique Dakhla, cure détox Maroc, spa thalasso, 3 nuits bien-être, retraite wellness Maroc, soins holistiques, Dakhla Club spa, détox eau de mer, massage thérapeutique, méditation désert'
      : 'holistic escape Dakhla, detox spa Morocco, thalasso wellness, 3 nights retreat, holistic treatments, Dakhla Club spa, seawater therapy, therapeutic massage, desert meditation',
    
    // Enhanced authors and meta
    authors: [{ name: 'Dakhla Club', url: 'https://offer.dakhlaclub.com' }],
    creator: 'Dakhla Club',
    publisher: 'Dakhla Club',
    applicationName: 'Dakhla Club Wellness',
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    
    // Enhanced robots
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

    // Additional meta for SEO
    category: 'Wellness & Spa',
    classification: 'Health & Beauty Business',
    
    // Performance and other meta
    other: {
      'msapplication-TileColor': '#0ea5e9',
      'msapplication-config': '/browserconfig.xml',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes'
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
  const messages = await getMessages();

  // FIXED: Complete schemas with proper address field
  const schemas = [
    // 1. Main Business Schema with COMPLETE address
    {
      "@context": "https://schema.org",
      "@type": "HealthAndBeautyBusiness",
      "@id": "https://offer.dakhlaclub.com",
      "name": "DC Thermes – Évasion Holistique",
      "alternateName": locale === 'en' ? "DC Thermes – Holistic Escape" : "DC Thermes – Évasion Holistique",
      "description": messages.meta.description,
      "url": locale === "en" ? "https://offer.dakhlaclub.com/en/evasion-holistique-3-jours" : "https://offer.dakhlaclub.com/fr/evasion-holistique-3-jours",
      "logo": "https://offer.dakhlaclub.com/images/LogoDakhla.png",
      "image": [
        "https://offer.dakhlaclub.com/images/cure-detox-maroc.jpg",
        "https://offer.dakhlaclub.com/images/sejour-bien-etre-dakhla.jpg",
        "https://offer.dakhlaclub.com/images/Piscine_thermale.png"
      ],
      "sameAs": [
        "https://www.facebook.com/dakhlaclub",
        "https://www.instagram.com/dakhlaclub",
        "https://www.youtube.com/@dakhlaclub"
      ],
      "openingHours": "Mo-Su 09:00-19:00",
      // CRITICAL FIX: Complete address object with all required fields
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
      "currenciesAccepted": "MAD, EUR, USD",
      "paymentAccepted": "Credit Card, Bank Transfer",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "150",
        "bestRating": "5",
        "worstRating": "1"
      }
    },
    
    // 2. Website Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://offer.dakhlaclub.com/#website",
      "url": "https://offer.dakhlaclub.com",
      "name": "Dakhla Club - Holistic Wellness Retreat",
      "description": messages.meta.description,
      "inLanguage": [locale === 'en' ? "en-US" : "fr-FR"]
    }
  ];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Enhanced Structured Data */}
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.qrserver.com" />
      </head>

      <body className={playfair.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
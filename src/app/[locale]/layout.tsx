import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400','700'],
  display: 'swap'
})

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  const baseUrl = 'https://offer.dakhlaclub.com';
  // Fix: Ensure proper canonical URLs
  const currentUrl = locale === 'en' 
    ? `${baseUrl}/en/evasion-holistique-3-jours` 
    : `${baseUrl}/fr/evasion-holistique-3-jours`;

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    
    // Fix: Proper viewport meta
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
    
    // Fix: Enhanced icons
    icons: {
      icon: [
        { url: '/images/LogoDakhla.png', type: 'image/png', sizes: '32x32' },
        { url: '/images/LogoDakhla.png', type: 'image/png', sizes: '16x16' }
      ],
      apple: [
        { url: '/images/LogoDakhla.png', sizes: '180x180', type: 'image/png' }
      ],
      shortcut: '/images/LogoDakhla.png'
    },
    
    // Fix: Proper manifest
    manifest: '/manifest.json',
    
    // Enhanced Open Graph
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: currentUrl,
      siteName: 'Dakhla Club - Évasion Holistique',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/og-image-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: messages.meta.description,
          type: 'image/jpeg'
        },
        {
          url: `${baseUrl}/images/cure-detox-maroc.jpg`,
          width: 800,
          height: 600,
          alt: 'Dakhla Club wellness spa treatments',
          type: 'image/jpeg'
        }
      ],
    },

    // Enhanced Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [`${baseUrl}/images/og-image-${locale}.jpg`],
      creator: '@dakhlaclub',
      site: '@dakhlaclub'
    },

    // Fix: Proper canonical and alternates
    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/evasion-holistique-3-jours`,
        'en-US': `${baseUrl}/en/evasion-holistique-3-jours`,
        'x-default': `${baseUrl}/fr/evasion-holistique-3-jours`
      },
      types: {
        'application/rss+xml': [
          { 
            url: `${baseUrl}/feed.xml`, 
            title: 'Dakhla Club Wellness Blog RSS Feed' 
          }
        ]
      }
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
      'theme-color': '#0ea5e9',
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
  const messages = (await import(`../../messages/${locale}.json`)).default;

  // Enhanced JSON-LD Schema with multiple schemas
  const schemas = [
    // 1. Main Business Schema
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
    
    // 2. Service Schema
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Holistic Wellness Retreat",
      "provider": {
        "@type": "HealthAndBeautyBusiness",
        "name": "Dakhla Club",
        "@id": "https://offer.dakhlaclub.com"
      },
      "name": locale === 'en' ? "3-Day Holistic Escape" : "Évasion Holistique 3 Jours",
      "description": messages.meta.description,
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "MAD",
        "category": "Wellness Retreat",
        "validFrom": new Date().toISOString(),
        "validThrough": "2025-12-31T23:59:59Z"
      },
      "duration": "P3D",
      "category": ["Wellness", "Spa", "Thalasso", "Holistic Therapy"]
    },

    // 3. Website Schema
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://offer.dakhlaclub.com/#website",
      "url": "https://offer.dakhlaclub.com",
      "name": "Dakhla Club - Holistic Wellness Retreat",
      "description": messages.meta.description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://offer.dakhlaclub.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      },
      "inLanguage": [locale === 'en' ? "en-US" : "fr-FR"]
    },

    // 4. Breadcrumb Schema
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://offer.dakhlaclub.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": locale === 'en' ? "Holistic Escape" : "Évasion Holistique",
          "item": locale === "en" ? "https://offer.dakhlaclub.com/en/evasion-holistique-3-jours" : "https://offer.dakhlaclub.com/fr/evasion-holistique-3-jours"
        }
      ]
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

        {/* Performance and SEO meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="color-scheme" content="light dark" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dakhla Club" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.qrserver.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://direct-book.com" />
        
        {/* Updated time for SEO */}
        <meta
          property="og:updated_time"
          content={new Date().toISOString()}
          suppressHydrationWarning
        />
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
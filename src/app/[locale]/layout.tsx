import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Playfair_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400','700'],
  display: 'swap'
})


export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}


export async function generateMetadata(): Promise<Metadata> {
  return {
    // Only global metadata in layout
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
    
    manifest: '/manifest.json',
    
    authors: [{ name: 'Dakhla Club', url: 'https://offer.dakhlaclub.com' }],
    creator: 'Dakhla Club',
    publisher: 'Dakhla Club',
    applicationName: 'Dakhla Club Wellness',
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    
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

    category: 'Wellness & Spa',
    classification: 'Health & Beauty Business',
    
    other: {
      'theme-color': '#0ea5e9',
      'msapplication-TileColor': '#0ea5e9',
      'msapplication-config': '/browserconfig.xml',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'default',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'geo.region': 'MA-15',
      'geo.placename': 'Dakhla',
      'geo.position': '23.7185;-15.9333',
      'ICBM': '23.7185, -15.9333'
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

  // ✅ ONLY BUSINESS SCHEMA IN LAYOUT
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": "https://offer.dakhlaclub.com/#business",
    "name": "Dakhla Club - DC Thermes",
    "alternateName": locale === 'en' ? "Dakhla Club - Holistic Wellness Center" : "Dakhla Club - Centre de Bien-être Holistique",
    "url": "https://offer.dakhlaclub.com",
    "logo": "https://offer.dakhlaclub.com/images/LogoDakhla.png",
    "image": [
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
    "priceRange": "$",
    "currenciesAccepted": "MAD, EUR, USD",
    "paymentAccepted": "Credit Card, Bank Transfer",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* ✅ ONLY BUSINESS SCHEMA IN LAYOUT */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />


        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="color-scheme" content="light dark" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Dakhla Club" />
        

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.qrserver.com" />
        
        <link rel="dns-prefetch" href="https://direct-book.com" />
        

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
        <Analytics />
      </body>
    </html>
  );
}
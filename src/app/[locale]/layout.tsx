import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

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
        'x-default': `${baseUrl}/fr`, // Default to French
      },
    },

    // Additional meta tags
    keywords: locale === 'fr' 
      ? 'thalasso, Dakhla, spa, bien-être, détox, cure, Maroc, océan, désert'
      : 'thalasso, Dakhla, spa, wellness, detox, treatment, Morocco, ocean, desert',
    
    authors: [{ name: 'Dakhla Club' }],
    creator: 'Dakhla Club',
    publisher: 'Dakhla Club',
    
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

    // Verification (add your actual verification codes)
    verification: {
      google: 'your-google-verification-code',

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

  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "DC Thermes – Évasion Holistique",
    "alternateName": locale === 'en' ? "DC Thermes – Holistic Escape" : "DC Thermes – Évasion Holistique",
    "description": messages.meta.description,
    "url": locale === "en" ? "https://offer.dakhlaclub.com/en" : "https://offer.dakhlaclub.com/fr",
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
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "23.7185",
      "longitude": "-15.9333"
    },
    "telephone": "+212652881921",
    "email": "reservation@dakhlaclub.com",
    "priceRange": "$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'en' ? "Wellness Treatments" : "Soins Bien-être",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "3-Day Holistic Retreat" : "Cure Holistique 3 Jours",
            "description": messages.meta.description
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150"
    }
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />

        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="fr" href="https://offer.dakhlaclub.com/fr" />
        <link rel="alternate" hrefLang="en" href="https://offer.dakhlaclub.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://offer.dakhlaclub.com/fr" />

        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Updated time for SEO */}
        <meta
          property="og:updated_time"
          content={new Date().toISOString()}
          suppressHydrationWarning
        />

        <style  id="seo-media-query"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: `
        @media (max-width: 768px){Add commentMore actions
          .rm-dummy-class{display:none}
        }`
    }}
  />
      </head>

      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider }          from 'next-themes';
import type { ReactNode }         from 'react';

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: 'fr' | 'en' }>;
}) {
  const { locale } = await params;
  const messages   = (await import(`../../messages/${locale}.json`)).default;

  /* ——— Schema already in place ——— */
  const schema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "DC Thermes – Évasion Holistique",
    "url":
      locale === "en"
        ? "https://offer.dakhlaclub.com/en"
        : "https://offer.dakhlaclub.com/fr",
    "openingHours": "Mo-Su 09:00-19:00",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dakhla",
      "addressCountry": "MA",
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
       
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

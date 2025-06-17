import '../globals.css';
import { ThemeProvider }           from 'next-themes';
import { NextIntlClientProvider }  from 'next-intl';
import type { ReactNode }          from 'react';

/*—– 1 / Pre-build the two static paths —–*/
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

  /*—– 2 / Load the correct message bundle —–*/
  const messages = (await import(`../../messages/${locale}.json`)).default;

  /*—– 3 / Business schema for SEO —–*/
  const schema = {
    '@context': 'https://schema.org',
    '@type'   : 'HealthAndBeautyBusiness',
    name      : 'DC Thermes – Évasion Holistique',
    url       : locale === 'en'
      ? 'https://offer.dakhlaclub.com/en'
      : 'https://offer.dakhlaclub.com/fr',
    openingHours: 'Mo-Su 09:00-19:00',
    address   : {
      '@type'         : 'PostalAddress',
      addressLocality : 'Dakhla',
      addressCountry  : 'MA',
    },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* ↳ Structured-data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          suppressHydrationWarning
        />

        {/* ↳ Forces OG cache-bust */}
        <meta
          property="og:updated_time"
          content={new Date().toISOString()}
          suppressHydrationWarning
        />

        {/* ↳ Tiny media-query (example) */}
        <style
          id="seo-media-query"
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width:768px){
                .rm-dummy-class{display:none}
              }`,
          }}
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

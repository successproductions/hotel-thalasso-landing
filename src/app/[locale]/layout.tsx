
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider }          from 'next-themes';
import type { ReactNode }         from 'react';

export async function generateStaticParams() {
  
  return [
    { locale: 'fr' },
    { locale: 'en' }
  ];
}

export default async function LocaleLayout(
 { children, params }: {
  children: ReactNode;
  params: Promise<{ locale: 'fr' | 'en' }>;
}
) {


  const { locale } = await params;
const messages = (await import(`../../messages/${locale}.json`)).default;


  return (
    <html lang={locale} suppressHydrationWarning>
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

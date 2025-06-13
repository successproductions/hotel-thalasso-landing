
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider }          from 'next-themes';

export async function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }] as const;
}

export default async function LocaleLayout({
  children,
  params,                
}: {
  children: React.ReactNode;
  params: { locale: 'fr' | 'en' };
}) {
  const { locale } = params;     
  
  const messages = (await import(`../../messages/${locale}.json`))
    .default as Record<string, string>;

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

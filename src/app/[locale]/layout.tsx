import '../globals.css';          
import {NextIntlClientProvider, useMessages} from 'next-intl';
import {ThemeProvider} from 'next-themes';   
import {Geist, Geist_Mono} from 'next/font/google';

const geistSans = Geist({variable: '--font-geist-sans', subsets: ['latin']});
const geistMono = Geist_Mono({variable: '--font-geist-mono', subsets: ['latin']});

export default function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

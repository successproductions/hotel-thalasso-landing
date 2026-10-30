import type { ReactNode } from 'react';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import type { Lang } from '@/dc-thermes/types';
import '@/dc-thermes/styles.generated.css';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-dc-serif',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-dc-sans',
});

// Standalone html shell: these pages do not use the [locale] layout, its styles or its providers
export default function Document({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

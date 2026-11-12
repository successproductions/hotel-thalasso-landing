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

// Google Tag Manager of the DC Thermes pages (same container as /evasion-3), at the top of <head> as Google asks
const GTM_ID = 'GTM-MFVNMQCG';
const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

// Standalone html shell: these pages do not use the [locale] layout, its styles or its providers
export default function Document({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: GTM_SNIPPET }} />
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}

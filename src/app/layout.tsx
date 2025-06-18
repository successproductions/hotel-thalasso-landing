import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  // acts as a template:  child title replaces %s
  title: {
    default: 'Évasion Holistique – Cure Détox 3 Jours | Dakhla Club',
    template: '%s | Dakhla Club',
  },
  description:
    'Profitez d’une parenthèse thalasso de 3 jours à Dakhla : détox à l’eau de mer, rituels bien-être et excursions dans le désert',
  openGraph: {
    title: 'Évasion Holistique – Cure Détox 3 Jours | Dakhla Club',
    description:
      'Séjours bien-être, cures détox et soins thalasso entre désert et océan à Dakhla.',
    url: 'https://dakhla.club',
    siteName: 'Dakhla Club',
    images: [
      {
        url: 'https://dakhla.club/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Dakhla Club – Thalasso & Spa',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dakhla Club – Thalasso & Spa',
    description:
      'Séjours bien-être, cures détox et soins thalasso entre désert et océan à Dakhla.',  
    images: ['https://dakhla.club/images/og-image.jpg'],
  },
  keywords:
    'thalasso, Dakhla, spa, bien-être, détox, cure, Maroc, océan, désert',
  alternates: {
    canonical: 'https://dakhla.club',
    languages: {
      'fr': 'https://dakhla.club/fr',
      'en': 'https://dakhla.club/en', 
      'x-default': 'https://dakhla.club/fr',
    },
  },
  icons: {
    icon: '/LogoDakhla.png',
    apple: '/LogoDakhla.png',
    shortcut: '/LogoDakhla.png',
  },
  metadataBase: new URL('https://dakhla.club'),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noimageindex: false,
    nosnippet: false,
    'max-video-preview': -1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#131212' },
    { media: '(prefers-color-scheme: no-preference)', color: '#ffffff' }, 
    ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* tiny inline rule so Rank-Math sees responsiveness */}
        <style
          dangerouslySetInnerHTML={{
            __html: '@media(max-width:768px){.rm-dummy{display:none}}',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

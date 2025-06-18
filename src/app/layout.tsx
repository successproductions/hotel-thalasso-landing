import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  
  title: {
    default: 'Dakhla Club – Thalasso & Spa',
    template: '%s | Dakhla Club',
  },
  description:
    'Séjours bien-être, cures détox et soins thalasso entre désert et océan à Dakhla.',
  openGraph: {
    title: 'Dakhla Club – Thalasso & Spa',
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
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
       
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

import type { Metadata } from 'next';
import RenaissanceContent from './RenaissanceContent';

export const metadata: Metadata = {
  title: 'THALASSO RENAISSANCE 7 JOURS - Cure Complète Dakhla',
  description:
    'Cure thalasso renaissance de 7 jours à Dakhla. 33 soins thalasso, transformation complète corps et esprit. Réservez votre cure au Dakhla Club.',
  keywords: [
    'thalasso renaissance',
    'cure 7 jours',
    'transformation holistique',
    'soins thalasso complets',
    'wellness Dakhla',
    'Dakhla Club',
  ],
  openGraph: {
    title: 'THALASSO RENAISSANCE 7 JOURS - Dakhla Club',
    description:
      'Cure thalasso renaissance de 7 jours à Dakhla. 33 soins thalasso, transformation complète corps et esprit.',
    url: 'https://offer.dakhlaclub.com/fr/renaissance',
    siteName: 'Dakhla Club',
    images: [
      {
        url: 'https://offer.dakhlaclub.com/images/offer-3/dji7.jpg',
        width: 1200,
        height: 630,
        alt: 'Thalasso Renaissance 7 Jours - Dakhla Club',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THALASSO RENAISSANCE 7 JOURS | Dakhla Club',
    description:
      'Cure thalasso renaissance de 7 jours. 33 soins thalasso, transformation complète.',
    images: ['https://offer.dakhlaclub.com/images/offer-3/dji7.jpg'],
  },
  alternates: {
    canonical: 'https://offer.dakhlaclub.com/fr/renaissance',
    languages: {
      'fr': 'https://offer.dakhlaclub.com/fr/renaissance',
      'en': 'https://offer.dakhlaclub.com/en/renaissance',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <RenaissanceContent />;
}

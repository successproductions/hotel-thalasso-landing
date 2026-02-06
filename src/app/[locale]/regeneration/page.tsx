import type { Metadata } from 'next';
import RegenerationContent from './RegenerationContent';

export const metadata: Metadata = {
  title: 'THALASSO RÉGÉNÉRATION 5 JOURS - Cure Revitalisante Dakhla',
  description:
    'Cure thalasso régénération de 5 jours à Dakhla. 29 soins thalasso, détox profonde et revitalisation complète. Réservez au Dakhla Club.',
  keywords: [
    'thalasso régénération',
    'cure 5 jours',
    'détox Dakhla',
    'soins revitalisants',
    'spa thalasso Maroc',
    'Dakhla Club',
  ],
  openGraph: {
    title: 'THALASSO RÉGÉNÉRATION 5 JOURS - Dakhla Club',
    description:
      'Cure thalasso régénération de 5 jours à Dakhla. 29 soins thalasso, détox profonde et revitalisation complète.',
    url: 'https://offer.dakhlaclub.com/fr/regeneration',
    siteName: 'Dakhla Club',
    images: [
      {
        url: 'https://offer.dakhlaclub.com/images/offer-3/dji12.jpg',
        width: 1200,
        height: 630,
        alt: 'Thalasso Régénération 5 Jours - Dakhla Club',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THALASSO RÉGÉNÉRATION 5 JOURS | Dakhla Club',
    description:
      'Cure thalasso régénération de 5 jours. 29 soins thalasso, détox profonde.',
    images: ['https://offer.dakhlaclub.com/images/offer-3/dji12.jpg'],
  },
  alternates: {
    canonical: 'https://offer.dakhlaclub.com/fr/regeneration',
    languages: {
      'fr': 'https://offer.dakhlaclub.com/fr/regeneration',
      'en': 'https://offer.dakhlaclub.com/en/regeneration',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <RegenerationContent />;
}

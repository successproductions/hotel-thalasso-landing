import type { Metadata } from 'next';
import VitaliteContent from './VitaliteContent';

export const metadata: Metadata = {
  title: 'THALASSO VITALITÉ 3 JOURS - Cure Régénérante Dakhla',
  description:
    'Cure thalasso vitalité de 3 jours à Dakhla. 14 soins thalasso, relaxation profonde et accès spa. Réservez votre escapade bien-être au Dakhla Club.',
  keywords: [
    'thalasso vitalité',
    'cure 3 jours',
    'soins thalasso Dakhla',
    'relaxation Maroc',
    'spa Dakhla',
    'bien-être Dakhla Club',
  ],
  openGraph: {
    title: 'THALASSO VITALITÉ 3 JOURS - Dakhla Club',
    description:
      'Cure thalasso vitalité de 3 jours à Dakhla. 14 soins thalasso, relaxation profonde et accès spa.',
    url: 'https://offer.dakhlaclub.com/fr/vitalite',
    siteName: 'Dakhla Club',
    images: [
      {
        url: 'https://offer.dakhlaclub.com/images/offer-3/dji2.jpg',
        width: 1200,
        height: 630,
        alt: 'Thalasso Vitalité 3 Jours - Dakhla Club',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THALASSO VITALITÉ 3 JOURS | Dakhla Club',
    description:
      'Cure thalasso vitalité de 3 jours. 14 soins thalasso, relaxation profonde.',
    images: ['https://offer.dakhlaclub.com/images/offer-3/dji2.jpg'],
  },
  alternates: {
    canonical: 'https://offer.dakhlaclub.com/fr/vitalite',
    languages: {
      'fr': 'https://offer.dakhlaclub.com/fr/vitalite',
      'en': 'https://offer.dakhlaclub.com/en/vitalite',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <VitaliteContent />;
}

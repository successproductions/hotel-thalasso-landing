import type { Metadata } from 'next';
import EvasionContent from './EvasionContent';

export const metadata: Metadata = {
  title: 'Évasion Holistique 3, 5 & 7 Jours | Cure Détox & Thalasso à Dakhla',
  description:
    'Découvrez nos séjours bien-être holistiques de 3, 5 ou 7 jours à Dakhla. Cure détox, soins thalasso, massages et relaxation face à l\'océan. Réservez votre évasion wellness au Dakhla Club.',
  keywords: [
    'évasion holistique',
    'cure détox Dakhla',
    'thalasso Maroc',
    'séjour bien-être',
    'retraite wellness',
    'soins spa Dakhla',
    'massage relaxation',
    'Dakhla Club',
  ],
  openGraph: {
    title: 'Évasion Holistique | Cure Détox & Thalasso à Dakhla',
    description:
      'Séjours bien-être holistiques de 3, 5 ou 7 jours à Dakhla. Cure détox, soins thalasso et relaxation face à l\'océan.',
    url: 'https://offer.dakhlaclub.com/fr/evasion',
    siteName: 'Dakhla Club',
    images: [
      {
        url: 'https://offer.dakhlaclub.com/images/centrethalassoDakhla.jpg',
        width: 1200,
        height: 630,
        alt: 'Centre Thalasso Dakhla Club - Évasion Holistique',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Évasion Holistique | Cure Détox & Thalasso à Dakhla',
    description:
      'Séjours bien-être holistiques de 3, 5 ou 7 jours à Dakhla. Cure détox, soins thalasso et relaxation.',
    images: ['https://offer.dakhlaclub.com/images/centrethalassoDakhla.jpg'],
  },
  alternates: {
    canonical: 'https://offer.dakhlaclub.com/fr/evasion',
    languages: {
      'fr': 'https://offer.dakhlaclub.com/fr/evasion',
      'en': 'https://offer.dakhlaclub.com/en/evasion',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <EvasionContent />;
}

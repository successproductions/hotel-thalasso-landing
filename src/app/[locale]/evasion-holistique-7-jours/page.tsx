import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: 'fr' | 'en' }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://offer.dakhlaclub.com';

  const metadata7Days = {
    fr: {
      title: "Évasion Holistique 7 Jours à Dakhla – Bien-être, Détox & Renouveau",
      description: "Offrez-vous 7 jours d'évasion holistique au Dakhla Club : yoga, méditation, cure détox, soins thalasso et activités bien-être pour une transformation profonde du corps et de l'esprit.",
      keywords: "retraite bien-être 7 jours Dakhla, cure détox Maroc, séjour thalasso 7 jours, retraite yoga Dakhla, programme wellness Maroc, détox profonde, spa désert océan, transformation holistique, séjour bien-être Maroc, retraite spirituelle Dakhla"
    },
    en: {
      title: "7-Day Holistic Escape in Dakhla – Wellness, Detox & Renewal",
      description: "Enjoy 7 days of holistic escape at Dakhla Club: yoga, meditation, detox cure, thalasso treatments and wellness activities for a deep transformation of body and mind.",
      keywords: "7-day wellness retreat Dakhla, detox cure Morocco, 7-day thalasso stay, yoga retreat Dakhla, wellness program Morocco, deep detox, desert ocean spa, holistic transformation, wellness stay Morocco, spiritual retreat Dakhla"
    }
  };

  const currentMeta = metadata7Days[locale];
  const currentUrl = locale === 'en' 
    ? `${baseUrl}/en/evasion-holistique-7-jours` 
    : `${baseUrl}/fr/evasion-holistique-7-jours`;

  return {
    title: currentMeta.title,
    description: currentMeta.description,
    keywords: currentMeta.keywords,
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: currentUrl,
      siteName: 'Dakhla Club - Évasion Holistique 7 Jours',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/cure-detox-maroc.jpg`,
          width: 1200,
          height: 630,
          alt: currentMeta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description,
      images: [`${baseUrl}/images/cure-detox-maroc.jpg`],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'fr-FR': `${baseUrl}/fr/evasion-holistique-7-jours`,
        'en-US': `${baseUrl}/en/evasion-holistique-7-jours`,
        'x-default': `${baseUrl}/fr/evasion-holistique-7-jours`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

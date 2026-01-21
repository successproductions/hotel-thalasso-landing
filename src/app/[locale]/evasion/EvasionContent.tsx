'use client';

import Script from 'next/script';
import './styles.css';
import HeaderTest from '@/components/offers/HeaderTest';
import HeroTest from '@/components/offers/HeroTest';
import { Footer } from '@/components/Footer';
import { NewsletterSectionV2 } from '@/components/offers/NewsletterSectionV2';
import WhatsAppChatbot from '@/components/WhatsAppChatbot';
import { HealthProgramsV2 } from '@/components/offers/HealthProgramsV2';
import { AboutV2 } from '@/components/offers/AboutV2';
import { ProgramsSectionV2 } from '@/components/offers/ProgramsSectionV2';
import { ProgrammeFonctionneV2 } from '@/components/offers/ProgrammeFonctionneV2';
import TestimonialsCarouselV2 from '@/components/offers/TestimonialsCarouselV2';
import { RewardsSectionV2 } from '@/components/offers/RewardsSectionV2';
import { AboutV2Reverse } from '@/components/offers/AboutV2Reverse';
import FAQSectionV2 from '@/components/FAQV2';
import { ObjectivesSectionV2 } from '@/components/offers/ObjectivesSectionV2';

export default function EvasionContent() {
  return (
    <>
      <Script
        id="gtm-evasion-test"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MFVNMQCG');`,
        }}
      />

      {/* Google Tag Manager (noscript) - Evasion Test */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MFVNMQCG"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      <main>
        <HeaderTest />
        <HeroTest />
        <HealthProgramsV2 />
        <AboutV2 />
        <AboutV2Reverse />
        <ProgramsSectionV2 />
        <ProgrammeFonctionneV2 />
        <ObjectivesSectionV2 />
        <TestimonialsCarouselV2 />
        <RewardsSectionV2 />
        <FAQSectionV2 />
        <NewsletterSectionV2 />
        <Footer />
        <WhatsAppChatbot />

        {/* ✅ STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Holistic Wellness Retreat',
              provider: {
                '@type': 'HealthAndBeautyBusiness',
                name: 'Dakhla Club',
                '@id': 'https://offer.dakhlaclub.com/#business',
                url: 'https://offer.dakhlaclub.com',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Point de Dragon PK 28',
                  addressLocality: 'Dakhla',
                  postalCode: '73000',
                  addressCountry: 'MA',
                },
                telephone: '+212652881921',
              },
              name: 'Évasion Holistique',
              alternateName: 'Holistic Escape Retreat',
              description:
                "Programme de bien-être holistique combinant cure détox, soins thalasso et relaxation face à l'océan à Dakhla.",
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'MAD',
                category: 'Wellness Retreat',
                validFrom: new Date().toISOString(),
                validThrough: '2025-12-31T23:59:59Z',
              },
              duration: 'P3D',
              category: ['Wellness', 'Spa', 'Thalasso', 'Holistic Therapy', 'Detox'],
              audience: {
                '@type': 'Audience',
                audienceType: 'Adults seeking wellness and relaxation',
              },
            }),
          }}
        />
      </main>
    </>
  );
}

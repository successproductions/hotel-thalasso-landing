'use client';

import Script from 'next/script';
import './styles.css';
import HeaderTest from '@/components/renaissance/HeaderTest';
import HeroTest from '@/components/renaissance/HeroTest';
import { Footer } from '@/components/renaissance/Footer';
import { NewsletterSectionV2 } from '@/components/renaissance/NewsletterSectionV2';
import { HealthProgramsV2 } from '@/components/renaissance/HealthProgramsV2';
import { AboutV2 } from '@/components/renaissance/AboutV2';
import { ProgramsSectionV2 } from '@/components/renaissance/ProgramsSectionV2';
import { ProgrammeFonctionneV2 } from '@/components/renaissance/ProgrammeFonctionneV2';
import TestimonialsCarouselV2 from '@/components/renaissance/TestimonialsCarouselV2';
import { RewardsSectionV2 } from '@/components/renaissance/RewardsSectionV2';
import { AboutV2Reverse } from '@/components/renaissance/AboutV2Reverse';
import FAQSectionV2 from '@/components/renaissance/FAQV2';
import { ObjectivesSectionV2 } from '@/components/renaissance/ObjectivesSectionV2';

export default function RenaissanceContent() {
  return (
    <>
      <Script
        id="gtm-renaissance"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MFVNMQCG');`,
        }}
      />

      {/* Google Tag Manager (noscript) */}
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

        {/* ✅ STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Thalasso Renaissance',
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
              name: 'Thalasso Renaissance 7 Jours',
              description:
                'Programme thalasso renaissance de 7 jours combinant 33 soins thalasso pour une transformation complète corps et esprit à Dakhla.',
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'MAD',
                price: '11700',
                category: 'Thalasso Treatment',
                validFrom: new Date().toISOString(),
                validThrough: '2025-12-31T23:59:59Z',
              },
              duration: 'P7D',
              category: ['Wellness', 'Spa', 'Thalasso', 'Holistic Therapy', 'Complete Transformation'],
              audience: {
                '@type': 'Audience',
                audienceType: 'Adults seeking complete wellness transformation',
              },
            }),
          }}
        />
      </main>
    </>
  );
}

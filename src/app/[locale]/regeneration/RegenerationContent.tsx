'use client';

import Script from 'next/script';
import './styles.css';
import HeaderTest from '@/components/regeneration/HeaderTest';
import HeroTest from '@/components/regeneration/HeroTest';
import { Footer } from '@/components/regeneration/Footer';
import { NewsletterSectionV2 } from '@/components/regeneration/NewsletterSectionV2';
import { HealthProgramsV2 } from '@/components/regeneration/HealthProgramsV2';
import { AboutV2 } from '@/components/regeneration/AboutV2';
import { ProgramsSectionV2 } from '@/components/regeneration/ProgramsSectionV2';
import { ProgrammeFonctionneV2 } from '@/components/regeneration/ProgrammeFonctionneV2';
import TestimonialsCarouselV2 from '@/components/regeneration/TestimonialsCarouselV2';
import { RewardsSectionV2 } from '@/components/regeneration/RewardsSectionV2';
import { AboutV2Reverse } from '@/components/regeneration/AboutV2Reverse';
import { ObjectivesSectionV2 } from '@/components/regeneration/ObjectivesSectionV2';
import FAQSection5 from '@/components/regeneration/FAQSection5';

export default function RegenerationContent() {
  return (
    <>
      <Script
        id="gtm-regeneration"
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
        <FAQSection5 />
        <NewsletterSectionV2 />
        <Footer />

        {/* ✅ STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Thalasso Régénération',
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
              name: 'Thalasso Régénération 5 Jours',
              description:
                'Programme thalasso régénération de 5 jours combinant 29 soins thalasso, détox profonde et revitalisation à Dakhla.',
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'MAD',
                price: '10350',
                category: 'Thalasso Treatment',
                validFrom: new Date().toISOString(),
                validThrough: '2025-12-31T23:59:59Z',
              },
              duration: 'P5D',
              category: ['Wellness', 'Spa', 'Thalasso', 'Detox', 'Regeneration'],
              audience: {
                '@type': 'Audience',
                audienceType: 'Adults seeking wellness and deep regeneration',
              },
            }),
          }}
        />
      </main>
    </>
  );
}

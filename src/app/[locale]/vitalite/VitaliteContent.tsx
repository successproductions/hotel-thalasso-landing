'use client';

import Script from 'next/script';
import './styles.css';
import HeaderTest from '@/components/vitalite/HeaderTest';
import HeroTest from '@/components/vitalite/HeroTest';
import { Footer } from '@/components/vitalite/Footer';
import { NewsletterSectionV2 } from '@/components/vitalite/NewsletterSectionV2';
import { HealthProgramsV2 } from '@/components/vitalite/HealthProgramsV2';
import { AboutV2 } from '@/components/vitalite/AboutV2';
import { ProgrammeFonctionneV2 } from '@/components/vitalite/ProgrammeFonctionneV2';
import TestimonialsCarouselV2 from '@/components/vitalite/TestimonialsCarouselV2';
import { RewardsSectionV2 } from '@/components/vitalite/RewardsSectionV2';
import { AboutV2Reverse } from '@/components/vitalite/AboutV2Reverse';

import { ObjectivesSectionV2 } from '@/components/vitalite/ObjectivesSectionV2';
import { ProgramsSection } from '@/components/vitalite/ProgramsSection';
import FAQSectionV2 from '@/components/vitalite/FAQV2';

export default function VitaliteContent() {
  return (
    <>
      <Script
        id="gtm-vitalite"
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
        <ProgramsSection />
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
              serviceType: 'Thalasso Vitalité',
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
              name: 'Thalasso Vitalité 3 Jours',
              description:
                'Programme thalasso vitalité de 3 jours combinant 14 soins thalasso, relaxation et accès spa à Dakhla.',
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'MAD',
                price: '5450',
                category: 'Thalasso Treatment',
                validFrom: new Date().toISOString(),
                validThrough: '2025-12-31T23:59:59Z',
              },
              duration: 'P3D',
              category: ['Wellness', 'Spa', 'Thalasso', 'Relaxation'],
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

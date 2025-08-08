'use client';

import { useTranslations } from 'next-intl';

export function NewsletterSection() {
  const t = useTranslations('exclusiveOffer');

  return (
    <section
      id="contact"
      className="relative h-[400px] bg-cover bg-center md:h-[500px]"
      style={{ backgroundImage: `url("/images/Piscine_thermale.png")` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 px-4 text-center">
        {/* Title */}
        <h2 className="font-serif text-3xl text-white md:text-4xl">{t('title')}</h2>

        {/* Description */}
        <p className="text-sm uppercase tracking-wide text-white/80 md:text-base">
          {t('description')}
        </p>

        {/* Next session */}
        {/* <p className="text-sm md:text-base text-white/90">
          {t("nextSession")}
        </p> */}

        {/* Just the button, no email input */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <a
            href="#accueil"
            style={{
              padding: '12px 32px',
              background: '#14b8a6',
              color: '#fff',
              fontSize: '1.325rem',
              fontWeight: 400,
              borderRadius: '9999px',
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(20,184,166,0.15)',
            }}
          >
            {t('callButton')}
          </a>
        </div>
      </div>
    </section>
  );
}

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always', // This ensures all URLs have the locale prefix
  pathnames: {
    '/': '/',
    '/evasion-holistique-3-jours': {
      fr: '/evasion-holistique-3-jours',
      en: '/evasion-holistique-3-jours',
    },
    '/evasion-holistique-5-jours': {
      fr: '/evasion-holistique-5-jours',
      en: '/evasion-holistique-5-jours',
    },
    '/evasion-holistique-7-jours': {
      fr: '/evasion-holistique-7-jours',
      en: '/evasion-holistique-7-jours',
    },
    '/legal/privacy': {
      fr: '/legal/privacy',
      en: '/legal/privacy',
    },
    '/legal/cookies': {
      fr: '/legal/cookies',
      en: '/legal/cookies',
    },
    '/legal/cgv': {
      fr: '/legal/cgv',
      en: '/legal/cgv',
    },
    '/evasion-3': {
      fr: '/evasion-3',
      en: '/evasion-3',
    },
    '/evasion-3/payment': {
      fr: '/evasion-3/payment',
      en: '/evasion-3/payment',
    },
    '/evasion-3/payment-success': {
      fr: '/evasion-3/payment-success',
      en: '/evasion-3/payment-success',
    },
    '/evasion-3/payment-error': {
      fr: '/evasion-3/payment-error',
      en: '/evasion-3/payment-error',
    },
  },
});

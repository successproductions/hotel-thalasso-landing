import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always', // This ensures all URLs have the locale prefix
  pathnames: {
    '/': '/',
    '/evasion': {
      fr: '/evasion',
      en: '/evasion',
    },
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
  },
});

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always', 
  pathnames: {
    '/': '/',
    '/evasion-holistique-3-jours': {
      fr: '/evasion-holistique-3-jours',
      en: '/evasion-holistique-3-jours'
    },
    '/legal/privacy': {
      fr: '/legal/privacy',
      en: '/legal/privacy'
    },
    '/legal/cookies': {
      fr: '/legal/cookies', 
      en: '/legal/cookies'
    },
    '/legal/cgv': {
      fr: '/legal/cgv',
      en: '/legal/cgv'
    }
  }
});
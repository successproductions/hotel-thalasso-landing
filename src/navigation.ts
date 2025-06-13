import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';

export const {
  Link,          // locale-aware <Link>
  redirect,      // locale-aware redirect()
  usePathname,   // pathname WITHOUT locale prefix
  useLocale      // current locale string
} = createLocalizedPathnamesNavigation({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed'
});

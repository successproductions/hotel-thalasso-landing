// src/navigation.ts
import {createLocalizedPathnamesNavigation} from "next-intl/navigation";

export const {
  Link,          // i18n-aware <Link>
  redirect,      // i18n-aware redirect()
  usePathname,   // current pathname *without* locale prefix
  useLocale,     // "en" | "fr"
  useTranslations
} = createLocalizedPathnamesNavigation({
  locales: ["fr", "en"],       // keep in sync with next-intl.config.ts
  localePrefix: "as-needed"    // remove if you use "always"
});

import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Provide a fallback if locale is undefined
  const validLocale = locale || 'fr';

  // Validate that the locale is one of our supported locales
  if (!['fr', 'en'].includes(validLocale)) {
    console.warn(`Invalid locale "${validLocale}", falling back to 'fr'`);
    return {
      locale: 'fr',
      messages: (await import(`./src/messages/fr.json`)).default,
    };
  }

  try {
    return {
      locale: validLocale,
      messages: (await import(`./src/messages/${validLocale}.json`)).default,
    };
  } catch (error) {
    console.error(
      `Failed to load messages for locale "${validLocale}", falling back to 'fr'`,
      error,
    );
    return {
      locale: 'fr',
      messages: (await import(`./src/messages/fr.json`)).default,
    };
  }
});

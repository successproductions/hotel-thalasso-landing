import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const resolvedLocale = locale ?? 'fr'; 
  return {
    locales: ['fr', 'en'],
     defaultLocale:  'fr', 
    messages: (await import(`./src/messages/${resolvedLocale}.json`)).default,
    locale: resolvedLocale
  };
});

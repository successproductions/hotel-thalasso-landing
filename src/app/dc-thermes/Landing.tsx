import App from '@/dc-thermes/App';
import type { Funnel, Lang } from '@/dc-thermes/types';
import { landingStructuredData } from './seo';

export default function Landing({ lang, funnel = 'main' }: { lang: Lang; funnel?: Funnel }) {
  return (
    <>
      <link rel="preload" as="image" href="/images/dc-thermes/piscine-thermale.webp" fetchPriority="high" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: landingStructuredData(lang) }}
      />
      <App lang={lang} funnel={funnel} />
    </>
  );
}

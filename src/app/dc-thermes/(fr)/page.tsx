import Landing from '../Landing';
import { landingMetadata, landingViewport } from '../seo';

export const metadata = landingMetadata('fr');
export const viewport = landingViewport;

export default function Page() {
  return <Landing lang="fr" />;
}

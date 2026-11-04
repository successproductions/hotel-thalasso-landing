import Landing from '../../Landing';
import { landingMetadata, landingViewport } from '../../seo';

export const metadata = landingMetadata('en', 'cmi');
export const viewport = landingViewport;

export default function Page() {
  return <Landing lang="en" funnel="cmi" />;
}

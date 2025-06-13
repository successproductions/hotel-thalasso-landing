// next.config.ts
import withNextIntl from 'next-intl/plugin';
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**'}]
  }
};

export default withNextIntl('./next-intl.config.ts')(nextConfig);

import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // swcMinify supprimé (déprécié dans Next.js 15)
  
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/fr/evasion-holistique-3-jours',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.offer.dakhlaclub.com' }],
        destination: 'https://offer.dakhlaclub.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl('./next-intl.config.ts')(nextConfig);
import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1️⃣ Turn on Next.js’s built-in minifier
  swcMinify: true,

  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },

  // 2️⃣ Add both redirects here
  async redirects() {
    return [
      // ——————————————————————————————
      // Redirect root → your FR landing page
      {
        source: '/',
        destination: '/fr/evasion-holistique-3-jours',
        permanent: true,
      },
      // ——————————————————————————————
      // Redirect any www host → non-www (preserving path)
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

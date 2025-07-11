import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },

  async redirects() {
    return [
      // Root redirect
      {
        source: '/',
        destination: '/fr/evasion-holistique-3-jours',
        permanent: true,
      },
      // WWW to non-WWW redirect
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.offer.dakhlaclub.com' }],
        destination: 'https://offer.dakhlaclub.com/:path*',
        permanent: true,
      },
      // Handle old URLs that might be causing 404s
      {
        source: '/evasion-holistique-3-jours',
        destination: '/fr/evasion-holistique-3-jours',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
          // Canonical header for www/non-www
          {
            key: 'Link',
            value: '<https://offer.dakhlaclub.com>; rel="canonical"',
          },
        ],
      },
    ];
  },

  // Enable compression and optimization
  compress: true,
  poweredByHeader: false,
  
  // Webpack optimization for minification
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: false,
      };
    }
    return config;
  },
  
  // Ensure trailing slash consistency
  trailingSlash: false,
};

export default withNextIntl('./next-intl.config.ts')(nextConfig);
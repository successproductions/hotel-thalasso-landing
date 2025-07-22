import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  
  compress: true,
  poweredByHeader: false,

  // Simplified webpack config to avoid build errors
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    domains: ['images.unsplash.com', 'api.qrserver.com'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.offer.dakhlaclub.com' }],
        destination: 'https://offer.dakhlaclub.com/:path*',
        permanent: true,
      },
      {
        source: '/',
        destination: '/fr/evasion-holistique-3-jours',
        permanent: true,
      },
      {
        source: '/evasion-holistique-3-jours',
        destination: '/fr/evasion-holistique-3-jours',
        permanent: true,
      },
      {
        source: '/evasion-holistique-5-jours',
        destination: '/fr/evasion-holistique-5-jours',
        permanent: true,
      },
      {
        source: '/fr',
        destination: '/fr/evasion-holistique-3-jours',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/en/evasion-holistique-3-jours',
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
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Cache headers for static assets
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl('./next-intl.config.ts')(nextConfig);
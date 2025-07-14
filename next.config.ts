// next.config.ts - FIXED WWW Canonicalization
import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Basic optimizations only
  compress: true,
  poweredByHeader: false,

  // FIXED: Enhanced webpack optimization for minification
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      
      // Enable production optimizations
      if (config.mode === 'production') {
        config.optimization = {
          ...config.optimization,
          minimize: true,
          sideEffects: false,
        };
      }
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
      // Handle HTTP to HTTPS redirect for www
      {
        source: '/:path*',
        has: [
          { type: 'header', key: 'x-forwarded-proto', value: 'http' },
          { type: 'host', value: 'www.offer.dakhlaclub.com' }
        ],
        destination: 'https://offer.dakhlaclub.com/:path*',
        permanent: true,
      },
      // Root redirect
      {
        source: '/',
        destination: '/fr/evasion-holistique-3-jours',
        permanent: true,
      },
      // Handle old URLs
      {
        source: '/evasion-holistique-3-jours',
        destination: '/fr/evasion-holistique-3-jours',
        permanent: true,
      },
      // Add missing trailing slash redirects
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
          // FIXED: Enhanced SEO headers
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          // ADDED: Canonical enforcement
          {
            key: 'Link',
            value: '<https://offer.dakhlaclub.com>; rel="canonical"',
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
          // ADDED: Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      // ENHANCED: Cache headers for static assets with compression
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
      // ADDED: Cache headers for JS/CSS files
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Vary',
            value: 'Accept-Encoding',
          },
        ],
      },
    ];
  },

  // ADDED: Experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default withNextIntl('./next-intl.config.ts')(nextConfig);
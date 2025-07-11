import withNextIntl from 'next-intl/plugin';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Remove unoptimized for better SEO
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['images.unsplash.com', 'api.qrserver.com'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  async redirects() {
    return [
      // WWW to non-WWW redirect (CRITICAL FIX)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.offer.dakhlaclub.com' }],
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
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
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
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Enable compression and optimization
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  
  // Webpack optimization for better performance
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: {
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    // Add bundle analyzer in development
    if (dev) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': './src',
      };
    }
    
    return config;
  },
  
  // Ensure trailing slash consistency
  trailingSlash: false
};

export default withNextIntl('./next-intl.config.ts')(nextConfig);

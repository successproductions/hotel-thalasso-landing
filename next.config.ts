import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // tell Next.js which external hosts you're pulling images from
  images: {
    domains: [
      'images.unsplash.com',
      // any other domains you use...
    ],
  },
  eslint: {
    // (optional) skip ESLint errors during Vercel builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

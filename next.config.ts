import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/work', destination: '/experience', permanent: true },
      { source: '/ideas', destination: '/projects', permanent: true },
      { source: '/articles', destination: '/writing', permanent: true },
      { source: '/posts', destination: '/writing', permanent: true },
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/cv', destination: '/resume', permanent: true },
    ];
  },
};

export default nextConfig;

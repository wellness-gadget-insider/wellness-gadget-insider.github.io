// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/I/**',
      }
    ],
    minimumCacheTTL: 3600,
  },
  experimental: {
    serverActions: {}, // Keep as empty object
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0'
          },
          {
            key: 'X-Robots-Tag',
            value: 'all, index, follow'
          }
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    return config;
  },
};

// Force dynamic rendering for all routes
export const dynamic = 'force-dynamic';
export default nextConfig;
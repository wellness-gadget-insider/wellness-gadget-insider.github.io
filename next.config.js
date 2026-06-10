// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', 
  reactStrictMode: true,

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        pathname: '/images/I/**',
      }
    ],
    minimumCacheTTL: 3600,
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

// Use modern ES module export since package.json has "type": "module"
export default nextConfig;
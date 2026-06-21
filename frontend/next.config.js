/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@tilevista/types"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
    ],
  },
  webpack: (config) => {
    config.externals.push({
      canvas: 'canvas',
    });
    return config;
  },
};

module.exports = nextConfig;

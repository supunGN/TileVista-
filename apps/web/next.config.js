/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Tell Next.js to transpile our shared monorepo packages
  transpilePackages: [
    "@tilevista/types",
    "@tilevista/utils",
    "@tilevista/ui",
    "@tilevista/three-core"
  ],
  webpack: (config) => {
    // Enable GLSL and model loaders if needed in future
    config.externals.push({
      canvas: 'canvas',
    });
    return config;
  },
};

module.exports = nextConfig;

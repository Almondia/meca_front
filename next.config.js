const { withPlaiceholder } = require('@plaiceholder/next');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 322, 384],
    deviceSizes: [576, 732, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'my-meca.s3.ap-northeast-2.amazonaws.com',
      },
    ],
    minimumCacheTTL: 3600,
  },
  experimental: {
    scrollRestoration: true,
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(withPlaiceholder(nextConfig));

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
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/api/v1/:path*',
      },
      {
        source: '/api/v2/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/api/v2/:path*',
      },
    ];
  },
  images: {
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [576, 732, 1080],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*-meca.s3.ap-northeast-2.amazonaws.com',
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
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = withBundleAnalyzer(withPlaiceholder(nextConfig));

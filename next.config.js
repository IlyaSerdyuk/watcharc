/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: true,
  },
  serverExternalPackages: ['knex'],
  rewrites() {
    return [
      {
        source: '/:lng/brands/:letter([a-z8])',
        destination: '/:lng/brands/:letter',
      },
      {
        source: '/:lng/brands/:country([a-z]{3})',
        destination: '/:lng/brands/countries/:country',
      },
    ];
  },
  redirects() {
    return [
      {
        source: '/:lng/brand',
        destination: '/:lng/brands',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

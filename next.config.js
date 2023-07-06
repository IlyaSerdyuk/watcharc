/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['knex'],
  },
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
};

module.exports = nextConfig;

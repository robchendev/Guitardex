/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  images: {
    domains: ["placekitten.com"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig;

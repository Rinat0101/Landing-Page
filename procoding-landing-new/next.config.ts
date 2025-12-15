/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['docker-image-production-b2d9.up.railway.app'],
  },
};

module.exports = nextConfig;
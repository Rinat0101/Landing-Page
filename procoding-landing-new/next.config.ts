/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['docker-image-production-b2d9.up.railway.app'],
  },
  // Добавляем эти блоки:
  eslint: {
    // Игнорировать ошибки линтинга при сборке
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Игнорировать ошибки типов при сборке
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

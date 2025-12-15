import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    locales: ["en", "ru"],
    defaultLocale: "en",
  },
  images: {
    domains: ['docker-image-production-b2d9.up.railway.app'],
  },
};

export default nextConfig;

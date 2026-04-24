import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://*.vercel-storage.com/**")],
  },
  cacheComponents: true,
  cacheLife: {
    articles: {
      stale: 60 * 60, // 1 Hour
      revalidate: 60 * 10 * 24, // 10 Mins
      expire: 60 * 60 * 24 * 1, // 1 Hour
    },
  },
};

export default nextConfig;

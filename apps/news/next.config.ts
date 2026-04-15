import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://*.vercel-storage.com/**")],
  },
};

export default nextConfig;

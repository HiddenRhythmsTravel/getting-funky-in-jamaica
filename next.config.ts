import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    VERCEL_TOOLBAR: "0",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

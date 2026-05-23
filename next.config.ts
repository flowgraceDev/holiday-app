// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "75mb",
    },
  },

  images: {
    unoptimized: true,

    formats: ["image/avif", "image/webp"],

    qualities: [20, 30, 50, 60, 65, 70, 75, 80, 90],

    minimumCacheTTL: 31536000,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "krgkizrmxchabjvorbqg.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
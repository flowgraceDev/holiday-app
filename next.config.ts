// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "75mb",
    },
  },
    images: {
      formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
      unoptimized: true,
      qualities:  [20, 30, 60, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "krgkizrmxchabjvorbqg.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
}

export default nextConfig
// next.config.ts
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
    images: {
      unoptimized: true,
      qualities: [75, 90],
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
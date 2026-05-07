import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ginhyuzlyadfzhvkdlxv.supabase.co",
      },
    ],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;

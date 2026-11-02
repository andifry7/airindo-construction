import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Bisa diarahkan ke folder lain lewat env (mis. saat folder .next terkunci).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Gambar proyek & logo klien kini dilayani Cloudinary.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

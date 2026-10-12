import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Lets E2E runs use their own build folder so they never clash with `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  async rewrites() {
    return [
      {
        source: "/deel",
        destination: "/plataformas/deel",
      },
      {
        source: "/rippling",
        destination: "/plataformas/rippling",
      },
      {
        source: "/upwork",
        destination: "/plataformas/upwork",
      },
      {
        source: "/remote",
        destination: "/plataformas/remote",
      },
      {
        source: "/google-adsense",
        destination: "/plataformas/google-adsense",
      },
      {
        source: "/apple-developer",
        destination: "/plataformas/apple-developer",
      },
      {
        source: "/steam",
        destination: "/plataformas/steam",
      },
      {
        source: "/github-sponsors",
        destination: "/plataformas/github-sponsors",
      },
      {
        source: "/stripe",
        destination: "/plataformas/stripe",
      },
    ];
  },
};

export default nextConfig;


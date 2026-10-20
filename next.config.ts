import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.7"],
  async redirects() {
    return [
      { source: "/works/:slug", destination: "/works/:slug/index.html", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["motion", "lenis"],
  },
};

export default nextConfig;

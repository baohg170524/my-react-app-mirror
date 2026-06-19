import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.sealswp391.xyz/api/:path*",
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.eduadminsoft.shop/:path*",
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow importing from parent app directory for game data
  transpilePackages: [],
  // Use turbopack (Next.js 16 default)
  turbopack: {
    root: ".",
  },
};

export default nextConfig;

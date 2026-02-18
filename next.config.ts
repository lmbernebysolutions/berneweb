import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
  },
  async redirects() {
    return [
      { source: "/legal/impressum", destination: "/impressum", permanent: true },
      { source: "/legal/datenschutz", destination: "/datenschutz", permanent: true },
    ];
  },
};

export default nextConfig;

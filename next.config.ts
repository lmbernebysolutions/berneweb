import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
    inlineCss: true,
  },
  async redirects() {
    return [
      { source: "/legal/impressum", destination: "/impressum", permanent: true },
      { source: "/legal/datenschutz", destination: "/datenschutz", permanent: true },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

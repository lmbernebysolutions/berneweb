import type { NextConfig } from "next";
import path from "node:path";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });
const isDevelopment = process.env.NODE_ENV !== "production";
const scriptSrc = isDevelopment
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com"
  : "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com";

const cspHeader = [
  "default-src 'self'",
  scriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "frame-src 'self' https://www.openstreetmap.org",
  // GA4 Measurement + Notion API (server-side, aber CORS-Header für Preflight)
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.notion.com",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  turbopack: { root: path.join(__dirname) },
  productionBrowserSourceMaps: false,
  // Force module resolution from this app dir so "tailwindcss" etc. resolve when project root is parent (e.g. workspace).
  webpack: (config, { dir }) => {
    const appNodeModules = path.join(path.resolve(dir), "node_modules");
    config.resolve ??= {};
    const existing = Array.isArray(config.resolve.modules) ? config.resolve.modules : ["node_modules"];
    config.resolve.modules = [appNodeModules, ...existing];
    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
    inlineCss: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-XSS-Protection", value: "0" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: cspHeader },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/legal/impressum", destination: "/impressum", permanent: true },
      { source: "/legal/datenschutz", destination: "/datenschutz", permanent: true },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);

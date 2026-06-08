import type { NextConfig } from "next";

const config: NextConfig = {
 

  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
        { protocol: "https", hostname: "assest.horizonnepalconstruction.com" },
                { protocol: "https", hostname: "pub-a19a6c84befd4048bbb715b4a6d4f307.r2.dev" },
    ],
  },




  experimental: {
    optimizePackageImports: ["lucide-react"],

  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default config;

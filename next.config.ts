import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,

  // PPR + use cache — caches component output, data always fresh
  cacheComponents: true,
  cacheLife: {
    minutes: {
      stale: 60,
      revalidate: 60,
      expire: 1800,
    },
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.horizonnepalconstruction.com" },
            { protocol: "https", hostname: "assest.horizonnepalconstruction.com" },
      { protocol: "https", hostname: "pub-a19a6c84befd4048bbb715b4a6d4f307.r2.dev" },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
    staleTimes: { dynamic: 30, static: 180 },
    inlineCss: true,
    staticGenerationMaxConcurrency: 8,
  },

  compiler: {
       removeConsole: {
      exclude: ["error", "warn"],
    },
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
          { key: "Permissions-Policy", value: "geolocation=()" },
          { key: "Cache-Control", value: "public, max-age=0, s-maxage=60, stale-while-revalidate=300" },
                  {
            key: "Link",
            value: "<https://assets.horizonnepalconstruction.com>; rel=preconnect",
          },
        ],
      },
      {
        source: "/:path*.(jpg|jpeg|png|webp|avif|svg|ico|css|js)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default config;

import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const config: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.horizonnepalconstruction.com" },
      { protocol: "https", hostname: "www.instagram.com" },
  
    ],
  },



  experimental: {
    optimizePackageImports: ["lucide-react"],
    inlineCss: true,
    staleTimes: { dynamic: 30, static: 180 },
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
            value: "<https://assets.horizonnepalconstruction.com>; rel=preconnect, </sitemap.xml>; rel=\"sitemap\", </.well-known/api-catalog>; rel=\"api-catalog\"",
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
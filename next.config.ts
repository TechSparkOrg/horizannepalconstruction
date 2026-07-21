import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "assets.horizonnepalconstruction.com" },
      { protocol: "https", hostname: "www.instagram.com" },
    ],
  },

  compiler: {
    removeConsole: true,
  },

  experimental: {
    inlineCss: true,
    staleTimes: { dynamic: 60, static: 180 },
    staticGenerationMaxConcurrency: 8,
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
    ];
  },
};

export default config;

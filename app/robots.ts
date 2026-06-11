import type { MetadataRoute } from "next";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/favicon.png", "/favicon.icon"], // Ensures Google's image crawler can always grab your icons
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
import type { MetadataRoute } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
const SITE_URL = API_URL.replace(/\/api\/?$/, "");

const PAGES = [
  { path: "", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/contact", priority: 0.7 },
  { path: "/our-work", priority: 0.9 },
  { path: "/blog", priority: 0.8 },
  { path: "/faq", priority: 0.6 },
  { path: "/design", priority: 0.7 },
  { path: "/how-we-work", priority: 0.7 },
  { path: "/cost-estimation", priority: 0.6 },
  { path: "/floor-planner", priority: 0.6 },
  { path: "/green-calculator", priority: 0.6 },
  { path: "/building-permit", priority: 0.6 },
  { path: "/vastu-shastra", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: page.priority,
  }));
}

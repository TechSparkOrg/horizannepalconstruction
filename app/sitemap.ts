import type { MetadataRoute } from "next";
import { getBlogs } from "@/api/cached/blog";
import { getProjects } from "@/api/cached/project";
import { getModels } from "@/api/cached/model3d";
import { getPages } from "@/api/cached/page";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://horizonnepalconstruction.com"
).replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/our-work`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/design`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/how-we-work`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/cost-estimation`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/floor-planner`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/green-calculator`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/building-permit`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/vastu-shastra`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const [blogsRes, projectsRes, modelsRes, pagesRes] = await Promise.allSettled([
    getBlogs(),
    getProjects(),
    getModels(),
    getPages(),
  ]);

  const blogEntries: MetadataRoute.Sitemap = blogsRes.status === "fulfilled"
    ? blogsRes.value.results.map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: new Date(p.updated_at || p.date || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })) : [];

  const projectEntries: MetadataRoute.Sitemap = projectsRes.status === "fulfilled"
    ? projectsRes.value.results.map((p) => ({
        url: `${SITE_URL}/project-details/${p.slug}`,
        lastModified: new Date(p.updated_at || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })) : [];

  const modelEntries: MetadataRoute.Sitemap = modelsRes.status === "fulfilled"
    ? modelsRes.value.results.map((m) => ({
        url: `${SITE_URL}/models/${m.slug}`,
        lastModified: new Date(m.updated_at || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })) : [];

  const pageEntries: MetadataRoute.Sitemap = pagesRes.status === "fulfilled"
    ? pagesRes.value.map((p) => ({
        url: `${SITE_URL}/pages/${p.slug}`,
        lastModified: new Date(p.updated_at || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })) : [];

  return [...staticPages, ...blogEntries, ...projectEntries, ...modelEntries, ...pageEntries];
}
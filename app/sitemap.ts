import type { MetadataRoute } from "next";
import { getBlogsSafe } from "@/api/services/blog.service";
import { getProjectsListSafe } from "@/api/services/project.service";
import { getModelsSafe } from "@/api/services/model3d.service";


const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://horizonnepalconstruction.com"
).replace(/\/+$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/request`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/faq`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/design`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/cost-estimation`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/floor-planner`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/building-permit`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/vastu-shastra`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const [blogsRes, projectsRes, modelsRes] = await Promise.all([
    getBlogsSafe(),
    getProjectsListSafe(),
    getModelsSafe(),
  ]);

  const blogEntries: MetadataRoute.Sitemap = blogsRes.length > 0
    ? blogsRes.map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: new Date(p.updated_at || p.date || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })) : [];

  const projectEntries: MetadataRoute.Sitemap = projectsRes.length > 0
    ? projectsRes.map((p) => ({
        url: `${SITE_URL}/project-details/${p.slug}`,
        lastModified: new Date(p.updated_at || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })) : [];

  const modelEntries: MetadataRoute.Sitemap = modelsRes.results.length > 0
    ? modelsRes.results.map((m) => ({
        url: `${SITE_URL}/models/${m.slug}`,
        lastModified: new Date(m.updated_at || Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })) : [];



  return [...staticPages, ...blogEntries, ...projectEntries, ...modelEntries];
}
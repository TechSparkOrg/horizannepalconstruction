import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { DesignHero } from "@/components/page_ui/DesignHero";
import { DesignServices } from "@/components/page_ui/DesignServices";
import { HowWeWorkDesignGrid } from "@/components/page_ui/HowWeWorkDesignGrid";
import { DesignShowcaseSection } from "@/components/page_ui/DesignShowcaseSection";
import { getProjects } from "@/api/services/project.service";
import { getModels } from "@/api/services/model3d.service";
import { getCategories } from "@/api/services/category.service";
import { getPageBySlug } from "@/api/services/page.service";
import { LdJson } from "@/components/global_ui/JsonLd";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";

const Design3DShowcase = dynamic(() => import("@/components/page_ui/Design3DShowcase").then(m => ({ default: m.Design3DShowcase })));
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then(m => ({ default: m.ConsultationForm })));
const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"))

const SLUG = "design"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch(() => null)
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Design | Horizan Nepal",
    description: page?.meta_description || "Explore Horizan Nepal's architectural design services — from conceptual 2D floor plans to stunning 3D visualizations.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Design | Horizan Nepal",
      description: page?.meta_description || "Explore Horizan Nepal's architectural design services — 2D plans and 3D visualizations.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

function modelSrc(file: string) {
  if (!file) return "";
  if (file.startsWith("/") || file.startsWith("http")) return file;
  return `/glb/${file}`;
}

export default async function DesignPage() {
  const [pageData, projectsRes, modelsRes, categoriesRes] = await Promise.allSettled([
    getPageBySlug(SLUG),
    getProjects(),
    getModels(),
    getCategories(),
  ]);
  const page = pageData.status === "fulfilled" ? pageData.value : null
  const categories = categoriesRes.status === "fulfilled" ? categoriesRes.value.results ?? [] : [];

  let modelCards: { key: string; src: string; title: string; subtitle?: string; href?: string }[];
  if (projectsRes.status === "fulfilled" || modelsRes.status === "fulfilled") {
    const cards: { key: string; src: string; title: string; subtitle?: string; href?: string }[] = [];
    if (projectsRes.status === "fulfilled") {
      for (const p of projectsRes.value.results ?? []) {
        if (!p.file) continue;
        cards.push({
          key: `project-${p.slug}`,
          src: modelSrc(p.file),
          title: p.title,
          subtitle: p.location,
          href: `/project-details/${p.slug}`,
        });
      }
    }
    if (modelsRes.status === "fulfilled") {
      const knownSlugs = new Set(cards.map((c) => c.key));
      for (const m of modelsRes.value.results ?? []) {
        if (!m.url) continue;
        const key = `model-${m.slug || m.id}`;
        if (knownSlugs.has(key)) continue;
        cards.push({
          key,
          src: m.url,
          title: m.title || "3D Model",
          subtitle: m.description || "",
          href: m.slug ? `/models/${m.slug}` : undefined,
        });
      }
    }
    modelCards = cards;
  }
  modelCards ??= [];

  return (
    <>
      <LdJson data={breadcrumbList("Design", "design")} />
      <DesignHero />
      <DesignServices />
      <HowWeWorkDesignGrid />
      <DesignShowcaseSection />
      <Design3DShowcase initialItems={modelCards} />
      <ConsultationForm initialCategories={categories} />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <BlogContent content={page.content} />
        </div>
      )}
    </>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { cacheLife } from "next/cache";
import { DesignHero } from "@/components/page_ui/DesignHero";
import { DesignServices } from "@/components/page_ui/DesignServices";
import { HowWeWorkDesignGrid } from "@/components/page_ui/HowWeWorkDesignGrid";
import { DesignShowcaseSection } from "@/components/page_ui/DesignShowcaseSection";
import { getProjects } from "@/api/services/project.service";
import { getModels } from "@/api/services/model3d.service";
import { getDesignModels } from "@/api/services/model3d.service";
import { getCategories } from "@/api/services/category.service";
import { getPageBySlug } from "@/api/services/page.service";
import { LdJson } from "@/components/global_ui/JsonLd";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import Image from "next/image";
import Link from "next/link";

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
      <ViewportSection fallback={<div className="py-16 sm:py-24 bg-[#f8fafc] min-h-[400px]" />}>
        <Suspense fallback={<div className="py-16 sm:py-24 bg-[#f8fafc] min-h-[400px]" />}>
          <DesignModelsGrid />
        </Suspense>
      </ViewportSection>
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

async function DesignModelsGrid() {
  "use cache";
  cacheLife("default");
  const res = await getDesignModels().catch(() => ({ results: [] }));
  const models = res.results ?? [];
  if (models.length === 0) return null;

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-10">
          <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-3 flex items-center gap-2.5">
            <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />3D Designs
          </p>
          <h2 className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.5rem)" }}>
            Explore 3D Models
          </h2>
          <p className="mt-3 text-[#64748b] text-[14.5px] leading-relaxed">
            Interactive 3D visualizations of our architectural projects.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {models.map((m) => (
            <Link key={m.id} href={m.project?.slug ? `/project-details/${m.project.slug}` : "#"}
              className="group flex flex-col bg-white rounded-xl border border-[#e2e8f0] overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative aspect-video overflow-hidden bg-[#0f2557]/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#94a3b8]">3D Model</p>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col gap-2">
                <h3 className="font-display font-bold text-[#0f2557] text-[15px] leading-snug group-hover:text-[#cd2028] transition-colors line-clamp-1">
                  {m.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {m.category && (
                    <span className="inline-flex items-center h-6 px-2.5 rounded-full bg-[#eff6ff] text-[10px] font-semibold text-[#1d4ed8] capitalize">
                      {m.category.name}
                    </span>
                  )}
                  {m.project && (
                    <span className="text-[12px] text-[#64748b]">{m.project.name}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

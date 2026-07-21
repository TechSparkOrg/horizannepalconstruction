import { Suspense } from "react";
import type { Metadata } from "next";
import { DesignHero } from "@/components/page_ui/DesignHero";
import { ProjectCategoriesGrid } from "@/components/page_ui/ProjectCategoriesGrid";
import { getPageBundle } from "@/api/services/page-bundle.service";
import { LdJson } from "@/components/global_ui/JsonLd";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";
import { DesignContent } from "./_content";
import type { Page } from "@/api/types/page.types";
import type { DesignModel } from "@/api/types/model3d.types";
import type { Category } from "@/api/types/category.types";
import type { FaqItem } from "@/api/types/faq.types";

interface DesignBundle {
  page: Page | null;
  models: { results: DesignModel[] };
  categories: { results: Category[] };
  faqs: FaqItem[];
}

const SLUG = "design"

export async function generateMetadata(): Promise<Metadata> {
  const bundle = await getPageBundle<DesignBundle>(SLUG, "design", { include: ["page", "models", "categories", "faqs"] })
  const page = bundle.page
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
    robots: { index: true, follow: true },
    twitter: {
      card: "summary_large_image",
      title: page?.meta_title || "Design | Horizan Nepal",
      description: page?.meta_description || "Explore Horizan Nepal's architectural design services",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function DesignPage() {
  const bundle = await getPageBundle<DesignBundle>(SLUG, "design", { include: ["page", "models", "categories", "faqs"] })
  const pageData = bundle.page ?? null
  const categories = bundle.categories?.results ?? []

  const modelCards = (bundle.models?.results ?? []).map((m) => ({
    key: m.id,
    src: m.url,
    title: m.title,
    subtitle: m.category?.name || m.project?.name || m.blog?.name || "",
    href: m.project?.slug ? `/project-details/${m.project.slug}` : m.blog?.slug ? `/blog/${m.blog.slug}` : undefined,
  }))

  return (
    <>
      <h1 className="sr-only">{pageData?.title || "Design — Horizan Nepal"}</h1>
      <LdJson data={breadcrumbList("Design", "design")} />
      <link rel="preload" as="image" href="/video-gif/Rumble.svg" fetchPriority="high" />
      <DesignHero />
      <Suspense fallback={
        <section className="bg-[#f8fafc] pt-16 sm:pt-24 pb-0 min-h-[500px] animate-pulse">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-6 mb-10">
              <div className="max-w-xl space-y-3">
                <div className="h-3 w-24 rounded-full bg-muted-foreground/20" />
                <div className="h-8 w-48 rounded-lg bg-muted-foreground/15" />
                <div className="h-4 w-64 rounded bg-muted-foreground/10" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[1px] rounded-2xl overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-5 sm:p-6 space-y-3">
                  <div className="size-10 sm:size-11 rounded-xl bg-muted-foreground/15" />
                  <div className="space-y-2">
                    <div className="h-4 w-24 rounded bg-muted-foreground/15" />
                    <div className="h-3 w-32 rounded bg-muted-foreground/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      }>
        <ProjectCategoriesGrid />
      </Suspense>
      <Suspense fallback={
        <div className="py-16 sm:py-24 bg-[#f8fafc] animate-pulse" style={{ minHeight: 2600 }}>
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="mx-auto max-w-xl text-center space-y-3">
              <div className="mx-auto h-4 w-24 rounded-full bg-muted-foreground/20" />
              <div className="mx-auto h-8 w-48 rounded-lg bg-muted-foreground/15" />
              <div className="mx-auto h-4 w-64 rounded bg-muted-foreground/10" />
            </div>
            <div className="h-[300px] rounded-2xl bg-muted-foreground/10" />
            <div className="h-[200px] rounded-2xl bg-muted-foreground/10" />
            <div className="h-[200px] rounded-2xl bg-muted-foreground/10" />
          </div>
        </div>
      }>
        <DesignContent page={pageData} modelCards={modelCards} categories={categories} svgItems={pageData?.svg_items} bundle={bundle} />
      </Suspense>
    </>
  )
}

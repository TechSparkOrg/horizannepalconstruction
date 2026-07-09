import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBuildingPermitSingle as getBuildingPermit } from "@/api/services/building-permit.service";
import { getPageBySlug } from "@/api/services/page.service";
import { LdJson } from "@/components/global_ui/JsonLd";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";
import { LazyPlane } from "@/components/viewport/LazyPlane";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { AboutFaqAsync } from "@/components/sections/about-sections";
import BuildingPermitClient from "./_client";

const SLUG = "building-permit"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch(() => null)
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Building Permit Assistant | Horizan Nepal",
    description: page?.meta_description || "Navigate Nepal's building permit process with confidence. Step-by-step workflow guide, document checklist, regulations, and municipality directory for construction permits.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Building Permit Assistant | Horizan Nepal",
      description: page?.meta_description || "Navigate Nepal's building permit process with confidence. Step-by-step workflow guide, document checklist, and municipality directory.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function BuildingPermitPage() {
  const [page, config] = await Promise.all([
    getPageBySlug(SLUG).catch(() => null),
    getBuildingPermit().catch(() => null),
  ])
  if (!config) notFound()

  return (
    <>
      <LazyPlane />
      <LdJson data={breadcrumbList("Building Permit", "building-permit")} />
      <h1 className="sr-only">Building Permit Assistant — Horizan Nepal</h1>
      <BuildingPermitClient config={config} page={page} />
      {page?.faq_group_slug && (
        <ViewportSection fallback={<div className="py-16 bg-white" />}>
          <Suspense fallback={<div className="py-16 bg-white" />}>
            <AboutFaqAsync faqGroupSlug={page.faq_group_slug} />
          </Suspense>
        </ViewportSection>
      )}
    </>
  );
}

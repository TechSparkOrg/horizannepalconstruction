import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBuildingPermitSingle as getBuildingPermit } from "@/api/services/building-permit.service";
import { getPageBySlug } from "@/api/services/page.service";
import { LdJson } from "@/components/global_ui/JsonLd";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";
import BuildingPermitClient from "./_client";

const SLUG = "building-permit"
const pagePromise = getPageBySlug(SLUG).catch(() => null)
const configPromise = getBuildingPermit().catch(() => null)

export async function generateMetadata(): Promise<Metadata> {
  const page = await pagePromise
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
  const [page, config] = await Promise.all([pagePromise, configPromise])
  if (!config) notFound()

  return (
    <>
      <LdJson data={breadcrumbList("Building Permit", "building-permit")} />
      <h1 className="sr-only">Building Permit Assistant — Horizan Nepal</h1>
      <BuildingPermitClient config={config} page={page} />
    </>
  );
}

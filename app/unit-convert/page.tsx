import type { Metadata } from "next";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase, getSiteUrl } from "@/lib/seo-utils";
import { LazyPlane } from "@/components/viewport/LazyPlane";
import { UnitConvertClient } from "./_client";

const SLUG = "unit-convert"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch(() => null)
  const base = pageMetadataBase(page, SLUG)
  const url = `${getSiteUrl()}/${SLUG}`
  return {
    title: page?.meta_title || "Unit Converter | Horizan Nepal",
    description: page?.meta_description || "Convert construction measurements and units — length, area, volume, and weight with Horizan Nepal's unit converter.",
    alternates: { canonical: url },
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Unit Converter | Horizan Nepal",
      description: page?.meta_description || "Convert construction measurements and units with Horizan Nepal's unit converter.",
      type: "website",
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: page?.meta_title || "Unit Converter | Horizan Nepal",
      description: page?.meta_description || "Convert construction measurements and units with Horizan Nepal's unit converter.",
    },
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function UnitConvertPage() {
  const page = await getPageBySlug(SLUG).catch(() => null)

  return (
    <>
      <LazyPlane />
      <h1 className="sr-only">{page?.title || "Unit Converter — Horizan Nepal"}</h1>
      <UnitConvertClient page={page} />
    </>
  );
}

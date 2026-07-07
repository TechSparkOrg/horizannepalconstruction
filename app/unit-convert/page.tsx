import type { Metadata } from "next";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase } from "@/lib/seo-utils";
import { UnitConvertClient } from "./_client";

const SLUG = "unit-convert"
const pagePromise = getPageBySlug(SLUG).catch(() => null)

export async function generateMetadata(): Promise<Metadata> {
  const page = await pagePromise
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Unit Converter | Horizan Nepal",
    description: page?.meta_description || "Convert construction measurements and units with Horizan Nepal's easy-to-use unit converter.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Unit Converter | Horizan Nepal",
      description: page?.meta_description || "Convert construction measurements and units with Horizan Nepal's easy-to-use unit converter.",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function UnitConvertPage() {
  const page = await pagePromise

  return (
    <>
      <h1 className="sr-only">{page?.title || "Unit Converter — Horizan Nepal"}</h1>
      <UnitConvertClient page={page} />
    </>
  );
}

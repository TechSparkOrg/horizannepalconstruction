import type { Metadata } from "next";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase } from "@/lib/seo-utils";
import { MaterialClient } from "./_client";

const SLUG = "material"
const pagePromise = getPageBySlug(SLUG).catch(() => null)

export async function generateMetadata(): Promise<Metadata> {
  const page = await pagePromise
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Construction Materials | Horizan Nepal",
    description: page?.meta_description || "Explore high-quality construction materials from trusted partners across Nepal. Find pricing, specifications, and supplier details for your project.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Construction Materials | Horizan Nepal",
      description: page?.meta_description || "Explore high-quality construction materials from trusted partners across Nepal.",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function MaterialPage() {
  const page = await pagePromise

  return (
    <>
      <h1 className="sr-only">{page?.title || "Construction Materials — Horizan Nepal"}</h1>
      <MaterialClient page={page} />
    </>
  );
}

import type { Metadata } from "next";
import { Suspense, cache } from "react";
import dynamic from "next/dynamic";
import { getPageBySlug } from "@/api/services/page.service";
import { EmiContent } from "./_content";

import { siteUrl } from "@/lib/constants";
const EmiCalculatorClient = dynamic(() => import("./EmiCalculatorClient"));
const SLUG = "emi-calculator";
const getPage = cache(() => getPageBySlug(SLUG).catch((err) => { console.error("Failed to fetch EMI page:", err); return null; }));

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage();
  const url = `${siteUrl}/${SLUG}`;
  return {
    title: page?.meta_title || "EMI Calculator | Horizan Nepal",
    description: page?.meta_description || "Plan your construction project financing with Horizan Nepal's EMI calculator. Estimate monthly payments and check loan eligibility instantly.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "EMI Calculator | Horizan Nepal",
      description: page?.meta_description || "Plan your construction project financing with Horizan Nepal's EMI calculator.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: page?.meta_title || "EMI Calculator | Horizan Nepal",
      description: page?.meta_description || "Plan your construction project financing with Horizan Nepal's EMI calculator.",
    },
  };
}

export default async function EmiCalculatorPage() {
  const page = await getPage();

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <h1 className="sr-only">{page?.title || "EMI Calculator — Horizan Nepal Construction"}</h1>
      <Suspense fallback={null}>
        <EmiCalculatorClient pageData={page} svgItems={page?.svg_items} />
      </Suspense>
      <Suspense fallback={null}>
        <EmiContent page={page} svgItems={page?.svg_items} />
      </Suspense>
    </div>
  );
}

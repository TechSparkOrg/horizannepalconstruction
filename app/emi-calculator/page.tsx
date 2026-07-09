import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getPageBySlug } from "@/api/services/page.service";
import { EmiContent } from "./_content";

const EmiCalculatorClient = dynamic(() => import("./EmiCalculatorClient"));

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const SLUG = "emi-calculator";
const emiPageP = getPageBySlug(SLUG).catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const page = await emiPageP;
  const url = `${SITE_URL}/${SLUG}`;
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
  const page = await emiPageP;

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <h1 className="sr-only">{page?.title || "EMI Calculator — Horizan Nepal Construction"}</h1>
      <Suspense fallback={null}>
        <EmiCalculatorClient pageData={page} />
      </Suspense>
      <Suspense fallback={null}>
        <EmiContent page={page} />
      </Suspense>
    </div>
  );
}

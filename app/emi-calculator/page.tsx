import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import { getPageBundle } from "@/api/services/page-bundle.service";
import { HeroSkeleton, CardSkeleton } from "@/components/global_ui/loading-skeleton";
import { EmiContent } from "./_content";
import type { Page } from "@/api/types/page.types";
import type { EmiBank } from "@/api/types/emi.types";

import { siteUrl } from "@/lib/constants";

interface EmiBundle {
  page: Page | null;
  banks: EmiBank[];
}

const EmiCalculatorClient = dynamic(() => import("./EmiCalculatorClient"));
const SLUG = "emi-calculator";

function BankCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg bg-light-gray/30 animate-pulse" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 w-20 rounded bg-light-gray/30 animate-pulse" />
          <div className="h-3 w-32 rounded bg-light-gray/20 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-1">
            <div className="h-3 w-16 rounded bg-light-gray/20 animate-pulse" />
            <div className="h-5 w-24 rounded bg-light-gray/30 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

function EmiContentSkeleton() {
  return (
    <section className="py-16 sm:py-24 bg-[#f8fafc]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="mx-auto h-4 w-24 rounded-full bg-light-gray/30 animate-pulse" />
          <div className="mx-auto h-8 w-64 rounded-lg bg-light-gray/30 animate-pulse" />
          <div className="mx-auto h-4 w-80 rounded bg-light-gray/20 animate-pulse" />
        </div>
        <div className="space-y-3 max-w-[860px] mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-light-gray/20 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const bundle = await getPageBundle<EmiBundle>(SLUG, "emi-calculator");
  const page = bundle.page;
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
  const bundle = await getPageBundle<EmiBundle>(SLUG, "emi-calculator");
  const page = bundle.page;

  return (
    <div className="min-h-screen bg-[#f4f6fb]">
      <h1 className="sr-only">{page?.title || "EMI Calculator — Horizan Nepal Construction"}</h1>
      <Suspense fallback={<HeroSkeleton minH="50svh" />}>
        <EmiCalculatorClient pageData={page} svgItems={page?.svg_items} />
      </Suspense>
      <Suspense fallback={<EmiContentSkeleton />}>
        <EmiContent page={page} svgItems={page?.svg_items} />
      </Suspense>
    </div>
  );
}

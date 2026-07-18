import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Calculator, Layers, Box } from "lucide-react";
import { BannerCarousel } from "@/components/global_ui/BannerCarousel";
import { getPageBySlugSafe } from "@/api/services/page.service";
import { LdJson } from "@/components/global_ui/JsonLd";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";
import { getSvgUrl } from "@/lib/svg-utils";
import { CostContent } from "./_content";


const SLUG = "cost-estimation"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlugSafe(SLUG)
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Cost Estimation | Horizan Nepal",
    description: page?.meta_description || "Estimate the cost of your construction project with Horizan Nepal's transparent costing tool. Get a detailed breakdown for materials, labor, and more.",
    robots: { index: true, follow: true },
    twitter: {
      card: "summary_large_image",
      title: page?.meta_title || "Cost Estimation | Horizan Nepal",
      description: page?.meta_description || "Estimate the cost of your construction project with Horizan Nepal's transparent costing tool.",
    },
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Cost Estimation | Horizan Nepal",
      description: page?.meta_description || "Estimate the cost of your construction project with Horizan Nepal's transparent costing tool.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function CostEstimationPage() {
  const page = await getPageBySlugSafe(SLUG)

  return (
    <>
      <LdJson data={breadcrumbList("Cost Estimation", "cost-estimation")} />

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col justify-end overflow-hidden bg-[#07112b]"
        style={{ minHeight: "78vh" }}
        aria-label="Construction cost estimator"
      >
        <BannerCarousel slug="cost-estimate-page-hero" imgClassName="object-cover" initialBanners={page?.banner_images} />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07112b] via-[#07112b]/80 to-[#07112b]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07112b]/90 via-[#07112b]/35 to-transparent" />

        {/* man-at-work overlay — right, desktop only */}
        <div className="absolute right-0 bottom-0 w-[46%] max-w-[560px] aspect-[5/4] pointer-events-none select-none hidden lg:block" aria-hidden="true">
          <Image src={getSvgUrl(page?.svg_items, 0, "/video-gif/man-at-work.svg")} alt="" fill priority unoptimized className="object-contain object-bottom" />
        </div>

        {/* Left brand rule */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cd2028] hidden lg:block" aria-hidden="true" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-14">
          {/* Eyebrow */}
          <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.26em] uppercase mb-5 flex items-center gap-2.5">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            Free Tool · Nepal Rates
          </p>

          <h1 className="font-display font-black text-white leading-[1.03] tracking-[-0.025em] max-w-2xl"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.9rem)" }}>
            Estimate Your <span className="text-[#f87171]">Construction Cost</span>
          </h1>

          <p className="mt-5 text-white/65 text-[15px] leading-[1.75] max-w-[520px]">
            Get a transparent, material-by-material breakdown of your project — powered by current Nepal market rates and a live 3D preview.
          </p>

          {/* Feature chips */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {[
              { icon: Calculator, label: "Live Nepal rates" },
              { icon: Layers, label: "Material breakdown" },
              { icon: Box, label: "Instant 3D preview" },
            ].map(({ icon: Icon, label }) => (
              <span key={label}
                className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full bg-white/8 border border-white/12 text-white/85 text-[12.5px] font-semibold backdrop-blur-sm">
                <Icon className="size-3.5 text-[#93c5fd]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[600px] bg-white" />}>
        <CostContent page={page} svgItems={page?.svg_items} />
      </Suspense>
    </>
  );
}

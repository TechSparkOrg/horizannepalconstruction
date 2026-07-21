import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPageBundle } from "@/api/services/page-bundle.service";
import { LazyPlane } from "@/components/viewport/LazyPlane";
import { getSvgUrl } from "@/lib/svg-utils";
import { siteUrl } from "@/lib/constants";
import { UnitConvertContent } from "./_content";
import type { Page } from "@/api/types/page.types";
import type { FaqItem } from "@/api/types/faq.types";

interface UnitConvertBundle {
  page: Page | null;
  faqs: FaqItem[];
}

const SLUG = "unit-convert";

export async function generateMetadata(): Promise<Metadata> {
  const bundle = await getPageBundle<UnitConvertBundle>(SLUG, "unit-convert", { include: ["page", "faqs"] });
  const page = bundle.page;
  const url = `${siteUrl}/${SLUG}`;
  return {
    title: page?.meta_title || "Unit Converter | Horizan Nepal",
    description: page?.meta_description || "Convert construction measurements and units — length, area, volume, and weight with Horizan Nepal's unit converter.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "Unit Converter | Horizan Nepal",
      description: page?.meta_description || "Convert construction measurements and units with Horizan Nepal's unit converter.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: page?.meta_title || "Unit Converter | Horizan Nepal",
      description: page?.meta_description || "Convert construction measurements and units with Horizan Nepal's unit converter.",
    },
  };
}

export default async function UnitConvertPage() {
  const bundle = await getPageBundle<UnitConvertBundle>(SLUG, "unit-convert", { include: ["page", "faqs"] });
  const { page = null, faqs = [] } = bundle;

  return (
    <>
      <LazyPlane src={getSvgUrl(page?.svg_items, 1, "/video-gif/Loading-Paperplane.svg")} />
      <h1 className="sr-only">{page?.title || "Unit Converter — Horizan Nepal"}</h1>

      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[68svh] sm:min-h-[72svh]">
        <div className="absolute right-0 top-0 h-full w-[75%]">
          <Image src={getSvgUrl(page?.svg_items, 0, "/video-gif/Calculator.svg")} alt="" aria-hidden
            fill sizes="75vw" unoptimized
            className="object-contain object-right-top" priority />
          <div className="absolute inset-y-0 left-0 w-1/2 pointer-events-none" aria-hidden
            style={{ background: "linear-gradient(to right, #0f2557 30%, transparent)" }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-28 z-10 pointer-events-none" aria-hidden
          style={{ background: "linear-gradient(to bottom, #0f2557 5%, transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none" aria-hidden
          style={{ background: "linear-gradient(to top, #0f2557 10%, transparent)" }} />

        <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col justify-end min-h-[68svh] sm:min-h-[72svh] pb-12 sm:pb-16 pt-28">
          <div className="max-w-[540px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Tools</span>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden />
            </div>
            <h1 className="font-display font-black text-white leading-none tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              {page?.title ? <span>{page.title}</span> : <>Unit<br /><span className="text-[#cd2028]">Converter</span></>}
            </h1>
            <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-[440px]">
              Quickly convert construction measurements — length, area, volume, and weight, all in one place.
            </p>
            <a href="#converter"
              className="mt-7 inline-flex items-center gap-2 h-11 px-7 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2">
              Start Converting <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 sm:py-24 bg-white" style={{ minHeight: 1000 }} />}>
        <UnitConvertContent page={page} svgItems={page?.svg_items} bundle={bundle} />
      </Suspense>
    </>
  );
}

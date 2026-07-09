import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPageBySlug } from "@/api/services/page.service";
import { LazyPlane } from "@/components/viewport/LazyPlane";
import { MaterialContent } from "./_content";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const SLUG = "material";
const materialPageP = getPageBySlug(SLUG).catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const page = await materialPageP;
  const url = `${SITE_URL}/${SLUG}`;
  return {
    title: page?.meta_title || "Construction Materials | Horizan Nepal",
    description: page?.meta_description || "Explore high-quality construction materials from trusted partners across Nepal. Find pricing, specifications, and supplier details for your project.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "Construction Materials | Horizan Nepal",
      description: page?.meta_description || "Explore high-quality construction materials from trusted partners across Nepal.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function MaterialPage() {
  const page = await materialPageP;

  return (
    <>
      <LazyPlane />
      <h1 className="sr-only">{page?.title || "Construction Materials — Horizan Nepal"}</h1>

      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[68svh] sm:min-h-[72svh]">
        <div className="absolute right-0 top-0 h-full w-full lg:w-[58%]">
          <Image src="/video-gif/road-reparing.svg" alt="" aria-hidden
            fill sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-contain object-center lg:object-right" priority />
          <div className="absolute inset-0 bg-[#0f2557]/85 lg:hidden" />
          <div className="absolute inset-y-0 left-0 w-64 hidden lg:block pointer-events-none" aria-hidden
            style={{ background: "linear-gradient(to right, #0f2557 15%, transparent)" }} />
        </div>
        <div className="absolute inset-x-0 top-0 h-28 z-10 pointer-events-none" aria-hidden
          style={{ background: "linear-gradient(to bottom, #0f2557 5%, transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none" aria-hidden
          style={{ background: "linear-gradient(to top, #0f2557 10%, transparent)" }} />
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#cd2028] z-20" aria-hidden />

        <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col justify-end min-h-[68svh] sm:min-h-[72svh] pb-12 sm:pb-16 pt-28">
          <div className="max-w-[540px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Nepal</span>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden />
            </div>
            <h1 className="font-display font-black text-white leading-none tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              {page?.title ? <span>{page.title}</span> : <>Construction<br /><span className="text-[#cd2028]">Materials</span></>}
            </h1>
            <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-[440px]">
              High-quality materials from trusted partners across Nepal — durability and excellence built into every project.
            </p>
            <div className="mt-7 flex items-center gap-4 flex-wrap">
              <a href="#materials" className="inline-flex items-center gap-2 h-11 px-7 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2">
                Browse Materials <ArrowRight className="size-4" />
              </a>
              <a href="#vendors" className="inline-flex items-center gap-2 h-11 px-7 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors">
                Our Vendors
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Quality Matters ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px] mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="block w-6 h-px bg-[#cd2028]" aria-hidden />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Why Quality Matters</p>
              <span className="block w-6 h-px bg-[#cd2028]" aria-hidden />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">
              The Importance of Quality Materials in Construction
            </h2>
            <p className="mt-5 text-[14.5px] leading-[1.85] text-[#334155]">
              The strength, longevity, and safety of any structure begin with the materials used to build it.
              From foundation to finishing, every material plays a critical role in determining how a building
              withstands time, weather, and daily use. We partner with Nepal&apos;s most reliable suppliers to
              bring you materials that meet rigorous quality standards — because the integrity of your project
              depends on what it&apos;s built with.
            </p>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 sm:py-24 bg-[#f8fafc]" style={{ minHeight: 920 }} />}>
        <MaterialContent page={page} />
      </Suspense>
    </>
  );
}

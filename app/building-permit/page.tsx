import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getBuildingPermitSingle } from "@/api/services/building-permit.service";
import { getPageBySlug } from "@/api/services/page.service";
import { LazyPlane } from "@/components/viewport/LazyPlane";
import { BuildingPermitContent } from "./_content";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const SLUG = "building-permit";
const pageP = getPageBySlug(SLUG).catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const page = await pageP;
  const url = `${SITE_URL}/${SLUG}`;
  return {
    title: page?.meta_title || "Building Permit Assistant | Horizan Nepal",
    description: page?.meta_description || "Navigate Nepal's building permit process with confidence. Step-by-step workflow guide, document checklist, regulations, and municipality directory for construction permits.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "Building Permit Assistant | Horizan Nepal",
      description: page?.meta_description || "Navigate Nepal's building permit process with confidence.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function BuildingPermitPage() {
  "use cache";

  const [page, config] = await Promise.all([
    pageP,
    getBuildingPermitSingle().catch(() => null),
  ]);
  if (!config) notFound();

  return (
    <>
    
      <h1 className="sr-only">{ page?.title || " Building Permit Assistant — Horizan Nepal"}</h1>
      <section className="relative min-h-[70svh] flex items-center overflow-hidden bg-[#0f2557]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#cd2028]" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.02) 0 2px,transparent 2px 16px)" }} />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 w-full pt-28 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 max-w-[560px]">
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Nepal</span>
                <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              </div>
              <h1 className="font-display font-black text-white leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(2.4rem,5vw,3.8rem)" }}>
                {page?.title || (<>Building<br /><span className="text-[#cd2028]">Permit</span></>)}
              </h1>
              <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-[460px]">
                Navigate Nepal&apos;s building permit process with confidence — step-by-step guidance, regulations, and municipality contacts.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                <a href="#workflow" className="inline-flex items-center gap-2 h-11 px-7 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors">View Workflow <ArrowRight className="size-4" /></a>
                <a href="#regulations" className="inline-flex items-center gap-2 h-11 px-7 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors">Regulations</a>
              </div>
            </div>
            <div className="shrink-0 flex items-center justify-center lg:w-[420px]">
              <Image src="/video-gif/build-document.svg" alt="Building permit documents and approval process illustration"
                width={380} height={380}
                sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 380px"
                className="w-[200px] sm:w-[300px] lg:w-[380px] h-auto object-contain" style={{ height: "auto" }}
                priority unoptimized />
            </div>
          </div>
        </div>
      </section>
        <LazyPlane />

      <Suspense fallback={<div className="py-16 sm:py-24 bg-white" />}>
        <BuildingPermitContent config={config} page={page} />
      </Suspense>
    </>
  );
}

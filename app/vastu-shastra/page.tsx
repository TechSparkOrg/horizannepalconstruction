import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPageBySlug } from "@/api/services/page.service";
import { getSvgUrl } from "@/lib/svg-utils";
import { VastuContent } from "./_content";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const SLUG = "vastu-shastra";
const vastuPageP = getPageBySlug(SLUG).catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const page = await vastuPageP;
  const url = `${SITE_URL}/${SLUG}`;
  return {
    title: page?.meta_title || page?.title || "Vastu Shastra | Horizan Nepal",
    description: page?.meta_description || "Explore Vastu Shastra principles for your home. Learn about room placement, directional analysis, and ancient architectural wisdom for harmonious living spaces in Nepal.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || page?.title || "Vastu Shastra | Horizan Nepal",
      description: page?.meta_description || "Explore Vastu Shastra principles for your home.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function VastuShastraPage() {
  const page = await vastuPageP;

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-[72svh] flex items-center overflow-hidden bg-[#0f2557]">
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#cd2028]" aria-hidden="true" />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,0.025) 0 2px,transparent 2px 16px)" }} />
        <div className="absolute inset-x-0 bottom-0 h-28 pointer-events-none" aria-hidden="true"
          style={{ background: "linear-gradient(to top,#fffbf5 0%,transparent 100%)" }} />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 w-full pt-28 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 max-w-[560px]">
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="block w-5 h-px bg-[#f59e0b]" aria-hidden="true" />
                <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#f59e0b]">Ancient Wisdom</span>
                <span className="block w-5 h-px bg-[#f59e0b]" aria-hidden="true" />
              </div>
              <h1 className="font-display font-black text-white leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(2.5rem,5vw,4rem)" }}>
                {page?.title || (<>Vastu<br /><span className="text-[#f59e0b]">Shastra</span></>)}
              </h1>
              <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-[460px]">
                The ancient Vedic science of spatial harmony — align your spaces with nature, direction, and energy for prosperity, health, and peace.
              </p>
              <div className="mt-8 flex gap-3 flex-wrap">
                <a href="#vastu-guide" className="inline-flex items-center gap-2 h-11 px-7 bg-[#f59e0b] hover:bg-[#d97706] text-[#0f2557] font-bold text-sm rounded-xl transition-colors">
                  Explore Guide <ArrowRight className="size-4" />
                </a>
                <a href="#vastu-tools" className="inline-flex items-center gap-2 h-11 px-7 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/20 transition-colors">
                  Try Tools
                </a>
              </div>
              <div className="mt-10 flex gap-3 flex-wrap">
                {[{ num: "8", label: "Directions" }, { num: "5", label: "Elements" }, { num: "64", label: "Vastu Zones" }].map((s) => (
                  <div key={s.label} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 text-center min-w-[74px]">
                    <p className="text-[#f59e0b] font-bold text-xl leading-none">{s.num}</p>
                    <p className="text-white/50 text-[9px] uppercase tracking-widest font-semibold mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="shrink-0 flex items-center justify-center relative lg:w-[440px]">
              <div className="absolute w-[340px] h-[340px] rounded-full pointer-events-none" aria-hidden="true"
                style={{ background: "radial-gradient(circle,rgba(245,158,11,0.18) 0%,transparent 70%)", filter: "blur(40px)" }} />
              <Image src={getSvgUrl(page?.svg_items, 0, "/video-gif/ganesh-on.svg")}
                alt="Lord Ganesha — remover of obstacles and patron of new beginnings"
                width={420} height={420}
                sizes="(max-width: 640px) 220px, (max-width: 1024px) 340px, 420px"
                className="w-[220px] sm:w-[340px] lg:w-[420px] h-auto object-contain relative z-10"
                priority unoptimized />
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 sm:py-28 bg-white" />}>
        <VastuContent page={page} svgItems={page?.svg_items} />
      </Suspense>
    </div>
  );
}

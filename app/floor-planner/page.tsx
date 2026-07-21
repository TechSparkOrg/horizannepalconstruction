import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPageBundle } from "@/api/services/page-bundle.service";
import { getSvgUrl } from "@/lib/svg-utils";
import { siteUrl } from "@/lib/constants";
import { FloorPlannerContent } from "./_content";
import type { Page } from "@/api/types/page.types";
import type { FaqItem } from "@/api/types/faq.types";

interface FloorPlannerBundle {
  page: Page | null;
  faqs: FaqItem[];
}

const SLUG = "floor-planner";

const benefits = [
  { title: "Accurate Measurements", desc: "Scale-accurate layouts prevent costly errors during construction." },
  { title: "Optimised Space", desc: "Every square foot is planned for maximum usability and flow." },
  { title: "Vastu Compliance", desc: "Plans can be aligned with Vastu Shastra principles from the start." },
  { title: "Permit Ready", desc: "Professionally drafted plans meet municipal submission requirements." },
  { title: "Cost Control", desc: "Detailed material and dimension planning helps you budget accurately." },
  { title: "Visualisation", desc: "See your home before it's built — walls, rooms, windows, and furniture placement." },
];

export async function generateMetadata(): Promise<Metadata> {
  const bundle = await getPageBundle<FloorPlannerBundle>(SLUG, "floor-planner", { include: ["page", "faqs"] });
  const page = bundle.page;
  const url = `${siteUrl}/${SLUG}`;
  return {
    title: page?.meta_title || "Floor Planner | Horizan Nepal",
    description: page?.meta_description || "Design your dream floor plan online with Horizan Nepal's interactive 2D floor planner. Plan rooms, walls, stairs, and visualize your space before building.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "Floor Planner | Horizan Nepal",
      description: page?.meta_description || "Design your dream floor plan online with Horizan Nepal's interactive 2D floor planner.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: page?.meta_title || "Floor Planner | Horizan Nepal",
      description: page?.meta_description || "Design your dream floor plan online with Horizan Nepal's interactive 2D floor planner.",
    },
  };
}

export default async function FloorPlannerPage() {
  const bundle = await getPageBundle<FloorPlannerBundle>(SLUG, "floor-planner", { include: ["page", "faqs"] });
  const { page = null, faqs = [] } = bundle;

  return (
    <>
      <h1 className="sr-only">{page?.title || "2D Floor Planner — Horizan Nepal Construction"}</h1>

      {/* ── Hero ── */}
      <section className="relative bg-[#0f2557] overflow-hidden min-h-[72svh] sm:min-h-[78svh]">
        <div className="absolute right-0 bottom-0 h-full w-full lg:w-[52%] pointer-events-none select-none">
          <Image src={getSvgUrl(page?.svg_items, 0, "/video-gif/work-team.svg")} alt="" aria-hidden
            fill unoptimized priority
            className="object-cover object-bottom lg:object-right-bottom" />
          <div className="absolute inset-0 bg-[#0f2557]/80 lg:hidden" aria-hidden />
          <div className="absolute inset-y-0 left-0 w-52 hidden lg:block pointer-events-none"
            style={{ background: "linear-gradient(to right, #0f2557 20%, transparent)" }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0f2557 10%, transparent)" }} />

        <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col justify-end min-h-[72svh] sm:min-h-[78svh] pb-12 sm:pb-16 pt-28">
          <div className="max-w-[540px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Design Tools</span>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden />
            </div>
            <h1 className="font-display font-black text-white leading-none tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              {page?.title ? <span>{page.title}</span> : <><span>2D Floor</span><br /><span className="text-[#cd2028]">Planner</span></>}
            </h1>
            <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-[440px]">
              Plan your dream home with precision — draw rooms, place walls, stairs and furniture, then export your layout.
            </p>
            <a href="#planner"
              className="mt-7 inline-flex items-center gap-2 h-11 px-7 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2">
              Start Planning <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="relative bg-[#f8fafc] py-16 sm:py-24 overflow-hidden">
        <div className="absolute right-0 bottom-0 w-[42%] h-[65%] pointer-events-none select-none">
          <Image src={getSvgUrl(page?.svg_items, 1, "/video-gif/maintainace-building.svg")} alt="" aria-hidden fill unoptimized
            className="object-contain object-right-bottom opacity-[0.07]" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Why Plan First</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">
              Benefits of 2D Planning
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl border border-[#e2e8f0] p-6">
                <h3 className="font-display font-bold text-[#0f2557] text-[14px]">{b.title}</h3>
                <p className="mt-1.5 text-[13.5px] text-[#64748b] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-16 sm:py-24 bg-white" style={{ minHeight: 1000 }} />}>
        <FloorPlannerContent page={page} svgItems={page?.svg_items} bundle={bundle} />
      </Suspense>
    </>
  );
}

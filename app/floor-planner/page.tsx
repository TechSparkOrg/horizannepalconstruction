import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FloorPlanner from "@/components/page_ui/FloorPlanner";
import BlogContent from "@/components/page_ui/BlogContent.client";
import { LdJson } from "@/components/global_ui/JsonLd";
import { getPageBySlug } from "@/api/services/page.service";
import { getSiteUrl, breadcrumbList } from "@/lib/seo-utils";

const SLUG = "floor-planner";
const pageP = getPageBySlug(SLUG).catch(() => null);

const benefits = [
  { title: "Accurate Measurements", desc: "Scale-accurate layouts prevent costly errors during construction." },
  { title: "Optimised Space", desc: "Every square foot is planned for maximum usability and flow." },
  { title: "Vastu Compliance", desc: "Plans can be aligned with Vastu Shastra principles from the start." },
  { title: "Permit Ready", desc: "Professionally drafted plans meet municipal submission requirements." },
  { title: "Cost Control", desc: "Detailed material and dimension planning helps you budget accurately." },
  { title: "Visualisation", desc: "See your home before it's built — walls, rooms, windows, and furniture placement." },
];

export async function generateMetadata(): Promise<Metadata> {
  const page = await pageP;
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/${SLUG}`;
  const title = page?.meta_title || "Floor Planner | Horizan Nepal";
  const description = page?.meta_description || "Design your dream floor plan online with Horizan Nepal's interactive 2D floor planner. Plan rooms, walls, stairs, and visualize your space before building.";
  const ogImage = page?.banner_images?.[0]?.url || undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(page?.meta_keywords ? { keywords: page.meta_keywords } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      url,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function FloorPlannerPage() {
  const page = await pageP;

  return (
    <>
      <LdJson data={breadcrumbList("Floor Planner", "floor-planner")} />
      <h1 className="sr-only">{page?.title || "2D Floor Planner — Horizan Nepal Construction"}</h1>

      {/* ── Hero ── */}
      <section className="relative bg-[#0f2557] overflow-hidden min-h-[72svh] sm:min-h-[78svh]">

        {/* work-team.svg — right column */}
        <div className="absolute right-0 bottom-0 h-full w-full lg:w-[52%] pointer-events-none select-none">
          <Image
            src="/video-gif/work-team.svg"
            alt=""
            aria-hidden="true"
            fill
            className="object-contain object-bottom lg:object-right-bottom"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-[#0f2557]/80 lg:hidden" aria-hidden="true" />
          <div
            className="absolute inset-y-0 left-0 w-52 hidden lg:block pointer-events-none"
            style={{ background: "linear-gradient(to right, #0f2557 20%, transparent)" }}
          />
        </div>

        <div className="absolute top-0 inset-x-0 h-1 bg-[#cd2028] z-20" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0f2557 10%, transparent)" }}
        />

        <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col justify-end min-h-[72svh] sm:min-h-[78svh] pb-12 sm:pb-16 pt-28">
          <div className="max-w-[540px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/60">Design Tools</span>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <p className="font-display font-black text-white leading-none tracking-[-0.02em]"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              {page?.title
                ? page.title
                : <><span>2D Floor</span><br /><span className="text-[#cd2028]">Planner</span></>
              }
            </p>
            <p className="mt-5 text-white/65 text-[15px] leading-relaxed max-w-[440px]">
              Plan your dream home with precision — draw rooms, place walls, stairs and furniture, then export your layout.
            </p>
            <a
              href="#planner"
              className="mt-7 inline-flex items-center gap-2 h-11 px-7 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2"
            >
              Start Planning <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Canvas ── */}
      <section id="planner" className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Interactive Tool</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">
              Design Your Floor Plan
            </h2>
            <p className="mt-3 text-[14px] text-[#64748b] max-w-[440px] mx-auto leading-relaxed">
              Draw rooms, place walls, add stairs and furniture — then export your plan.
            </p>
          </div>
          <FloorPlanner />
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-[#f8fafc] py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Why Plan First</p>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
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

      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <BlogContent content={page.content} />
        </div>
      )}
    </>
  );
}

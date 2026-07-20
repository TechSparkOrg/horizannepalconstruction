import { Suspense } from "react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getPageBundle } from "@/api/services/page-bundle.service";
import { LazyFeather } from "@/components/viewport/LazyFeather";
import { getSvgUrl } from "@/lib/svg-utils";
import { FaqContent } from "./_content";
import type { Page } from "@/api/types/page.types";
import type { FaqGroupResponse } from "@/api/types/faq.types";

import { siteUrl } from "@/lib/constants";
import ParsedContent from "@/lib/ParseContent.server";

interface FaqBundle {
  page: Page | null;
  faq_groups: FaqGroupResponse[];
}

const SLUG = "faq";

export async function generateMetadata(): Promise<Metadata> {
  const bundle = await getPageBundle<FaqBundle>(SLUG, "faq");
  const page = bundle.page;
  const url = `${siteUrl}/${SLUG}`;
  return {
    title: page?.meta_title || "FAQ | Horizan Nepal",
    description: page?.meta_description || "Frequently asked questions about Horizan Nepal's services, design process, construction timeline, costing, and more.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "FAQ | Horizan Nepal",
      description: page?.meta_description || "Frequently asked questions about Horizan Nepal's services and process.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function FAQPage() {
  const bundle = await getPageBundle<FaqBundle>(SLUG, "faq");
  const { page = null, faq_groups = [] } = bundle;

  return (
    <>
      <LazyFeather src={getSvgUrl(page?.svg_items, 1, "/video-gif/feather.svg")} />

      {/* ── Hero ── */}
      <section className="relative w-full bg-[#0f2557] overflow-hidden min-h-[62svh] sm:min-h-[68svh]">
        <div className="absolute right-0 top-0 h-full w-full lg:w-[55%]">
          <Image
            src={getSvgUrl(page?.svg_items, 0, "/video-gif/Live-chatbot.svg")}
            alt="FAQ chatbot illustration"
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-contain object-center lg:object-right"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-[#0f2557]/80 lg:hidden" />
          <div className="absolute inset-y-0 left-0 w-56 hidden lg:block pointer-events-none" aria-hidden="true"
            style={{ background: "linear-gradient(to right, #0f2557 20%, transparent)" }} />
        </div>
        <div className="absolute inset-x-0 top-0 h-32 z-10 pointer-events-none" aria-hidden="true"
          style={{ background: "linear-gradient(to bottom, #0f2557 5%, transparent)" }} />
        <div className="absolute inset-x-0 bottom-0 h-24 z-10 pointer-events-none" aria-hidden="true"
          style={{ background: "linear-gradient(to top, #0f2557 10%, transparent)" }} />
        <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col justify-end min-h-[62svh] sm:min-h-[68svh] pb-10 sm:pb-14 pt-28">
          <div className="max-w-[520px]">
            <div className="inline-flex items-center gap-2.5 mb-4">
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
              <span className="text-[10px] font-bold tracking-[0.28em] uppercase text-white/70">FAQ</span>
              <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h1 className="font-display font-black text-white leading-none tracking-[-0.02em]" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Frequently<br /><span className="text-[#93c5fd]">Asked Questions</span>
            </h1>
            <p className="mt-4 text-white/70 text-sm sm:text-base max-w-[440px] leading-relaxed">
              Everything you need to know about working with Horizon Nepal — pricing, process, and timelines.
            </p>
            <div className="mt-6 flex items-center gap-5 flex-wrap">
              <a href="#faq-questions" className="inline-flex items-center gap-2 h-11 px-6 bg-[#cd2028] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2">
                Browse Questions <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div id="faq-questions">
        <Suspense fallback={<div className="py-16 sm:py-28" />}>
          <FaqContent svgItems={page?.svg_items} bundle={bundle} />
        </Suspense>
      </div>

      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  );
}

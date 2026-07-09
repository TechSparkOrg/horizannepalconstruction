import { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { cacheLife } from "next/cache";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { VastuNavAsync } from "@/components/sections/vastu-sections";
import type { Page } from "@/api/types/page.types";
import { getFaqs } from "@/api/services/faq.service";
import FaqClient from "@/components/global_ui/FaqClient";
import { VastuGuideClient } from "./VastuGuideClient";

const VastuQuickTools = dynamic(() => import("./VastuQuickTools").then((m) => ({ default: m.VastuQuickTools })));
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"));

interface Props {
  page: Page | null;
}

export function VastuContent({ page }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <div id="vastu-guide" className="bg-white border-t border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14">

          {/* Static heading + Kalash — renders immediately */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
              <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#cd2028]">Explore Principles</p>
              <span className="block w-6 h-px bg-[#cd2028]" aria-hidden="true" />
            </div>
            <h2 className="font-display font-bold text-[#0f2557] text-2xl sm:text-3xl tracking-tight">Vastu Shastra Guide</h2>
          </div>
          <div className="flex justify-center mb-10" aria-hidden="true">
            <Image src="/video-gif/Kalash.svg" alt="" width={130} height={130}
              sizes="(max-width: 640px) 90px, 120px"
              className="w-[90px] sm:w-[120px] h-auto object-contain opacity-50 select-none pointer-events-none" unoptimized />
          </div>

          {/* Guide sections — deferred, on scroll */}
          <ViewportSection fallback={F("py-6")}>
            <Suspense fallback={F("py-6")}>
              <VastuGuideInner />
            </Suspense>
          </ViewportSection>

          {/* Tools — deferred, on scroll */}
          <ViewportSection fallback={F("mt-16 border-t border-[#e2e8f0] pt-12")}>
            <Suspense fallback={F("mt-16 border-t border-[#e2e8f0] pt-12")}>
              <VastuToolsInner />
            </Suspense>
          </ViewportSection>

        </div>
      </div>

         {page?.faq_group_slug && (
              <ViewportSection fallback={F("py-12 sm:py-16 bg-white")}>
                <Suspense fallback={F("py-12 sm:py-16 bg-white")}>
                  <VastuFaqInner faqGroupSlug={page.faq_group_slug} />
                </Suspense>
              </ViewportSection>
            )}

      {/* CMS content */}
      {page?.content && (
        <ViewportSection fallback={F("py-10 bg-white")}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <ParsedContent description={page.content} />
          </div>
        </ViewportSection>
      )}
    </>
  );
}

async function VastuGuideInner() {
  const nav = await VastuNavAsync();
  return <VastuGuideClient sectionKeys={nav.sections ?? []} />;
}

async function VastuToolsInner() {
  const nav = await VastuNavAsync();
  return <VastuQuickTools roomOptions={nav.rooms ?? []} directionOptions={nav.directions ?? []} />;
}

async function VastuFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  cacheLife("default");
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 20 }).catch(() => ({ results: [] }));
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}

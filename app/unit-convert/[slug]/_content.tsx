import { Suspense } from "react";
import dynamic from "next/dynamic";
import { cacheLife } from "next/cache";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqs } from "@/api/services/faq.service";
import UnitConverterWidget from "@/components/page_ui/UnitConverterWidget.client";
import type { PublicUnitConversionDetail } from "@/api/types/unit-converter.types";

const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"));
const VideoEmbed = dynamic(() => import("@/components/global_ui/VideoEmbed.client"));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));

export function UnitConvertDetailContent({ item }: { item: PublicUnitConversionDetail }) {
  const F = (className: string) => <div className={className} />;
  const faqSlug = item.faq_group_slug || item.slug;

  return (
    <>
      <UnitConverterWidget title={item.title} baseUnit={item.base_unit} conversions={item.conversions} />

      {item.description && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[300px]")}>
          <BlogContent content={item.description} />
        </ViewportSection>
      )}

      {item.video_url && (
        <ViewportSection fallback={F("py-10 bg-white min-h-[300px]")}>
          <VideoEmbed url={item.video_url} title="Video Guide" />
        </ViewportSection>
      )}

      <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
        <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <UnitConvertDetailFaqInner faqGroupSlug={faqSlug} />
        </Suspense>
      </ViewportSection>
    </>
  );
}

async function UnitConvertDetailFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  cacheLife("default");
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 20 }).catch(() => ({ results: [] }));
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} title="Frequently Asked Questions" />;
}

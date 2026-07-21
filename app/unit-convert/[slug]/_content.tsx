import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import UnitConverterWidget from "@/components/page_ui/UnitConverterWidget.client";
import type { PublicUnitConversionDetail } from "@/api/types/unit-converter.types";
import type { FaqItem } from "@/api/types/faq.types";

const BlogContent = dynamic(() => import("@/components/page_ui/BlogContent.client"));
const VideoEmbed = dynamic(() => import("@/components/global_ui/VideoEmbed.client"));
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));

const formatFaq = (items?: FaqItem[]) => (items ?? []).map(f => ({ q: f.question?.en ?? '', a: f.answer?.en ?? '' }));

export function UnitConvertDetailContent({ item, faqs }: { item: PublicUnitConversionDetail; faqs: FaqItem[] }) {
  const F = (className: string) => <div className={className} />;
  const faqSlug = item.faq_group_slug || item.slug;
  const formattedFaqs = formatFaq(faqs);

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
          <FaqClient categorySlug={faqSlug} initialFaqs={formattedFaqs} title="Frequently Asked Questions" />
        </Suspense>
      </ViewportSection>
    </>
  );
}

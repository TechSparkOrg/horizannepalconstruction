import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqs } from "@/api/services/faq.service";
import type { Page } from "@/api/types/page.types";

const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));

interface Props {
  page: Page | null;
  svgItems?: import("@/api/types/page.types").PageSvgItem[];
}

export function EmiContent({ page }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      {page?.faq_group_slug && (
        <ViewportSection fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
          <Suspense fallback={F("py-12 sm:py-16 bg-white min-h-[200px]")}>
            <EmiFaqInner faqGroupSlug={page.faq_group_slug} />
          </Suspense>
        </ViewportSection>
      )}
    </>
  );
}

async function EmiFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 20 }).catch(() => ({ results: [] }));
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}

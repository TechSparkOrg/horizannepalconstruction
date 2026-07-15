import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getFaqs } from "@/api/services/faq.service";
import type { BuildingPermitConfig } from "@/api/types/building-permit.types";
import type { Page } from "@/api/types/page.types";
import { WorkflowTimeline } from "./WorkflowTimeline";
import { RegulationsGrid } from "./RegulationsGrid";
import { MunicipalityTable } from "./MunicipalityTable";

const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
import ParsedContent from "@/lib/ParseContent.server";

interface Props {
  config: BuildingPermitConfig;
  page: Page | null;
}

export function BuildingPermitContent({ config, page }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <WorkflowTimeline steps={config.workflow_steps} />
      <ViewportSection fallback={F("py-16 sm:py-24 bg-[#f8fafc]")}>
        <RegulationsGrid items={config.regulation_items} />
      </ViewportSection>
      <ViewportSection fallback={F("py-16 sm:py-24 bg-white")}>
        <MunicipalityTable items={config.municipality_items} />
      </ViewportSection>
      {page?.faq_group_slug && (
        <Suspense fallback={F("py-12 sm:py-16 bg-white")}>
          <BPFaqInner faqGroupSlug={page.faq_group_slug} />
        </Suspense>
      )}
      {page?.content && (
        <ViewportSection fallback={F("py-10 bg-white")}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <ParsedContent description={page.content} />
          </div>
        </ViewportSection>
      )}
    </>
  );
}

async function BPFaqInner({ faqGroupSlug }: { faqGroupSlug: string }) {
  "use cache";
  const res = await getFaqs({ group__slug: faqGroupSlug, page_size: 20 }).catch(() => ({ results: [] }));
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  return <FaqClient categorySlug={faqGroupSlug} initialFaqs={faqs} />;
}

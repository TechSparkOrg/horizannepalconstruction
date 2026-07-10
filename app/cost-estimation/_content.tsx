import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { Page } from "@/api/types/page.types";

const CostEstimator = dynamic(() => import("@/components/page_ui/CostEstimator").then(m => ({ default: m.CostEstimator })));
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"));

interface Props { page: Page | null }

export function CostContent({ page }: Props) {
  const F = (className: string) => <div className={className} />;
  return (
    <>
      <ViewportSection fallback={F("min-h-[600px] bg-white")}>
        <CostEstimator />
      </ViewportSection>
      {page?.content && (
        <ViewportSection fallback={F("max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 min-h-[200px]")}>
          <ParsedContent description={page.content} />
        </ViewportSection>
      )}
    </>
  );
}

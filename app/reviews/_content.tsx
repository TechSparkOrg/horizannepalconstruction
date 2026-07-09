import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { ReviewsAsync } from "@/components/sections/reviews-sections";
import type { Page } from "@/api/types/page.types";

const ParsedContent = dynamic(() => import("@/lib/Parse-Content"));

interface Props {
  page: Page | null;
}

export function ReviewsContent({ page }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <ViewportSection fallback={F("min-h-[60svh] bg-[#0f2557]")}>
        <Suspense fallback={F("min-h-[60svh] bg-[#0f2557]")}>
          <ReviewsAsync />
        </Suspense>
      </ViewportSection>
      {page?.content && (
        <ViewportSection fallback={F("py-16 bg-white")}>
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <ParsedContent description={page.content} />
          </div>
        </ViewportSection>
      )}
    </>
  );
}

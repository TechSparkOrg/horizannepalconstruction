import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { ReviewsAsync } from "@/components/sections/reviews-sections";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import { getSvgUrl } from "@/lib/svg-utils";

import ParsedContent from "@/lib/ParseContent.server";

interface Props {
  page: Page | null;
  svgItems?: PageSvgItem[];
}

export function ReviewsContent({ page, svgItems }: Props) {
  const F = (className: string) => <div className={className} />;

  return (
    <>
      <ViewportSection fallback={F("min-h-[60svh] bg-[#0f2557]")}>
        <Suspense fallback={F("min-h-[60svh] bg-[#0f2557]")}>
          <ReviewsAsync svgUrl1={getSvgUrl(svgItems, 0, "/video-gif/developing-qanda.svg")} svgUrl2={getSvgUrl(svgItems, 1, "/video-gif/card-scoll-animation.svg")} svgUrl3={getSvgUrl(svgItems, 2, "/video-gif/Review.svg")} svgUrl4={getSvgUrl(svgItems, 3, "/video-gif/email.svg")} />
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

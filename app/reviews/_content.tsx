import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { getReviewsSafe } from "@/api/services/review.service";
import { LdJson } from "@/components/global_ui/JsonLd";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import { getSvgUrl } from "@/lib/svg-utils";

import ParsedContent from "@/lib/ParseContent.server";

const ReviewList = dynamic(() => import("@/components/page_ui/ReviewList").then((m) => ({ default: m.ReviewList })));

interface Props {
  page: Page | null;
  svgItems?: PageSvgItem[];
}

async function ReviewsAsync({ svgUrl1, svgUrl2, svgUrl3, svgUrl4 }: { svgUrl1?: string; svgUrl2?: string; svgUrl3?: string; svgUrl4?: string } = {}) {
  const res = await getReviewsSafe();
  const reviews = res.results ?? [];
  const total = res.count ?? 0;

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const aggregateSchema = total > 0 ? {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Horizan Nepal Engineering Research & Construction",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: avgRating,
      reviewCount: total,
      bestRating: 5,
      worstRating: 1,
    },
  } : null;

  return (
    <>
      {aggregateSchema && <LdJson data={aggregateSchema} />}
      <ReviewList initialReviews={reviews} initialTotal={total} svgUrl1={svgUrl1} svgUrl2={svgUrl2} svgUrl3={svgUrl3} svgUrl4={svgUrl4} />
    </>
  );
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

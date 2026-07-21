import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import { LdJson } from "@/components/global_ui/JsonLd";
import type { Page, PageSvgItem } from "@/api/types/page.types";
import type { Review } from "@/api/types/review.types";
import { getSvgUrl } from "@/lib/svg-utils";

import ParsedContent from "@/lib/ParseContent.server";

const ReviewList = dynamic(() => import("@/components/page_ui/ReviewList").then((m) => ({ default: m.ReviewList })));

interface Props {
  page: Page | null;
  svgItems?: PageSvgItem[];
  bundle: { reviews: { results: Review[]; count: number } };
}

export function ReviewsContent({ page, svgItems, bundle }: Props) {
  const F = (className: string) => <div className={className} />;
  const reviews = bundle.reviews?.results ?? [];
  const total = bundle.reviews?.count ?? 0;

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
      <ViewportSection fallback={F("min-h-[60svh] bg-[#0f2557]")}>
        <Suspense fallback={F("min-h-[60svh] bg-[#0f2557]")}>
          <>
            {aggregateSchema && <LdJson data={aggregateSchema} />}
            <ReviewList initialReviews={reviews} initialTotal={total}
              svgUrl1={getSvgUrl(svgItems, 0, "/video-gif/developing-qanda.svg")}
              svgUrl2={getSvgUrl(svgItems, 1, "/video-gif/card-scoll-animation.svg")}
              svgUrl3={getSvgUrl(svgItems, 2, "/video-gif/Review.svg")}
              svgUrl4={getSvgUrl(svgItems, 3, "/video-gif/email.svg")} />
          </>
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

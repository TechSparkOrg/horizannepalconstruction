import dynamic from "next/dynamic";
import { LdJson } from "@/components/global_ui/JsonLd";
import { getReviews } from "@/api/services/review.service";

const ReviewList = dynamic(() => import("@/components/page_ui/ReviewList").then((m) => ({ default: m.ReviewList })));

export async function ReviewsAsync({ svgUrl1, svgUrl2, svgUrl3, svgUrl4 }: { svgUrl1?: string; svgUrl2?: string; svgUrl3?: string; svgUrl4?: string } = {}) {
  "use cache";

  const res = await getReviews().catch(() => ({ results: [], count: 0 }));
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

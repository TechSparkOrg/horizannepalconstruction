import type { Metadata } from "next";
import { getReviews } from "@/api/services/review.service";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";
import { LdJson } from "@/components/global_ui/JsonLd";
import { ReviewsClient } from "./_client";

const SLUG = "reviews"
const reviewsPagePromise = getPageBySlug(SLUG).catch(() => null)

export async function generateMetadata(): Promise<Metadata> {
  const page = await reviewsPagePromise
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "Reviews | Horizan Nepal",
    description: page?.meta_description || "Read customer reviews and testimonials for Horizan Nepal. Share your experience or browse what our clients say about our architecture and construction services.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "Reviews | Horizan Nepal",
      description: page?.meta_description || "Read customer reviews and share your experience with Horizan Nepal.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function ReviewsPage() {
  const [page, reviewsRes] = await Promise.all([
    reviewsPagePromise,
    getReviews().catch(() => ({ results: [], count: 0 })),
  ]);

  const reviews = reviewsRes.results ?? [];
  const total = reviewsRes.count ?? 0;

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const aggregateRatingSchema = {
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
  };

  return (
    <>
      <h1 className="sr-only">Client Reviews — Horizan Nepal Construction</h1>
      <LdJson data={breadcrumbList("Reviews", "reviews")} />
      {total > 0 && <LdJson data={aggregateRatingSchema} />}
      <ReviewsClient
        page={page}
        reviews={reviews}
        total={total}
      />
    </>
  );
}

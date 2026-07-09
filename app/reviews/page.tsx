import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LdJson } from "@/components/global_ui/JsonLd";
import { getReviews } from "@/api/services/review.service";
import { getPageBySlug } from "@/api/services/page.service";

const ReviewList = dynamic(() => import("@/components/page_ui/ReviewList").then((m) => ({ default: m.ReviewList })));
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"));

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const SLUG = "reviews";
const reviewsPageP = getPageBySlug(SLUG).catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const page = await reviewsPageP;
  const url = `${SITE_URL}/${SLUG}`;
  return {
    title: page?.meta_title || "Reviews | Horizan Nepal",
    description: page?.meta_description || "Read customer reviews and testimonials for Horizan Nepal. Share your experience or browse what our clients say about our architecture and construction services.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "Reviews | Horizan Nepal",
      description: page?.meta_description || "Read customer reviews and share your experience with Horizan Nepal.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function ReviewsPage() {
  const [page, reviewsRes] = await Promise.all([
    reviewsPageP,
    getReviews().catch(() => ({ results: [], count: 0 })),
  ]);

  const reviews = reviewsRes.results ?? [];
  const total = reviewsRes.count ?? 0;

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0";

  const aggregateSchema = total > 0
    ? {
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
      }
    : null;

  return (
    <>
      <h1 className="sr-only">Client Reviews — Horizan Nepal Construction</h1>
      {aggregateSchema && <LdJson data={aggregateSchema} />}
      {page?.banner_images?.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}
      <ReviewList initialReviews={reviews} initialTotal={total} />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  );
}

import type { Metadata } from "next";
import { ReviewList } from "@/components/page_ui/ReviewList";
import { LdJson } from "@/components/global_ui/JsonLd";
import { getReviews } from "@/api/services/review.service";
import { getBanners } from "@/api/services/banner.service";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Reviews | Horizan Nepal",
    description:
      "Read customer reviews and testimonials for Horizan Nepal. Share your experience or browse what our clients say about our architecture and construction services.",
    openGraph: {
      title: "Reviews | Horizan Nepal",
      description:
        "Read customer reviews and share your experience with Horizan Nepal.",
      type: "website",
      url: `${siteUrl}/reviews`,
    },
    alternates: { canonical: `${siteUrl}/reviews` },
  };
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Reviews", item: `${siteUrl}/reviews` },
  ],
};

export default async function ReviewsPage() {
  const [reviewsRes, banners] = await Promise.all([
    getReviews().catch(() => ({ results: [], count: 0 })),
    getBanners("reviews-page-hero").catch(() => null),
  ]);

  return (
    <>
      <LdJson data={breadcrumb} />
      <ReviewList
        initialReviews={reviewsRes.results ?? []}
        initialTotal={reviewsRes.count ?? 0}
        initialBanners={banners ?? undefined}
      />
    </>
  );
}

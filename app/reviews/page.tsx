import { Suspense } from "react";
import type { Metadata } from "next";
import { getPageBySlugSafe } from "@/api/services/page.service";
import { siteUrl } from "@/lib/constants";
import { ReviewsContent } from "./_content";
const SLUG = "reviews";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlugSafe(SLUG);
  const url = `${siteUrl}/${SLUG}`;
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
  const page = await getPageBySlugSafe(SLUG);

  return (
    <>
      <h1 className="sr-only">{page?.meta_title || "Client Reviews — Horizan Nepal Construction"}</h1>
      {page?.banner_images?.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}
      <Suspense fallback={<div className="min-h-[60svh] bg-[#0f2557]" />}>
        <ReviewsContent page={page} svgItems={page?.svg_items} />
      </Suspense>
    </>
  );
}

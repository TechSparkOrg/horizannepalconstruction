import { Suspense } from "react";
import type { Metadata } from "next";
import { AboutHero } from "@/components/page_ui/AboutHero";
import { LazyPlane } from "@/components/viewport/LazyPlane";
import { getPageBundle } from "@/api/services/page-bundle.service";
import { getSvgUrl } from "@/lib/svg-utils";
import { siteUrl } from "@/lib/constants";
import { AboutContent } from "./_content";
const SLUG = "about";

interface AboutBundle {
  page: import("@/api/types/page.types").Page | null
  services: import("@/api/types/category.types").ServiceCategory[]
  team: { results: import("@/api/types/team.types").TeamMember[] }
  vendors: { results: import("@/api/types/material.types").PublicVendor[] }
  banks: import("@/api/types/emi.types").EmiBank[]
  reviews: { results: import("@/api/types/review.types").Review[] }
  categories: { results: import("@/api/types/category.types").Category[] }
  faqs: import("@/api/types/faq.types").FaqItem[]
}

export async function generateMetadata(): Promise<Metadata> {
  const bundle = await getPageBundle<AboutBundle>(SLUG, "about", { include: ["page", "services", "team", "vendors", "banks", "reviews", "categories", "faqs"] });
  const page = bundle.page;
  const url = `${siteUrl}/${SLUG}`;
  return {
    title: page?.meta_title || "About | Horizan Nepal",
    description: page?.meta_description || "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal since 1999.",
    alternates: { canonical: url },
    keywords: page?.meta_keywords || undefined,
    openGraph: {
      title: page?.meta_title || "About | Horizan Nepal",
      description: page?.meta_description || "Learn about Horizan Nepal — our team, mission, and portfolio.",
      type: "website",
      url,
      images: page?.banner_images?.[0]?.url ? [{ url: page.banner_images[0].url }] : [],
    },
  };
}

export default async function AboutPage() {
  const bundle = await getPageBundle<AboutBundle>(SLUG, "about", { include: ["page", "services", "team", "vendors", "banks", "reviews", "categories", "faqs"] });
  const { page = null, services = [], team = { results: [] }, vendors = { results: [] }, banks = [], reviews = { results: [] }, categories = { results: [] }, faqs = [] } = bundle;
  const gallery = page?.banner_images ?? [];

  return (
    <>
      <h1 className="sr-only">{page?.meta_title || "About | Horizan Nepal"}</h1>
      <link rel="preload" as="image" href={getSvgUrl(page?.svg_items, 0, "/video-gif/contruction-about.svg")} fetchPriority="high" />
      {gallery.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}
      <AboutHero svgUrl={getSvgUrl(page?.svg_items, 0, "/video-gif/contruction-about.svg")} />
      <LazyPlane src={getSvgUrl(page?.svg_items, 1, "/video-gif/Loading-Paperplane.svg")} />
      <Suspense fallback={<div className="py-16 sm:py-28 bg-white" />}>
        <AboutContent page={page} gallery={gallery} svgItems={page?.svg_items} services={services} team={team} vendors={vendors} banks={banks} reviews={reviews} categories={categories} faqs={faqs} />
      </Suspense>
    </>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";
import { AboutHero } from "@/components/page_ui/AboutHero";
import { LazyPlane } from "@/components/viewport/LazyPlane";
import { getPageBySlug } from "@/api/services/page.service";
import { getSvgUrl } from "@/lib/svg-utils";
import { siteUrl } from "@/lib/constants";
import { AboutContent } from "./_content";
const SLUG = "about";
const aboutPageP = getPageBySlug(SLUG).catch((err) => { console.error("Failed to fetch about page:", err); return null; });

export async function generateMetadata(): Promise<Metadata> {
  const page = await aboutPageP;
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
  const page = await aboutPageP;
  const gallery = page?.banner_images ?? [];

  return (
    <>
      <h1 className="sr-only">{page?.meta_title || "About | Horizan Nepal"}</h1>
      <link rel="preload" as="image" href={getSvgUrl(page?.svg_items, 0, "/video-gif/contruction-about.svg")} fetchPriority="high" />
      {gallery.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}
      <AboutHero svgUrl={getSvgUrl(page?.svg_items, 0, "/video-gif/contruction-about.svg")} />
      <LazyPlane src={getSvgUrl(page?.svg_items, 1, "/video-gif/Loading-Paperplane.svg")} />
      <Suspense fallback={<div className="py-16 sm:py-28 bg-white" />}>
        <AboutContent page={page} gallery={gallery} svgItems={page?.svg_items} />
      </Suspense>
    </>
  );
}

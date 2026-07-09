import { Suspense } from "react";
import type { Metadata } from "next";
import { AboutHero } from "@/components/page_ui/AboutHero";
import { LazyPlane } from "@/app/_components/LazyPlane";
import { getPageBySlug } from "@/api/services/page.service";
import { AboutContent } from "./_content";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");
const SLUG = "about";
const aboutPageP = getPageBySlug(SLUG).catch(() => null);

export async function generateMetadata(): Promise<Metadata> {
  const page = await aboutPageP;
  const url = `${SITE_URL}/${SLUG}`;
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
      <link rel="preload" as="image" href="/video-gif/contruction-about.svg" fetchPriority="high" />
      {gallery.map((b) => b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null)}
      <AboutHero />
      <LazyPlane />
      <Suspense fallback={<div className="py-16 sm:py-28 bg-white" />}>
        <AboutContent page={page} gallery={gallery} />
      </Suspense>
    </>
  );
}

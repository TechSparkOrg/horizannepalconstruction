import type { Metadata } from "next";
import { AboutHero } from "@/components/page_ui/AboutHero";
import { LdJson } from "@/components/global_ui/JsonLd";
import { getTeam } from "@/api/services/team.service";
import { getPageBySlug } from "@/api/services/page.service";
import { pageMetadataBase, breadcrumbList } from "@/lib/seo-utils";
import type { TeamMember } from "@/api/types/team.types";
import { AboutClient } from "./_client";

const SLUG = "about"

const aboutPagePromise = getPageBySlug(SLUG).catch(() => null)

export async function generateMetadata(): Promise<Metadata> {
  const page = await aboutPagePromise
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "About | Horizan Nepal",
    description: page?.meta_description || "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal since 1999.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "About | Horizan Nepal",
      description: page?.meta_description || "Learn about Horizan Nepal — our team, mission, and portfolio.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Horizan Nepal",
  description: "Architecture, Engineering & Construction services across Nepal since 1999.",
};

export default async function AboutPage() {
  const [page, teamRes] = await Promise.all([
    aboutPagePromise,
    getTeam().catch(() => ({ results: [] as TeamMember[] })),
  ]);
  const team = "results" in teamRes ? teamRes.results : []

  return (
    <>
      <h1 className="sr-only">{page?.meta_title || "About | Horizan Nepal"}</h1>
      {page?.banner_images?.map((b) =>
        b.url ? <link key={b.id} rel="preload" as="image" href={b.url} /> : null
      )}
      <LdJson data={breadcrumbList("About", "about")} />
      <LdJson data={aboutPageSchema} />
      <AboutHero initialBanners={page?.banner_images} />
      <AboutClient page={page} team={team} />
    </>
  );
}

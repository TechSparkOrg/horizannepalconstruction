import type { Metadata } from "next";
import { OurWorkHero } from "@/components/sections/OurWorkHero";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ConsultationForm } from "@/components/ConsultationForm";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Our Work | Horizan Nepal",
  description:
    "Browse Horizan Nepal's portfolio of completed architectural and construction projects. See our finest work in residential and commercial design across Nepal.",
  openGraph: {
    title: "Our Work | Horizan Nepal",
    description:
      "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
    type: "website",
    url: `${siteUrl}/our-work`,
  },
  alternates: { canonical: `${siteUrl}/our-work` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Our Work", item: `${siteUrl}/our-work` },
  ],
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Our Work | Horizan Nepal",
  description: "Browse Horizan Nepal's portfolio of completed architectural and construction projects across Nepal.",
  url: `${siteUrl}/our-work`,
};

export default function OurWorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <OurWorkHero />
      <ProjectGallery />
      <ConsultationForm />
    </>
  );
}

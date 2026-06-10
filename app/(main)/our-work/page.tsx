import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { LdJson } from "@/components/JsonLd";

const OurWorkHero = dynamic(() => import("@/components/sections/OurWorkHero").then((m) => ({ default: m.OurWorkHero })));
const ProjectGallery = dynamic(() => import("@/components/ProjectGallery").then((m) => ({ default: m.ProjectGallery })));
const ConsultationForm = dynamic(() => import("@/components/ConsultationForm").then((m) => ({ default: m.ConsultationForm })));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  return {
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
}

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
      <LdJson data={breadcrumb} />
      <LdJson data={collectionSchema} />
      <OurWorkHero />
      <ProjectGallery />
      <ConsultationForm />
    </>
  );
}

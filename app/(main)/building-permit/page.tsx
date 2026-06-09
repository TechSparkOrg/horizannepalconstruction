import type { Metadata } from "next";
import BuildingPermitClient from "./BuildingPermitClient";
import { getBuildingPermit } from "@/api/cached/building-permit";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Building Permit Assistant | Horizan Nepal",
  description:
    "Navigate Nepal's building permit process with confidence. Step-by-step workflow guide, document checklist, regulations, and municipality directory for construction permits.",
  openGraph: {
    title: "Building Permit Assistant | Horizan Nepal",
    description:
      "Navigate Nepal's building permit process with confidence. Step-by-step workflow guide, document checklist, and municipality directory.",
    type: "website",
    url: `${siteUrl}/building-permit`,
  },
  alternates: { canonical: `${siteUrl}/building-permit` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Building Permit", item: `${siteUrl}/building-permit` },
  ],
};

export default async function BuildingPermitPage() {
  let initialConfig;
  try {
    initialConfig = await getBuildingPermit();
  } catch {
    initialConfig = null;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <BuildingPermitClient initialConfig={initialConfig} />
    </>
  );
}

import type { Metadata } from "next";
import { DesignHero } from "@/components/sections/DesignHero";
import { DesignServices } from "@/components/sections/DesignServices";
import { Design3DShowcase } from "@/components/sections/Design3DShowcase";
import { ConsultationForm } from "@/components/ConsultationForm";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Design | Horizan Nepal",
  description:
    "Explore Horizan Nepal's architectural design services — from conceptual 2D floor plans to stunning 3D visualizations. Turn your vision into reality.",
  openGraph: {
    title: "Design | Horizan Nepal",
    description:
      "Explore Horizan Nepal's architectural design services — 2D plans and 3D visualizations.",
    type: "website",
    url: `${siteUrl}/design`,
  },
  alternates: { canonical: `${siteUrl}/design` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Design", item: `${siteUrl}/design` },
  ],
};

export default function DesignPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <DesignHero />
      <DesignServices />
      <Design3DShowcase />
      <ConsultationForm />
    </>
  );
}

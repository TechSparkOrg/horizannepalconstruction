import type { Metadata } from "next";
import VastuShastraClient from "./VastuShastraClient";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Vastu Shastra | Horizan Nepal",
  description:
    "Explore Vastu Shastra principles for your home. Learn about room placement, directional analysis, and ancient architectural wisdom for harmonious living spaces in Nepal.",
  openGraph: {
    title: "Vastu Shastra | Horizan Nepal",
    description:
      "Explore Vastu Shastra principles for your home. Learn about room placement, directional analysis, and ancient architectural wisdom.",
    type: "website",
    url: `${siteUrl}/vastu-shastra`,
  },
  alternates: { canonical: `${siteUrl}/vastu-shastra` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Vastu Shastra", item: `${siteUrl}/vastu-shastra` },
  ],
};

export default function VastuShastraPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <VastuShastraClient />
    </>
  );
}

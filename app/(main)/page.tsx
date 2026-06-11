import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/HeroSection";
import { LdJson } from "@/components/JsonLd";
import { getBanners } from "@/api/cached/banner";

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs").then((m) => ({ default: m.WhyChooseUs })));
const HomeGallery = dynamic(() => import("@/components/HomeGallery").then((m) => ({ default: m.HomeGallery })));
const FAQSection = dynamic(() => import("@/components/FAQSection").then((m) => ({ default: m.FAQSection })));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Horizan Nepal",
    description:
      "Horizan Nepal — Premier architectural design and construction company in Nepal. Specializing in modern homes, residential projects, and sustainable building solutions.",
    openGraph: {
      title: "Horizan Nepal",
      description:
        "Premier architectural design and construction company in Nepal. Specializing in modern homes, residential projects, and sustainable building solutions.",
      type: "website",
      url: siteUrl,
    },
    alternates: { canonical: siteUrl },
  };
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Horizan Nepal",
  url: siteUrl,
  description: "Architecture, Engineering & Construction services across Nepal.",
};

export default async function Home() {
  const banners = await getBanners("home-page-hero").catch(() => null);

  return (
    <>
      {banners?.map((b) =>
        b.url ? <link rel="preload" as="image" href={b.url} key={b.id} /> : null
      )}
      <LdJson data={breadcrumb} />
      <LdJson data={websiteSchema} />
      <HeroSection initialBanners={banners ?? undefined} />
      <WhyChooseUs />
      <HomeGallery />
      <FAQSection />
    </>
  );
}

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { AboutHero } from "@/components/page_ui/AboutHero";
import { LdJson } from "@/components/global_ui/JsonLd";

const AboutTabs = dynamic(() => import("@/components/page_ui/AboutTabs").then((m) => ({ default: m.AboutTabs })));
const ServicesSection = dynamic(() => import("@/components/global_ui/ServicesSection").then((m) => ({ default: m.ServicesSection })));
const AboutGallery = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })));
const TeamSection = dynamic(() => import("@/components/global_ui/TeamSection").then((m) => ({ default: m.TeamSection })));
const TestimonialsSection = dynamic(() => import("@/components/global_ui/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })));
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then((m) => ({ default: m.ConsultationForm })));
const LocationSection = dynamic(() => import("@/components/global_ui/LocationSection").then((m) => ({ default: m.LocationSection })));

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About | Horizan Nepal",
    description:
      "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal since 1999.",
    openGraph: {
      title: "About | Horizan Nepal",
      description:
        "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal.",
      type: "website",
      url: `${siteUrl}/about`,
    },
    alternates: { canonical: `${siteUrl}/about` },
  };
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Horizan Nepal",
  description: "Architecture, Engineering & Construction services across Nepal since 1999.",
};

export default function AboutPage() {
  return (
    <>
      <LdJson data={breadcrumb} />
      <LdJson data={aboutPageSchema} />
      <AboutHero />
      <AboutTabs />
      <ServicesSection />
      <AboutGallery slug="about-page-gallary-list" label="Our Work in Action" heading="A Glimpse Into What We Do" description="From concept to completion — the projects and people that define Horizon Nepal." bg="" priority />
      <TeamSection />
      <TestimonialsSection />
      <ConsultationForm />
      <LocationSection />
    </>
  );
}

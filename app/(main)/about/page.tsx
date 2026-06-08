import type { Metadata } from "next";
import { AboutHero } from "@/components/AboutHero";
import { AboutTabs } from "@/components/AboutTabs";
import { ServicesSection } from "@/components/ServicesSection";
import { AboutGallery } from "@/components/AboutGallery";

import { TeamSection } from "@/components/TeamSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ConsultationForm } from "@/components/ConsultationForm";
import { LocationSection } from "@/components/LocationSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://horizannepal.com";

export const metadata: Metadata = {
  title: "About | Horizan Nepal",
  description:
    "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal since 1999.",
  openGraph: {
    title: "About | Horizan Nepal",
    description:
      "Learn about Horizan Nepal — our team, mission, and portfolio. A trusted name in architectural design and construction across Nepal.",
    type: "website",
  },
  alternates: { canonical: `${siteUrl}/about` },
};

const breadcrumb = {
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` },
  ],
};

const aboutPageSchema = {
  "@type": "AboutPage",
  name: "About Horizan Nepal",
  description: "Architecture, Engineering & Construction services across Nepal since 1999.",
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <AboutHero />
      <AboutTabs />
      <ServicesSection />
      <AboutGallery />
  
      <TeamSection />
      <TestimonialsSection />
      <ConsultationForm />
      <LocationSection />
    </>
  );
}

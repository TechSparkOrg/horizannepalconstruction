import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/ContactHero";
import { ConsultationForm } from "@/components/ConsultationForm";
import { LocationSection } from "@/components/LocationSection";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "");

export const metadata: Metadata = {
  title: "Contact | Horizan Nepal",
  description:
    "Get in touch with Horizan Nepal. Schedule a consultation, visit our office, or reach out to discuss your dream project. We're here to help you build better.",
  openGraph: {
    title: "Contact | Horizan Nepal",
    description:
      "Get in touch with Horizan Nepal. Schedule a consultation or visit our office.",
    type: "website",
  },
  alternates: { canonical: `${siteUrl}/contact` },
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` },
  ],
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What services does Horizon Nepal offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide end-to-end architectural design, engineering, construction management, interior design, material consultation, and site supervision for residential, commercial, and heritage projects across Nepal.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a typical project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Timelines vary by scope. A standard residential project takes 6–12 months from design to completion. Commercial projects range from 12–24 months depending on complexity and size.",
      },
    },
    {
      "@type": "Question",
      name: "Do you handle government approvals and permits?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we manage all necessary municipal approvals, building permits, and environmental clearances as part of our full-service offering.",
      },
    },
    {
      "@type": "Question",
      name: "What is the cost structure for your services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our pricing is transparent and project-specific. We offer fixed-fee, percentage-of-project, and phased payment models. A detailed quotation is provided after the initial consultation and site assessment.",
      },
    },
    {
      "@type": "Question",
      name: "Can I visit ongoing projects to see your work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We encourage potential clients to visit our active project sites. Please contact us to schedule a visit at your convenience.",
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }} />
      <ContactHero />
      <ConsultationForm />
      <LocationSection />
    </>
  );
}

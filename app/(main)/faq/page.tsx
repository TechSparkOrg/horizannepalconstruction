import type { Metadata } from "next";
import { FAQHero } from "@/components/sections/FAQHero";
import { FAQTimeline } from "@/components/sections/FAQTimeline";
import { ConsultationForm } from "@/components/ConsultationForm";

export const metadata: Metadata = {
  title: "FAQ | Horizan Nepal",
  description:
    "Frequently asked questions about Horizan Nepal's services, design process, construction timeline, costing, and more. Find answers to common queries.",
  openGraph: {
    title: "FAQ | Horizan Nepal",
    description:
      "Frequently asked questions about Horizan Nepal's services, design process, and construction timeline.",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <>
      <FAQHero />
      <FAQTimeline />
      <ConsultationForm />
    </>
  );
}

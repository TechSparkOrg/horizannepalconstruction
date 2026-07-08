"use client"

import dynamic from "next/dynamic"
import { PartnersSection } from "@/components/page_ui/PartnersSection"
import { ScrollPaperplane } from "@/components/page_ui/ScrollPaperplane"
import type { Page } from "@/api/types/page.types"
import type { TeamMember } from "@/api/types/team.types"
import type { MediaItem } from "@/api/types/media.types"

const AboutTabs = dynamic(() => import("@/components/page_ui/AboutTabs").then((m) => ({ default: m.AboutTabs })), { ssr: false })
const ServicesSection = dynamic(() => import("@/components/global_ui/ServicesSection").then((m) => ({ default: m.ServicesSection })))
const AboutGallery = dynamic(() => import("@/components/global_ui/image-grid").then((m) => ({ default: m.ImageGrid })), { ssr: false })
const TeamSection = dynamic(() => import("@/components/global_ui/TeamSection").then((m) => ({ default: m.TeamSection })))
const TestimonialsSection = dynamic(() => import("@/components/global_ui/TestimonialsSection").then((m) => ({ default: m.TestimonialsSection })))
const ConsultationForm = dynamic(() => import("@/components/global_ui/ConsultationForm").then((m) => ({ default: m.ConsultationForm })), { ssr: false })
const LocationSection = dynamic(() => import("@/components/global_ui/LocationSection").then((m) => ({ default: m.LocationSection })), { ssr: false })
const ParsedContent = dynamic(() => import("@/lib/Parse-Content"), { ssr: false })

export function AboutClient({ page, team, gallery }: { page: Page | null; team: TeamMember[]; gallery: MediaItem[] }) {
  return (
    <>
      <ScrollPaperplane />
      <AboutTabs />
      <ServicesSection />
      <PartnersSection />
      <AboutGallery initialItems={gallery} label="Our Work in Action" heading="A Glimpse Into What We Do" description="From concept to completion — the projects and people that define Horizon Nepal." bg="" priority />
      <TeamSection members={team} />
      <TestimonialsSection />
      <ConsultationForm />
      <LocationSection />
      {page?.content && (
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ParsedContent description={page.content} />
        </div>
      )}
    </>
  )
}

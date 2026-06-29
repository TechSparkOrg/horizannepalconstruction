import type { Metadata } from "next"
import { getPageBySlug } from "@/api/services/page.service"
import type { Page } from "@/api/types/page.types"
import { LdJson } from "@/components/global_ui/JsonLd"
import VastuShastraClient from "./VastuShastraClient"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "")

export async function generateMetadata(): Promise<Metadata> {
  let page: Page | null = null
  try {
    page = await getPageBySlug("vastu-shastra")
  } catch {}

  return {
    title: page?.meta_title || page?.title || "Vastu Shastra | Horizan Nepal",
    description: page?.meta_description || "Explore Vastu Shastra principles for your home. Learn about room placement, directional analysis, and ancient architectural wisdom for harmonious living spaces in Nepal.",
    openGraph: {
      title: page?.meta_title || page?.title || "Vastu Shastra | Horizan Nepal",
      description: page?.meta_description || "Explore Vastu Shastra principles for your home.",
      type: "website",
      url: `${siteUrl}/vastu-shastra`,
    },
    alternates: { canonical: `${siteUrl}/vastu-shastra` },
    ...(page?.meta_keywords ? { keywords: page.meta_keywords } : {}),
  }
}

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    { "@type": "ListItem", position: 2, name: "Vastu Shastra", item: `${siteUrl}/vastu-shastra` },
  ],
}

export default async function VastuShastraPage() {
  let pageData: Page | null = null
  try {
    pageData = await getPageBySlug("vastu-shastra")
  } catch {}

  return (
    <>
      <LdJson data={breadcrumb} />
      <VastuShastraClient pageData={pageData} />
    </>
  )
}

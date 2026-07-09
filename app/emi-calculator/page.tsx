import type { Metadata } from "next"
import { getPageBySlug } from "@/api/services/page.service"
import { getSiteUrl } from "@/lib/seo-utils"
import EmiCalculatorClient from "./EmiCalculatorClient"

const SLUG = "emi-calculator"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug(SLUG).catch(() => null)
  const siteUrl = getSiteUrl()
  const url = `${siteUrl}/${SLUG}`
  const title = page?.meta_title || "EMI Calculator | Horizan Nepal"
  const description = page?.meta_description || "Plan your construction project financing with Horizan Nepal's EMI calculator. Estimate monthly payments and check loan eligibility instantly."
  const ogImage = page?.banner_images?.[0]?.url || undefined

  return {
    title,
    description,
    alternates: { canonical: url },
    ...(page?.meta_keywords ? { keywords: page.meta_keywords } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      url,
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

export default async function EmiCalculatorPage() {
  const page = await getPageBySlug(SLUG).catch(() => null)

  return (
    <>
      <h1 className="sr-only">{page?.title || "EMI Calculator — Horizan Nepal Construction"}</h1>
      <EmiCalculatorClient pageData={page} />
    </>
  )
}

import type { Metadata } from "next"
import { getPageBySlug } from "@/api/services/page.service"
import { pageMetadataBase } from "@/lib/seo-utils"
import EmiCalculatorClient from "./EmiCalculatorClient"

const SLUG = "emi-calculator"
const pagePromise = getPageBySlug(SLUG).catch(() => null)

export async function generateMetadata(): Promise<Metadata> {
  const page = await pagePromise
  const base = pageMetadataBase(page, SLUG)
  return {
    title: page?.meta_title || "EMI Calculator | Horizan Nepal",
    description: page?.meta_description || "Plan your construction project financing with Horizan Nepal's EMI calculator. Estimate monthly payments and check loan eligibility instantly.",
    openGraph: {
      ...base.openGraph,
      title: page?.meta_title || "EMI Calculator | Horizan Nepal",
      description: page?.meta_description || "Estimate monthly payments and check loan eligibility for your construction project.",
      type: "website",
    },
    alternates: base.alternates,
    ...(base.keywords ? { keywords: base.keywords } : {}),
  }
}

export default async function EmiCalculatorPage() {
  const page = await pagePromise

  return <>
  <h1>{page?.title || "Emi - calacutor check load on construction"}</h1>
  <EmiCalculatorClient pageData={page} />
  </>
}

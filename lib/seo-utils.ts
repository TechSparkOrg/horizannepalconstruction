import type { Page } from "@/api/types/page.types"

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://horizonnepalconstruction.com").replace(/\/+$/, "")
}

export function pageMetadataBase(page: Page | null, slug: string) {
  const url = `${getSiteUrl()}/${slug}`
  return {
    alternates: { canonical: url },
    ...(page?.meta_keywords ? { keywords: page.meta_keywords } : {}),
    openGraph: {
      url,
      ...(page?.banner_images?.[0]?.url && { images: [{ url: page.banner_images[0].url }] }),
    },
  }
}

export function breadcrumbList(name: string, slug: string) {
  const url = `${getSiteUrl()}/${slug}`
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: getSiteUrl() },
      { "@type": "ListItem", position: 2, name, item: url },
    ],
  }
}

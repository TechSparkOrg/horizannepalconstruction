import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Page } from "@/api/types/page.types"

export function getPageBySlug(slug: string): Promise<Page> {
  return apiGet<Page>(`/pages/${slug}`)
}

export async function getPageBySlugSafe(slug: string): Promise<Page | null> {
  try {
    return await getPageBySlug(slug)
  } catch (err) {
    console.error("Failed to fetch page:", err)
    return null
  }
}



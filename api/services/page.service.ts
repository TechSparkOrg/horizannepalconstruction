import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { Page } from "@/api/types/page.types"

export async function getPageBySlugSafe(slug: string): Promise<Page | null> {
  try {
    return await apiGet<Page>(`/pages/${slug}`)
  } catch (err) {
    console.error("Failed to fetch page:", err)
    return null
  }
}



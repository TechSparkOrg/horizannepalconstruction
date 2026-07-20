import { api } from "@/api/ServiceHelper"
import type { Page } from "@/api/types/page.types"



export async function getPageBySlugSafe(slug: string): Promise<Page | null> {
  try {
    return await api.get<Page>(`/pages/${slug}`)
  } catch (err) {
    console.error("Failed to fetch page:", err)
    return null
  }
}



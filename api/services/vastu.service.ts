import { apiGet } from "@/api/ServiceHelper"
import type { VastuItemDetail, VastuNavResponse } from "@/api/types/vastu.types"

export async function getVastuNavSafe(): Promise<VastuNavResponse> {
  try {
    return await apiGet<VastuNavResponse>("/vastu/nav/")
  } catch (err) {
    console.error("Failed to fetch vastu nav:", err)
    return { sections: [], rooms: [], directions: [] }
  }
}

export async function getVastuItemSafe(slug: string): Promise<VastuItemDetail | null> {
  try {
    return await apiGet<VastuItemDetail>(`/vastu/${slug}/`)
  } catch (err) {
    console.error("Failed to fetch vastu item:", err)
    return null
  }
}

import { api, type PaginatedResponse } from "@/api/ServiceHelper"
import type { PublicMaterialItem, PublicMaterialDetail } from "@/api/types/material.types"

export async function getMaterialsSafe(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<PublicMaterialItem>> {
  try {
    const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
    return await api.get<PaginatedResponse<PublicMaterialItem>>(`/materials/${qs}`);
  } catch (err) {
    console.error("Failed to fetch materials:", err)
    return { results: [], count: 0, next: null, previous: null }
  }
}

export async function getMaterialBySlugSafe(slug: string): Promise<PublicMaterialDetail | null> {
  try {
    return await api.get<PublicMaterialDetail>(`/materials/${slug}/`)
  } catch (err) {
    console.error("Failed to fetch material:", err)
    return null
  }
}

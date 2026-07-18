import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { PublicMaterialItem, PublicMaterialDetail } from "@/api/types/material.types"

export function getMaterials(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<PublicMaterialItem>> {
  const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
  return apiGet<PaginatedResponse<PublicMaterialItem>>(`/materials/${qs}`);
}

export async function getMaterialBySlugSafe(slug: string): Promise<PublicMaterialDetail | null> {
  try {
    return await apiGet<PublicMaterialDetail>(`/materials/${slug}/`)
  } catch (err) {
    console.error("Failed to fetch material:", err)
    return null
  }
}

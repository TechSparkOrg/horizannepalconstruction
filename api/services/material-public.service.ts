import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { PublicMaterialItem, PublicMaterialDetail } from "@/api/types/material.types"

export function getMaterials(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<PublicMaterialItem>> {
  const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
  return apiGet<PaginatedResponse<PublicMaterialItem>>(`/materials/${qs}`);
}

export function getMaterialBySlug(slug: string): Promise<PublicMaterialDetail> {
  return apiGet<PublicMaterialDetail>(`/materials/${slug}/`)
}

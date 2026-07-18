import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper";
import type { PublicUnitConversionItem, PublicUnitConversionDetail } from "@/api/types/unit-converter.types";

export function getUnitConversions(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<PublicUnitConversionItem>> {
  const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
  return apiGet<PaginatedResponse<PublicUnitConversionItem>>(`/unit-converter/${qs}`);
}

export async function getUnitConversionBySlugSafe(slug: string): Promise<PublicUnitConversionDetail | null> {
  try {
    return await apiGet<PublicUnitConversionDetail>(`/unit-converter/${slug}/`);
  } catch (err) {
    console.error("Failed to fetch conversion:", err)
    return null
  }
}

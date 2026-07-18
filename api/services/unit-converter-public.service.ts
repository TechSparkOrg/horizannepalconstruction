import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper";
import type { PublicUnitConversionItem, PublicUnitConversionDetail } from "@/api/types/unit-converter.types";

export async function getUnitConversionsSafe(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<PublicUnitConversionItem>> {
  try {
    const qs = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : "";
    return await apiGet<PaginatedResponse<PublicUnitConversionItem>>(`/unit-converter/${qs}`);
  } catch (err) {
    console.error("Failed to fetch unit conversions:", err)
    return { results: [], count: 0, next: null, previous: null }
  }
}

export async function getUnitConversionBySlugSafe(slug: string): Promise<PublicUnitConversionDetail | null> {
  try {
    return await apiGet<PublicUnitConversionDetail>(`/unit-converter/${slug}/`);
  } catch (err) {
    console.error("Failed to fetch conversion:", err)
    return null
  }
}

import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { PublicVendor } from "@/api/types/material.types"

export function getVendors(): Promise<PaginatedResponse<PublicVendor>> {
  return apiGet<PaginatedResponse<PublicVendor>>("/vendors/")
}

import { api, type PaginatedResponse } from "@/api/ServiceHelper"
import type { PublicVendor } from "@/api/types/material.types"

export async function getVendorsSafe(): Promise<PaginatedResponse<PublicVendor>> {
  try {
    return await api.get<PaginatedResponse<PublicVendor>>("/vendors/")
  } catch (err) {
    console.error("Failed to fetch vendors:", err)
    return { results: [], count: 0, next: null, previous: null }
  }
}

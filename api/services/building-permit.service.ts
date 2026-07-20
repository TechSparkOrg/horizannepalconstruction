import { api, type PaginatedResponse } from "@/api/ServiceHelper"
import type { BuildingPermitConfig } from "@/api/types/building-permit.types"

export async function getBuildingPermitSingleSafe(): Promise<BuildingPermitConfig | null> {
  try {
    const data = await api.get<PaginatedResponse<BuildingPermitConfig>>("/building-permit/")
    return data?.results?.[0] ?? null
  } catch (err) {
    console.error("Failed to fetch building permit:", err)
    return null
  }
}


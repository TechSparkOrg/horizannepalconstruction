import { apiGet, type PaginatedResponse } from "@/api/ServiceHelper"
import type { BuildingPermitConfig } from "@/api/types/building-permit.types"

export async function getBuildingPermitSingle(): Promise<BuildingPermitConfig | null> {
  const data = await apiGet<PaginatedResponse<BuildingPermitConfig>>("/building-permit/")
  return data?.results?.[0] ?? null
}


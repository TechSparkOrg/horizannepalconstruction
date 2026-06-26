import { apiGet } from "@/api/ServiceHelper"
import type { BuildingPermitConfig } from "@/api/types/building-permit.types"

export function getBuildingPermit(): Promise<BuildingPermitConfig[]> {
  return apiGet<BuildingPermitConfig[]>("/building-permit/")
}

export async function getBuildingPermitSingle(): Promise<BuildingPermitConfig | null> {
  const data = await apiGet<BuildingPermitConfig[]>("/building-permit/")
  return data?.[0] ?? null
}

export const BuildingPermitPublic = {
  search: getBuildingPermit,
  get: getBuildingPermitSingle,
}

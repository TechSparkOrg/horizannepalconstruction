import { apiGet } from "@/api/ServiceHelper"
import type { VastuConfig } from "@/api/types/vastu.types"

export function getVastuConfig(): Promise<VastuConfig[]> {
  return apiGet<VastuConfig[]>("/vastu/")
}

export const VastuPublic = { get: getVastuConfig }

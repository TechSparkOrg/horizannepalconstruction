import { apiGet } from "@/api/ServiceHelper"
import type { VastuItemDetail, VastuNavResponse } from "@/api/types/vastu.types"

export function getVastuNav(): Promise<VastuNavResponse> {
  return apiGet<VastuNavResponse>("/vastu/nav/")
}

export function getVastuItem(slug: string): Promise<VastuItemDetail> {
  return apiGet<VastuItemDetail>(`/vastu/${slug}/`)
}

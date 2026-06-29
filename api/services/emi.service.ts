import { apiGet } from "@/api/ServiceHelper"
import type { EmiBank } from "@/api/types/emi.types"

export async function getBanks(): Promise<EmiBank[]> {
  const res = await apiGet<{ count: number; results: EmiBank[] }>("/emi/banks")
  return res.results ?? []
}

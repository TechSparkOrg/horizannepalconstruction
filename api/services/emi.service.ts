import { api } from "@/api/ServiceHelper"
import type { EmiBank } from "@/api/types/emi.types"

export async function getBanksSafe(): Promise<EmiBank[]> {
  try {
    const res = await api.get<{ count: number; results: EmiBank[] }>("/emi/banks")
    return res.results ?? []
  } catch (err) {
    console.error("Failed to fetch banks:", err)
    return []
  }
}

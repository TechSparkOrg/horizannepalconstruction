import { apiGet } from "@/api/ServiceHelper"
import type { CalcMaterial } from "@/api/types/calculator.types"

export function getMaterials(): Promise<CalcMaterial[]> {
  return apiGet<CalcMaterial[]>("/calculator/materials/")
}

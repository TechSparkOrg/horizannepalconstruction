import { apiGet } from "@/api/ServiceHelper"
import type { SiteSettings } from "@/api/types/settings.types"

export async function getSettingsSafe(): Promise<SiteSettings | null> {
  try {
    return await apiGet<SiteSettings>("/settings/")
  } catch (err) {
    console.error("Failed to fetch settings:", err)
    return null
  }
}

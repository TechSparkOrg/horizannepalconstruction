import { apiGet } from "@/api/ServiceHelper"
import type { SiteSettings } from "@/api/types/settings.types"

export function getSettings(): Promise<SiteSettings> {
  return apiGet<SiteSettings>("/settings/")
}

export async function getSettingsSafe(): Promise<SiteSettings | null> {
  try {
    return await getSettings()
  } catch (err) {
    console.error("Failed to fetch settings:", err)
    return null
  }
}

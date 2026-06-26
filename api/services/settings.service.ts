import { apiGet } from "@/api/ServiceHelper"
import type { SiteSettings } from "@/api/types/settings.types"

export function getSettings(): Promise<SiteSettings> {
  return apiGet<SiteSettings>("/settings/")
}

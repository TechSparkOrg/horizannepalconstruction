import { create } from "zustand"
import type { SiteSettings } from "@/api/types/settings.types"
import { getSettingsSafe } from "@/api/services/settings.service"

let pendingFetch: Promise<void> | null = null

interface SettingsState {
  settings: SiteSettings | null
  loaded: boolean
  fetchSettings: () => Promise<void>
}

export const useSettings = create<SettingsState>((set) => ({
  settings: null,
  loaded: false,
  fetchSettings: async () => {
    if (pendingFetch) return pendingFetch
    pendingFetch = getSettingsSafe()
      .then((data) => {
        set({ settings: data, loaded: true })
        pendingFetch = null
      })
    return pendingFetch
  },
}))

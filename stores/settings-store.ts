import { create } from 'zustand';
import { SettingsService } from '@/api/services/settings.service';
import type { SiteSettings } from '@/api/types/settings.types';

export const useSettings = create<{
  settings: SiteSettings | null;
  loaded: boolean;
  fetchSettings: () => Promise<void>;
}>((set) => ({
  settings: null,
  loaded: false,
  fetchSettings: async () => {
    try {
      const s = await SettingsService.get();
      set({ settings: s, loaded: true });
    } catch {
      set({ loaded: true });
    }
  },
}));

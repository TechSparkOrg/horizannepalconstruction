import { create } from 'zustand';
import { SettingsService } from '@/api/services/settings.service';
import type { SiteSettings } from '@/api/types/settings.types';

let fetchPromise: Promise<void> | null = null;

export const useSettings = create<{
  settings: SiteSettings | null;
  loaded: boolean;
  fetchSettings: () => Promise<void>;
}>((set) => ({
  settings: null,
  loaded: false,
  fetchSettings: async () => {
    if (fetchPromise) return fetchPromise;
    fetchPromise = (async () => {
      try {
        const s = await SettingsService.get();
        set({ settings: s, loaded: true });
      } catch {
        set({ loaded: true });
      } finally {
        fetchPromise = null;
      }
    })();
    return fetchPromise;
  },
}));

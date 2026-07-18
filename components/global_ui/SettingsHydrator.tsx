"use client";

import { useRef } from "react";
import { useSettings } from "@/stores/settings-store";
import type { SiteSettings } from "@/api/types/settings.types";

export function SettingsHydrator({ settings }: { settings: SiteSettings | null }) {
  const seeded = useRef(false);

  if (!seeded.current) {
    seeded.current = true;
    if (settings) useSettings.setState({ settings, loaded: true });
  }

  return null;
}

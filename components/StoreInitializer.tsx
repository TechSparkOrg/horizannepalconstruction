"use client";

import { useLayoutEffect } from "react";
import { useSettings } from "@/stores/settings-store";
import type { SiteSettings } from "@/api/types/settings.types";

export function StoreInitializer({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  useLayoutEffect(() => {
    if (settings) {
      useSettings.setState({ settings, loaded: true });
    }
  }, [settings]);

  return null;
}

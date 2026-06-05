"use client";

import { useEffect } from "react";
import { useSettings } from "@/stores/settings-store";

export function SettingsLoader() {
  const fetchSettings = useSettings((s) => s.fetchSettings);
  const loaded = useSettings((s) => s.loaded);

  useEffect(() => {
    if (!loaded) fetchSettings();
  }, [loaded, fetchSettings]);

  return null;
}

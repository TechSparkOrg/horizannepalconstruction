"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/stores/settings-store";

export function SettingsLoader() {
  const fetchSettings = useSettings((s) => s.fetchSettings);
  const loaded = useSettings((s) => s.loaded);
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    if (!loaded) fetchSettings();
  }, []);

  return null;
}

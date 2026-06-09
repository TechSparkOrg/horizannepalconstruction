"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/stores/settings-store";

export function ScriptInjector() {
  const settings = useSettings((s) => s.settings);
  const fetchSettings = useSettings((s) => s.fetchSettings);
  const headInjected = useRef(false);
  const bodyInjected = useRef(false);

  useEffect(() => {
    if (!settings) fetchSettings();
  }, [settings, fetchSettings]);

  useEffect(() => {
    if (!settings?.scripts) return;

    if (settings.scripts.head && !headInjected.current) {
      const el = document.createElement("div");
      el.innerHTML = settings.scripts.head;
      for (const child of Array.from(el.children)) {
        document.head.appendChild(child);
      }
      headInjected.current = true;
    }

    if (settings.scripts.body && !bodyInjected.current) {
      const el = document.createElement("div");
      el.innerHTML = settings.scripts.body;
      for (const child of Array.from(el.children)) {
        document.body.appendChild(child);
      }
      bodyInjected.current = true;
    }
  }, [settings]);

  return null;
}

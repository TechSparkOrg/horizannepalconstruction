"use client";

import { useCallback, useEffect } from "react";

type ActionMeta = Record<string, string | number | boolean>;

const EVENTS: { action: string; meta?: ActionMeta }[] = [];

function flush() {
  if (EVENTS.length === 0) return;
  const batch = EVENTS.splice(0);
  if (typeof window !== "undefined" && (window as any).gtag) {
    batch.forEach((e) => (window as any).gtag("event", e.action, e.meta));
  }
  if (typeof window !== "undefined" && typeof fetch !== "undefined") {
    fetch("/api/analytics/events/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: batch }),
    }).catch(() => {});
  }
}

export function useTrackAction() {
  const track = useCallback((action: string, meta?: ActionMeta) => {
    EVENTS.push({ action, meta });
    if (EVENTS.length >= 10) flush();
  }, []);
  return track;
}

export function AnalyticsTracker() {
  const track = useTrackAction();

  useEffect(() => {
    track("page_view", { path: window.location.pathname });
    const handle = () => track("page_view", { path: window.location.pathname });
    window.addEventListener("popstate", handle);
    const interval = setInterval(flush, 10000);
    window.addEventListener("beforeunload", flush);
    return () => {
      window.removeEventListener("popstate", handle);
      clearInterval(interval);
      window.removeEventListener("beforeunload", flush);
      flush();
    };
  }, [track]);

  return null;
}

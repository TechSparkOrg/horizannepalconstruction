"use client";

import { useCallback, useEffect, useRef } from "react";

type ActionMeta = Record<string, string | number | boolean>;

const EVENTS: { action: string; meta?: ActionMeta }[] = [];

function flush() {
  if (EVENTS.length === 0) return;
  const batch = EVENTS.splice(0);
  if (typeof window !== "undefined" && (window as any).gtag) {
    batch.forEach((e) => (window as any).gtag("event", e.action, e.meta));
  }
}

function isExternalLink(href: string): boolean {
  if (!href || href.startsWith("/") || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) return false;
  try {
    const url = new URL(href, window.location.origin);
    return url.hostname !== window.location.hostname;
  } catch {
    return false;
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
  const scrollDepths = useRef(new Set<number>());
  const timeIntervals = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    track("page_view", { path: window.location.pathname });

    const handlePopState = () => track("page_view", { path: window.location.pathname });

    // Click tracking
    const handleClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const link = el.closest("a");
      const text = (el.textContent ?? "").trim().slice(0, 80);

      if (link) {
        const href = link.getAttribute("href") || "";
        if (isExternalLink(href)) {
          track("outbound_link", { url: href, text, tag: link.tagName });
        } else {
          track("click", { text, tag: "a", href, id: link.id || "" });
        }
      } else {
        track("click", { text, tag: el.tagName, id: el.id || "", class: el.className?.slice(0, 60) || "" });
      }
    };

    // Scroll depth tracking
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.round((scrollTop / docHeight) * 100);
      const thresholds = [25, 50, 75, 100];
      for (const t of thresholds) {
        if (pct >= t && !scrollDepths.current.has(t)) {
          scrollDepths.current.add(t);
          track("scroll_depth", { percent: t });
        }
      }
    };

    // Form submission tracking
    const handleSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      track("form_submit", { id: form.id || "", name: form.getAttribute("name") || "", action: form.action || "" });
    };

    // Time on page tracking
    const timePoints = [15, 30, 60, 120, 300];
    timePoints.forEach((sec) => {
      const id = setTimeout(() => track("time_on_page", { seconds: sec }), sec * 1000);
      timeIntervals.current.push(id);
    });

    window.addEventListener("popstate", handlePopState);
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("submit", handleSubmit);
    const interval = setInterval(flush, 10000);
    window.addEventListener("beforeunload", flush);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("submit", handleSubmit);
      clearInterval(interval);
      window.removeEventListener("beforeunload", flush);
      timeIntervals.current.forEach(clearTimeout);
      timeIntervals.current = [];
      scrollDepths.current.clear();
      flush();
    };
  }, [track]);

  return null;
}

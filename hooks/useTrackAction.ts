"use client";

import { useCallback, useEffect, useRef } from "react";

type ActionMeta = Record<string, string | number | boolean | null | undefined>;

function isExternalLink(href: string): boolean {
  if (!href || href.startsWith("/") || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) return false;
  try {
    const url = new URL(href, window.location.origin);
    return url.hostname !== window.location.hostname;
  } catch {
    return false;
  }
}

function getClassString(el: Element): string {
  if (typeof el.className === "string") return el.className;
  return el.getAttribute("class") || "";
}

function sendToGtag(action: string, rawMeta?: ActionMeta) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    const meta = rawMeta ? Object.fromEntries(Object.entries(rawMeta).filter(([, v]) => v != null)) as Record<string, string | number | boolean> : undefined;
    (window as any).gtag("event", action, meta);
  }
}

export function useTrackAction() {
  const track = useCallback((action: string, meta?: ActionMeta) => {
    sendToGtag(action, meta);
  }, []);
  return track;
}

type NavSection = "desktop" | "mobile" | "desktop_tools" | "mobile_tools" | "cta";

function detectNavContext(el: Element): { isNav: boolean; section: NavSection | null; label: string | null } {
  const nav = el.closest("nav, [role=navigation]");
  if (!nav) return { isNav: false, section: null, label: null };

  const isMobile = !!el.closest("#mobile-menu");
  const isTools = !!el.closest("[data-nav-tools]");

  let section: NavSection = "desktop";
  if (isMobile && isTools) section = "mobile_tools";
  else if (isMobile) section = "mobile";
  else if (isTools) section = "desktop_tools";

  const link = el.closest("a");
  const btn = el.closest("button");
  const label = link?.textContent?.trim() || btn?.textContent?.trim() || null;

  return { isNav: true, section, label };
}

export function AnalyticsTracker() {
  const track = useTrackAction();
  const scrollDepths = useRef(new Set<number>());
  const timeIntervals = useRef<ReturnType<typeof setTimeout>[]>([]);
  const rafRef = useRef<number | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const init = () => {
      if (initialized.current) return;
      initialized.current = true;

      track("page_view", {
        path: window.location.pathname,
        load_time_ms: Math.round(performance.now()),
      });

      const handlePopState = () => track("page_view", {
        path: window.location.pathname,
        load_time_ms: Math.round(performance.now()),
      });

      const handleClick = (e: MouseEvent) => {
        const el = e.target as HTMLElement;
        const link = el.closest("a");
        const text = (el.textContent ?? "").trim().slice(0, 80);
        const { isNav, section, label } = detectNavContext(el);

        // ———— Nav-specific events ————
        if (isNav && link) {
          const href = link.getAttribute("href") || "";

          if (isExternalLink(href)) {
            track("outbound_link", { url: href, text, section });
            return;
          }

          const isCta = label?.toLowerCase().includes("quote") || link.closest('[class*="cta"]');
          if (isCta) {
            track("cta_click", { label: label || text, href, section });
            return;
          }

          track("nav_click", { label: label || text, href, section });
          return;
        }

        // ———— Nav toggle buttons (hamburger / tools dropdown) ————
        if (isNav) {
          const ariaLabel = el.getAttribute("aria-label") || el.closest("button")?.getAttribute("aria-label") || "";
          const controls = el.getAttribute("aria-controls") || el.closest("button")?.getAttribute("aria-controls") || "";

          if (ariaLabel.toLowerCase().includes("menu") || controls === "mobile-menu") {
            const action = ariaLabel.toLowerCase().includes("close") ? "close" : "open";
            track("nav_toggle", { target: "mobile_menu", action, section });
            return;
          }

          const btn = el.closest("button");
          if (btn && (btn.textContent?.trim() === "Tools" || label === "Tools")) {
            const expanded = btn.getAttribute("aria-expanded");
            const isToolsOpen = expanded === "true";
            const target = section === "mobile_tools" ? "tools_accordion" : "tools_dropdown";
            track("nav_toggle", { target, action: isToolsOpen ? "open" : "close", section });
            return;
          }

          // fallback nav click (e.g. overlay tap to close)
          if (section === "mobile") {
            track("nav_toggle", { target: "mobile_menu", action: "close", section });
            return;
          }

          track("click", { text, tag: el.tagName, section: section || "" });
          return;
        }

        // ———— Regular link clicks ————
        if (link) {
          const href = link.getAttribute("href") || "";
          if (isExternalLink(href)) {
            track("outbound_link", { url: href, text, tag: link.tagName });
          } else {
            track("click", { text, tag: "a", href, id: link.id || "" });
          }
          return;
        }

        // ———— Non-link, non-nav clicks ————
        track("click", {
          text,
          tag: el.tagName,
          id: el.id || "",
          class: getClassString(el).slice(0, 60),
        });
      };

      const handleScroll = () => {
        if (rafRef.current !== null) return;
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
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
        });
      };

      const handleSubmit = (e: Event) => {
        const form = e.target as HTMLFormElement;
        track("form_submit", { id: form.id || "", name: form.getAttribute("name") || "", action: form.action || "" });
      };

      const timePoints = [15, 30, 60, 120, 300];
      timePoints.forEach((sec) => {
        const id = setTimeout(() => track("time_on_page", { seconds: sec }), sec * 1000);
        timeIntervals.current.push(id);
      });

      window.addEventListener("popstate", handlePopState);
      document.addEventListener("click", handleClick);
      document.addEventListener("scroll", handleScroll, { passive: true });
      document.addEventListener("submit", handleSubmit);
    };

    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init, { once: true });
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      timeIntervals.current.forEach(clearTimeout);
      timeIntervals.current = [];
      scrollDepths.current.clear();
    };
  }, [track]);

  return null;
}
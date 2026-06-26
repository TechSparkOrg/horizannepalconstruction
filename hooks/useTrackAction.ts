"use client"

import { useCallback } from "react"

export function useTrackAction() {
  const track = useCallback((action: string, data?: Record<string, unknown>) => {
    if (typeof window !== "undefined" && "gtag" in window) {
      ;(window as Record<string, unknown> & { gtag?: (...args: unknown[]) => void }).gtag?.("event", action, data)
    }
  }, [])
  return track
}

export function AnalyticsTracker() {
  return null
}

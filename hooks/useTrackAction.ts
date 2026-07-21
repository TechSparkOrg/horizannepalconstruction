"use client"

import { useCallback } from "react"
import { trackEvent, type EventName } from "@/lib/tracking"

export function useTrackAction() {
  return useCallback(
    (action: EventName, data?: Record<string, unknown>) => trackEvent(action, data),
    [],
  )
}

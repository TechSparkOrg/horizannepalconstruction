"use client"

import { useRef, useEffect } from "react"
import { trackEvent, type EventName } from "@/lib/tracking"

export function useTrackView(event: EventName, threshold = 0.5) {
  const fired = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || fired.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true
          trackEvent(event)
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [event, threshold])

  return ref
}

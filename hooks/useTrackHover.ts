"use client"

import { useRef, useEffect } from "react"
import { trackEvent, type EventName } from "@/lib/tracking"

export function useTrackHover<T extends HTMLElement>(event: EventName) {
  const fired = useRef(false)
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node || fired.current) return

    let timer: ReturnType<typeof setTimeout>

    const onEnter = () => {
      if (fired.current) return
      timer = setTimeout(() => {
        fired.current = true
        trackEvent(event)
      }, 500)
    }
    const onLeave = () => clearTimeout(timer)

    node.addEventListener("mouseenter", onEnter)
    node.addEventListener("mouseleave", onLeave)

    return () => {
      node.removeEventListener("mouseenter", onEnter)
      node.removeEventListener("mouseleave", onLeave)
      clearTimeout(timer)
    }
  }, [event])

  return ref
}

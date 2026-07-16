"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

// 4-stop snake — wide horizontal swing for dramatic curves
const WAYPOINTS = [
  { progress: 0,    x: 85, y: 14 },  // hero — far right
  { progress: 0.33, x: 10, y: 42 },  // far left
  { progress: 0.67, x: 82, y: 68 },  // far right
  { progress: 1.0,  x: 12, y: 91 },  // bottom — far left
] as const

type WP = (typeof WAYPOINTS)[number]

function getPositionAtProgress(progress: number) {
  const p = Math.max(0, Math.min(1, progress))

  let i = 0
  while (i < WAYPOINTS.length - 2 && WAYPOINTS[i + 1].progress <= p) i++

  const a: WP = WAYPOINTS[i]
  const b: WP = WAYPOINTS[i + 1] ?? WAYPOINTS[WAYPOINTS.length - 1]
  const span = b.progress - a.progress
  const t = span > 0 ? (p - a.progress) / span : 1

  return {
    x: a.x + (b.x - a.x) * t,
    y: a.y + (b.y - a.y) * t,
    angle: Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI),
  }
}

// Adjust if the plane SVG default orientation isn't pointing right (→)
const PLANE_ANGLE_OFFSET = 0

// Max tilt from mouse gesture (degrees)
const MAX_MOUSE_TILT = 50

export function ScrollPaperplane({ src = "/video-gif/Loading-Paperplane.svg" }: { src?: string }) {
  const planeRef   = useRef<HTMLDivElement>(null)
  const current    = useRef({ x: 85, y: 14, angle: 0 })
  const target     = useRef({ x: 85, y: 14, angle: 0 })
  const rafId      = useRef<number | undefined>(undefined)

  // Mouse velocity state — not React state so it never causes re-renders
  const mouseVelY  = useRef(0)   // px/frame; negative = moving up
  const prevMouseY = useRef(-1)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? window.scrollY / max : 0
      target.current = getPositionAtProgress(progress)
    }

    const onMouseMove = (e: MouseEvent) => {
      if (prevMouseY.current >= 0) {
        // Positive when moving down, negative when moving up
        mouseVelY.current = e.clientY - prevMouseY.current
      }
      prevMouseY.current = e.clientY
    }

    const animate = () => {
      const c = current.current
      const t = target.current
      const L = 0.08

      c.x += (t.x - c.x) * L
      c.y += (t.y - c.y) * L

      // Lerp scroll-based angle
      let da = t.angle - c.angle
      if (da >  180) da -= 360
      if (da < -180) da += 360
      c.angle += da * L

      // Mouse tilt: moving up (negative vel) → counter-clockwise (nose up)
      //             moving down (positive vel) → clockwise (nose down)
      const rawTilt = mouseVelY.current * 2.8
      const mouseTilt = Math.max(-MAX_MOUSE_TILT, Math.min(MAX_MOUSE_TILT, rawTilt))

      // Decay mouse velocity so tilt fades when mouse is idle
      mouseVelY.current *= 0.82

      if (planeRef.current) {
        const px = (c.x / 100) * window.innerWidth
        const py = (c.y / 100) * window.innerHeight
        planeRef.current.style.left      = `${px}px`
        planeRef.current.style.top       = `${py}px`
        planeRef.current.style.transform =
          `translate(-50%, -50%) rotate(${c.angle + mouseTilt + PLANE_ANGLE_OFFSET}deg)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener("scroll",    onScroll,    { passive: true })
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll",    onScroll)
      window.removeEventListener("mousemove", onMouseMove)
      if (rafId.current !== undefined) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      className="hidden md:block fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    >
      <div
        ref={planeRef}
        className="absolute"
        style={{
          left: "85vw",
          top:  "14vh",
          transform: "translate(-50%, -50%)",
          filter: "drop-shadow(0 4px 14px rgba(15,37,87,0.6)) drop-shadow(0 0 8px rgba(29,78,216,0.35))",
          willChange: "transform, left, top",
        }}
      >
        <Image
          src={src}
          alt=""
          width={110}
          height={110}
          className="w-20 h-20 sm:w-[110px] sm:h-[110px]"
          sizes="(max-width: 640px) 80px, 110px"
          priority
          unoptimized
        />
      </div>
    </div>
  )
}

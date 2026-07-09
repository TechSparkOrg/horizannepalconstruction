"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const FEATHER_ANGLE_OFFSET = -45
const MAX_TILT = 35

export function ScrollFeather() {
  const featherRef  = useRef<HTMLDivElement>(null)
  const current     = useRef({ x: 50, y: 30, angle: 0 })
  const target      = useRef({ x: 50, y: 30, angle: 0 })
  const rafId       = useRef<number | undefined>(undefined)

  const mouseVelY   = useRef(0)
  const prevMouseY  = useRef(-1)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth)  * 100
      target.current.y = (e.clientY / window.innerHeight) * 100
      if (prevMouseY.current >= 0) {
        mouseVelY.current = e.clientY - prevMouseY.current
      }
      prevMouseY.current = e.clientY
    }

    const animate = () => {
      const c = current.current
      const t = target.current
      const L = 0.06

      c.x += (t.x - c.x) * L
      c.y += (t.y - c.y) * L

      const rawTilt = mouseVelY.current * 2.2
      const mouseTilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, rawTilt))
      mouseVelY.current *= 0.82

      // Gentle continuous bob
      const bob = Math.sin(Date.now() * 0.0012) * 1.8

      if (featherRef.current) {
        const px = (c.x / 100) * window.innerWidth
        const py = (c.y / 100) * window.innerHeight + bob
        featherRef.current.style.left      = `${px}px`
        featherRef.current.style.top       = `${py}px`
        featherRef.current.style.transform =
          `translate(-50%, -50%) rotate(${mouseTilt + FEATHER_ANGLE_OFFSET}deg)`
      }

      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      if (rafId.current !== undefined) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div
      className="hidden md:block fixed inset-0 pointer-events-none z-[99999]"
      aria-hidden="true"
    >
      <div
        ref={featherRef}
        className="absolute"
        style={{
          left: "50vw",
          top: "30vh",
          transform: `translate(-50%, -50%) rotate(${FEATHER_ANGLE_OFFSET}deg)`,
          filter: "drop-shadow(0 2px 10px rgba(15,37,87,0.22)) drop-shadow(0 0 6px rgba(147,197,253,0.18))",
          willChange: "transform, left, top",
        }}
      >
        <Image
          src="/video-gif/feather.svg"
          alt=""
          width={160}
          height={160}
          className="w-28 h-auto sm:w-[160px]"
          priority
          unoptimized
        />
      </div>
    </div>
  )
}

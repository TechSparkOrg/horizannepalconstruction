"use client";

import { useRef, useState, useEffect } from "react";

const ANIMATIONS: Record<string, string> = {
  "fade-in-up": "animate-fade-in-up",
  "scale-in": "animate-scale-in",
  "slide-in-left": "animate-slide-in-left",
  "slide-in-right": "animate-slide-in-right",
  "blur-in": "animate-blur-in",
  "reveal-up": "animate-reveal-up",
};

export function AnimateOnView({
  children,
  className,
  animation = "fade-in-up",
}: {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in-up" | "scale-in" | "slide-in-left" | "slide-in-right" | "blur-in" | "reveal-up";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "-80px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? ANIMATIONS[animation] : "opacity-0"} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

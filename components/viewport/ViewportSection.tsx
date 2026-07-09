"use client";

import { useCallback, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface Props {
  children: React.ReactNode;
  fallback: React.ReactNode;
  rootMargin?: string;
}

export function ViewportSection({ children, fallback, rootMargin = "300px 0px" }: Props) {
  const { ref: sentinelRef, inView } = useInView({ triggerOnce: true, rootMargin });
  const [storedHeight, setStoredHeight] = useState<number | null>(null);

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      if (entry.contentRect.height > 0) setStoredHeight(entry.contentRect.height);
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-0" />
      {inView ? (
        <div ref={measuredRef}>{children}</div>
      ) : (
        <div style={storedHeight ? { minHeight: storedHeight } : undefined}>{fallback}</div>
      )}
    </>
  );
}

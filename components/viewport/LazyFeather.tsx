"use client";

import { useInView } from "react-intersection-observer";
import { ScrollFeather } from "@/components/page_ui/ScrollFeather";

export function LazyFeather({ src }: { src?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px 0px" });

  return (
    <>
      <div ref={ref} aria-hidden="true" className="h-0" />
      {inView && <ScrollFeather src={src} />}
    </>
  );
}

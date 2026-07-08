"use client";

import { useInView } from "react-intersection-observer";
import { ScrollPaperplane } from "@/components/page_ui/ScrollPaperplane";

export function LazyPlane() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "400px 0px" });

  return (
    <>
      <div ref={ref} aria-hidden="true" className="h-0" />
      {inView && <ScrollPaperplane />}
    </>
  );
}

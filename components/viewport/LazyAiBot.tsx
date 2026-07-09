"use client";

import { useInView } from "react-intersection-observer";
import { ScrollAiBot } from "@/components/page_ui/ScrollAiBot";

export function LazyAiBot() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px 0px" });

  return (
    <>
      <div ref={ref} aria-hidden="true" className="h-0" />
      {inView && <ScrollAiBot />}
    </>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { createModelViewerElement } from "@/lib/model-viewer";

export default function ModelViewerBlock({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!ref.current || !ready) return;
    ref.current.innerHTML = "";
    ref.current.appendChild(createModelViewerElement(src));
    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, [src, ready]);

  if (!ready) return <div className="w-full h-full flex items-center justify-center text-xs text-mid-gray">Loading 3D viewer…</div>;
  return <div ref={ref} className="w-full h-full" />;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { createModelViewerElement } from "@/lib/model-viewer";

export default function ModelViewerBlock({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    import("@google/model-viewer").then(() => { if (mounted) setReady(true); }).catch((err) => { if (mounted) console.error("Failed to load model-viewer:", err); });
    return () => { mounted = false; };
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

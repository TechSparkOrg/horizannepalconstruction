"use client";

import { useEffect, useRef, useState } from "react";

export default function ModelViewerBlock({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true));
  }, []);
  useEffect(() => {
    if (!ref.current || !ready) return;
    const el = document.createElement("model-viewer");
    el.setAttribute("src", src);
    el.setAttribute("auto-rotate", "");
    el.setAttribute("camera-controls", "");
    el.setAttribute("ar", "");
    el.setAttribute("shadow-intensity", "1");
    el.style.width = "100%";
    el.style.height = "100%";
    ref.current.innerHTML = "";
    ref.current.appendChild(el);
    return () => { if (ref.current) ref.current.innerHTML = ""; };
  }, [src, ready]);
  if (!ready) return <div className="w-full h-full flex items-center justify-center text-xs text-mid-gray">Loading 3D viewer…</div>;
  return <div ref={ref} className="w-full h-full" />;
}

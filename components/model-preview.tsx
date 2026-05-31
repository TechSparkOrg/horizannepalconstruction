"use client";

import { useEffect, useRef } from "react";
import "@google/model-viewer";
import { X } from "lucide-react";

function ModelViewerElement({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
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
  }, [src]);
  return <div ref={ref} className="w-full h-full" />;
}

export default function ModelPreview({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-8 cursor-pointer" onClick={onClose}>
      <div className="relative w-full max-w-3xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
        <ModelViewerElement src={url} />
        <button onClick={onClose} className="absolute -top-3 -right-3 bg-white text-gray-800 size-8 rounded-full grid place-items-center shadow border cursor-pointer"><X className="size-4" /></button>
      </div>
    </div>
  );
}

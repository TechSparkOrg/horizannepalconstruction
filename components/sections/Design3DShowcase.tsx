"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projects } from "@/lib/projects";

function ModelViewer({ src }: { src: string }) {
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
  if (!ready) return <div className="w-full h-full bg-brand-dark/10 flex items-center justify-center text-xs text-mid-gray">Loading 3D viewer…</div>;
  return <div ref={ref} className="w-full h-full" />;
}

export function Design3DShowcase() {
  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <SectionLabel>3D Visualization</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            3D Model Gallery
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            Browse our collection of 3D building models. Click and drag to explore each one.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/project-details/${p.slug}`}
              className="bg-white rounded-2xl border border-light-gray/40 overflow-hidden shadow-sm hover:shadow-md transition-all group"
            >
              <div className="relative aspect-square bg-brand-dark/5">
                <ModelViewer src={`/glb/${p.file}`} />
              </div>
              <div className="p-3 text-center">
                <p className="text-sm font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">{p.title}</p>
                <p className="text-xs text-mid-gray mt-0.5">{p.location}</p>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  View project <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

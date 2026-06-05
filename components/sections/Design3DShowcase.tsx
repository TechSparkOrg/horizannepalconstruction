"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectService } from "@/api/services/project.service";
import { Model3dService } from "@/api/services/model3d.service";

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

function modelSrc(file: string) {
  if (!file) return "";
  if (file.startsWith("/") || file.startsWith("http")) return file;
  return `/glb/${file}`;
}

interface ModelCard {
  key: string;
  src: string;
  title: string;
  subtitle: string;
  href?: string;
}

export function Design3DShowcase() {
  const [items, setItems] = useState<ModelCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      ProjectService.list(),
      Model3dService.publicList(),
    ]).then(([projectsRes, modelsRes]) => {
      const cards: ModelCard[] = [];

      if (projectsRes.status === "fulfilled") {
        for (const p of projectsRes.value.results ?? []) {
          if (!p.file) continue;
          cards.push({
            key: `project-${p.slug}`,
            src: modelSrc(p.file),
            title: p.title,
            subtitle: p.location,
            href: `/project-details/${p.slug}`,
          });
        }
      }

      if (modelsRes.status === "fulfilled") {
        const knownSlugs = new Set(cards.map((c) => c.key));
        for (const m of modelsRes.value.results ?? []) {
          if (!m.url) continue;
          const key = `model-${m.slug || m.id}`;
          if (knownSlugs.has(key)) continue;
          cards.push({
            key,
            src: m.url,
            title: m.title || "3D Model",
            subtitle: m.description || "",
            href: m.slug ? `/models/${m.slug}` : undefined,
          });
        }
      }

      setItems(cards);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="bg-off-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-20">
          <Loader2 className="size-6 animate-spin text-mid-gray" />
        </div>
      </section>
    );
  }

  if (!items.length) {
    return (
      <section className="bg-off-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <p className="text-sm text-mid-gray">No 3D models available yet.</p>
        </div>
      </section>
    );
  }

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
          {items.map((item) => {
            const content = (
              <>
                <div className="relative aspect-square bg-brand-dark/5">
                  <ModelViewer src={item.src} />
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">{item.title}</p>
                  {item.subtitle && <p className="text-xs text-mid-gray mt-0.5 truncate">{item.subtitle}</p>}
                  {item.href && (
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View details <ArrowRight className="size-3" />
                    </span>
                  )}
                </div>
              </>
            );

            if (item.href) {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className="bg-white rounded-2xl border border-light-gray/40 overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={item.key}
                className="bg-white rounded-2xl border border-light-gray/40 overflow-hidden shadow-sm"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

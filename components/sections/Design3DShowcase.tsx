"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectPublic } from "@/api/services/project.service";
import { Model3dPublic } from "@/api/services/model3d.service";

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

export function Design3DShowcase({ initialItems }: { initialItems?: ModelCard[] }) {
  const [items, setItems] = useState<ModelCard[]>(initialItems ?? []);
  const [loading, setLoading] = useState(!initialItems);

  useEffect(() => {
    if (initialItems) return;
    Promise.allSettled([
      ProjectPublic.list(),
      Model3dPublic.list(),
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
  }, [initialItems]);

  if (loading) {
    return (
      <section className="bg-off-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <div className="mx-auto h-4 w-24 rounded-full bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-8 w-64 rounded-lg bg-light-gray/40 animate-pulse" />
            <div className="mx-auto h-4 w-72 rounded bg-light-gray/30 animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col bg-white rounded-xl border border-light-gray/40 overflow-hidden">
                <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                  <div className="absolute inset-0 bg-light-gray/30 animate-pulse" />
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-light-gray/40 animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import ModelViewerBlock from "@/components/ModelViewerBlock";
import { Model3dService } from "@/api/services/model3d.service";
import type { ModelItem } from "@/api/types/model3d.types";

export default function ModelViewerPage() {
  const { slug } = useParams<{ slug: string }>();
  const [model, setModel] = useState<ModelItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Model3dService.publicGetBySlug(slug)
      .then(setModel)
      .catch(() => notFound())
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="bg-off-white py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center py-20">
          <Loader2 className="size-6 animate-spin text-mid-gray" />
        </div>
      </section>
    );
  }

  if (!model) return null;

  return (
    <>
      {/* Hero with 3D Viewer */}
      <section className="relative bg-brand-dark pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/design"
            className="inline-flex items-center gap-1.5 text-sm text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Design
          </Link>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight">
            {model.title}
          </h1>
          {model.description && (
            <p className="mt-3 text-white/60 text-lg max-w-2xl">{model.description}</p>
          )}
        </div>
      </section>

      {/* 3D Viewer */}
      <section className="bg-brand-dark pb-16 sm:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-[16/9] max-h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-brand-dark/80">
            <ModelViewerBlock src={model.url} />
          </div>
        </div>
      </section>
    </>
  );
}

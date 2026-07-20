import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
const ModelViewerBlock = dynamic(() => import("@/components/global_ui/model-viewer"), {
  loading: () => <div className="size-full flex items-center justify-center text-white/40 text-sm">Loading 3D viewer…</div>,
});
import { getModelBySlugSafe } from "@/api/services/model3d.service";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const model = await getModelBySlugSafe(slug);
  if (!model) return { title: "Model Not Found" };
  return {
    title: `${model.title} | 3D Model`,
    description: model.description || "",
  };
}

export default async function ModelViewerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const model = await getModelBySlugSafe(slug);
  if (!model) notFound();

  return (
    <>
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

      <section className="bg-brand-dark pb-16 sm:pb-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-[16/9] max-h-[600px] rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-brand-dark/80">
            {model.url ? (
              <ModelViewerBlock src={model.url} />
            ) : (
              <div className="size-full flex items-center justify-center text-white/40 text-sm">No model file available</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

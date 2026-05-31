import { Eye } from "lucide-react";

export function DesignShowcaseSection() {
  return (
    <section className="py-16 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative min-h-[70vh] bg-brand-dark rounded-2xl overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, oklch(1 0 0 / 0.03) 0%, transparent 70%)",
            }}
          />

          <Eye className="size-16 text-white/10" />

          <p className="absolute bottom-6 left-6 text-white/70 text-xs tracking-[0.2em] uppercase font-light">
            Featured Design
          </p>
        </div>
      </div>
    </section>
  );
}

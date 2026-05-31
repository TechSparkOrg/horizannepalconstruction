import Image from "next/image";

export function CostEstimationHero() {
  return (
    <section className="relative min-h-[55vh] flex items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
        <h1
          className="font-display font-bold text-white leading-[1.05] max-w-3xl mx-auto"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          Cost Estimate
        </h1>

        <p className="mt-4 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">
          Visualize and calculate your dream construction project in 3D
        </p>
      </div>
    </section>
  );
}

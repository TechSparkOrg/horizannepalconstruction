import Image from "next/image";
import VastuShastraGuide from "@/components/sections/VastuShastraGuide";

export default function VastuShastraPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80" alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">Tools</span>
          <h1 className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>Vastu Shastra Guide</h1>
          <p className="mt-6 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">Ancient wisdom for modern living — align your home with cosmic energies for harmony, health, and prosperity.</p>
        </div>
      </section>
      <VastuShastraGuide />
    </>
  );
}

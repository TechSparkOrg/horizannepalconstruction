import { SectionLabel } from "@/components/ui/SectionLabel";

export function WelcomeText() {
  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs tracking-[0.2em] uppercase text-brand-primary/60 font-semibold">
          Welcome
        </span>
        <h2 className="mt-4 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl leading-tight">
          We Build More Than Structures
        </h2>
        <div className="mt-6 mx-auto w-16 h-0.5 bg-brand-primary/30" />
        <p className="mt-6 text-mid-gray text-lg leading-relaxed max-w-[640px] mx-auto">
          At Horizon Nepal, every project begins with a conversation. We listen, we plan, and then we build — with craftsmanship, transparency, and a deep respect for the communities we serve.
        </p>
      </div>
    </section>
  );
}

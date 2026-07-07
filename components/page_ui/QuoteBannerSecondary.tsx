import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function QuoteBannerSecondary() {
  return (
    <section className="bg-brand-dark py-16 sm:py-24">
      <div className="max-w-[800px] mx-auto px-6 text-center">

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="block w-8 h-px bg-brand-secondary shrink-0" aria-hidden="true" />
          <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brand-secondary">
            Our Philosophy
          </span>
          <span className="block w-8 h-px bg-brand-secondary shrink-0" aria-hidden="true" />
        </div>

        {/* Quote — Playfair Display italic for editorial gravitas */}
        <blockquote className="font-display italic text-white text-[clamp(1.2rem,2.5vw,1.75rem)] font-semibold leading-[1.6]">
          &ldquo;Architecture is not just about building. It is about creating spaces where life happens — where families grow, businesses thrive, and communities flourish.&rdquo;
        </blockquote>

        <p className="mt-6 text-white/45 text-[13px] font-medium tracking-wide">
          &mdash; Arun Poudel, Founder
        </p>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 h-11 px-8 rounded-full bg-brand-primary hover:bg-blue-700 text-white font-semibold text-[13.5px] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
          >
            Start Your Project
            <ArrowRight className="size-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}

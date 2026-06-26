export function QuoteBannerSecondary() {
  return (
    <section className="relative bg-[#cd2028] overflow-hidden py-16 sm:py-28">
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-white/30 to-[#0f2557]/30" aria-hidden="true" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="font-display text-amber-400/60 leading-none text-[7rem]" aria-hidden="true">
          &ldquo;
        </div>
        <div className="-mt-8 min-h-[160px] flex items-start">
          <blockquote className="font-display italic text-white text-2xl sm:text-3xl leading-relaxed">
            Architecture is not just about building. It is about creating spaces where life happens — where families grow, businesses thrive, and communities flourish.
          </blockquote>
        </div>
        <div className="mt-6 min-h-[24px] flex items-start justify-center">
          <p className="text-white/60 text-sm">&mdash; Arun Poudel, Founder</p>
        </div>
      </div>
    </section>
  );
}

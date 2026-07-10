const perspectives = [
  {
    num: "01",
    label: "Vision",
    title: "We Start With Your Story",
    body: "Every great build begins with understanding — your lifestyle, your business, your aspirations. We take the time to listen before putting pencil to paper, ensuring the final design reflects who you are.",
    metric: "100%",
    metricLabel: "Bespoke Design",
    metricSub: "No templates. Every project starts from zero.",
  },
  {
    num: "02",
    label: "Craft",
    title: "Precision in Every Detail",
    body: "From material selection to finishing touches, our team holds every phase to rigorous standards. We believe quality is not an afterthought — it is built in from the very first drawing.",
    metric: "±1mm",
    metricLabel: "CAD Precision",
    metricSub: "Millimetre-level accuracy on all technical drawings.",
  },
  {
    num: "03",
    label: "Trust",
    title: "Transparent Every Step",
    body: "No surprises. We provide regular progress updates, clear cost breakdowns, and open lines of communication so you always know where your project stands.",
    metric: "24h",
    metricLabel: "Update Cycle",
    metricSub: "We respond to every client query within 24 hours.",
  },
  {
    num: "04",
    label: "Impact",
    title: "Built for the Long Run",
    body: "We design and build with longevity in mind — using durable materials, timeless aesthetics, and construction techniques that minimise maintenance and maximise value over decades.",
    metric: "30yr",
    metricLabel: "Structural Life",
    metricSub: "Designs engineered to stand for generations.",
  },
];

export function HowWeWorkDesignGrid() {
  return (
    <section className="bg-[#f8fafc] py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16 sm:mb-20">
          <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-3 flex items-center justify-center gap-2.5">
            <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
            Our Approach
            <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
          </p>
          <h2 className="font-display font-black text-brand-dark text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] tracking-[-0.02em]">
            Designing With Purpose
          </h2>
          <p className="mt-4 text-[#64748b] text-[15px] leading-relaxed">
            Four principles that guide every decision — from the first sketch to the final nail.
          </p>
        </div>

        {/* Alternating rows */}
        <div className="space-y-12 sm:space-y-16">
          {perspectives.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={item.title}
                className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center"
              >
                {/* Text block */}
                <div className={isLeft ? "" : "md:order-2"}>
                  <span className="inline-block text-[10.5px] tracking-[0.22em] uppercase text-[#cd2028] font-bold mb-3">
                    {item.num} &mdash; {item.label}
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-[1.75rem] text-brand-dark leading-tight tracking-[-0.015em]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[#64748b] text-[14.5px] leading-relaxed max-w-md">
                    {item.body}
                  </p>
                  <div className="mt-6 w-10 h-[3px] bg-[#cd2028]" aria-hidden="true" />
                </div>

                {/* Metric panel */}
                <div className={isLeft ? "md:order-2" : "md:order-1"}>
                  <div
                    className="relative rounded-2xl overflow-hidden flex flex-col justify-between p-8 sm:p-10 min-h-[200px]"
                    style={{
                      background: "#07112b",
                      backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 12px)",
                    }}
                  >
                    {/* Step label */}
                    <div className="flex items-center gap-2 mb-6">
                      <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
                      <span className="text-[9.5px] font-bold tracking-[0.22em] uppercase text-white/40">
                        {item.num} &mdash; {item.label}
                      </span>
                    </div>

                    {/* Big metric */}
                    <div>
                      <p
                        className="font-black text-white leading-none"
                        style={{ fontSize: "clamp(3rem,7vw,5rem)" }}
                      >
                        {item.metric}
                      </p>
                      <p className="text-[#cd2028] font-bold text-[13px] uppercase tracking-[0.18em] mt-2">
                        {item.metricLabel}
                      </p>
                      <p className="text-white/45 text-[12.5px] mt-2 leading-relaxed max-w-[260px]">
                        {item.metricSub}
                      </p>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-4 right-4 size-6 border-t-2 border-r-2 border-white/10 rounded-tr-md" aria-hidden="true" />
                    <div className="absolute bottom-4 left-4 size-6 border-b-2 border-l-2 border-white/10 rounded-bl-md" aria-hidden="true" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { SectionLabel } from "@/components/ui/SectionLabel";

const perspectives = [
  {
    num: "01",
    label: "Vision",
    title: "We Start With Your Story",
    body: "Every great build begins with understanding — your lifestyle, your business, your aspirations. We take the time to listen before putting pencil to paper, ensuring the final design reflects who you are.",
  },
  {
    num: "02",
    label: "Craft",
    title: "Precision in Every Detail",
    body: "From material selection to finishing touches, our team holds every phase to rigorous standards. We believe quality is not an afterthought — it is built in from the very first drawing.",
  },
  {
    num: "03",
    label: "Trust",
    title: "Transparent Every Step",
    body: "No surprises. We provide regular progress updates, clear cost breakdowns, and open lines of communication so you always know where your project stands.",
  },
  {
    num: "04",
    label: "Impact",
    title: "Built for the Long Run",
    body: "We design and build with longevity in mind — using durable materials, timeless aesthetics, and construction techniques that minimise maintenance and maximise value over decades.",
  },
];

export function HowWeWorkDesignGrid() {
  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>Our Approach</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Designing With Purpose
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            Four principles that guide every decision we make — from the first sketch to the final nail.
          </p>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {perspectives.map((item, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={item.title}
                className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center"
              >
                <div className={isLeft ? "md:pr-8" : "md:pl-8 md:order-2"}>
                  <span className="inline-block text-sm tracking-[0.2em] uppercase text-brand-primary/60 font-semibold mb-2">
                    {item.num} &mdash; {item.label}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-secondary leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-mid-gray leading-relaxed">
                    {item.body}
                  </p>
                  <div className="mt-6 w-16 h-0.5 bg-brand-primary/30" />
                </div>

                <div className={`relative ${isLeft ? "md:order-2" : "md:order-1"}`}>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-light-gray/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="size-20 mx-auto rounded-full bg-brand-primary/5 grid place-items-center mb-4">
                        <span className="font-display font-bold text-2xl text-brand-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-xs tracking-[0.15em] uppercase text-brand-secondary/40 font-semibold">
                        {item.num} &mdash; {item.label}
                      </p>
                      <div className="mt-6 mx-auto w-20 h-px bg-brand-primary/20" />
                      <p className="mt-4 text-sm text-mid-gray italic max-w-[200px] mx-auto">
                        &ldquo;{item.title}&rdquo;
                      </p>
                    </div>

                    <div className="absolute top-3 left-3 size-8 border-t-2 border-l-2 border-brand-primary/20 rounded-tl-lg" />
                    <div className="absolute bottom-3 right-3 size-8 border-b-2 border-r-2 border-brand-primary/20 rounded-br-lg" />
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

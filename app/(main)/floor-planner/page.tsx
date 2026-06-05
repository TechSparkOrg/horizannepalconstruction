import FloorPlanner from "@/components/sections/FloorPlanner";
import { BannerCarousel } from "@/components/BannerCarousel";

const benefits = [
  { title: "Accurate Measurements", desc: "Scale-accurate layouts prevent costly errors during construction." },
  { title: "Optimised Space", desc: "Every square foot is planned for maximum usability and flow." },
  { title: "Vastu Compliance", desc: "Plans can be aligned with Vastu Shastra principles from the start." },
  { title: "Permit Ready", desc: "Professionally drafted plans meet municipal submission requirements." },
  { title: "Cost Control", desc: "Detailed material and dimension planning helps you budget accurately." },
  { title: "Visualisation", desc: "See your home before it's built — walls, rooms, windows, and furniture placement." },
];

export default function FloorPlannerPage() {
  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-brand-dark">
        <BannerCarousel slug="floor-planner-page-hero" imgClassName="object-cover opacity-50 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/80 via-brand-dark/40 to-transparent">
          <div className="absolute inset-0 opacity-30" style={{ background: "linear-gradient(135deg, rgba(215,30,41,0.15) 0%, transparent 50%)" }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-brand-dark/30" />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20 text-center">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/10 inline-block">Tools</span>
          <h1 className="font-display font-bold text-white mt-6 leading-[1.05] max-w-3xl mx-auto" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>2D Floor Planner</h1>
          <p className="mt-6 text-white/70 text-lg max-w-[600px] mx-auto leading-relaxed">Plan your dream home with precision — explore sample layouts and understand the 2D planning process.</p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Interactive Tool</span>
              <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Design Your Floor Plan</h2>
              <p className="mt-4 text-mid-gray text-lg">Draw rooms, place walls, add stairs and furniture — then export your plan.</p>
            </div>
          </div>
          <FloorPlanner />
        </div>
      </section>

      <section className="bg-off-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Why Plan First</span>
            <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">Benefits of 2D Planning</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-light-gray/40">
                <h3 className="font-display font-bold text-base text-brand-dark">{b.title}</h3>
                <p className="mt-1 text-sm text-mid-gray">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

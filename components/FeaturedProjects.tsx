import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import {
  Building2,
  Trees,
  Landmark,
  Building,
  Hotel,
  Map,
} from "lucide-react";

const projects = [
  {
    title: "Sunrise Residential Complex",
    category: "Residential",
    location: "Lalitpur, Nepal",
    status: "Completed",
    icon: Building2,
    thumbBg: "oklch(0.97 0.03 35)",
    iconColor: "oklch(0.75 0.10 35)",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    slug: "/project-details/sunrise-residential-complex",
  },
  {
    title: "Green Valley Eco Resort",
    category: "Commercial",
    location: "Pokhara, Nepal",
    status: "Ongoing",
    icon: Trees,
    thumbBg: "oklch(0.97 0.04 80)",
    iconColor: "oklch(0.72 0.10 80)",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80",
    slug: "/project-details/green-valley-resort",
  },
  {
    title: "Durbar Square Heritage Inn",
    category: "Heritage",
    location: "Bhaktapur, Nepal",
    status: "Completed",
    icon: Landmark,
    thumbBg: "oklch(0.96 0.04 275)",
    iconColor: "oklch(0.68 0.14 275)",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&q=80",
    slug: "/project-details/durbar-square-heritage-inn",
  },
  {
    title: "Himalayan Heights Tower",
    category: "Commercial",
    location: "Kathmandu, Nepal",
    status: "Planning",
    icon: Building,
    thumbBg: "oklch(0.96 0.03 240)",
    iconColor: "oklch(0.68 0.12 240)",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80",
    slug: "/project-details/himalayan-heights-tower",
  },
  {
    title: "Lakeside Boutique Hotel",
    category: "Hospitality",
    location: "Pokhara, Nepal",
    status: "Completed",
    icon: Hotel,
    thumbBg: "oklch(0.97 0.03 35)",
    iconColor: "oklch(0.75 0.10 35)",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
    slug: "/project-details/lakeside-boutique-hotel",
  },
  {
    title: "Garden City Township",
    category: "Urban Planning",
    location: "Chitwan, Nepal",
    status: "Ongoing",
    icon: Map,
    thumbBg: "oklch(0.96 0.04 145)",
    iconColor: "oklch(0.65 0.13 145)",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    slug: "/project-details/garden-city-township",
  },
];

const statusConfig: Record<string, { label: string; bg: string; color: string; progress: string; width: string }> = {
  Completed: {
    label: "Completed",
    bg: "oklch(0.96 0.04 145)",
    color: "oklch(0.38 0.13 145)",
    progress: "oklch(0.45 0.13 145)",
    width: "100%",
  },
  Ongoing: {
    label: "Ongoing",
    bg: "oklch(0.97 0.04 80)",
    color: "oklch(0.53 0.12 55)",
    progress: "oklch(0.62 0.14 55)",
    width: "65%",
  },
  Planning: {
    label: "Planning",
    bg: "oklch(0.96 0.03 240)",
    color: "oklch(0.45 0.15 240)",
    progress: "oklch(0.45 0.15 240)",
    width: "30%",
  },
};

export function FeaturedProjects() {
  return (
    <section id="works" className="py-16 sm:py-28 bg-off-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Our Portfolio</SectionLabel>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-brand-dark">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/our-work"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary"
          >
            View all projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => {
            const s = statusConfig[p.status];
            return (
              <Link
                key={p.title}
                href={p.slug}
                className="group relative flex flex-col bg-white rounded-xl border border-light-gray/40 shadow-sm hover:shadow-md overflow-hidden transition-all duration-200"
              >
                <div className="relative h-40 flex items-center justify-center overflow-hidden">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center w-full h-full"
                      style={{ backgroundColor: p.thumbBg }}
                    >
                      <p.icon className="size-12 opacity-60" style={{ color: p.iconColor }} />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5">
                    <div className="h-full" style={{ width: s.width, backgroundColor: s.progress }} />
                  </div>
                </div>

                <div className="flex flex-col flex-1 px-5 py-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium uppercase tracking-wider text-mid-gray">
                      {p.category}
                    </span>
                    <span
                      className="text-xs font-medium px-2.5 py-0.5 rounded-full"
                      style={{ backgroundColor: s.bg, color: s.color }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <h3 className="font-display text-base leading-snug group-hover:underline decoration-black/20 text-brand-dark">
                    {p.title}
                  </h3>
                  <span className="mt-1.5 flex items-center gap-1 text-xs text-mid-gray">
                    <MapPin className="size-3" />
                    {p.location}
                  </span>
                </div>

                <div
                  className="absolute bottom-4 right-4 size-7 rounded-full flex items-center justify-center opacity-0 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-200 bg-brand-primary"
                >
                  <ArrowRight className="size-3.5 text-white" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

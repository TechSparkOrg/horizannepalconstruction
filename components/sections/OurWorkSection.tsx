import Image from "next/image";
import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";

const projects = [
  { name: "Sunrise Residential Complex", location: "Lalitpur", year: "2025", status: "Completed", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80", slug: "sunrise-residential-complex" },
  { name: "Green Valley Resort", location: "Pokhara", year: "2024", status: "Completed", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=200&q=80", slug: "green-valley-resort" },
  { name: "Durbar Square Heritage Inn", location: "Bhaktapur", year: "2024", status: "Completed", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=200&q=80", slug: "durbar-square-heritage-inn" },
  { name: "Himalayan Heights Tower", location: "Kathmandu", year: "2026", status: "Ongoing", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=200&q=80", slug: "himalayan-heights-tower" },
  { name: "Riverside Township", location: "Chitwan", year: "2026", status: "Ongoing", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=200&q=80", slug: "riverside-township" },
  { name: "Mountain View Residency", location: "Dhulikhel", year: "2025", status: "Completed", image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=200&q=80", slug: "mountain-view-residency" },
];

const gallery = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=600&q=80",
];

export function OurWorkSection() {
  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <SectionLabel>Our Work</SectionLabel>
          <h2 className="mt-3 font-display font-bold text-brand-secondary text-3xl sm:text-4xl lg:text-5xl">
            Projects We&apos;ve Delivered
          </h2>
          <p className="mt-4 text-mid-gray text-lg">
            A selection of residential, commercial, and heritage projects across Nepal.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {projects.map((p) => (
            <div
              key={p.name}
              className="flex items-center gap-4 bg-white rounded-xl border border-light-gray/40 p-3 hover:shadow-md transition-shadow duration-300"
            >
              <div className="relative size-16 sm:size-20 rounded-lg overflow-hidden shrink-0">
                <Image src={p.image} alt={p.name} fill sizes="80px" className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-semibold text-brand-dark truncate">{p.name}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                  <span className="inline-flex items-center gap-1 text-xs text-mid-gray">
                    <MapPin className="size-3" />
                    {p.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-mid-gray">
                    <Calendar className="size-3" />
                    {p.year}
                  </span>
                  <span className={`inline-flex text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    p.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}>
                    {p.status}
                  </span>
                </div>
              </div>

              <Link
                href={`/project-details/${p.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-primary/80 transition shrink-0"
              >
                View Project <ArrowUpRight className="size-3" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {gallery.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
              <Image
                src={src}
                alt={`Project photo ${i + 1}`}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/30 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

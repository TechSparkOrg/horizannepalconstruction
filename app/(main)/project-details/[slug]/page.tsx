import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle, MapPin, Calendar, Share2, Music2, Video, Globe } from "lucide-react";
import { projects, getProjectBySlug } from "@/lib/projects";
import ModelViewerBlock from "@/components/ModelViewerBlock";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end bg-brand-dark">
        <div className="absolute inset-0">
          <Image src={project.images[0]} alt={project.title} fill priority sizes="100vw" className="object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Link href="/design" className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="size-4" />
            Back to Design
          </Link>
          <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              {project.completion}
            </span>
          </div>
        </div>
      </section>

      {/* Description + Specs */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark">About This Project</h2>
            <p className="mt-4 text-mid-gray leading-relaxed text-lg">{project.description}</p>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.specs.map((s) => (
                <div key={s.label} className="bg-off-white rounded-xl p-4">
                  <p className="text-xs text-mid-gray">{s.label}</p>
                  <p className="mt-1 text-sm font-bold text-brand-dark">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image src={project.images[1] || project.images[0]} alt={project.title} fill sizes="600px" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="bg-off-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark text-center">Materials Used</h2>
          <p className="mt-2 text-mid-gray text-center max-w-xl mx-auto">High-quality materials selected for durability, aesthetics, and sustainability.</p>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.materials.map((m) => (
              <div key={m.name} className="bg-white rounded-xl p-5 border border-light-gray/40 flex items-start gap-4">
                <CheckCircle className="size-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-brand-dark text-sm">{m.name}</p>
                  <p className="text-xs text-mid-gray mt-1">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Estimation */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark text-center">Cost Estimation</h2>
          <p className="mt-2 text-mid-gray text-center max-w-xl mx-auto">Detailed breakdown of project costs.</p>
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="bg-off-white rounded-2xl border border-light-gray/40 overflow-hidden">
              {project.costEstimation.map((c, i) => (
                <div key={c.item} className={`flex items-center justify-between px-6 py-4 ${i < project.costEstimation.length - 1 ? "border-b border-light-gray/40" : ""}`}>
                  <span className="text-sm font-medium text-brand-dark">{c.item}</span>
                  <span className="text-sm font-bold text-brand-primary">{c.amount}</span>
                </div>
              ))}
              <div className="flex items-center justify-between px-6 py-4 bg-brand-dark text-white">
                <span className="text-sm font-bold">Total Estimated Cost</span>
                <span className="text-sm font-bold">
                  NPR {project.costEstimation.reduce((sum, c) => {
                    const num = parseInt(c.amount.replace(/[^0-9]/g, ""));
                    return sum + num;
                  }, 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Model Preview */}
      <section className="bg-off-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark">3D Model</h2>
            <p className="mt-2 text-mid-gray">Interact with the 3D model below — drag to rotate, scroll to zoom.</p>
          </div>
          <div className="relative w-full aspect-[16/9] max-h-[500px] rounded-2xl overflow-hidden border border-light-gray/40 bg-brand-dark/5 shadow-lg">
            <ModelViewerBlock src={`/glb/${project.file}`} />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-dark">Project Gallery</h2>
            <p className="mt-2 text-mid-gray">Photos from the project site and completed work.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
              "https://images.unsplash.com/photo-1600585153490-76fb20a32601?w=600&q=80",
              "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80",
              "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=600&q=80",
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80",
              "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80",
              "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=600&q=80",
            ].map((src, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer">
                <Image
                  src={src}
                  alt={`${project.title} gallery image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Share */}
      <section className="bg-brand-dark py-16 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Share2 className="size-8 text-brand-primary mx-auto" />
          <h2 className="mt-4 font-display font-bold text-2xl sm:text-3xl text-white">Follow Our Journey</h2>
          <p className="mt-2 text-white/70 max-w-md mx-auto">Stay connected with us on social media for project updates, behind-the-scenes content, and design inspiration.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { href: "https://facebook.com/horizonnepal", icon: Globe, label: "Facebook", color: "bg-[#1877F2]" },
              { href: "https://instagram.com/horizonnepal", icon: Globe, label: "Instagram", color: "bg-[#E4405F]" },
              { href: "https://tiktok.com/@horizonnepal", icon: Music2, label: "TikTok", color: "bg-black" },
              { href: "https://youtube.com/@horizonnepal", icon: Video, label: "YouTube", color: "bg-[#FF0000]" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${s.color} text-white inline-flex items-center gap-2.5 h-12 px-6 rounded-full font-semibold text-sm hover:brightness-110 transition-all active:scale-[0.97]`}
              >
                <s.icon className="size-4" />
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

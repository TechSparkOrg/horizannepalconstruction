import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft, CheckCircle2, MapPin, Calendar, Share2,
  Music2, Video, Globe, ArrowRight, Clock3, Tag,
} from "lucide-react";
import ModelViewerBlock from "@/components/global_ui/model-viewer";
import type { Project } from "@/api/types/project.types";
import { getProjectBySlug } from "@/api/services/project.service";
import { LdJson } from "@/components/global_ui/JsonLd";

function modelSrc(file: string) {
  if (!file) return "";
  if (file.startsWith("/") || file.startsWith("http")) return file;
  return `/glb/${file}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const project = await getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.title} | Horizan Nepal`,
      description: project.description?.slice(0, 160) || `View project details for ${project.title} by Horizan Nepal.`,
      openGraph: {
        title: `${project.title} | Horizan Nepal`,
        description: project.description?.slice(0, 160) || ``,
        type: "website",
        ...(project.images?.[0] && { images: [{ url: project.images[0] }] }),
      },
    };
  } catch {
    return { title: "Project Not Found" };
  }
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let project: Project | null = null;
  try {
    project = await getProjectBySlug(slug);
  } catch {
    notFound();
  }
  if (!project) notFound();

  const isCompleted = Boolean(project.completion);
  const heroImg = project.images?.[0] || project.thumbnail || "";
  const aboutImg = project.images?.[1] || project.images?.[0] || project.thumbnail || "";

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: project.title,
    description: project.description,
    ...(project.images?.length && { image: project.images }),
  };

  return (
    <>
      <LdJson data={projectSchema} />

      {/* ── Hero ── */}
      <section
        className="relative flex flex-col justify-end overflow-hidden bg-[#07112b]"
        style={{ minHeight: "72vh" }}
        aria-label={`${project.title} project hero`}
      >
        {heroImg && (
          <Image
            src={heroImg}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07112b]/96 via-[#0f2557]/55 to-transparent" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#cd2028] hidden lg:block" aria-hidden="true" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-10">
          {/* Breadcrumb */}
          <Link
            href="/project-details"
            className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white mb-6 transition-colors font-medium"
          >
            <ArrowLeft className="size-3.5" />
            All Projects
          </Link>

          {/* Category + status pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            {project.category_id && (
              <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-md bg-[#cd2028]/90 text-white text-[10px] font-bold tracking-[0.18em] uppercase">
                <Tag className="size-3" />
                {project.category_id}
              </span>
            )}
            <span
              className={[
                "inline-flex items-center gap-1.5 h-7 px-3 rounded-md text-[10px] font-bold tracking-[0.18em] uppercase",
                isCompleted
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-blue-500/20 text-blue-300",
              ].join(" ")}
            >
              {isCompleted ? <CheckCircle2 className="size-3" /> : <Clock3 className="size-3" />}
              {isCompleted ? "Completed" : "Ongoing"}
            </span>
          </div>

          <h1
            className="font-display font-black text-white leading-[1.03] tracking-[-0.02em] max-w-3xl"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
          >
            {project.title}
          </h1>

          {/* Meta row */}
          <div className="mt-5 flex flex-wrap items-center gap-5 text-[13px] text-white/55 font-medium">
            {project.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4 shrink-0 text-white/40" />
                {project.location}
              </span>
            )}
            {project.completion && (
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4 shrink-0 text-white/40" />
                Completed {project.completion}
              </span>
            )}
          </div>
        </div>

        {/* Bottom fade into page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f8fafc] to-transparent" aria-hidden="true" />
      </section>

      {/* ── About + Image ── */}
      <section className="bg-[#f8fafc] py-16 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

          {/* Left — description + specs */}
          <div>
            <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-3 flex items-center gap-2">
              <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
              About This Project
            </p>
            <h2
              className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.02em] mb-5"
              style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)" }}
            >
              Project Overview
            </h2>
            <p className="text-[#475569] text-[15px] leading-[1.8]">{project.description}</p>

            {/* Specs */}
            {project.specs && project.specs.length > 0 && (
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.specs.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-xl border border-[#e2e8f0] p-4 shadow-sm"
                  >
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[#94a3b8] mb-1">
                      {s.label}
                    </p>
                    <p className="text-[14px] font-bold text-[#0f2557]">{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/request"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#cd2028] hover:bg-[#b91c1c] text-white font-bold text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-[#cd2028] focus-visible:ring-offset-2"
              >
                Start a Similar Project <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-[#e2e8f0] hover:border-[#0f2557]/40 text-[#374151] hover:text-[#0f2557] font-semibold text-[13px] transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Right — image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(15,37,87,0.12)] lg:sticky lg:top-28">
            {aboutImg ? (
              <Image
                src={aboutImg}
                alt={`${project.title} — project image`}
                fill
                sizes="420px"
                className="object-cover"
              />
            ) : (
              <div className="size-full bg-gradient-to-br from-[#0f2557] to-[#cd2028]/20" />
            )}
            {/* Overlay badge */}
            <div className="absolute bottom-4 left-4 bg-[#07112b]/90 backdrop-blur-sm border border-white/10 text-white rounded-xl px-4 py-3">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/50">Status</p>
              <p className={`text-[13px] font-bold mt-0.5 ${isCompleted ? "text-emerald-400" : "text-blue-300"}`}>
                {isCompleted ? "Completed" : "In Progress"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Materials ── */}
      {project.materials && project.materials.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-10">
              <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-2 flex items-center gap-2">
                <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
                Build Quality
              </p>
              <h2
                className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.015em]"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                Materials Used
              </h2>
              <p className="mt-2 text-[#64748b] text-[14px]">
                High-quality materials selected for durability, aesthetics, and sustainability.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.materials.map((m) => (
                <div
                  key={m.name}
                  className="group flex items-start gap-4 bg-[#f8fafc] hover:bg-white rounded-xl border border-[#e2e8f0] hover:border-[#0f2557]/20 hover:shadow-sm p-5 transition-all duration-200"
                >
                  <div className="size-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500 transition-colors duration-200">
                    <CheckCircle2 className="size-4 text-emerald-600 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div>
                    <p className="font-bold text-[#0f2557] text-[14px]">{m.name}</p>
                    {m.desc && <p className="text-[12.5px] text-[#64748b] mt-1 leading-relaxed">{m.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Cost Estimation ── */}
      {project.cost_estimation && project.cost_estimation.length > 0 && (
        <section className="bg-[#f8fafc] py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-10">
              <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-2 flex items-center gap-2">
                <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
                Transparency
              </p>
              <h2
                className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.015em]"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                Cost Breakdown
              </h2>
              <p className="mt-2 text-[#64748b] text-[14px]">Detailed itemised cost breakdown for this project.</p>
            </div>

            <div className="max-w-2xl rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
              {/* Header row */}
              <div className="grid grid-cols-2 bg-[#0f2557] text-white px-6 py-3.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">Item</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/60 text-right">Amount</span>
              </div>

              {/* Line items */}
              {project.cost_estimation.map((c, i) => (
                <div
                  key={c.item ?? i}
                  className={[
                    "grid grid-cols-2 px-6 py-4",
                    i % 2 === 0 ? "bg-white" : "bg-[#f8fafc]",
                    i < project.cost_estimation!.length - 1 ? "border-b border-[#e2e8f0]" : "",
                  ].join(" ")}
                >
                  <span className="text-[13.5px] text-[#374151] font-medium">{c.item}</span>
                  <span className="text-[13.5px] font-bold text-[#0f2557] text-right">{c.amount ?? "—"}</span>
                </div>
              ))}

              {/* Total row */}
              <div className="grid grid-cols-2 px-6 py-4 bg-[#0f2557]">
                <span className="text-[13.5px] font-bold text-white">Total Estimated Cost</span>
                <span className="text-[13.5px] font-black text-[#cd2028] text-right">
                  NPR{" "}
                  {project.cost_estimation
                    .reduce((sum, c) => {
                      const num = parseInt((c.amount ?? "").replace(/[^0-9]/g, "") || "0");
                      return sum + num;
                    }, 0)
                    .toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 3D Model ── */}
      {project.file && (
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-8">
              <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-2 flex items-center gap-2">
                <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
                Interactive
              </p>
              <h2
                className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.015em]"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                3D Model Preview
              </h2>
              <p className="mt-2 text-[#64748b] text-[14px]">Drag to rotate · scroll to zoom · pinch on mobile</p>
            </div>
            <div className="relative w-full aspect-[16/9] max-h-[540px] rounded-2xl overflow-hidden border border-[#e2e8f0] bg-[#0f2557]/5 shadow-[0_12px_40px_rgba(15,37,87,0.1)]">
              <ModelViewerBlock src={modelSrc(project.file)} />
            </div>
          </div>
        </section>
      )}

      {/* ── Gallery ── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="bg-[#f8fafc] py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-10">
              <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.24em] uppercase mb-2 flex items-center gap-2">
                <span className="block w-4 h-px bg-[#cd2028]" aria-hidden="true" />
                Site Documentation
              </p>
              <h2
                className="font-display font-black text-[#0f2557] leading-tight tracking-[-0.015em]"
                style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
              >
                Project Gallery
              </h2>
              <p className="mt-2 text-[#64748b] text-[14px]">Photos from the project site and completed work.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {project.gallery.filter(Boolean).map((src, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl overflow-hidden shadow-sm border border-[#e2e8f0]"
                  style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} — gallery photo ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-[#0f2557]/0 group-hover:bg-[#0f2557]/25 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Social / Share ── */}
      {project.social_links && project.social_links.length > 0 && (
        <section
          className="py-16 sm:py-20"
          style={{
            background: "#07112b",
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 12px)",
          }}
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="size-12 rounded-full bg-white/8 flex items-center justify-center mx-auto mb-5">
              <Share2 className="size-5 text-[#3b82f6]" />
            </div>
            <h2
              className="font-display font-black text-white leading-tight tracking-[-0.02em] mb-3"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
            >
              Follow Our Journey
            </h2>
            <p className="text-white/55 text-[14px] max-w-md mx-auto mb-8 leading-relaxed">
              Stay connected for project updates, behind-the-scenes content, and design inspiration.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {project.social_links.map((s) => {
                const Icon = s.platform === "youtube" ? Video : s.platform === "tiktok" ? Music2 : Globe;
                const colors: Record<string, string> = {
                  facebook: "bg-[#1877F2]",
                  instagram: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743]",
                  tiktok: "bg-[#010101]",
                  youtube: "bg-[#FF0000]",
                };
                return (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${colors[s.platform] || "bg-[#cd2028]"} text-white inline-flex items-center gap-2.5 h-11 px-6 rounded-full font-bold text-[13px] hover:brightness-110 transition-all active:scale-[0.97] shadow-lg`}
                  >
                    <Icon className="size-4" />
                    {(s.platform?.charAt(0)?.toUpperCase() ?? "") + (s.platform?.slice(1) ?? "")}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Strip ── */}
      <section className="bg-white border-t border-[#e2e8f0] py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-black text-[#0f2557] text-[20px] sm:text-[24px] leading-tight">
              Inspired by this project?
            </h2>
            <p className="mt-1 text-[#64748b] text-[14px]">
              Let&apos;s discuss your vision — free consultation, no obligations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-[#cd2028] hover:bg-[#b91c1c] text-white font-bold text-[13px] transition-colors"
            >
              Request a Project <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/project-details"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-[#e2e8f0] hover:border-[#0f2557]/40 text-[#374151] font-semibold text-[13px] transition-colors"
            >
              <ArrowLeft className="size-4" />
              All Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

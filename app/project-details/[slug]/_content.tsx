import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import {
  ArrowRight, PauseCircle,
  MapPin, Wallet, Calendar, CalendarCheck, CalendarClock, Box,
} from "lucide-react";
import { getFaqs } from "@/api/services/faq.service";
import { getProjectStatus, formatProjectDate } from "@/lib/project-status";
import { ViewportSection } from "@/components/viewport/ViewportSection";
import type { Project, ProjectMilestone } from "@/api/types/project.types";

import ParsedContent from "@/lib/ParseContent.server";
const FaqClient = dynamic(() => import("@/components/global_ui/FaqClient"));
const ModelViewerBlock = dynamic(() => import("@/components/global_ui/model-viewer"));

const STATUS_PILL: Record<string, string> = {
  completed: "bg-emerald-50 text-emerald-700",
  ongoing: "bg-blue-50 text-blue-700",
  paused: "bg-amber-50 text-amber-700",
};

const BLUEPRINT = "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 13px)";
const VIDEO_EXT = /\.(mp4|webm|mov|mkv|ogg)$/i;

function ytEmbed(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : null;
}

/* Consistent editorial section head — inline index, no oversized ghost number */
function SectionHead({ index, kicker, title, sub, dark }: {
  index: string; kicker: string; title: string; sub?: string; dark?: boolean;
}) {
  const accent = dark ? "#f87171" : "#cd2028";
  return (
    <div className="mb-8">
      <p className="text-[11px] font-bold tracking-[0.22em] uppercase mb-3 flex items-center gap-2.5" style={{ color: accent }}>
        <span className="tabular-nums">{index}</span>
        <span className="block w-5 h-px" style={{ background: accent }} aria-hidden="true" />
        {kicker}
      </p>
      <h2 className={`font-display font-black leading-[1.1] tracking-[-0.015em] ${dark ? "text-white" : "text-[#0f2557]"}`}
        style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)" }}>
        {title}
      </h2>
      {sub && <p className={`mt-2.5 text-[14px] leading-relaxed max-w-xl ${dark ? "text-white/75" : "text-[#64748b]"}`}>{sub}</p>}
    </div>
  );
}

export function ProjectDetailContent({ project }: { project: Project }) {
  const F = (className: string) => <div className={className} />;
  const status = getProjectStatus(project.status, project.completion);
  const gallery = project.banner_images ?? [];
  const clients = project.clients ?? [];
  const milestones = project.milestones ?? [];
  const models = Array.from(
    new Map(milestones.filter((m) => m.model_3d_url).map((m) => [m.model_3d_url as string, m.model_3d_url as string])).values(),
  );

  const totalBudget = clients.reduce((s, c) => s + (typeof c.contract_value === "number" ? c.contract_value : 0), 0);

  return (
    <>
      {/* ── Overview ── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-12 items-start">
          <div className="min-w-0">
            <SectionHead index="01" kicker="About This Project" title="Project Overview" />
            {project.pause_reason && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <PauseCircle className="size-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[13px] text-amber-800"><span className="font-bold">On hold:</span> {project.pause_reason}</p>
              </div>
            )}
            <div className="project-prose">
              {project.description
                ? <ParsedContent description={project.description} />
                : <p className="text-[#64748b] text-[14px]">No description available.</p>}
            </div>
          </div>

          {/* Sticky details + CTA card */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl overflow-hidden bg-[#07112b] text-white shadow-[0_16px_40px_rgba(15,37,87,0.15)]"
              style={{ backgroundImage: BLUEPRINT }}>

              {/* Status */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
                <span className="text-[12px] text-white/70 font-medium">Status</span>
                <span className={`text-[12px] font-bold capitalize px-2 py-0.5 rounded-md ${STATUS_PILL[status.key]}`}>
                  {status.label}
                </span>
              </div>

              {/* Client details */}
              {clients.length > 0 && (
                <div className="px-5 py-4 border-b border-white/10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f87171] mb-3.5">
                    {clients.length > 1 ? "Clients" : "Client"}
                  </p>
                  <div className="space-y-4">
                    {clients.map((c) => (
                      <div key={c.id}>
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-lg bg-white/10 grid place-items-center text-white font-bold text-[13px] shrink-0">
                            {c.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[13.5px] font-bold text-white leading-tight truncate">{c.name}</p>
                            {c.profession && <p className="text-[11.5px] text-white/70 capitalize truncate mt-0.5">{c.profession}</p>}
                          </div>
                        </div>
                        {(c.location || (typeof c.contract_value === "number" && c.contract_value > 0)) && (
                          <div className="mt-2.5 space-y-1.5">
                            {c.location && (
                              <p className="flex items-center gap-2 text-[12px] text-white/70">
                                <MapPin className="size-3.5 text-[#93c5fd] shrink-0" /> {c.location}
                              </p>
                            )}
                            {typeof c.contract_value === "number" && c.contract_value > 0 && (
                              <p className="flex items-center gap-2 text-[12px] text-white/70">
                                <Wallet className="size-3.5 text-[#93c5fd] shrink-0" />
                                <span className="font-bold text-white">NPR {c.contract_value.toLocaleString("en-IN")}</span>
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {clients.length > 1 && totalBudget > 0 && (
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[12px] text-white/70 font-medium">Total Budget</span>
                      <span className="text-[13px] font-bold text-white">NPR {totalBudget.toLocaleString("en-IN")}</span>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="p-4 space-y-2.5">
                <Link href="/request"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl bg-[#cd2028] hover:bg-[#b91c1c] text-white font-bold text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07112b]">
                  Start a Similar Project <ArrowRight className="size-4" />
                </Link>
                <Link href="/request"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl border border-white/20 hover:border-white/40 text-white font-semibold text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07112b]">
                  Get in Touch
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Gallery — slate-blue ── */}
      {gallery.length > 1 && (
        <ViewportSection fallback={F("relative bg-[#1b2f52] py-14 sm:py-20 min-h-[400px]")}>
          <section className="relative bg-[#1b2f52] py-14 sm:py-20 overflow-hidden" style={{ backgroundImage: BLUEPRINT }}>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHead index="02" kicker="Site Documentation" title="Project Gallery" dark
                sub="Photographs documenting each stage of the build." />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {gallery.map((img, i) => (
                  <div key={img.id}
                    className="group relative rounded-xl overflow-hidden border border-white/10"
                    style={{ aspectRatio: i === 0 ? "16/10" : "1/1", gridColumn: i === 0 ? "span 2" : undefined, gridRow: i === 0 ? "span 2" : undefined }}>
                    <Image src={img.url} alt={img.name || `${project.title} photo ${i + 1}`} fill
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ViewportSection>
      )}

      {/* ── Milestones ── */}
      {milestones.length > 0 && (
        <ViewportSection fallback={F("bg-white py-14 sm:py-20 min-h-[300px]")}>
          <section className="bg-white py-14 sm:py-20">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHead index="03" kicker="Progress" title="Project Milestones"
                sub="Key stages from groundwork to completion." />
              <ol className="relative space-y-5">
                {milestones.map((m, i) => (
                  <MilestoneItem key={m.id} m={m} index={i} last={i === milestones.length - 1} />
                ))}
              </ol>
            </div>
          </section>
        </ViewportSection>
      )}

      {/* ── 3D Models — slate-blue ── */}
      {models.length > 0 && (
        <ViewportSection fallback={F("relative bg-[#1b2f52] py-14 sm:py-20 min-h-[400px]")}>
          <section className="relative bg-[#1b2f52] py-14 sm:py-20" style={{ backgroundImage: BLUEPRINT }}>
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHead index="04" kicker="Interactive" title={models.length > 1 ? "3D Models" : "3D Model"} dark
                sub="Explore the model — drag to rotate, scroll to zoom." />
              <div className="grid gap-5">
                {models.map((src) => (
                  <div key={src}
                    className="relative w-full aspect-[16/9] max-h-[520px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-[0_16px_50px_rgba(0,0,0,0.4)]">
                    <ModelViewerBlock src={src} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ViewportSection>
      )}

      {/* ── FAQ ── */}
      {project.faq_group_slug && (
        <ViewportSection fallback={F("py-14 bg-[#f8fafc] min-h-[200px]")}>
          <Suspense fallback={F("py-14 bg-[#f8fafc] min-h-[200px]")}>
            <ProjectFaq faqSlug={project.faq_group_slug} />
          </Suspense>
        </ViewportSection>
      )}
    </>
  );
}

function MilestoneItem({ m, index, last }: { m: ProjectMilestone; index: number; last: boolean }) {
  const images = m.images ?? [];
  const embeds = (m.video_embed_urls ?? []).map((v) => ytEmbed(v.url)).filter(Boolean) as string[];
  const directVideo = m.video_url && VIDEO_EXT.test(m.video_url) ? m.video_url : "";

  const dates: { icon: React.ElementType; label: string; value: string }[] = [
    ...(m.date_started ? [{ icon: Calendar, label: "Started", value: formatProjectDate(m.date_started) }] : []),
    ...(m.estimated_end ? [{ icon: CalendarClock, label: "Est. End", value: formatProjectDate(m.estimated_end) }] : []),
    ...(m.completed_date ? [{ icon: CalendarCheck, label: "Completed", value: formatProjectDate(m.completed_date) }] : []),
  ];

  return (
    <li className="relative pl-11 sm:pl-16">
      {!last && <span className="absolute left-[17px] sm:left-[23px] top-12 -bottom-5 w-px bg-[#e2e8f0]" aria-hidden="true" />}
      <span className="absolute left-0 top-0 size-9 sm:size-12 rounded-xl bg-[#0f2557] text-white grid place-items-center font-display font-black text-[13px] sm:text-[15px] ring-4 ring-white">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] overflow-hidden">
        <div className="p-5 sm:p-6">
          {dates.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3.5">
              {dates.map((d) => (
                <span key={d.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#e2e8f0] text-[11px] font-semibold text-[#475569]">
                  <d.icon className="size-3 text-[#cd2028]" />
                  {d.label}: <span className="text-[#0f2557]">{d.value}</span>
                </span>
              ))}
            </div>
          )}

          {m.description && <p className="text-[#334155] text-[14px] leading-relaxed">{m.description}</p>}

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {images.map((img) => (
                <div key={img.id} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#e2e8f0] group">
                  <Image src={img.url} alt={img.name || "Milestone image"} fill sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              ))}
            </div>
          )}

          {directVideo && (
            <video controls preload="none" className="mt-4 w-full rounded-lg border border-[#e2e8f0] bg-black aspect-video">
              <source src={directVideo} />
            </video>
          )}

          {embeds.map((src) => (
            <div key={src} className="mt-4 relative aspect-video rounded-lg overflow-hidden border border-[#e2e8f0] bg-black">
              <iframe src={src} title="Milestone video" className="absolute inset-0 size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
          ))}

          {m.model_3d_url && (
            <p className="mt-3.5 inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1d4ed8]">
              <Box className="size-3.5" /> Interactive 3D model below
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

async function ProjectFaq({ faqSlug }: { faqSlug: string }) {
  "use cache";
  const res = await getFaqs({ group__slug: faqSlug, page_size: 20 }).catch((err) => { console.error("Failed to fetch FAQs:", err); return { results: [] }; });
  const faqs = (res.results ?? []).map((item) => ({
    q: item.question?.en ?? "",
    a: item.answer?.en ?? "",
  }));
  if (faqs.length === 0) return null;
  return <FaqClient categorySlug={faqSlug} initialFaqs={faqs} />;
}

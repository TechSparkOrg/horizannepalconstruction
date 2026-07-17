import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense, cache } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Clock3, PauseCircle, Tag, Calendar } from "lucide-react";
import type { Project } from "@/api/types/project.types";
import { getProjectBySlug } from "@/api/services/project.service";
import { getProjectStatus, formatProjectDate } from "@/lib/project-status";
import { stripHtml } from "@/lib/extractTocItems";
import { LdJson } from "@/components/global_ui/JsonLd";
import { siteUrl } from "@/lib/constants";
import { LazyAiBot } from "@/components/viewport/LazyAiBot";
import { ProjectDetailContent } from "./_content";
const getProject = cache(async (slug: string) => getProjectBySlug(slug).catch((err) => { console.error("Failed to fetch project:", err); return null; }));

function heroImage(p: Project): string {
  const primary = p.banner_images?.find((b) => b.isPrimary)?.url;
  return primary || p.banner_images?.[0]?.url || p.thumbnail || "";
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };
  const desc = project.meta_description || stripHtml(project.description).slice(0, 160);
  const img = heroImage(project);
  return {
    title: project.meta_title || `${project.title} | Horizan Nepal`,
    description: desc,
    keywords: project.meta_keywords || undefined,
    robots: { index: true, follow: true },
    twitter: {
      card: "summary_large_image",
      title: project.meta_title || `${project.title} | Horizan Nepal`,
      description: desc,
    },
    alternates: { canonical: `${siteUrl}/project-details/${slug}` },
    openGraph: {
      title: project.meta_title || `${project.title} | Horizan Nepal`,
      description: desc,
      type: "website",
      url: `${siteUrl}/project-details/${slug}`,
      ...(img && { images: [{ url: img }] }),
    },
  };
}

const STATUS_HERO: Record<string, string> = {
  completed: "bg-emerald-500/20 text-emerald-300",
  ongoing: "bg-blue-500/20 text-blue-300",
  paused: "bg-amber-500/20 text-amber-300",
};

export default async function ProjectDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const status = getProjectStatus(project.status, project.completion);
  const StatusIcon = status.key === "completed" ? CheckCircle2 : status.key === "paused" ? PauseCircle : Clock3;
  const heroImg = heroImage(project);
  const created = formatProjectDate(project.created_at);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: stripHtml(project.description).slice(0, 300),
    ...(project.banner_images?.length && { image: project.banner_images.map((b) => b.url) }),
    ...(project.author && { author: { "@type": "Person", name: project.author } }),
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
          <Image src={heroImg} alt={project.title} fill priority sizes="100vw" className="object-cover opacity-35" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07112b] via-[#07112b]/80 to-[#07112b]/45" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-12">
          <Link href="/project-details"
            className="inline-flex items-center gap-1.5 text-[12px] text-white/70 hover:text-white mb-7 transition-colors font-medium rounded focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07112b]">
            <ArrowLeft className="size-3.5" />
            All Projects
          </Link>

          {/* Pills */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            {project.category?.name && (
              <Link href={`/project-details/category/${project.category.slug}`}
                className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-[#cd2028] hover:bg-[#b91c1c] text-white text-[10px] font-bold tracking-[0.14em] uppercase transition-colors">
                <Tag className="size-3" />
                {project.category.name}
              </Link>
            )}
            <span className={`inline-flex items-center gap-1.5 h-7 px-3 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase ${STATUS_HERO[status.key]}`}>
              <StatusIcon className="size-3" />
              {status.label}
            </span>
          </div>

          <h1 className="font-display font-black text-white leading-[1.05] tracking-[-0.02em] max-w-3xl"
            style={{ fontSize: "clamp(2rem, 4.2vw, 3.4rem)" }}>
            {project.title}
          </h1>

          {/* Author + date row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.author && (
              <div className="flex items-center gap-2.5">
                {project.author_image ? (
                  <Image src={project.author_image} alt={project.author} width={36} height={36}
                    className="size-9 rounded-full object-cover border border-white/20" />
                ) : (
                  <div className="size-9 rounded-full bg-white/10 grid place-items-center text-white/70 font-bold text-[13px]">
                    {project.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <p className="text-white text-[13px] font-semibold">{project.author}
                  {project.author_role && <span className="text-white/60 font-normal"> · {project.author_role}</span>}
                </p>
              </div>
            )}
            {created && (
              <span className="flex items-center gap-1.5 text-[12.5px] text-white/70 font-medium">
                <Calendar className="size-4 shrink-0 text-white/55" />
                {created}
              </span>
            )}
          </div>
        </div>
      </section>

      <LazyAiBot />

      <Suspense fallback={
        <div className="bg-[#f8fafc] animate-pulse">
          <section className="bg-white py-14 sm:py-20">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-12">
              <div className="space-y-4">
                <div className="h-3 w-28 rounded bg-muted-foreground/20" />
                <div className="h-8 w-64 rounded-lg bg-muted-foreground/15" />
                <div className="space-y-2 pt-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-4 rounded bg-muted-foreground/10" style={{ width: `${95 - i * 10}%` }} />
                  ))}
                </div>
              </div>
              <div className="h-[300px] rounded-2xl bg-muted-foreground/10" />
            </div>
          </section>
          <section className="py-14 sm:py-20">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="h-3 w-24 rounded bg-muted-foreground/20" />
              <div className="h-8 w-48 rounded-lg bg-muted-foreground/15" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="col-span-2 row-span-2 rounded-xl bg-muted-foreground/10" style={{ aspectRatio: "16/10" }} />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="rounded-xl bg-muted-foreground/10" style={{ aspectRatio: "1/1" }} />
                ))}
              </div>
            </div>
          </section>
          <section className="bg-white py-14 sm:py-20">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-muted-foreground/20" />
                <div className="h-8 w-56 rounded-lg bg-muted-foreground/15" />
              </div>
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-24 rounded-2xl bg-muted-foreground/10" />
              ))}
            </div>
          </section>
        </div>
      }>
        <ProjectDetailContent project={project} />
      </Suspense>
    </>
  );
}

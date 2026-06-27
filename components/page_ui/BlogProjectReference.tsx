import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Activity, MapPin, Briefcase, Coins } from "lucide-react";
import type { BlogProjectRef } from "@/api/types/blog.types";
import { HtmlContent, sanitizeHtml } from "@/lib/html-content";

interface Props {
  project: BlogProjectRef;
}

const STATUS_STYLES: Record<string, string> = {
  ongoing:   "text-emerald-700 bg-emerald-50 border-emerald-200",
  completed: "text-[#3d526e] bg-[#e8edf5] border-[#e8edf5]",
  planning:  "text-amber-700 bg-amber-50 border-amber-200",
};

function statusStyle(status: string) {
  return STATUS_STYLES[status.toLowerCase()] ?? "text-[#3d526e] bg-[#e8edf5] border-[#e8edf5]";
}

function formatCurrency(value: number): string {
  return "NPR " + value.toLocaleString("en-IN");
}

export default function BlogProjectReference({ project }: Props) {
  const client = project.clients?.[0];

  return (
    <section className="py-10 sm:py-14 bg--foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#5a6e8a] mb-3">
          Project Reference
        </p>

        <Link
          href={`/project-details/${project.slug}`}
          prefetch={false}
          className="group flex flex-col sm:flex-row bg-white border border-[#e8edf5] rounded-lg overflow-hidden hover:shadow-sm transition-colors duration-200"
        >
          <div className="relative w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto min-h-[300px] shrink-0 bg-[#e8edf5] border-b sm:border-b-0 sm:border-r border-[#e8edf5]">
            {project.img ? (
              <Image
                src={project.img}
                alt={project.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 "
              />
            ) : (
              <div className="h-full w-full bg-[#e8edf5]" />
            )}
          </div>

          <div className="flex flex-col flex-1 px-7 py-7">
            <h3 className="text-xl font-bold text-[#0f2557] leading-snug line-clamp-2 mb-2">
              {project.name}
            </h3>

            {project.description && (
              <div className="text-sm leading-relaxed text-[#3d526e] line-clamp-2 mb-5">
                <div
                  className="prose prose-lg max-w-none prose-headings:text-brand-dark prose-headings:font-bold prose-a:text-brand-primary prose-img:rounded-xl"
                  dangerouslySetInnerHTML={sanitizeHtml(project.description)}
                />
              </div>
            )}

            <div className="border-t border-[#e8edf5] pt-4 mb-5 flex flex-col gap-3">
              {project.status && (
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[12px] text-[#5a6e8a]">
                    <Activity className="size-3.5 shrink-0" />
                    Status
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${statusStyle(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              )}

              {client && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[12px] text-[#5a6e8a]">
                      <Briefcase className="size-3.5 shrink-0" />
                      Client
                    </span>
                    <span className="text-[12px] font-semibold text-[#0f2557] text-right">
                      {client.name}
                    </span>
                  </div>

                  {client.location && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[12px] text-[#5a6e8a]">
                        <MapPin className="size-3.5 shrink-0" />
                        Location
                      </span>
                      <span className="text-[12px] font-semibold text-[#0f2557] text-right">
                        {client.location}
                      </span>
                    </div>
                  )}

                  {client.contract_value > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-[12px] text-[#5a6e8a]">
                        <Coins className="size-3.5 shrink-0" />
                        Contract Value
                      </span>
                      <span className="text-[12px] font-semibold text-[#0f2557]">
                        {formatCurrency(client.contract_value)}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0f2557]">
              View project
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}

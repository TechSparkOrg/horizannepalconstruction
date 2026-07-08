import { Users, MapPin } from "lucide-react";
import { getSocialIcon } from "@/lib/social-icons";
import type { TeamMember } from "@/api/types/team.types";
import Image from "next/image";

export function TeamSection({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-28 border-t border-[#e2e8f0]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header — flex row: heading | SVG | description */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">

          {/* Left: eyebrow + heading */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#1d4ed8] bg-[#eff6ff] border border-[#bfdbfe] px-3 py-1 rounded-full mb-3">
              <Users className="size-3" />
              Our Team
            </span>
            <h2 className="font-display text-[26px] sm:text-[32px] font-bold text-[#0f2557] leading-tight">
              The crew behind<br />every build
            </h2>
          </div>

          {/* Centre: SVG illustration */}
          <Image
            src="/video-gif/work-team.svg"
            alt="Team illustration"
            width={176}
            height={112}
            className="w-[100px] h-[64px] sm:w-[176px] sm:h-[112px] shrink-0 object-contain"
            unoptimized
          />

          {/* Right: sub-copy */}
          <p className="text-[13.5px] text-[#475569] max-w-[240px] text-left sm:text-right leading-relaxed">
            Architects, engineers, and site specialists — each vetted and experienced in Nepal&apos;s construction landscape.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-sm">

          {/* Column headers — desktop only */}
          <div className="hidden sm:grid grid-cols-[2fr_1.5fr_1fr] gap-2 px-5 py-3 bg-[#f1f5f9] border-b border-[#e2e8f0]">
            {["Team member", "Department", "Contact"].map((h) => (
              <span key={h} className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#64748b]">{h}</span>
            ))}
          </div>

          {members.map((m) => {
            const initials = m.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={m.id}
                className="flex flex-col sm:grid sm:grid-cols-[2fr_1.5fr_1fr] gap-3 sm:gap-2 sm:items-center px-5 py-4 bg-white hover:bg-[#f8faff] transition-colors border-b border-[#e2e8f0] last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-center text-[11px] font-bold text-[#1d4ed8] shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#0f2557]">{m.name}</p>
                    <p className="text-[11.5px] text-[#64748b] mt-0.5">{m.designation}</p>
                  </div>
                </div>

                <div>
                  <span className="sm:hidden text-[10px] font-semibold uppercase tracking-wide text-[#94a3b8]">Dept</span>
                  <span className="block text-[13px] text-[#475569]">{m.department}</span>
                </div>

                <div className="flex gap-1.5">
                  {m.social_links?.map((link) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.platform}
                        className="size-7 rounded-lg border border-[#e2e8f0] flex items-center justify-center text-[#64748b] hover:bg-[#1d4ed8] hover:text-white hover:border-[#1d4ed8] transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#1d4ed8] focus-visible:ring-offset-1"
                      >
                        <Icon className="size-3" />
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Footer row */}
          <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3.5 bg-[#f1f5f9] border-t border-[#e2e8f0]">
            <span className="flex items-center gap-1.5 text-[12px] text-[#64748b]">
              <Users className="size-3.5 text-[#1d4ed8]" />
              <strong className="font-semibold text-[#0f2557]">{members.length}</strong>&nbsp;core members
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-[#64748b]">
              <MapPin className="size-3.5 text-[#1d4ed8]" />
              Based in&nbsp;<strong className="font-semibold text-[#0f2557]">Kathmandu</strong>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}

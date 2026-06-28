import { Users, MapPin } from "lucide-react";
import { getSocialIcon } from "@/lib/social-icons";
import type { TeamMember } from "@/api/types/team.types";

export function TeamSection({ members }: { members: TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <section className="bg-off-white py-16 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-brand-secondary bg-brand-secondary/10 border border-brand-secondary/20 px-3 py-1 rounded-full mb-3">
              <Users className="size-3" />
              Our Team
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-brand-dark leading-tight">
              The crew behind<br />every build
            </h2>
          </div>
          <p className="text-sm text-mid-gray max-w-[260px] text-right leading-relaxed">
            Architects, engineers, and site specialists — each vetted and experienced in Nepal&apos;s construction landscape.
          </p>
        </div>

        <div className="border border-light-gray rounded-xl overflow-hidden">
          <div className="grid grid-cols-[2fr_1.5fr_1fr] gap-2 px-5 py-2.5 bg-light-gray/20 border-b border-light-gray">
            {["Team member", "Department", "Contact"].map((h) => (
              <span key={h} className="text-xs font-semibold uppercase tracking-wider text-mid-gray">{h}</span>
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
                className="grid grid-cols-[2fr_1.5fr_1fr] gap-2 items-center px-5 py-3.5 bg-white hover:bg-light-gray/10 transition-colors border-b border-light-gray last:border-b-0"
              >
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-xs font-bold text-brand-secondary shrink-0">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-dark">{m.name}</p>
                    <p className="text-xs text-mid-gray mt-0.5">{m.designation}</p>
                  </div>
                </div>
                <span className="text-sm text-mid-gray">{m.department}</span>
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
                        className="size-6 rounded-md border border-light-gray flex items-center justify-center text-mid-gray hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all"
                      >
                        <Icon className="size-3" />
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3 bg-light-gray/20 border-t border-light-gray text-xs text-mid-gray">
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" />
              <strong className="font-semibold text-brand-dark">{members.length}</strong> core members
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              Based in <strong className="font-semibold text-brand-dark">Kathmandu</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

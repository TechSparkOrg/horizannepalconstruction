"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Clock, MapPin } from "lucide-react";
import { TeamPublic } from "@/api/services/team.service";
import type { TeamMember } from "@/api/types/team.types";

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
  </svg>
);

function avgExperience(team: { experience: string }[]): string {
  const nums = team
    .map((m) => parseFloat(m.experience))
    .filter((n) => !isNaN(n));
  if (nums.length === 0) return "—";
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return avg.toFixed(1) + " yrs";
}

export function TeamSection({ initialMembers }: { initialMembers?: TeamMember[] }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialMembers ?? []);

  useEffect(() => {
    if (initialMembers) return;
    TeamPublic.list().then((res) => {
      setTeamMembers(res.results ?? []);
    });
  }, [initialMembers]);

  if (teamMembers.length === 0) {
    return (
      <section className="bg-off-white py-16 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="h-5 w-24 rounded-full bg-light-gray/50 animate-pulse mb-3" />
              <div className="h-8 w-64 rounded-lg bg-light-gray/50 animate-pulse" />
            </div>
            <div className="h-10 w-48 rounded bg-light-gray/50 animate-pulse" />
          </div>
          <div className="border border-light-gray rounded-xl overflow-hidden">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-2 px-5 py-2.5 bg-light-gray/20 border-b border-light-gray">
              {[1,2,3,4].map((i) => <div key={i} className="h-3 rounded bg-light-gray/40 animate-pulse" />)}
            </div>
            {[1,2,3,4,5].map((r) => (
              <div key={r} className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-2 items-center px-5 py-3.5 bg-white border-b border-light-gray">
                <div className="flex items-center gap-2.5">
                  <div className="size-8 rounded-lg bg-light-gray/30 animate-pulse" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-28 rounded bg-light-gray/40 animate-pulse" />
                    <div className="h-2.5 w-20 rounded bg-light-gray/30 animate-pulse" />
                  </div>
                </div>
                <div className="h-3 w-24 rounded bg-light-gray/40 animate-pulse" />
                <div className="h-3 w-16 rounded bg-light-gray/40 animate-pulse" />
                <div className="flex gap-1.5">
                  <div className="size-6 rounded-md bg-light-gray/30 animate-pulse" />
                  <div className="size-6 rounded-md bg-light-gray/30 animate-pulse" />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3 bg-light-gray/20 border-t border-light-gray">
              {[1,2,3].map((i) => <div key={i} className="h-3 w-32 rounded bg-light-gray/40 animate-pulse" />)}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-2 px-5 py-2.5 bg-light-gray/20 border-b border-light-gray">
            {["Team member", "Specialisation", "Experience", "Contact"].map((h) => (
              <span key={h} className="text-xs font-semibold uppercase tracking-wider text-mid-gray/70">{h}</span>
            ))}
          </div>

          {teamMembers.map((m) => (
            <div
              key={m.id}
              className="grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-2 items-center px-5 py-3.5 bg-white hover:bg-light-gray/10 transition-colors border-b border-light-gray last:border-b-0"
            >
              <div className="flex items-center gap-2.5">
                <div className="size-8 rounded-lg bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center text-xs font-bold text-brand-secondary shrink-0">
                  {m.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-dark">{m.name}</p>
                  <p className="text-xs text-mid-gray/70 mt-0.5">{m.role}</p>
                </div>
              </div>
              <span className="text-sm text-mid-gray">{m.specialisation}</span>
              <span className="text-sm font-semibold text-brand-dark">{m.experience}</span>
              <div className="flex gap-1.5">
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="size-6 rounded-md border border-light-gray flex items-center justify-center text-mid-gray hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all">
                    <LinkedInIcon />
                  </a>
                )}
                {m.email && (
                  <a href={`mailto:${m.email}`} aria-label="Email" className="size-6 rounded-md border border-light-gray flex items-center justify-center text-mid-gray hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all">
                    <Mail className="size-3" />
                  </a>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between flex-wrap gap-2 px-5 py-3 bg-light-gray/20 border-t border-light-gray text-xs text-mid-gray">
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" />
              <strong className="font-semibold text-brand-dark">{teamMembers.length}</strong> core members
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              Avg. <strong className="font-semibold text-brand-dark">{avgExperience(teamMembers)}</strong> experience
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

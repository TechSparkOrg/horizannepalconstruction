"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { getSocialIcon } from "@/lib/social-icons";
import { ReelThumbnailFallback } from "@/components/global_ui/ReelThumbnailFallback";
import { Dialog, DialogContent } from "@/components/ui/dialog";

function parseReelUrl(url: string): { platform: string; id: string } | null {
  const ig = url.match(/(?:instagram\.com\/(?:p|reel)\/)([a-zA-Z0-9_-]+)/);
  if (ig) return { platform: "instagram", id: ig[1] };

  const tt = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tt) return { platform: "tiktok", id: tt[1] };

  const fb = url.match(/(?:facebook|fb)\.com\/.*?reel\/(\d+)/);
  if (fb) return { platform: "facebook", id: fb[1] };

  const fbWatch = url.match(/(?:facebook|fb)\.com\/.*?[?&]v=(\d+)/);
  if (fbWatch) return { platform: "facebook", id: fbWatch[1] };

  return null;
}

function buildEmbedUrl(platform: string, id: string): string {
  switch (platform) {
    case "instagram": return `https://www.instagram.com/p/${id}/embed`;
    case "tiktok":    return `https://www.tiktok.com/embed/v2/${id}`;
    case "facebook":  return `https://www.facebook.com/v/${id}`;
    default:          return "";
  }
}

function getThumbnailUrl(platform: string, id: string): string | null {
  if (platform === "instagram") return `https://www.instagram.com/p/${id}/media/?size=l`;
  return null;
}

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  tiktok:    "TikTok",
  facebook:  "Facebook",
};

function gridClass(total: number): string {
  if (total === 1) return "grid grid-cols-1 max-w-[200px]";
  if (total === 2) return "grid grid-cols-2";
  if (total === 3) return "grid grid-cols-3";
  if (total === 4) return "grid grid-cols-4";
  return "grid grid-cols-5";
}

interface ReelItem { url: string; label?: string }
interface ActiveReel { embedUrl: string; platform: string; label?: string }

export default function BlogReelStories({ reels }: { reels: ReelItem[] }) {
  const [active, setActive] = useState<ActiveReel | null>(null);

  if (reels.length === 0) return null;

  const total = Math.min(reels.length, 5);
  const items = reels.slice(0, total);

  return (
    <section className="bg-[#f8fafc] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
            <p className="text-[10px] font-bold tracking-[0.26em] uppercase text-[#cd2028]">Social</p>
            <span className="block w-5 h-px bg-[#cd2028]" aria-hidden="true" />
          </div>
          <h2 className="font-display font-bold text-[#0f2557] text-xl sm:text-2xl tracking-tight">
            Watch Reels
          </h2>
        </div>

        <div className={`${gridClass(total)} gap-3`}>
          {items.map((reel, i) => {
            const parsed   = parseReelUrl(reel.url);
            const embedUrl = parsed ? buildEmbedUrl(parsed.platform, parsed.id) : null;
            const thumbUrl = parsed ? getThumbnailUrl(parsed.platform, parsed.id) : null;
            const label    = PLATFORM_LABELS[parsed?.platform ?? ""] ?? "Reel";
            const Icon     = parsed ? getSocialIcon(parsed.platform) : null;

            return (
              <button
                key={i}
                type="button"
                onClick={() =>
                  embedUrl && parsed &&
                  setActive({ embedUrl, platform: parsed.platform, label: reel.label })
                }
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden border border-[#e2e8f0] bg-[#e8edf5] hover:border-[#cd2028]/50 hover:shadow-lg transition-all duration-300"
                aria-label={`Play ${label}${reel.label ? ` — ${reel.label}` : ""}`}
              >
                <ReelThumbnailFallback platform={parsed?.platform ?? ""} />

                {thumbUrl && (
                  <Image
                    src={thumbUrl}
                    alt={reel.label ?? label}
                    fill
                    sizes="200px"
                    className="object-cover"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                  {Icon && <Icon className="size-5 text-white" />}
                  <span className="size-10 rounded-full bg-[#cd2028] flex items-center justify-center shadow-lg">
                    <Play className="size-4 text-white fill-white ml-0.5" />
                  </span>
                </div>

                {/* Platform badge */}
                <span className="absolute bottom-2.5 left-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                  {label}
                </span>

                {/* Red accent line on hover */}
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-[#cd2028] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent
          showCloseButton={false}
          className="flex flex-col md:flex-row p-0 gap-0 !max-w-[400px] h-full !max-h-[85vh] rounded-2xl overflow-hidden border border-[#e2e8f0]"
        >
          <div className="w-full md:w-[400px] h-full bg-black shrink-0">
            {active && (
              <iframe
                src={active.embedUrl}
                className="w-full h-full"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          <div className="flex flex-col flex-1 p-5 gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setActive(null)}
              className="self-end size-7 rounded-full border border-[#e2e8f0] flex items-center justify-center hover:border-[#cd2028] hover:text-[#cd2028] transition-colors shrink-0"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#cd2028] mb-1">
                {active && (PLATFORM_LABELS[active.platform] ?? "Reel")}
              </span>
              {active?.label && (
                <p className="text-[14px] font-semibold text-[#0f2557] leading-snug">{active.label}</p>
              )}
            </div>

            <p className="text-[12px] text-[#64748b] leading-relaxed mt-auto">
              Click outside to close.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

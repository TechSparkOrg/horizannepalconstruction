"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { getSocialIcon } from "@/lib/social-icons";
import { ReelThumbnailFallback } from "@/components/global_ui/ReelThumbnailFallback";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

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
  if (platform === "instagram") {
    return `https://www.instagram.com/p/${id}/media/?size=l`;
  }
  return null;
}

const PLATFORM_LABELS: Record<string, string> = {
  instagram: "Instagram",
  tiktok:    "TikTok",
  facebook:  "facebook",
};

function gridClass(total: number): string {
  if (total === 1) return "grid grid-cols-1";
  if (total === 2) return "grid grid-cols-2";
  if (total === 3) return "grid grid-cols-3";
  if (total === 4) return "grid grid-cols-4";
  return "grid grid-cols-5";
}

interface ReelItem {
  url: string;
  label?: string;
}

interface ActiveReel {
  embedUrl: string;
  platform: string;
  label?: string;
}

export default function BlogReelStories({ reels }: { reels: ReelItem[] }) {
  const [active, setActive] = useState<ActiveReel | null>(null);

  if (reels.length === 0) return null;

  const total = Math.min(reels.length, 5);
  const items = reels.slice(0, total);

  return (
    <section className="py-10 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#5a6e8a] mb-4">
          Watch reels
        </p>

        <div className={`${gridClass(total)} w-full gap-2`}>
          {items.map((reel, i) => {
            const parsed = parseReelUrl(reel.url);
            const embedUrl = parsed ? buildEmbedUrl(parsed.platform, parsed.id) : null;
            const thumbUrl = parsed ? getThumbnailUrl(parsed.platform, parsed.id) : null;
            const label = PLATFORM_LABELS[parsed?.platform ?? ""] ?? "Reel";
            const Icon = parsed ? getSocialIcon(parsed.platform) : null;

            return (
              <button
                key={i}
                type="button"
                onClick={() =>
                  embedUrl && parsed &&
                  setActive({ embedUrl, platform: parsed.platform, label: reel.label })
                }
                className="group relative aspect-[9/16] rounded-lg overflow-hidden border border-[#e8edf5] bg-[#e8edf5] hover:border-[#3d526e] transition-colors duration-150"
                aria-label={`Play ${label}${reel.label ? ` — ${reel.label}` : ""}`}
              >
                <ReelThumbnailFallback platform={parsed?.platform ?? ""} />
                {thumbUrl && (
                  <Image
                    src={thumbUrl}
                    alt={reel.label ?? label ?? "Reel"}
                    fill
                    sizes="200px"
                    className="object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}

                <div className="absolute inset-0 bg-transparent group-hover:bg-[#1d4ed8]/15 transition-colors duration-150 flex flex-col items-center justify-center gap-2">
                  {Icon && (
                    <Icon className="size-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                  )}
                  <span className="size-9 rounded-full bg-[#395091] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 shadow-lg shadow-[#1d4ed8]/30">
                    <Play className="size-3.5 text-white fill-white ml-px" />
                  </span>
                </div>

                <span className="absolute bottom-2 left-2 text-[10px] font-semibold uppercase tracking-[0.07em] text-white bg-black px-1.5 py-0.5 rounded">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent
          showCloseButton={false}
          className="flex flex-col md:flex-row p-0 gap-0 !max-w-[400px] h-full  !max-h-[85vh] rounded-xl overflow-hidden border border-[#e8edf5]"
        >
          <div className="w-full md:w-[400px] h-full !md:min-h-[40vh] bg-black shrink-0">
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
              className="self-end size-7 rounded-full border border-[#e8edf5] flex items-center justify-center hover:border-[#3d526e] transition-colors shrink-0"
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#3d526e]">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>

            <div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[#5a6e8a] mb-1">
                {active && (PLATFORM_LABELS[active.platform] ?? "Reel")}
              </span>
              {active?.label && (
                <p className="text-[14px] font-semibold text-[#0f2557] leading-snug">
                  {active.label}
                </p>
              )}
            </div>

            <p className="text-[12px] text-[#5a6e8a] leading-relaxed mt-auto">
              Click outside to close.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

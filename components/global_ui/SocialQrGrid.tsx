"use client";

import { useEffect } from "react";
import { useSettings } from "@/stores/settings-store";

interface SocialLink {
  url?: string
  label?: string
  platform?: string
}

interface Props {
  socialLinks?: SocialLink[]
  title?: string
  description?: string
  className?: string
  qrSize?: number
}

const QR_BASE = "https://api.qrserver.com/v1/create-qr-code/";

export function SocialQrGrid({
  socialLinks: externalLinks,
  title = "Find Us Online",
  description,
  className,
  qrSize = 130,
}: Props) {
  const { settings, fetchSettings, loaded } = useSettings();

  useEffect(() => {
    if (!loaded) fetchSettings();
  }, [loaded, fetchSettings]);

  const links = (externalLinks ?? settings?.social_links ?? []).filter((l) => !!l.url);

  if (links.length === 0) return null;

  return (
    <div className={className}>
      {/* Header */}
      <p className="text-[#cd2028] text-[11px] font-bold tracking-[0.22em] uppercase mb-2">
        Scan &amp; Connect
      </p>
      <h2 className="font-display font-bold text-white text-2xl sm:text-3xl leading-tight mb-1">
        {title}
      </h2>
      {description && (
        <p className="text-white/45 text-sm leading-relaxed mb-6">{description}</p>
      )}

      {/* QR cards */}
      <div className="flex flex-wrap gap-3 mt-5">
        {links.map((link) => {
          const url = link.url!;
          const label = link.platform || link.label || "Link";
          const qrSrc = `${QR_BASE}?size=${qrSize * 2}x${qrSize * 2}&data=${encodeURIComponent(url)}&color=0f2557&bgcolor=ffffff`;

          return (
            <a
              key={label + url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-0 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-200 hover:-translate-y-0.5"
            >


              <div className="shrink-0 p-3 bg-white rounded-xl">
              <img
     src={qrSrc}
                  alt={`QR code for ${label}`}
                width={140}
                height={140}
                loading="lazy"
              />
            </div>

              {/* Label strip */}
              <div className="w-full bg-white/8 group-hover:bg-[#cd2028] transition-colors duration-200 px-3 py-2 text-center">
                <span className="text-[10px] font-bold text-white/70 group-hover:text-white uppercase tracking-[0.15em] transition-colors">
                  {label}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
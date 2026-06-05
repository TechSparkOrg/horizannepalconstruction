"use client";

import { ArrowRight, MapPin } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useSettings } from "@/stores/settings-store";

const FALLBACK_ADDRESS = "Tinkune, Kathmandu, Nepal";
const FALLBACK_MAP = "https://www.google.com/maps?q=Kathmandu,Nepal&z=12&output=embed";

export function LocationSection() {
  const contact_info = useSettings((s) => s.settings?.contact_info);

  return (
    <section className="relative bg-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-28 pb-8 sm:pb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <SectionLabel>Location</SectionLabel>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl text-brand-dark">
            Visit Our Office
          </h2>
          <p className="mt-4 text-base leading-relaxed text-mid-gray">
            We&apos;re based in Kathmandu — stop by for a consultation.
          </p>
        </div>
      </div>
      <div className="relative w-full h-[450px]">
        <iframe
          title="Horizon Nepal office location in Kathmandu"
          src={contact_info?.mapEmbed || FALLBACK_MAP}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-6 left-6 sm:left-12 bg-white rounded-xl shadow-2xl p-6 max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="size-4 text-brand-primary" />
            <h3 className="font-display font-bold text-lg text-brand-dark">
              Horizon Nepal
            </h3>
          </div>
          <address className="not-italic text-sm text-mid-gray space-y-1">
            <p>{contact_info?.address || FALLBACK_ADDRESS}</p>
            <p>{contact_info?.phone}</p>
            <p>Mon–Fri, 9 AM – 6 PM</p>
          </address>
          <a
            href={`https://www.google.com/maps?q=${encodeURIComponent(contact_info?.address || FALLBACK_ADDRESS)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-brand-primary text-sm font-semibold hover:gap-2 transition-all"
          >
            Get Directions <ArrowRight className="size-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

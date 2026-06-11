"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useSettings } from "@/stores/settings-store";
import { getSocialIcon } from "@/lib/social-icons";
import { BannerCarousel } from "@/components/BannerCarousel";
import type { MediaItem } from "@/api/types/media.types";

export function ContactHero({ initialBanners }: { initialBanners?: MediaItem[] }) {
  const settings = useSettings((s) => s.settings);
  const social_links = settings?.social_links ?? [];
  const contact_info = {
    phone: "",
    email: "",
    address: "",
    mapEmbed: "",
    ...(settings?.contact_info ?? {}),
  };

  const contactPaths = [
    {
      Icon: Phone,
      label: "Call us",
      value: contact_info.phone,
      href: `tel:${contact_info.phone ?? ""}`,
    },
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      value: "Quick response",
      href: `https://wa.me/${(contact_info.phone ?? "").replace(/[^0-9]/g, "")}?text=Hello!%20I'd%20like%20to%20know%20more%20about%20Horizon%20Nepal's%20services.`,
    },
    {
      Icon: Mail,
      label: "Email us",
      value: contact_info.email,
      href: `mailto:${contact_info.email ?? ""}`,
    },
    {
      Icon: MapPin,
      label: "Visit us",
      value: contact_info.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(contact_info.address ?? "")}`,
    },
  ];

  const socialLinks = social_links.map((link) => ({
    label: link.label ?? "",
    handle: `@${(link.platform ?? "").toLowerCase()}`,
    href: link.url ?? "#",
    Icon: getSocialIcon(link.platform ?? ""),
  }));

  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <BannerCarousel
        slug="contact-us-page-hero"
        imgClassName="object-cover opacity-50"
        initialBanners={initialBanners}
      />

      {/* Gradient overlay — fades image into dark at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark" />

      {/* Hero heading */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-16 text-center">
        <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
          Horizon Nepal
        </p>
        <h1 className="sr-only">Contact Horizan Nepal</h1>
        <h1
          className="font-display font-bold text-white leading-[1.06]"
          style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}
        >
          Get in Touch
        </h1>
        <p className="mt-5 text-white/60 text-base sm:text-lg max-w-[420px] mx-auto leading-relaxed">
          Have a question or project in mind? We&apos;d love to hear from you.
        </p>

        <div className="mt-8">
          <Link
            href="#consultation-form"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-blue-600 text-white text-sm font-bold shadow-lg hover:bg-blue-500 transition-colors duration-200"
          >
            Send a message
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* Contact cards — floating pill style, no borders */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {contactPaths.map(({ Icon, label, value, href }, i) => (
            <a
              key={`${label}-${i}`}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-start gap-3 p-5 rounded-2xl bg-white/6 hover:bg-white/10 transition-all duration-200"
            >
              <div className="size-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                <Icon className="size-4.5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-0.5">
                  {label}
                </p>
                <p className="text-sm font-semibold text-white leading-snug">
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Social links — compact pill row */}
      {socialLinks.length > 0 && (
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-wrap gap-2 pt-2">
            {socialLinks.map(({ label, handle, href, Icon }, i) => (
              <a
                key={`${label}-${i}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 h-10 pl-2 pr-4 rounded-full bg-white/6 hover:bg-white/12 transition-all duration-150"
              >
                <span className="size-7 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-150">
                  <Icon className="size-3.5" />
                </span>
                <span className="text-sm font-semibold text-white">{label}</span>
                <span className="text-[11px] text-white/40">{handle}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
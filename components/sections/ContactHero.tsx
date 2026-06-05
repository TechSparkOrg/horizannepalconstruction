"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useSettings } from "@/stores/settings-store";
import { getSocialIcon } from "@/lib/social-icons";
import { BannerCarousel } from "@/components/BannerCarousel";

const GENERIC_PATHS = [
  { label: "Call us",        description: "Mon–Fri, 9 AM – 6 PM",                           external: false },
  { label: "WhatsApp",       description: "Usually replies within an hour",                   external: true  },
  { label: "Email us",       description: "We reply within 24 hours",                         external: false },
  { label: "Visit us",       description: "Open Mon–Fri, 9 AM – 6 PM",                       external: true  },
];

export function ContactHero() {
  const settings = useSettings((s) => s.settings);
  const social_links = settings?.social_links ?? [];
  const contact_info = settings?.contact_info ?? { phone: "", email: "", address: "", mapEmbed: "" };

  const contactPaths = [
    { ...GENERIC_PATHS[0], Icon: Phone,     value: contact_info.phone,      href: `tel:${contact_info.phone}` },
    { ...GENERIC_PATHS[1], Icon: MessageCircle, value: "Quick response",    href: `https://wa.me/${contact_info.phone.replace(/[^0-9]/g, '')}?text=Hello!%20I'd%20like%20to%20know%20more%20about%20Horizon%20Nepal's%20services.` },
    { ...GENERIC_PATHS[2], Icon: Mail,       value: contact_info.email,     href: `mailto:${contact_info.email}` },
    { ...GENERIC_PATHS[3], Icon: MapPin,     value: contact_info.address,   href: `https://maps.google.com/?q=${encodeURIComponent(contact_info.address)}` },
  ];

  const socialLinks = social_links.map((link) => ({
    label: link.label,
    handle: `@${link.platform.toLowerCase()}`,
    href: link.url,
    Icon: getSocialIcon(link.platform),
  }));
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <BannerCarousel slug="contact-us-page-hero" imgClassName="object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/60 to-brand-dark" />

      {/* Hero text */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 text-center">
        <span className="inline-block text-[11px] font-semibold tracking-[0.18em] uppercase text-white/50 bg-white/8 px-3.5 py-1.5 rounded-full border border-white/10 mb-6">
          Contact
        </span>

        <h1
          className="font-display font-bold text-white leading-[1.08] max-w-3xl mx-auto"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          Let&apos;s Start a<br className="hidden sm:block" /> Conversation
        </h1>

        <p className="mt-5 text-white/60 text-base sm:text-lg max-w-[520px] mx-auto leading-relaxed">
          Have a project in mind or just want to learn more? Reach us through any channel below.
        </p>

        <div className="mt-8">
          <Link
            href="#consultation-form"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-brand-primary text-white text-sm font-bold tracking-wide shadow-md shadow-brand-primary/25 hover:shadow-lg hover:shadow-brand-primary/40 hover:-translate-y-px active:translate-y-0 active:scale-[0.97] transition-all duration-200"
          >
            Send a Message
            <ArrowRight className="size-3.5 opacity-80" />
          </Link>
        </div>
      </div>

      {/* Contact path cards */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {contactPaths.map(({ Icon, label, value, href, description, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex items-start gap-3.5 p-4 rounded-xl bg-white/6 border border-white/8 hover:bg-white/10 hover:border-white/15 transition-all duration-150"
            >
              <div className="flex-shrink-0 size-9 rounded-lg bg-brand-primary/15 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-150">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-widest mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-white truncate">{value}</p>
                <p className="text-xs text-white/40 mt-0.5 leading-snug">{description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Social media */}
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <p className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-3">Follow us</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {socialLinks.map(({ label, handle, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2.5 p-3 rounded-xl border border-white/8 hover:bg-white/10 hover:border-white/15 hover:-translate-y-px transition-all duration-150"
            >
              <span className="flex-shrink-0 size-7 rounded-lg bg-brand-primary/15 border border-brand-primary/20 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-150">
                <Icon className="size-3.5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white leading-none">{label}</p>
                <p className="text-[10px] text-white/40 mt-0.5 truncate">{handle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
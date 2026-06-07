"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useSettings } from "@/stores/settings-store";
import { getSocialIcon } from "@/lib/social-icons";
import { BannerCarousel } from "@/components/BannerCarousel";

export function ContactHero() {
  const settings = useSettings((s) => s.settings);
  const social_links = settings?.social_links ?? [];
  const contact_info = settings?.contact_info ?? { phone: "", email: "", address: "", mapEmbed: "" };

  const contactPaths = [
    { Icon: Phone,  label: "Call",     value: contact_info.phone,  href: `tel:${contact_info.phone}` },
    { Icon: MessageCircle, label: "WhatsApp", value: "Quick response", href: `https://wa.me/${contact_info.phone.replace(/[^0-9]/g, '')}?text=Hello!%20I'd%20like%20to%20know%20more%20about%20Horizon%20Nepal's%20services.` },
    { Icon: Mail,   label: "Email",    value: contact_info.email,  href: `mailto:${contact_info.email}` },
    { Icon: MapPin, label: "Visit",    value: contact_info.address, href: `https://maps.google.com/?q=${encodeURIComponent(contact_info.address)}` },
  ];

  const socialLinks = social_links.map((link) => ({
    label: link.label,
    handle: `@${link.platform.toLowerCase()}`,
    href: link.url,
    Icon: getSocialIcon(link.platform),
  }));

  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <BannerCarousel slug="contact-us-page-hero" imgClassName="object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-brand-dark/40 to-brand-dark/70" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 text-center">
        <h1
          className="font-display font-bold text-white leading-[1.08]"
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          Get in Touch
        </h1>

        <p className="mt-4 text-white/70 text-lg max-w-[500px] mx-auto leading-relaxed">
          Have a question or project in mind? We&apos;d love to hear from you.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="#consultation-form"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-blue-600 text-white text-sm font-bold shadow-md hover:bg-blue-700 transition-all duration-200"
          >
            Send a Message
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {contactPaths.map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex flex-col items-center gap-2 p-5 rounded-xl bg-white/8 hover:bg-white/12 transition-all duration-150"
            >
              <div className="size-12 rounded-full bg-blue-600/15 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-150">
                <Icon className="size-5" />
              </div>
              <p className="text-[11px] font-bold text-white/50 uppercase tracking-wider">{label}</p>
              <p className="text-sm font-bold text-white text-center leading-snug">{value}</p>
            </a>
          ))}
        </div>
      </div>

      {socialLinks.length > 0 && (
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {socialLinks.map(({ label, handle, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition-all duration-150"
              >
                <span className="flex-shrink-0 size-9 rounded-full bg-blue-600/15 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-150">
                  <Icon className="size-4.5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white leading-none">{label}</p>
                  <p className="text-[11px] text-white/50 mt-0.5 truncate">{handle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
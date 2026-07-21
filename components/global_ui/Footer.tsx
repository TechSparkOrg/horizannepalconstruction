"use client";

import {
  PhoneCall, Mail, MapPin, Clock,
  Building2, IdCard, Award, Leaf, Zap, ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSocialIcon } from "@/lib/social-icons";
import { useSettings } from "@/stores/settings-store";

const year = new Date().getFullYear();

const quickLinks = [
  { label: "Home",        href: "/" },
  { label: "About Us",    href: "/about" },
  { label: "Projects",    href: "/project-details" },
  { label: "Blog",        href: "/blog" },
  { label: "Reviews",     href: "/reviews" },
  { label: "FAQ",         href: "/faq" },
  { label: "Contact",     href: "/request" },
];

const serviceLinks = [
  { label: "Architecture Design",    href: "/design" },
  { label: "Structural Engineering", href: "/services/engineering" },
  { label: "Construction",           href: "/services/construction" },
  { label: "Interior Design",        href: "/services/interior" },
  { label: "Vastu Shastra",          href: "/vastu-shastra" },
  { label: "Building Permit",        href: "/building-permit" },
];

const toolLinks = [
  { label: "2D Floor Planner",         href: "/floor-planner" },
  { label: "Cost Estimator",           href: "/cost-estimation" },
  { label: "EMI Calculator",           href: "/emi-calculator" },
  { label: "Unit Converter",           href: "/unit-convert" },
];

const legalLinks = [
  { label: "Privacy Policy",   href: "/pages/privacy-policy" },
  { label: "Terms of Service", href: "/pages/terms-conditions" },
  { label: "Cookies Policy",   href: "/pages/cookies-policy" },
  { label: "Sitemap",          href: "/sitemap.xml" },
];

const trustBadges = [
  { Icon: Award, label: "ISO Certified" },
  { Icon: Leaf,  label: "Sustainable Builds" },
  { Icon: Zap,   label: "Fast Delivery" },
];

function FooterColHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="block w-4 h-px bg-brand-secondary shrink-0" aria-hidden="true" />
      <h3 className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-white/65">
        {children}
      </h3>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  const props = external
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  return (
    <li>
      <Link prefetch={false}
        href={href}
        {...props}
        className="group flex items-center gap-1.5 text-[13px] text-white/65 hover:text-white transition-colors duration-150"
      >
        <span className="block w-0 group-hover:w-2.5 h-px bg-brand-secondary transition-all duration-200 shrink-0" aria-hidden="true" />
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const settings = useSettings((s) => s.settings);

  const social_links = settings?.social_links ?? [];
  const c = { address: "", phone: "", email: "", ...(settings?.contact_info ?? {}) };
  const waLink = `https://wa.me/${c.phone?.replace(/[^0-9]/g, "")}?text=Hello!%20I'd%20like%20to%20know%20more%20about%20Horizon%20Nepal's%20services.`;

  return (
    <footer>

      {/* ── Pre-footer CTA ───────────────────────────────────── */}
      <div
        className="relative border-t border-white/5"
        style={{ background: "linear-gradient(135deg, #0c1d4f 0%, #0f2557 60%, #0a1430 100%)" }}
      >
        {/* subtle grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage: `linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            {/* Left: CTA copy */}
            <div className="max-w-[520px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-6 h-px bg-brand-secondary shrink-0" aria-hidden="true" />
                <span className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#93c5fd]">
                  Ready to Build?
                </span>
              </div>
              <p
                className="text-white text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-[1.2]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Have a project in mind?<br />
                <span className="text-white/65 font-semibold">Let&apos;s build something great.</span>
              </p>
            </div>

            {/* Right: Contact + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              {c.phone && (
                <a
                  href={`tel:${c.phone}`}
                  className="flex items-center gap-3 group"
                >
                  <div className="size-10 rounded-full border border-white/15 flex items-center justify-center text-brand-secondary group-hover:bg-brand-secondary/15 group-hover:border-brand-secondary transition-colors">
                    <PhoneCall className="size-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Call Us</p>
                    <p className="text-[14px] font-semibold text-white">{c.phone}</p>
                  </div>
                </a>
              )}

              <div className="hidden sm:block w-px h-10 bg-white/10" aria-hidden="true" />

              <Link prefetch={false}
                href="/request"
                className="inline-flex items-center gap-2 h-11 px-7 rounded-full bg-brand-primary hover:bg-blue-700 text-white font-semibold text-[13.5px] transition-colors focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
              >
                Get a Free Quote
                <ArrowRight className="size-4" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* Cat junction — h-0 adds zero layout height; cat bottom = boundary line */}
      <div className="relative h-0 overflow-visible pointer-events-none select-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <Image
            src="/video-gif/cat-up-down.svg"
            alt=""
            width={120}
            height={213}
            unoptimized
            className="w-[90px] sm:w-[110px] lg:w-[120px] h-auto object-contain"
            sizes="(max-width: 640px) 90px, (max-width: 1024px) 110px, 120px"
          />
        </div>
      </div>

      {/* ── Main footer body ─────────────────────────────────── */}
      <div className="bg-[#07112b]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.8fr_1fr_1fr_1fr_1.3fr] gap-10 lg:gap-8">

            {/* Brand column */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <Link prefetch={false} href="/" className="inline-flex items-center gap-3 mb-6">
                <div className="size-10 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center shrink-0">
                  <Image src="/logo.png" alt="Horizon Nepal logo" width={24} height={24} className="object-contain w-auto h-auto" style={{ height: "auto" }} />
                </div>
                <span
                  className="text-[22px] font-bold leading-none tracking-tight"
                  style={{ fontFamily: "var(--font-display)", color: "white" }}
                >
                  <span className="text-brand-secondary">Horizon</span>
                  {" "}Nepal
                </span>
              </Link>

              <p className="text-[13.5px] text-white/65 leading-[1.75] mb-6 max-w-[270px]">
                Trusted architecture, engineering &amp; construction firm delivering innovative and sustainable designs across Nepal.
              </p>

              <ul className="space-y-3 text-[13px]">
                {c.address && (
                  <li className="flex items-start gap-2.5">
                    <MapPin className="size-3.5 text-brand-secondary shrink-0 mt-[3px]" />
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/65 hover:text-white transition-colors leading-snug"
                    >
                      {c.address}
                    </a>
                  </li>
                )}
                <li className="flex items-start gap-2.5">
                  <Building2 className="size-3.5 text-brand-secondary shrink-0 mt-[3px]" />
                  <span className="text-white/65">Horizon Nepal Pvt. Ltd.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <IdCard className="size-3.5 text-brand-secondary shrink-0 mt-[3px]" />
                  <span className="text-white/65">VAT No: XXXXXXXXX</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="size-3.5 text-brand-secondary shrink-0 mt-[3px]" />
                  <span className="text-white/65">Sun–Fri, 9:00 AM – 6:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <FooterColHeader>Quick Links</FooterColHeader>
              <ul className="space-y-2.5">
                {quickLinks.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
              </ul>
            </div>

            {/* Services */}
            <div>
              <FooterColHeader>Services</FooterColHeader>
              <ul className="space-y-2.5">
                {serviceLinks.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <FooterColHeader>Tools</FooterColHeader>
              <ul className="space-y-2.5">
                {toolLinks.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <FooterColHeader>Get In Touch</FooterColHeader>
              <ul className="space-y-3.5">
                {c.phone && (
                  <li className="flex items-start gap-2.5">
                    <PhoneCall className="size-3.5 text-brand-secondary shrink-0 mt-[3px]" />
                    <a href={`tel:${c.phone}`} className="text-[13px] text-white/65 hover:text-white transition-colors">{c.phone}</a>
                  </li>
                )}
                {c.phone && (
                  <li className="flex items-start gap-2.5">
                    <svg viewBox="0 0 24 24" className="size-3.5 fill-[#25D366] shrink-0 mt-[3px]" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-[13px] text-white/65 hover:text-white transition-colors">WhatsApp</a>
                  </li>
                )}
                {c.email && (
                  <li className="flex items-start gap-2.5">
                    <Mail className="size-3.5 text-brand-secondary shrink-0 mt-[3px]" />
                    <a href={`mailto:${c.email}`} className="text-[13px] text-white/65 hover:text-white transition-colors break-all">{c.email}</a>
                  </li>
                )}
              </ul>
            </div>

          </div>
        </div>

        {/* ── Divider row: Social + Trust badges ───────────────── */}
        <div className="border-t border-white/[0.07]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-5">

              {/* Social links */}
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Follow</span>
                <div className="flex gap-2">
                  {social_links.map(({ url, label, platform }) => {
                    const Icon = getSocialIcon(platform ?? "");
                    return (
                      <a
                        key={`${platform}-${url}`}
                        href={url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label || platform || "Social link"}
                        className="size-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:bg-brand-secondary/20 hover:border-brand-secondary/60 hover:text-brand-secondary transition-colors"
                      >
                        <Icon className="size-[15px]" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Trust badges */}
              <div className="hidden md:flex items-center gap-6">
                {trustBadges.map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-white/60 text-[12px]">
                    <Icon className="size-[15px] text-brand-secondary/70" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ── Copyright bar ────────────────────────────────────── */}
      <div className="bg-[#040c1e] border-t border-white/[0.05]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11.5px] text-white/60">
              &copy; {year}{" "}
              <span className="text-white/60 font-medium">Horizon Nepal Pvt. Ltd.</span>
              {" "}All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {legalLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11.5px] text-white/60 hover:text-white/80 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}

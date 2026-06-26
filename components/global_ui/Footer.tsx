"use client";

import { useEffect } from "react";
import {
  Headphones, PhoneCall, Mail, MapPin, Clock,
  Building2, IdCard, Award, Leaf, Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getSocialIcon } from "@/lib/social-icons";
import { useSettings } from "@/stores/settings-store";

const year = new Date().getFullYear();

const quickLinks = [
  { label: "Home",        href: "/" },
  { label: "About Us",    href: "/about" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Projects",    href: "/our-work" },
  { label: "Blog",        href: "/content" },
  { label: "Reviews",     href: "/review" },
  { label: "FAQ",         href: "/faq" },
  { label: "Contact",     href: "/contact" },
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
  { label: "2D Floor Planner",          href: "/floor-planner" },
  { label: "Cost Estimator",            href: "/cost-estimation" },
  { label: "EMI Calculator",            href: "/emi-calculator" },
  { label: "Unit Converter",            href: "/unit-convert" },
  { label: "Green Builder Calculator",  href: "/green-calculator" },
];

export function Footer() {
  const settings = useSettings((s) => s.settings);

  useEffect(() => {
    useSettings.getState().fetchSettings();
  }, []);

  const social_links = settings?.social_links ?? [];
  const c = { address: "", phone: "", email: "", ...(settings?.contact_info ?? {}) };
  const waLink = `https://wa.me/${c.phone?.replace(/[^0-9]/g, "")}?text=Hello!%20I'd%20like%20to%20know%20more%20about%20Horizon%20Nepal's%20services.`;

  return (
    <footer>

      {/* ── ROW 1: Help banner ─────────────────────────────── */}
      <div className="bg-brand-primary">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Headphones className="size-5 text-white shrink-0" />
              <div>
                <p className="text-white font-bold text-sm">We're Always Here To Help</p>
                <p className="text-white/80 text-[11px]">Reach out to us through any of these channels</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href={`tel:${c.phone}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <PhoneCall className="size-4 text-white shrink-0" />
                <div>
                  <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Call Us</p>
                  <p className="text-sm font-bold text-white">{c.phone || "+977 XXXXXXXXXX"}</p>
                </div>
              </a>
              <div className="hidden sm:block h-8 bg-white/25 w-px" />
              <a href={`mailto:${c.email}`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Mail className="size-4 text-white shrink-0" />
                <div>
                  <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold">Email</p>
                  <p className="text-sm font-bold text-white">{c.email || "info@horizonnepal.com"}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── ROW 2: Main grid ───────────────────────────────── */}
      <div className="bg-brand-dark text-white/75">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.4fr] gap-8 lg:gap-6">

            {/* Brand */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
                <div className="size-9 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                  <Image src="/logo.png" alt="Horizon Nepal" width={22} height={22} className="object-contain" />
                </div>
                <span className="flex items-baseline leading-none">
                  <span className="text-brand-primary font-extrabold text-xl tracking-tight">Horizon</span>
                  <span className="text-white font-semibold text-xl ml-1.5">Nepal</span>
                </span>
              </Link>
              <p className="text-sm text-white/55 leading-relaxed mb-5 max-w-[280px]">
                Trusted architecture, engineering &amp; construction firm delivering innovative and sustainable designs across Nepal.
              </p>
              <ul className="space-y-2.5 text-sm">
                {c.address && (
                  <li className="flex items-start gap-2">
                    <MapPin className="size-3.5 text-brand-secondary shrink-0 mt-0.5" />
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors leading-snug">{c.address}</a>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <Building2 className="size-3.5 text-brand-secondary shrink-0 mt-0.5" />
                  <span className="text-white/60">Horizon Nepal Pvt. Ltd.</span>
                </li>
                <li className="flex items-start gap-2">
                  <IdCard className="size-3.5 text-brand-secondary shrink-0 mt-0.5" />
                  <span className="text-white/60">VAT No: XXXXXXXXX</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="size-3.5 text-brand-secondary shrink-0 mt-0.5" />
                  <span className="text-white/60">Sun–Fri, 9:00 AM – 6:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-[11px] mb-4 uppercase tracking-widest">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link prefetch={false} href={l.href} className="text-white/60 hover:text-white text-[13px] transition-colors block">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-bold text-[11px] mb-4 uppercase tracking-widest">Services</h3>
              <ul className="space-y-2">
                {serviceLinks.map((l) => (
                  <li key={l.href}>
                    <Link prefetch={false} href={l.href} className="text-white/60 hover:text-white text-[13px] transition-colors block">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-white font-bold text-[11px] mb-4 uppercase tracking-widest">Tools</h3>
              <ul className="space-y-2">
                {toolLinks.map((l) => (
                  <li key={l.href}>
                    <Link prefetch={false} href={l.href} className="text-white/60 hover:text-white text-[13px] transition-colors block">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-[11px] mb-4 uppercase tracking-widest">Get In Touch</h3>
              <ul className="space-y-3">
                {c.phone && (
                  <li className="flex items-start gap-2.5">
                    <PhoneCall className="size-3.5 text-brand-secondary shrink-0 mt-0.5" />
                    <a href={`tel:${c.phone}`} className="text-white/60 hover:text-white text-[13px] transition-colors">{c.phone}</a>
                  </li>
                )}
                {c.phone && (
                  <li className="flex items-start gap-2.5">
                    <svg viewBox="0 0 24 24" className="size-3.5 fill-[#25D366] shrink-0 mt-0.5" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.940 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.570-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-[13px] transition-colors">WhatsApp</a>
                  </li>
                )}
                {c.email && (
                  <li className="flex items-start gap-2.5">
                    <Mail className="size-3.5 text-brand-secondary shrink-0 mt-0.5" />
                    <a href={`mailto:${c.email}`} className="text-white/60 hover:text-white text-[13px] transition-colors break-all">{c.email}</a>
                  </li>
                )}
              </ul>
            </div>

          </div>
        </div>

        {/* ── ROW 3: Social + Trust + CTA ────────────────────── */}
        <div className="border-t border-white/10">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold text-[11px] uppercase tracking-widest">Follow Us</span>
                <div className="flex gap-1.5">
                  {social_links.map(({ url, label, platform }) => {
                    const Icon = getSocialIcon(platform ?? "");
                    return (
                      <a
                        key={`${platform}-${url}`}
                        href={url ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label || platform || "Social link"}
                        className="size-8 rounded-lg border border-white/15 flex items-center justify-center text-white/50 hover:bg-brand-secondary/40 hover:border-brand-secondary hover:text-white transition-colors"
                      >
                        <Icon className="size-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-white/50 text-xs"><Award className="size-4 text-brand-secondary" /><span>ISO Certified</span></div>
                <div className="flex items-center gap-1.5 text-white/50 text-xs"><Leaf className="size-4 text-brand-secondary" /><span>Sustainable Builds</span></div>
                <div className="flex items-center gap-1.5 text-white/50 text-xs"><Zap className="size-4 text-brand-secondary" /><span>Fast Delivery</span></div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-primary hover:bg-blue-700 text-white text-sm font-bold px-5 py-2 rounded-full transition-colors duration-200"
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ── ROW 4: Copyright bar ───────────────────────────── */}
      <div className="bg-[#0c1f4a]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="size-6 rounded bg-white/10 flex items-center justify-center">
                <Image src="/logo.png" alt="Horizon Nepal" width={14} height={14} className="object-contain" />
              </div>
              <p className="text-white/40 text-xs">&copy; {year} Horizon Nepal. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs">
              {[
                { label: "Privacy Policy",   href: "/pages/privacy-policy" },
                { label: "Terms of Service", href: "/pages/terms-conditions" },
                { label: "Cookies Policy",   href: "/pages/cookies-policy" },
                { label: "Sitemap",          href: "/sitemap.xml" },
              ].map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white/80 transition-colors">
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
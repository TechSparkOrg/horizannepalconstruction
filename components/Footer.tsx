"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { getSocialIcon } from "@/lib/social-icons";
import { SettingsService } from "@/api/services/settings.service";
import { PageService } from "@/api/services/page.service";
import { useSettings } from "@/stores/settings-store";
import type { Page } from "@/api/types/page.types";

const year = new Date().getFullYear();

const toolLinks = [
  { label: "Design",                    href: "/design" },
  { label: "Cost Estimation",           href: "/cost-estimation" },
  { label: "Vastu Shastra Guide",       href: "/vastu-shastra" },
  { label: "Building Permit Assistant", href: "/building-permit" },
  { label: "2D Floor Planner",          href: "/floor-planner" },
  { label: "Green Builder Calculator",  href: "/green-calculator" },
];

export function Footer() {
  const settings = useSettings((s) => s.settings);
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    if (!useSettings.getState().settings) {
      SettingsService.get().then((data) => useSettings.setState({ settings: data }));
    }

    // PageService.listPublic().then(setPages);
  }, []);

  const social_links = settings?.social_links ?? [];
  const contact_info = settings?.contact_info;

  if (!settings) return null;

  const staticLinks = [
    { label: "Home",         href: "/" },
    { label: "About",        href: "/about" },
    { label: "How We Work",  href: "/how-we-work" },
    { label: "Projects",     href: "/our-work" },
    { label: "Blog",         href: "/blog" },
    { label: "FAQ",          href: "/faq" },
    { label: "Contact",      href: "/contact" },
  ];

  return (
    <footer className="bg-brand-dark text-white/60">

      {/* Main grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <img
              src="/logo.png"
              alt="Horizon Nepal"
              className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <span className="flex items-baseline leading-none">
              <span className="text-brand-primary font-extrabold text-xl tracking-tight">Horizon</span>
              <span className="text-white font-medium text-xl ml-1.5 tracking-wide">Nepal</span>
            </span>
          </Link>

          <p className="text-sm leading-relaxed mb-6 max-w-xs">
            A trusted architecture, engineering, and construction firm delivering innovative and sustainable designs across Nepal.
          </p>

          <div className="flex gap-2">
            {social_links.map(({ url, label, platform }) => {
              const Icon = getSocialIcon(platform);
              return (
                <a
                  key={`${platform}-${url}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="size-8 rounded-lg border border-white/12 grid place-items-center text-white/50 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-150"
                >
                  <Icon className="size-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick Links — core routes + admin-managed pages */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4 tracking-wide">Quick Links</h3>
          <ul className="space-y-2.5">
            {staticLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  prefetch={false}
                  className="text-sm hover:text-brand-primary transition-colors duration-150"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {pages.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/pages/${p.slug}`}
                  prefetch={false}
                  className="text-sm hover:text-brand-primary transition-colors duration-150"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4 tracking-wide">Tools</h3>
          <ul className="space-y-2.5">
            {toolLinks.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  prefetch={false}
                  className="text-sm hover:text-brand-primary transition-colors duration-150"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4 tracking-wide">Contact</h3>
          <address className="not-italic text-sm space-y-2.5 leading-relaxed">
            <p>{contact_info?.address}</p>
            <p>
              <a href={`tel:${contact_info?.phone}`} className="hover:text-brand-primary transition-colors duration-150">
                {contact_info?.phone}
              </a>
            </p>
            <p>
              <a
                href={`https://wa.me/${contact_info?.phone?.replace(/[^0-9]/g, '')}?text=Hello!%20I'd%20like%20to%20know%20more%20about%20Horizon%20Nepal's%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-brand-primary transition-colors duration-150"
              >
                <MessageCircle className="size-3.5 text-[#25D366] flex-shrink-0" />
                WhatsApp
              </a>
            </p>
            <p>
              <a
                href={`mailto:${contact_info?.email}`}
                className="hover:text-brand-primary transition-colors duration-150"
              >
                {contact_info?.email}
              </a>
            </p>
            <p className="text-white/35 text-xs">Mon–Fri &nbsp;9:00 AM – 6:00 PM</p>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/35">
          <p>&copy; {year} Horizon Nepal. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a  href="/pages/privacy-policy" target="_blank"  rel="noopener noreferrer"  className="hover:text-white/70 transition-colors duration-150">Privacy Policy</a>
            <a href="/pages/terms-conditions"  target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors duration-150">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

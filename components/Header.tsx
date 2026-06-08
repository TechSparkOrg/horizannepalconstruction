"use client";

import { useState, useEffect, useRef } from "react";
import { useLangStore as useLang } from "@/stores/lang-store";
import { useSettings } from "@/stores/settings-store";
import { Menu, X, ChevronRight, ChevronDown, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const WA_MSG = "Hello! I'd like to know more about Horizon Nepal's services.";

function useWaHref() {
  const contactInfo = useSettings((s) => s.settings?.contact_info);
  const num = contactInfo?.whatsappNumber || contactInfo?.phone?.replace(/[^0-9]/g, "") || "";
  return num ? `https://wa.me/${num}?text=${encodeURIComponent(WA_MSG)}` : "#";
}

const NAV_ITEMS = [
  { href: "/",               label: "Home" },
  { href: "/about",          label: "About Us" },
  { href: "/our-work",       label: "Project" },
  // { href: "/design",         label: "Design" },
  // { href: "/cost-estimation",label: "Cost Estimation" },
  { href: "/contact",        label: "Contact" },
    { href: "/floor-planner",   label: "2D Floor Planner" },
];

const TOOLS_ITEMS = [
  { href: "/vastu-shastra",   label: "Vastu Shastra Guide" },
  { href: "/building-permit", label: "Building Permit Assistant" },

  // { href: "/green-calculator",label: "Green Builder Calculator" },
];

export function Header() {
  const [open,            setOpen]            = useState(false);
  const [scrolled,        setScrolled]        = useState(false);
  const [toolsOpen,       setToolsOpen]       = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLLIElement>(null);
  const { lang, toggle } = useLang();

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Scroll-aware background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close desktop tools dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node))
        setToolsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeAll = () => { setOpen(false); setToolsOpen(false); };

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-brand-primary focus:text-white focus:text-sm focus:font-bold"
      >
        Skip to content
      </a>

      {/* ── Nav bar ─────────────────────────────────────────────────────────── */}
      <nav
        aria-label="Primary navigation"
        className={`fixed top-0 inset-x-0 z-[100] h-16 transition-all duration-300 ${
          scrolled
            ? "bg-brand-dark/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center gap-6">

          {/* Logo */}
          <Link
            href="/"
            
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="relative">
              <img
                src="/logo.png"
                alt="Horizon Nepal"
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              {/* <span className="absolute -inset-1 rounded-full bg-brand-primary/20 scale-0 group-hover:scale-100 transition-transform duration-300" /> */}
            </div>
            <span className="flex items-baseline leading-none">
              <span className="text-brand-primary font-extrabold text-xl sm:text-2xl tracking-tight">Horizon</span>
              <span className="text-white font-medium text-xl sm:text-2xl ml-1.5 tracking-wide">Nepal</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-0.5 flex-1 justify-center" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  
                  className="px-3 py-2 rounded-lg text-sm font-bold text-white hover:text-white hover:bg-white/8 transition-colors duration-150"
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {/* Tools dropdown */}
            <li ref={toolsRef} className="relative">
              <button
                type="button"
                onClick={() => setToolsOpen((v) => !v)}
                onMouseEnter={() => setToolsOpen(true)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-bold text-white hover:text-white hover:bg-white/8 transition-colors duration-150"
              >
                Tools
                <ChevronDown
                  className={`size-3.5 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown panel */}
              <div
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
                className={`absolute top-full right-0 pt-1.5 transition-all duration-200 ${
                  toolsOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-1 pointer-events-none"
                }`}
              >
                <div className="bg-brand-dark border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden min-w-[210px]">
                  {TOOLS_ITEMS.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      
                      onClick={() => setToolsOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white hover:text-white hover:bg-white/8 transition-colors duration-150"
                    >
                      <ChevronRight className="size-3 opacity-40 flex-shrink-0" />
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto lg:ml-0">
            {/* Language toggle */}
            {/* <button
              type="button"
              onClick={toggle}
              aria-label={lang === "en" ? "Switch to Nepali" : "Switch to English"}
              className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-white/15 hover:border-white/30 text-white/70 hover:text-white transition-all duration-150"
            >
              {lang === "en" ? (
                <Image src="/staticimg/flag-for-flag-nepal.svg" alt="NP" width={18} height={13} className="object-contain" />
              ) : (
                <Image src="/staticimg/US-UK_Flag.png" alt="EN" width={18} height={13} className="object-contain" />
              )}
              <span className="text-[11px] font-semibold hidden sm:inline">
                {lang === "en" ? "NP" : "EN"}
              </span>
            </button> */}

            {/* WhatsApp */}
            {/* <a
              href={useWaHref()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="flex items-center justify-center size-8 rounded-lg bg-[#25D366]/12 text-[#25D366] border border-[#25D366]/25 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-150"
            >
              <MessageCircle className="size-4" />
            </a> */}

            {/* CTA — desktop only */}
            <Link
              href="/contact"
              
              className="hidden sm:inline-flex items-center gap-1.5 h-8 px-4 rounded-full bg-brand-primary text-white text-sm font-bold tracking-wide shadow-md shadow-brand-primary/20 hover:shadow-lg hover:shadow-brand-primary/35 hover:-translate-y-px active:translate-y-0 active:scale-[0.97] transition-all duration-200"
            >
              Get a Quote
              <ChevronRight className="size-3.5 opacity-80" />
            </Link>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="lg:hidden flex items-center justify-center size-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile overlay ───────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[108] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* ── Mobile drawer ────────────────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 right-0 z-[110] w-[min(300px,100vw)] bg-brand-dark border-l border-white/8 flex flex-col lg:hidden transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-white/8 flex-shrink-0">
          <Link
            href="/"
            
            onClick={closeAll}
            className="flex items-center gap-2"
          >
            <img src="/logo.png" alt="Horizon Nepal" className="h-7 w-7 object-contain" />
            <span className="flex items-baseline leading-none">
              <span className="text-brand-primary font-extrabold text-lg">Horizon</span>
              <span className="text-white font-medium text-lg ml-1">Nepal</span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center size-8 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150"
          >
            <X className="size-4.5" />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto py-3 px-3">
          <ul className="flex flex-col gap-0.5" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  
                  onClick={closeAll}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-bold text-white hover:text-white hover:bg-white/6 transition-colors duration-150"
                >
                  {item.label}
                  <ChevronRight className="size-3.5 opacity-25" />
                </Link>
              </li>
            ))}

            {/* Tools accordion */}
            <li>
              <button
                type="button"
                onClick={() => setMobileToolsOpen((v) => !v)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-[15px] font-bold text-white hover:text-white hover:bg-white/6 transition-colors duration-150"
              >
                Tools
                <ChevronDown
                  className={`size-3.5 opacity-40 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  mobileToolsOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-3 border-l border-white/8 pl-3 py-1 space-y-0.5">
                  {TOOLS_ITEMS.map((t) => (
                    <Link
                      key={t.href}
                      href={t.href}
                      
                      onClick={closeAll}
                      className="block px-3 py-2.5 rounded-lg text-sm font-bold text-white hover:text-white hover:bg-white/6 transition-colors duration-150"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
          </ul>
        </nav>

        {/* Drawer footer */}
        <div className="p-4 border-t border-white/8 flex-shrink-0 space-y-2.5">
          {/* <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={toggle}
              className="flex items-center justify-center gap-1.5 h-9 rounded-full border border-white/15 text-white/65 text-sm font-medium hover:bg-white/6 transition-colors duration-150"
            >
              {lang === "en" ? (
                <Image src="/staticimg/flag-for-flag-nepal.svg" alt="NP" width={18} height={13} className="object-contain" />
              ) : (
                <Image src="/staticimg/US-UK_Flag.png" alt="EN" width={18} height={13} className="object-contain" />
              )}
              {lang === "en" ? "नेपाली" : "English"}
            </button>
            <a
              href={useWaHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 h-9 rounded-full bg-[#25D366]/12 text-[#25D366] border border-[#25D366]/25 text-sm font-medium hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-150"
            >
              <MessageCircle className="size-4" />
              WhatsApp
            </a>
          </div> */}
          <Link
            href="/contact"
            
            onClick={closeAll}
            className="flex items-center justify-center gap-2 w-full h-11 rounded-full bg-brand-primary text-white text-sm font-bold tracking-wide shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/35 active:scale-[0.98] transition-all duration-200"
          >
            Get a Quote
            <ChevronRight className="size-3.5 opacity-80" />
          </Link>
        </div>
      </div>
    </>
  );
}
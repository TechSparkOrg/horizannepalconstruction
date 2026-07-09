"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Phone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const NAV = [
  { href: "/", label: "Home" },
  {
    label: "Services",
    children: [
      { href: "/design",          label: "Design"          },
      { href: "/floor-planner",   label: "Floor Planner"   },
      { href: "/vastu-shastra",   label: "Vastu Shastra"   },
      { href: "/building-permit", label: "Building Permit" },
      { href: "/material",        label: "Materials"       },
    ],
  },
  { href: "/our-work", label: "Projects" },
  {
    label: "Tools",
    children: [
      { href: "/emi-calculator", label: "EMI Calculator" },
      { href: "/unit-convert",   label: "Unit Converter"  },
    ],
  },
  { href: "/blog",    label: "Blog"    },
  { href: "/reviews", label: "Reviews" },
  { href: "/faq",     label: "FAQ"     },
  { href: "/about",   label: "About"   },
];

type NavItem =
  | { href: string; label: string; children?: never }
  | { href?: never; label: string; children: { href: string; label: string }[] };

/* ─── Desktop dropdown ───────────────────────────────────────── */
function DropdownItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const show = () => { clearTimeout(timer.current); setOpen(true); };
  const hide = () => { timer.current = setTimeout(() => setOpen(false), 120); };
  useEffect(() => () => clearTimeout(timer.current), []);

  if (!item.children) {
    return (
      <Link prefetch={false}
        href={item.href}
        className="flex items-center h-9 px-3 text-[13px] font-medium text-white/75 hover:text-white hover:bg-white/8 rounded-lg transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <button
        type="button"
        className={cn(
          "flex items-center h-9 gap-1 px-3 text-[13px] font-medium rounded-lg transition-colors",
          open ? "text-white bg-white/12" : "text-white/75 hover:text-white hover:bg-white/8"
        )}
      >
        {item.label}
        <ChevronDown className={cn("size-3 opacity-60 transition-transform duration-200", open && "rotate-180")} />
      </button>

      <div
        className={cn(
          "absolute top-full left-0 pt-2 z-50 transition-all duration-150",
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
        )}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        <div className="w-[200px] rounded-xl border border-[#e8edf5] bg-white shadow-lg shadow-[#0f2557]/8 p-1.5">
          {item.children.map((child) => (
            <Link prefetch={false}
              key={child.href}
              href={child.href}
              className="flex items-center h-9 px-3 text-[13px] font-medium text-[#374151] hover:text-brand-dark hover:bg-[#f5f8ff] rounded-lg transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile sidebar ─────────────────────────────────────────── */
function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="lg:hidden flex items-center justify-center size-9 rounded-lg border border-white/20 bg-white/8 text-white hover:bg-white/15 transition-colors focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-1 focus-visible:ring-offset-brand-dark"
      >
        <Menu className="size-[18px]" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-[300px] flex flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Mobile navigation"
      >
        {/* Sidebar header — dark brand */}
        <div className="bg-brand-dark px-5 py-4 flex items-center justify-between shrink-0">
          <Link prefetch={false}
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="size-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
              <Image
                src="/logo.png"
                alt="Horizon Nepal"
                width={22}
                height={22}
                className="object-contain w-auto h-auto" style={{ height: "auto" }}
              />
            </div>
            <div className="flex flex-col gap-[3px]">
              <span className="text-white font-bold text-[15px] leading-none">
                Horizon <span className="text-brand-secondary">Nepal</span>
              </span>
              <span className="text-[9px] font-semibold tracking-[0.2em] uppercase text-white/50 leading-none">
                Construction
              </span>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsOpen(false)}
            className="size-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {NAV.map((item) =>
            !item.children ? (
              <Link prefetch={false}
                key={item.label}
                href={(item as { href: string; label: string }).href}
                onClick={() => setIsOpen(false)}
                className="flex items-center h-11 px-3 text-[14px] font-medium text-[#374151] hover:text-brand-dark hover:bg-[#f5f8ff] rounded-xl transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <Collapsible key={item.label} className="group/col">
                <CollapsibleTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center w-full h-11 px-3 text-[14px] font-medium text-[#374151] hover:text-brand-dark hover:bg-[#f5f8ff] rounded-xl transition-colors"
                  >
                    {item.label}
                    <ChevronDown className="ml-auto size-4 text-[#9ca3af] transition-transform duration-200 group-data-[state=open]/col:rotate-180" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-3 mt-0.5 mb-1 pl-3 border-l-2 border-[#e8edf5] space-y-0.5">
                    {item.children.map((child) => (
                      <Link prefetch={false}
                        key={child.href}
                        href={child.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center h-9 px-3 text-[13px] font-medium text-[#6b7280] hover:text-brand-dark hover:bg-[#f5f8ff] rounded-lg transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          )}
        </nav>

        {/* Sidebar footer */}
        <div className="shrink-0 border-t border-[#e8edf5] px-4 py-4 space-y-2.5">
          <a
            href="tel:+977"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#f5f8ff] text-[13px] font-medium text-[#374151]"
          >
            <div className="size-7 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
              <Phone className="size-3.5 text-brand-primary" />
            </div>
            Call us now
          </a>
          <Link prefetch={false}
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-brand-dark hover:bg-[#0c1f4a] text-white font-semibold text-[13.5px] transition-colors"
          >
            Get a Free Quote
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </aside>
    </>
  );
}

/* ─── Header ─────────────────────────────────────────────────── */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 bg-brand-dark transition-all duration-200",
        scrolled
          ? "shadow-[0_2px_16px_rgba(0,0,0,0.3)] border-b border-white/8"
          : "border-b border-white/8"
      )}
    >
      <div className="max-w-[1280px] mx-auto h-[60px] sm:h-[64px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link prefetch={false} href="/" className="flex items-center gap-2.5 shrink-0">
          <Image
            src="/logo.png"
            alt="Horizon Nepal Construction"
            width={30}
            height={30}
            className="object-contain w-auto h-auto"
            priority
          />
          <div className="flex flex-col gap-[3px]">
            <span className="text-white font-bold text-[15px] leading-none tracking-tight">
              Horizon Nepal
            </span>
            <span className="text-[8.5px] font-semibold tracking-[0.22em] uppercase text-white/50 leading-none">
              Construction
            </span>
          </div>
        </Link>

        {/* Desktop nav — centered */}
        <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
          {NAV.map((item) => (
            <DropdownItem key={item.label} item={item as NavItem} />
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Desktop CTA */}
          <Link prefetch={false}
            href="/contact"
            className="hidden sm:inline-flex items-center h-9 px-5 rounded-full bg-white hover:bg-gray-100 text-brand-dark font-semibold text-[13px] leading-none transition-colors focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-1 focus-visible:ring-offset-brand-dark"
          >
            Get a Quote
          </Link>

          {/* Mobile toggle */}
          <MobileSidebar />
        </div>

      </div>
    </header>
  );
}

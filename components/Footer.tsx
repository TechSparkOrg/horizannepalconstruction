import { ExternalLink } from "lucide-react";
import Link from "next/link";

const year = new Date().getFullYear();

const quickLinks = [
  { label: "Home",         href: "/" },
  { label: "About",        href: "/about" },
  { label: "How We Work",  href: "/how-we-work" },
  { label: "Project",      href: "/our-work" },
  { label: "Blog",         href: "/blog" },
  { label: "FAQ",          href: "/faq" },
  { label: "Contact",      href: "/contact" },
];

const toolLinks = [
  { label: "Design",                    href: "/design" },
  { label: "Cost Estimation",           href: "/cost-estimation" },
  { label: "Vastu Shastra Guide",       href: "/vastu-shastra" },
  { label: "Building Permit Assistant", href: "/building-permit" },
  { label: "2D Floor Planner",          href: "/floor-planner" },
  { label: "Green Builder Calculator",  href: "/green-calculator" },
];

const socialLinks = [
  { label: "Facebook",  href: "https://www.facebook.com/horizonnepal" },
  { label: "Instagram", href: "https://www.instagram.com/horizonnepal" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/company/horizonnepal" },
  { label: "YouTube",   href: "https://www.youtube.com/@horizonnepal" },
];

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white/60">

      {/* Main grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
            <img
              src="/favicon.png"
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
            {socialLinks.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="size-8 rounded-lg border border-white/12 grid place-items-center text-white/50 hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-150"
              >
                <ExternalLink className="size-3.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-sm font-semibold mb-4 tracking-wide">Quick Links</h3>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
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
            <p>Tinkune, Kathmandu</p>
            <p>
              <a href="tel:+97714411222" className="hover:text-brand-primary transition-colors duration-150">
                +977 1 441 1222
              </a>
            </p>
            <p>
              <a
                href="https://wa.me/97714411222?text=Hello!%20I'd%20like%20to%20know%20more%20about%20Horizon%20Nepal's%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-brand-primary transition-colors duration-150"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-[#25D366] flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            </p>
            <p>
              <a
                href="mailto:hello@horizonnepal.com.np"
                className="hover:text-brand-primary transition-colors duration-150"
              >
                hello@horizonnepal.com.np
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
            <Link href="/privacy" prefetch={false} className="hover:text-white/70 transition-colors duration-150">Privacy Policy</Link>
            <Link href="/terms"   prefetch={false} className="hover:text-white/70 transition-colors duration-150">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
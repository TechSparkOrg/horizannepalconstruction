"use client";

import { useEffect, useRef, useState } from "react";
import { Save, Plus, Trash2, ChevronDown, Check } from "lucide-react";
import { SettingsService } from "@/api/services/settings.service";
import type { SiteSettings, SiteSettingsPayload } from "@/api/types/settings.types";
import { toast } from "sonner";

const TABS = ["Social Media", "Contact", "SEO", "Scripts"] as const;
type Tab = (typeof TABS)[number];

const SOCIAL_PLATFORMS = [
  { value: "Facebook",  label: "Facebook"    },
  { value: "Instagram", label: "Instagram"   },
  { value: "Twitter",   label: "Twitter / X" },
  { value: "LinkedIn",  label: "LinkedIn"    },
  { value: "TikTok",    label: "TikTok"      },
  { value: "YouTube",   label: "YouTube"     },
  { value: "Pinterest", label: "Pinterest"   },
  { value: "Snapchat",  label: "Snapchat"    },
  { value: "WhatsApp",  label: "WhatsApp"    },
  { value: "Telegram",  label: "Telegram"    },
  { value: "Discord",   label: "Discord"     },
  { value: "Reddit",    label: "Reddit"      },
  { value: "GitHub",    label: "GitHub"      },
  { value: "Behance",   label: "Behance"     },
  { value: "Dribbble",  label: "Dribbble"    },
  { value: "Vimeo",     label: "Vimeo"       },
  { value: "Threads",   label: "Threads"     },
  { value: "Mastodon",  label: "Mastodon"    },
  { value: "Other",     label: "Other"       },
] as const;

const toPayload = (s: SiteSettings): SiteSettingsPayload => ({
  social_links: s.social_links || [],
  contact_info: s.contact_info || { phone: "", email: "", address: "", mapEmbed: "", whatsappNumber: "" },
  seo: s.seo || { title: "", description: "", keywords: "" },
  scripts: s.scripts || { head: "", body: "" },
});

const field = "flex flex-col gap-1.5";
const lbl   = "text-xs font-medium text-mid-gray";
const input =
  "h-10 px-3 rounded-lg border border-light-gray bg-white text-sm text-brand-dark placeholder:text-mid-gray/50 focus:outline-none focus:border-brand-primary transition";
const textarea =
  "px-3 py-2.5 rounded-lg border border-light-gray bg-white text-sm text-brand-dark placeholder:text-mid-gray/50 focus:outline-none focus:border-brand-primary transition resize-none";

function PlatformDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = SOCIAL_PLATFORMS.find((p) => p.value === value);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div ref={ref} className="relative w-44 shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full h-10 px-3 rounded-lg border border-light-gray bg-white text-sm flex items-center justify-between gap-2 focus:outline-none focus:border-brand-primary transition hover:border-brand-primary/50"
      >
        <span className={!value ? "text-mid-gray/50" : "text-brand-dark"}>
          {selected?.label ?? "Platform"}
        </span>
        <ChevronDown
          className={`size-3.5 text-mid-gray transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 top-[calc(100%+2px)] left-0 w-full bg-white border border-light-gray rounded-lg overflow-hidden shadow-sm">
          <div className="max-h-56 overflow-y-auto">
            {SOCIAL_PLATFORMS.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => { onChange(p.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition hover:bg-light-gray/40 ${
                  value === p.value ? "text-brand-primary font-medium" : "text-brand-dark"
                }`}
              >
                {p.label}
                {value === p.value && <Check className="size-3.5 text-brand-primary" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminSettingsPage() {
  const [tab, setTab] = useState<Tab>("Social Media");
  const [settings, setSettings] = useState<SiteSettingsPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    SettingsService.get()
      .then((d) => setSettings(toPayload(d)))
      .catch(() => toast.error("Unable to load settings"))
      .finally(() => setIsLoading(false));
  }, []);

  const save = async () => {
    if (!settings) return;
    setIsSaving(true);
    try {
      const d = await SettingsService.put(settings);
      setSettings(toPayload(d));
      toast.success("Settings saved");
    } catch {
      toast.error("Unable to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const update = (patch: Partial<SiteSettingsPayload>) =>
    setSettings((prev) => (prev ? { ...prev, ...patch } : null));

  const updateLink = (i: number, f: "platform" | "url", v: string) => {
    if (!settings) return;
    const links = [...settings.social_links];
    links[i] = { ...links[i], [f]: v };
    update({ social_links: links });
  };

  if (isLoading)
    return <div className="py-12 text-center text-sm text-mid-gray">Loading…</div>;
  if (!settings) return null;

  const titleLen = settings.seo.title.length;
  const descLen  = settings.seo.description.length;

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-brand-dark">Settings</h1>
          <p className="text-sm text-mid-gray mt-0.5">Manage website configuration.</p>
        </div>
        <button
          onClick={save}
          disabled={isSaving}
          className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-brand-primary text-white text-sm font-medium hover:brightness-110 transition disabled:opacity-50"
        >
          <Save className="size-3.5" />
          {isSaving ? "Saving…" : "Save"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-light-gray mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition whitespace-nowrap ${
              tab === t
                ? "border-brand-primary text-brand-primary"
                : "border-transparent text-mid-gray hover:text-brand-dark"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Social Media ── */}
      {tab === "Social Media" && (
        <div className="space-y-2">
          {settings.social_links.length === 0 && (
            <p className="text-sm text-mid-gray py-6 text-center">No links added yet.</p>
          )}
          {settings.social_links.map((link, i) => (
            <div key={link.id} className="flex items-center gap-2">
              <PlatformDropdown
                value={link.platform}
                onChange={(v) => updateLink(i, "platform", v)}
              />
              <input
                value={link.url}
                onChange={(e) => updateLink(i, "url", e.target.value)}
                placeholder="https://…"
                className={`${input} flex-1 min-w-0`}
              />
              <button
                onClick={() =>
                  update({
                    social_links: settings.social_links.filter((l) => l.id !== link.id),
                  })
                }
                className="p-2 rounded-lg text-mid-gray hover:text-red-500 hover:bg-red-50 transition"
                aria-label="Remove"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              update({
                social_links: [
                  ...settings.social_links,
                  { id: Date.now().toString(), platform: "", url: "", label: "" },
                ],
              })
            }
            className="flex items-center gap-1.5 text-sm text-brand-primary font-medium hover:opacity-70 transition mt-2"
          >
            <Plus className="size-4" />
            Add link
          </button>
        </div>
      )}

      {/* ── Contact ── */}
      {tab === "Contact" && (
        <div className="grid grid-cols-2 gap-4">
          <div className={field}>
            <label className={lbl}>Phone</label>
            <input
              value={settings.contact_info.phone}
              onChange={(e) =>
                update({ contact_info: { ...settings.contact_info, phone: e.target.value } })
              }
              placeholder="+977 01-XXXXXXX"
              className={input}
            />
          </div>
          <div className={field}>
            <label className={lbl}>Email</label>
            <input
              value={settings.contact_info.email}
              onChange={(e) =>
                update({ contact_info: { ...settings.contact_info, email: e.target.value } })
              }
              placeholder="info@example.com"
              className={input}
            />
          </div>
          <div className={`${field} col-span-2`}>
            <label className={lbl}>Address</label>
            <input
              value={settings.contact_info.address}
              onChange={(e) =>
                update({ contact_info: { ...settings.contact_info, address: e.target.value } })
              }
              placeholder="Street, City, Country"
              className={input}
            />
          </div>
          <div className={`${field} col-span-2`}>
            <label className={lbl}>Google Maps Embed URL</label>
            <input
              value={settings.contact_info.mapEmbed}
              onChange={(e) =>
                update({ contact_info: { ...settings.contact_info, mapEmbed: e.target.value } })
              }
              placeholder="https://www.google.com/maps/embed?pb=…"
              className={input}
            />
          </div>
          <div className={`${field} col-span-2`}>
            <label className={lbl}>WhatsApp Number</label>
            <input
              value={settings.contact_info.whatsappNumber}
              onChange={(e) =>
                update({ contact_info: { ...settings.contact_info, whatsappNumber: e.target.value } })
              }
              placeholder="977XXXXXXXXX (digits only, no +)"
              className={input}
            />
          </div>
        </div>
      )}

      {/* ── SEO ── */}
      {tab === "SEO" && (
        <div className="space-y-4">
          <div className={field}>
            <div className="flex items-center justify-between">
              <label className={lbl}>Meta Title</label>
              <span className={`text-xs tabular-nums ${titleLen > 55 ? "text-amber-500" : "text-mid-gray"}`}>
                {titleLen}/60
              </span>
            </div>
            <input
              value={settings.seo.title}
              onChange={(e) => update({ seo: { ...settings.seo, title: e.target.value } })}
              maxLength={60}
              placeholder="Horizon Nepal – Engineering & Construction"
              className={input}
            />
          </div>

          <div className={field}>
            <div className="flex items-center justify-between">
              <label className={lbl}>Meta Description</label>
              <span className={`text-xs tabular-nums ${descLen > 150 ? "text-amber-500" : "text-mid-gray"}`}>
                {descLen}/160
              </span>
            </div>
            <textarea
              value={settings.seo.description}
              onChange={(e) => update({ seo: { ...settings.seo, description: e.target.value } })}
              maxLength={160}
              rows={3}
              placeholder="Describe your site in 1–2 sentences…"
              className={textarea}
            />
          </div>

          <div className={field}>
            <label className={lbl}>Meta Keywords</label>
            <input
              value={settings.seo.keywords}
              onChange={(e) => update({ seo: { ...settings.seo, keywords: e.target.value } })}
              placeholder="architecture, engineering, nepal…"
              className={input}
            />
          </div>

          {(settings.seo.title || settings.seo.description) && (
            <div className="p-3 rounded-lg border border-light-gray">
              <p className="text-xs text-mid-gray mb-2">Search preview</p>
              <p className="text-[12px] text-green-700 mb-0.5">horizonnepal.com</p>
              <p className="text-[15px] text-blue-700 font-medium leading-snug mb-0.5 truncate">
                {settings.seo.title || "Page title"}
              </p>
              <p className="text-[13px] text-mid-gray leading-relaxed line-clamp-2">
                {settings.seo.description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Scripts ── */}
      {tab === "Scripts" && (
        <div className="space-y-4">
          <div className={field}>
            <label className={lbl}>&lt;head&gt; Scripts</label>
            <textarea
              value={settings.scripts.head}
              onChange={(e) => update({ scripts: { ...settings.scripts, head: e.target.value } })}
              rows={7}
              placeholder={"<!-- Analytics, fonts, meta tags -->"}
              className={`${textarea} font-mono text-xs`}
            />
          </div>
          <div className={field}>
            <label className={lbl}>&lt;body&gt; Scripts</label>
            <textarea
              value={settings.scripts.body}
              onChange={(e) => update({ scripts: { ...settings.scripts, body: e.target.value } })}
              rows={7}
              placeholder={"<!-- Chat widgets, pixel codes -->"}
              className={`${textarea} font-mono text-xs`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
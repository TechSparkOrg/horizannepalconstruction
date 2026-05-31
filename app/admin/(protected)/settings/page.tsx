"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { useAdminStore } from "@/stores/admin-store";

const TABS = ["Social Media", "Contact", "SEO", "Scripts"] as const;
type Tab = (typeof TABS)[number];

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useAdminStore();
  const [tab, setTab] = useState<Tab>("Social Media");
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-2xl text-brand-dark">Settings</h1>
        <button onClick={save} className="h-10 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition">
          <Save className="size-4" />
          {saved ? "Saved!" : "Save"}
        </button>
      </div>

      <div className="flex gap-1 border-b border-light-gray mb-6">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition ${
              tab === t ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="max-w-2xl">
        {tab === "Social Media" && (
          <section className="bg-white rounded-xl border border-light-gray/40 p-5">
            {settings.socialLinks.map((link, i) => (
              <div key={i} className="flex gap-3 mb-3">
                <input value={link.platform} onChange={(e) => {
                  const a = [...settings.socialLinks];
                  a[i] = { ...a[i], platform: e.target.value };
                  updateSettings({ socialLinks: a });
                }} placeholder="Platform" className="flex-1 h-10 px-3 rounded-md border border-light-gray text-sm" />
                <input value={link.url} onChange={(e) => {
                  const a = [...settings.socialLinks];
                  a[i] = { ...a[i], url: e.target.value };
                  updateSettings({ socialLinks: a });
                }} placeholder="URL" className="flex-[2] h-10 px-3 rounded-md border border-light-gray text-sm" />
                <button onClick={() => updateSettings({ socialLinks: settings.socialLinks.filter((_, j) => j !== i) })} className="px-3 rounded-md text-red-500 hover:bg-red-50 text-sm border border-red-200">Remove</button>
              </div>
            ))}
            <button onClick={() => updateSettings({ socialLinks: [...settings.socialLinks, { platform: "", url: "", label: "" }] })} className="text-sm text-brand-primary font-semibold hover:underline">+ Add Link</button>
          </section>
        )}

        {tab === "Contact" && (
          <section className="bg-white rounded-xl border border-light-gray/40 p-5 space-y-3">
            {(["phone", "email", "address"] as const).map((f) => (
              <div key={f}>
                <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">{f}</label>
                <input value={settings.contactInfo[f]} onChange={(e) => updateSettings({ contactInfo: { ...settings.contactInfo, [f]: e.target.value } })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Google Maps Embed URL</label>
              <input value={settings.contactInfo.mapEmbed} onChange={(e) => updateSettings({ contactInfo: { ...settings.contactInfo, mapEmbed: e.target.value } })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
            </div>
          </section>
        )}

        {tab === "SEO" && (
          <section className="bg-white rounded-xl border border-light-gray/40 p-5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Meta Title</label>
              <input value={settings.seo.title} onChange={(e) => updateSettings({ seo: { ...settings.seo, title: e.target.value } })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Meta Description</label>
              <textarea value={settings.seo.description} onChange={(e) => updateSettings({ seo: { ...settings.seo, description: e.target.value } })} rows={2} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">Meta Keywords</label>
              <input value={settings.seo.keywords} onChange={(e) => updateSettings({ seo: { ...settings.seo, keywords: e.target.value } })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" placeholder="keyword1, keyword2, keyword3" />
            </div>
          </section>
        )}

        {tab === "Scripts" && (
          <section className="bg-white rounded-xl border border-light-gray/40 p-5 space-y-3">
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">&lt;head&gt; Scripts</label>
              <textarea value={settings.scripts.head} onChange={(e) => updateSettings({ scripts: { ...settings.scripts, head: e.target.value } })} rows={4} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm font-mono resize-none" placeholder="Analytics, meta tags, etc." />
            </div>
            <div>
              <label className="block text-xs font-medium text-mid-gray mb-1 uppercase">&lt;body&gt; Scripts</label>
              <textarea value={settings.scripts.body} onChange={(e) => updateSettings({ scripts: { ...settings.scripts, body: e.target.value } })} rows={4} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm font-mono resize-none" placeholder="Chat widgets, pixel codes, etc." />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

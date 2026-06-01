"use client";

import { useState } from "react";
import { MessageSquare, Inbox, Plus, Trash2 } from "lucide-react";
import { useAdminStore, type ConsultationFormSettings, type ConsultationSubmission } from "@/stores/admin-store";

const TABS = ["Content", "Submissions"] as const;
type Tab = typeof TABS[number];

export default function AdminConsultationPage() {
  const { consultationForm, submissions, updateConsultationForm, deleteSubmission } = useAdminStore();
  const [tab, setTab] = useState<Tab>("Content");

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brand-dark mb-6">Consultation Form</h1>

      <div className="flex gap-1 mb-6 border-b border-light-gray/40">
        <button
          onClick={() => setTab("Content")}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px ${tab === "Content" ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"}`}
        >
          <MessageSquare className="size-4" /> Content
        </button>
        <button
          onClick={() => setTab("Submissions")}
          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px ${tab === "Submissions" ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"}`}
        >
          <Inbox className="size-4" /> Submissions ({submissions.length})
        </button>
      </div>

      {tab === "Content" && (
        <ContentTab config={consultationForm} onChange={updateConsultationForm} />
      )}
      {tab === "Submissions" && (
        <SubmissionsTab submissions={submissions} onDelete={deleteSubmission} />
      )}
    </div>
  );
}

function ContentTab({ config, onChange }: {
  config: ConsultationFormSettings;
  onChange: (patch: Partial<ConsultationFormSettings>) => void;
}) {
  const [serviceInput, setServiceInput] = useState("");
  const addService = () => {
    if (!serviceInput.trim()) return;
    onChange({ serviceOptions: [...config.serviceOptions, serviceInput.trim()] });
    setServiceInput("");
  };

  return (
    <div className="max-w-2xl space-y-5 bg-white rounded-xl border border-light-gray/40 p-6">
      <p className="text-sm font-semibold text-brand-secondary">Left Panel — Hero Content</p>

      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Section Label</label>
        <input value={config.sectionLabel} onChange={(e) => onChange({ sectionLabel: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Heading</label>
        <input value={config.heading} onChange={(e) => onChange({ heading: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Description</label>
        <textarea value={config.description} onChange={(e) => onChange({ description: e.target.value })} rows={3} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
      </div>

      <hr className="border-light-gray/40" />
      <p className="text-sm font-semibold text-brand-secondary">Form Panel</p>

      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Form Title</label>
        <input value={config.formTitle} onChange={(e) => onChange({ formTitle: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Service Options</label>
        <div className="space-y-1.5 mb-2">
          {config.serviceOptions.map((opt, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <input
                value={opt}
                onChange={(e) => {
                  const next = [...config.serviceOptions];
                  next[i] = e.target.value;
                  onChange({ serviceOptions: next });
                }}
                className="flex-1 h-8 px-2 rounded border border-light-gray text-xs"
              />
              <button
                onClick={() => onChange({ serviceOptions: config.serviceOptions.filter((_, idx) => idx !== i) })}
                className="text-red-400 hover:text-red-600 p-1"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-1.5">
          <input value={serviceInput} onChange={(e) => setServiceInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addService(); } }} placeholder="Add option..." className="flex-1 h-8 px-2.5 rounded-md border border-light-gray text-xs" />
          <button onClick={addService} className="h-8 px-3 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:brightness-110 transition"><Plus className="size-3.5" /> Add</button>
        </div>
      </div>

      <hr className="border-light-gray/40" />
      <p className="text-sm font-semibold text-brand-secondary">Success State</p>

      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Success Heading</label>
        <input value={config.successHeading} onChange={(e) => onChange({ successHeading: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Success Message</label>
        <textarea value={config.successMessage} onChange={(e) => onChange({ successMessage: e.target.value })} rows={2} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
      </div>
      <div>
        <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Privacy Text</label>
        <input value={config.privacyText} onChange={(e) => onChange({ privacyText: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      </div>
    </div>
  );
}

function SubmissionsTab({ submissions, onDelete }: {
  submissions: ConsultationSubmission[];
  onDelete: (id: string) => void;
}) {
  if (submissions.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-light-gray/40 p-12 text-center">
        <Inbox className="size-12 mx-auto text-light-gray mb-3" />
        <p className="text-sm text-mid-gray">No submissions yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-light-gray/40 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-light-gray/40">
              <th className="text-left font-semibold text-brand-dark px-4 py-3">Date</th>
              <th className="text-left font-semibold text-brand-dark px-4 py-3">Name</th>
              <th className="text-left font-semibold text-brand-dark px-4 py-3">Email</th>
              <th className="text-left font-semibold text-brand-dark px-4 py-3">Phone</th>
              <th className="text-left font-semibold text-brand-dark px-4 py-3">Service</th>
              <th className="text-left font-semibold text-brand-dark px-4 py-3">Preferred Date</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="border-b border-light-gray/20 hover:bg-gray-50">
                <td className="px-4 py-3 text-mid-gray text-xs whitespace-nowrap">{new Date(s.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-3 font-medium text-brand-dark whitespace-nowrap">{s.name}</td>
                <td className="px-4 py-3 text-mid-gray">{s.email}</td>
                <td className="px-4 py-3 text-mid-gray whitespace-nowrap">{s.phone}</td>
                <td className="px-4 py-3 text-mid-gray">{s.service}</td>
                <td className="px-4 py-3 text-mid-gray text-xs whitespace-nowrap">{s.preferredDate}</td>
                <td className="px-4 py-3">
                  <button onClick={() => onDelete(s.id)} className="text-red-400 hover:text-red-600"><Trash2 className="size-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

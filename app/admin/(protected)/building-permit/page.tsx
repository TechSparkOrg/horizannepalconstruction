"use client";

import { useState } from "react";
import {
  ClipboardList, ListChecks, Shield, Building2, Plus, Trash2,
} from "lucide-react";
import { useAdminStore, type BuildingPermitConfig, type BPStep, type BPDocCategory, type BPRegulation, type BPMunicipality, type BPText } from "@/stores/admin-store";

const TABS = ["Workflow", "Checklist", "Regulations", "Municipalities"] as const;
type Tab = typeof TABS[number];

const TAGS = TABS.map((t, i) => ({
  label: t,
  icon: [ClipboardList, ListChecks, Shield, Building2][i],
}));

function BilingualInput({ value, onChange, placeholder }: { value: BPText; onChange: (v: BPText) => void; placeholder?: string }) {
  return (
    <div className="space-y-1">
      <input value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} placeholder={placeholder ? `${placeholder} (EN)` : "English"} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
      <input value={value.np} onChange={(e) => onChange({ ...value, np: e.target.value })} placeholder={placeholder ? `${placeholder} (NP)` : "नेपाली"} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" />
    </div>
  );
}

function BilingualListEditor({ items, onChange }: { items: BPText[]; onChange: (items: BPText[]) => void }) {
  const add = () => onChange([...items, { en: "", np: "" }]);
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const update = (i: number, v: BPText) => {
    const next = [...items];
    next[i] = v;
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-1.5 items-start">
          <div className="flex-1 grid grid-cols-2 gap-1">
            <input value={item.en} onChange={(e) => update(i, { ...item, en: e.target.value })} placeholder="English" className="h-8 px-2 rounded border border-light-gray text-xs" />
            <input value={item.np} onChange={(e) => update(i, { ...item, np: e.target.value })} placeholder="नेपाली" className="h-8 px-2 rounded border border-light-gray text-xs" />
          </div>
          <button onClick={() => remove(i)} className="text-red-400 hover:text-red-600 text-xs mt-1 px-1.5 py-0.5 rounded hover:bg-red-50">✕</button>
        </div>
      ))}
      <button onClick={add} className="text-xs text-brand-primary font-semibold hover:underline">+ Add item</button>
    </div>
  );
}

function TagListEditor({ items, onChange }: { items: string[]; onChange: (items: string[]) => void }) {
  const [val, setVal] = useState("");
  const add = () => {
    if (!val.trim()) return;
    onChange([...items, val.trim()]);
    setVal("");
  };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1.5">
        {items.map((doc, i) => (
          <span key={i} className="inline-flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-lg border border-light-gray/40">
            {doc}
            <button onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600">✕</button>
          </span>
        ))}
      </div>
      <div className="flex gap-1.5">
        <input value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder="Add document..." className="flex-1 h-8 px-2.5 rounded-md border border-light-gray text-xs" />
        <button onClick={add} className="h-8 px-3 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:brightness-110 transition">Add</button>
      </div>
    </div>
  );
}

export default function AdminBuildingPermitPage() {
  const { buildingPermitConfig, updateBuildingPermitConfig } = useAdminStore();
  const [tab, setTab] = useState<Tab>("Workflow");

  const update = (patch: Partial<BuildingPermitConfig>) => updateBuildingPermitConfig(patch);

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brand-dark mb-6">Building Permit</h1>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-light-gray/40">
        {TAGS.map((t) => (
          <button
            key={t.label}
            onClick={() => setTab(t.label)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition border-b-2 -mb-px ${tab === t.label ? "border-brand-primary text-brand-primary" : "border-transparent text-mid-gray hover:text-brand-dark"}`}
          >
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "Workflow" && <WorkflowTab config={buildingPermitConfig} onChange={update} />}
      {tab === "Checklist" && <ChecklistTab config={buildingPermitConfig} onChange={update} />}
      {tab === "Regulations" && <RegulationsTab config={buildingPermitConfig} onChange={update} />}
      {tab === "Municipalities" && <MunicipalitiesTab config={buildingPermitConfig} onChange={update} />}
    </div>
  );
}

function WorkflowTab({ config, onChange }: { config: BuildingPermitConfig; onChange: (patch: Partial<BuildingPermitConfig>) => void }) {
  const updateStep = (i: number, patch: Partial<BPStep>) => {
    const next = [...config.workflowSteps];
    next[i] = { ...next[i], ...patch };
    onChange({ workflowSteps: next });
  };
  return (
    <div className="space-y-4 bg-white rounded-xl border border-light-gray/40 p-6">
      <p className="text-sm font-semibold text-brand-secondary">Nepal Permit Workflow Steps</p>
      <p className="text-xs text-mid-gray">Edit the 4 workflow steps — title, description, duration, and required documents.</p>
      {config.workflowSteps.map((step, i) => (
        <div key={i} className="border border-light-gray/30 rounded-xl p-4 space-y-3">
          <span className="text-xs font-bold bg-brand-primary text-white px-2 py-0.5 rounded-full">Step {step.num}</span>
          <div className="grid grid-cols-2 gap-3">
            <BilingualInput value={step.title} onChange={(title) => updateStep(i, { title })} placeholder="Title" />
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Duration</label>
              <input value={step.duration} onChange={(e) => updateStep(i, { duration: e.target.value })} className="w-full h-9 px-3 rounded-md border border-light-gray text-sm" placeholder='e.g. "2–3 days"' />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Description (EN)</label>
              <textarea value={step.desc.en} onChange={(e) => updateStep(i, { desc: { ...step.desc, en: e.target.value } })} rows={3} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
            </div>
            <div>
              <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">विवरण (NP)</label>
              <textarea value={step.desc.np} onChange={(e) => updateStep(i, { desc: { ...step.desc, np: e.target.value } })} rows={3} className="w-full px-3 py-2 rounded-md border border-light-gray text-sm resize-none" />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Required Documents</label>
            <TagListEditor items={step.docs} onChange={(docs) => updateStep(i, { docs })} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChecklistTab({ config, onChange }: { config: BuildingPermitConfig; onChange: (patch: Partial<BuildingPermitConfig>) => void }) {
  const updateCat = (i: number, patch: Partial<BPDocCategory>) => {
    const next = [...config.docCategories];
    next[i] = { ...next[i], ...patch };
    onChange({ docCategories: next });
  };
  const removeCat = (i: number) => {
    onChange({ docCategories: config.docCategories.filter((_, idx) => idx !== i) });
  };
  const addCat = () => {
    onChange({ docCategories: [...config.docCategories, { label: { en: "", np: "" }, items: [{ en: "", np: "" }] }] });
  };
  return (
    <div className="bg-white rounded-xl border border-light-gray/40 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-brand-secondary">Document Checklist Categories</p>
        <button onClick={addCat} className="h-8 px-4 rounded-lg bg-brand-primary text-white text-xs font-semibold flex items-center gap-1.5 hover:brightness-110 transition"><Plus className="size-3.5" /> Add Category</button>
      </div>
      {config.docCategories.map((cat, i) => (
        <div key={i} className="border border-light-gray/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-mid-gray uppercase">Category {i + 1}</span>
            <button onClick={() => removeCat(i)} className="text-red-400 hover:text-red-600 text-xs px-1.5 py-0.5 rounded hover:bg-red-50"><Trash2 className="size-3.5" /></button>
          </div>
          <BilingualInput value={cat.label} onChange={(label) => updateCat(i, { label })} placeholder="Label" />
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Items</label>
            <BilingualListEditor items={cat.items} onChange={(items) => updateCat(i, { items })} />
          </div>
        </div>
      ))}
    </div>
  );
}

function RegulationsTab({ config, onChange }: { config: BuildingPermitConfig; onChange: (patch: Partial<BuildingPermitConfig>) => void }) {
  const updateReg = (i: number, patch: Partial<BPRegulation>) => {
    const next = [...config.regulations];
    next[i] = { ...next[i], ...patch };
    onChange({ regulations: next });
  };
  const removeReg = (i: number) => {
    onChange({ regulations: config.regulations.filter((_, idx) => idx !== i) });
  };
  const addReg = () => {
    onChange({ regulations: [...config.regulations, { title: { en: "", np: "" }, items: [{ en: "", np: "" }] }] });
  };
  return (
    <div className="bg-white rounded-xl border border-light-gray/40 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-brand-secondary">Building Regulations</p>
        <button onClick={addReg} className="h-8 px-4 rounded-lg bg-brand-primary text-white text-xs font-semibold flex items-center gap-1.5 hover:brightness-110 transition"><Plus className="size-3.5" /> Add Regulation</button>
      </div>
      {config.regulations.map((reg, i) => (
        <div key={i} className="border border-light-gray/30 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-mid-gray uppercase">Regulation {i + 1}</span>
            <button onClick={() => removeReg(i)} className="text-red-400 hover:text-red-600 text-xs px-1.5 py-0.5 rounded hover:bg-red-50"><Trash2 className="size-3.5" /></button>
          </div>
          <BilingualInput value={reg.title} onChange={(title) => updateReg(i, { title })} placeholder="Title" />
          <div>
            <label className="text-xs font-medium text-mid-gray uppercase mb-1 block">Items</label>
            <BilingualListEditor items={reg.items} onChange={(items) => updateReg(i, { items })} />
          </div>
        </div>
      ))}
    </div>
  );
}

function MunicipalitiesTab({ config, onChange }: { config: BuildingPermitConfig; onChange: (patch: Partial<BuildingPermitConfig>) => void }) {
  const updateMun = (i: number, patch: Partial<BPMunicipality>) => {
    const next = [...config.municipalities];
    next[i] = { ...next[i], ...patch };
    onChange({ municipalities: next });
  };
  const removeMun = (i: number) => {
    onChange({ municipalities: config.municipalities.filter((_, idx) => idx !== i) });
  };
  const addMun = () => {
    onChange({ municipalities: [...config.municipalities, { name: "", district: "", phone: "" }] });
  };
  return (
    <div className="bg-white rounded-xl border border-light-gray/40 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-brand-secondary">Municipality Directory</p>
        <button onClick={addMun} className="h-8 px-4 rounded-lg bg-brand-primary text-white text-xs font-semibold flex items-center gap-1.5 hover:brightness-110 transition"><Plus className="size-3.5" /> Add Entry</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-light-gray/40">
              <th className="text-left font-semibold text-brand-dark px-4 py-3">Municipality</th>
              <th className="text-left font-semibold text-brand-dark px-4 py-3">District</th>
              <th className="text-left font-semibold text-brand-dark px-4 py-3">Phone</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody>
            {config.municipalities.map((m, i) => (
              <tr key={i} className="border-b border-light-gray/20">
                <td className="px-4 py-2">
                  <input value={m.name} onChange={(e) => updateMun(i, { name: e.target.value })} className="w-full h-8 px-2 rounded border border-light-gray text-sm" />
                </td>
                <td className="px-4 py-2">
                  <input value={m.district} onChange={(e) => updateMun(i, { district: e.target.value })} className="w-full h-8 px-2 rounded border border-light-gray text-sm" />
                </td>
                <td className="px-4 py-2">
                  <input value={m.phone} onChange={(e) => updateMun(i, { phone: e.target.value })} className="w-full h-8 px-2 rounded border border-light-gray text-sm" />
                </td>
                <td className="px-4 py-2">
                  <button onClick={() => removeMun(i)} className="text-red-400 hover:text-red-600"><Trash2 className="size-3.5" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

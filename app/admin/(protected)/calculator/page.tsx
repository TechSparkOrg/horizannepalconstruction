"use client";

import { useState } from "react";
import { Plus, Trash2, Calculator, Settings2, Pencil } from "lucide-react";
import { useAdminStore, type CalcMaterial } from "@/stores/admin-store";

const CUSTOM_PARENT_VALUE = "__custom_parent__";

export default function AdminCalculatorPage() {
  const { calcBuildingTypes, calcMaterials, addCalcBuildingType, removeCalcBuildingType, addCalcMaterial, updateCalcMaterial, deleteCalcMaterial } = useAdminStore();
  const [tab, setTab] = useState<"config" | "calculate">("config");

  const [newType, setNewType] = useState("");

  const [matForm, setMatForm] = useState<CalcMaterial>({
    id: "", name: "", parentName: "", buildingType: "", unitPrice: 0, unitsPerSqft: 0, size: "", custom: [{ key: "", value: "" }, { key: "", value: "" }],
  });
  const [editingMatId, setEditingMatId] = useState<string | null>(null);
  const [customParentMode, setCustomParentMode] = useState(false);
  const parentGroups = Array.from(new Set(calcMaterials.map((m) => m.parentName.trim()).filter(Boolean))).sort();
  const isCustomParent = Boolean(matForm.parentName) && !parentGroups.includes(matForm.parentName);
  const parentSelectValue = customParentMode ? CUSTOM_PARENT_VALUE : matForm.parentName ? (isCustomParent ? CUSTOM_PARENT_VALUE : matForm.parentName) : "";

  const resetMatForm = () => {
    setMatForm({ id: "", name: "", parentName: "", buildingType: "", unitPrice: 0, unitsPerSqft: 0, size: "", custom: [{ key: "", value: "" }, { key: "", value: "" }] });
    setEditingMatId(null);
    setCustomParentMode(false);
  };

  const saveMat = () => {
    if (!matForm.name || !matForm.buildingType || matForm.unitPrice <= 0) return;
    const cleanedMat = { ...matForm, parentName: matForm.parentName.trim(), name: matForm.name.trim() };
    if (editingMatId) {
      updateCalcMaterial(editingMatId, cleanedMat);
    } else {
      addCalcMaterial({ ...cleanedMat, id: crypto.randomUUID() });
    }
    resetMatForm();
  };

  const startEditMat = (m: CalcMaterial) => {
    const custom = m.custom.length >= 2 ? m.custom : [...m.custom, ...[{ key: "", value: "" }, { key: "", value: "" }].slice(m.custom.length)];
    setMatForm({ ...m, custom });
    setEditingMatId(m.id);
    setCustomParentMode(false);
  };

  // Calculator state
  const [calcArea, setCalcArea] = useState("");
  const [calcFloors, setCalcFloors] = useState("1");
  const [calcType, setCalcType] = useState(calcBuildingTypes[0] || "");
  const [result, setResult] = useState<{ mat: CalcMaterial; quantity: number; cost: number }[] | null>(null);

  const runCalc = () => {
    const area = parseFloat(calcArea);
    const floors = parseInt(calcFloors) || 1;
    if (!area || area <= 0 || !calcType) return;
    const materials = calcMaterials.filter((m) => m.buildingType === calcType);
    const res = materials.map((m) => {
      const quantity = area * floors * m.unitsPerSqft;
      return { mat: m, quantity, cost: quantity * m.unitPrice };
    });
    setResult(res);
  };

  const totalCost = result?.reduce((sum, r) => sum + r.cost, 0) || 0;

  return (
    <div>
      <h1 className="font-display font-bold text-2xl text-brand-dark">Cost Calculator</h1>

      {/* Tabs */}
      <div className="flex gap-1 mt-4 bg-off-white rounded-lg p-1 w-fit border border-light-gray/40">
        <button onClick={() => setTab("config")} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${tab === "config" ? "bg-white text-brand-dark shadow-sm" : "text-mid-gray hover:text-brand-dark"}`}>
          <Settings2 className="size-4" /> Config
        </button>
        <button onClick={() => setTab("calculate")} className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition ${tab === "calculate" ? "bg-white text-brand-dark shadow-sm" : "text-mid-gray hover:text-brand-dark"}`}>
          <Calculator className="size-4" /> Calculate
        </button>
      </div>

      <div className="mt-6 max-w-3xl space-y-6">
        {/* ═══════════ CONFIG TAB ═══════════ */}
        {tab === "config" && (
          <>
            {/* Building Types */}
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h3 className="font-bold text-brand-dark text-sm mb-3">Building Types</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {calcBuildingTypes.map((t) => (
                  <span key={t} className="flex items-center gap-1.5 px-3 py-1.5 bg-off-white rounded-full text-sm text-brand-dark">
                    {t}
                    <button onClick={() => removeCalcBuildingType(t)} className="text-red-400 hover:text-red-600 transition">
                      <Trash2 className="size-3.5" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input value={newType} onChange={(e) => setNewType(e.target.value)} placeholder="New type name" className="flex-1 h-10 px-3 rounded-md border border-light-gray text-sm" />
                <button onClick={() => { if (newType.trim() && !calcBuildingTypes.includes(newType.trim())) { addCalcBuildingType(newType.trim()); setNewType(""); } }} className="h-10 px-4 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-1.5">
                  <Plus className="size-4" /> Add
                </button>
              </div>
            </div>

            {/* Materials */}
            <div className="bg-white rounded-xl border border-light-gray/40 p-5">
              <h3 className="font-bold text-brand-dark text-sm mb-3">Materials / Substances</h3>

              {/* Material form */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 p-4 bg-off-white rounded-lg">
                <div>
                  <label className="block text-xs text-mid-gray mb-1">Material Name</label>
                  <input value={matForm.name} onChange={(e) => setMatForm({ ...matForm, name: e.target.value })} placeholder="e.g. Cement" className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-mid-gray mb-1">Parent Group</label>
                  <select
                    value={parentSelectValue}
                    onChange={(e) => {
                      const isCustom = e.target.value === CUSTOM_PARENT_VALUE;
                      setCustomParentMode(isCustom);
                      setMatForm({ ...matForm, parentName: isCustom ? "" : e.target.value });
                    }}
                    className="w-full h-10 px-3 rounded-md border border-light-gray text-sm"
                  >
                    <option value="">— Select parent —</option>
                    {parentGroups.map((parent) => <option key={parent} value={parent}>{parent}</option>)}
                    <option value={CUSTOM_PARENT_VALUE}>+ Add new parent</option>
                  </select>
                  {(customParentMode || parentGroups.length === 0) && (
                    <input
                      value={matForm.parentName}
                      onChange={(e) => setMatForm({ ...matForm, parentName: e.target.value })}
                      placeholder="e.g. Steel, Mineral"
                      className="mt-2 w-full h-10 px-3 rounded-md border border-light-gray text-sm"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-xs text-mid-gray mb-1">Building Type</label>
                  <select value={matForm.buildingType} onChange={(e) => setMatForm({ ...matForm, buildingType: e.target.value })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm">
                    <option value="">— Select —</option>
                    {calcBuildingTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-mid-gray mb-1">Price per Unit ($)</label>
                  <input type="number" step="0.01" min="0" value={matForm.unitPrice || ""} onChange={(e) => setMatForm({ ...matForm, unitPrice: parseFloat(e.target.value) || 0 })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-mid-gray mb-1">Units per sq ft / floor</label>
                  <input type="number" step="0.001" min="0" value={matForm.unitsPerSqft || ""} onChange={(e) => setMatForm({ ...matForm, unitsPerSqft: parseFloat(e.target.value) || 0 })} className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-mid-gray mb-1">Size / Bag Size</label>
                  <input value={matForm.size} onChange={(e) => setMatForm({ ...matForm, size: e.target.value })} placeholder="e.g. 50 kg" className="w-full h-10 px-3 rounded-md border border-light-gray text-sm" />
                </div>
                {matForm.custom.map((c, i) => (
                  <div key={i}>
                    <label className="block text-xs text-mid-gray mb-1">Custom {i + 1}</label>
                    <div className="flex gap-1">
                      <input value={c.key} onChange={(e) => { const c2 = [...matForm.custom]; c2[i] = { ...c2[i], key: e.target.value }; setMatForm({ ...matForm, custom: c2 }); }} placeholder="Key" className="w-1/2 h-10 px-3 rounded-md border border-light-gray text-sm" />
                      <input value={c.value} onChange={(e) => { const c2 = [...matForm.custom]; c2[i] = { ...c2[i], value: e.target.value }; setMatForm({ ...matForm, custom: c2 }); }} placeholder="Value" className="w-1/2 h-10 px-3 rounded-md border border-light-gray text-sm" />
                    </div>
                  </div>
                ))}
                <div className="flex items-end gap-2">
                  <button onClick={saveMat} className="h-10 px-4 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-1.5">
                    <Plus className="size-4" /> {editingMatId ? "Update" : "Add"}
                  </button>
                  {editingMatId && (
                    <button onClick={resetMatForm} className="h-10 px-3 rounded-lg border border-light-gray text-sm text-mid-gray">Cancel</button>
                  )}
                </div>
              </div>

              {/* Material list */}
              {calcMaterials.length === 0 ? (
                <p className="text-sm text-mid-gray">No materials added yet.</p>
              ) : (
                <div className="space-y-2">
                  {calcMaterials.map((m) => (
                    <div key={m.id} className="flex items-center justify-between px-4 py-3 bg-off-white rounded-lg text-sm">
                      <div className="flex items-center gap-4">
                        <span className="font-medium text-brand-dark">{m.name}</span>
                        <span className="text-xs text-mid-gray bg-white px-2 py-0.5 rounded">{m.parentName || "—"}</span>
                        <span className="text-mid-gray">{m.buildingType}</span>
                        <span className="text-mid-gray">${m.unitPrice}/{m.size || "unit"}</span>
                        <span className="text-mid-gray">{m.unitsPerSqft}/sqft</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => startEditMat(m)} className="text-mid-gray hover:text-brand-dark transition">
                          <Pencil className="size-4" />
                        </button>
                        <button onClick={() => deleteCalcMaterial(m.id)} className="text-red-400 hover:text-red-600 transition">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ═══════════ CALCULATE TAB ═══════════ */}
        {tab === "calculate" && (
          <div className="bg-white rounded-xl border border-light-gray/40 p-5">
            <h3 className="font-bold text-brand-dark text-sm mb-4">Estimate Your Build Cost</h3>

            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Building Type</label>
                <select value={calcType} onChange={(e) => setCalcType(e.target.value)} className="w-full h-11 px-3 rounded-md border border-light-gray text-sm">
                  {calcBuildingTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Area (sq ft)</label>
                <input type="number" min="0" value={calcArea} onChange={(e) => setCalcArea(e.target.value)} placeholder="e.g. 1500" className="w-full h-11 px-3 rounded-md border border-light-gray text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-dark mb-1">Floors</label>
                <input type="number" min="1" value={calcFloors} onChange={(e) => setCalcFloors(e.target.value)} className="w-full h-11 px-3 rounded-md border border-light-gray text-sm" />
              </div>
            </div>

            <button onClick={runCalc} className="h-11 px-6 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition">
              <Calculator className="size-4" /> Calculate Cost
            </button>

            {result && (
              <div className="mt-6 pt-4 border-t border-light-gray/40">
                <h4 className="font-bold text-brand-dark mb-3">Cost Breakdown — {calcType}</h4>
                <p className="text-xs text-mid-gray mb-3">{calcArea} sq ft × {calcFloors} floor{parseInt(calcFloors) > 1 ? "s" : ""}</p>
                {(() => {
                  const groups = new Map<string, typeof result>();
                  for (const r of result) {
                    const key = r.mat.parentName || "Other";
                    if (!groups.has(key)) groups.set(key, []);
                    groups.get(key)!.push(r);
                  }
                  return Array.from(groups.entries()).map(([groupName, items]) => (
                    <div key={groupName} className="mb-4">
                      <h5 className="text-xs font-semibold text-mid-gray uppercase tracking-wider mb-2">{groupName}</h5>
                      <div className="space-y-1.5">
                        {items.map((r) => (
                          <div key={r.mat.id} className="flex items-center justify-between px-4 py-3 bg-off-white rounded-lg text-sm">
                            <div>
                              <span className="font-medium text-brand-dark">{r.mat.name}</span>
                              <span className="text-mid-gray ml-2">({r.mat.size || "unit"} — {r.quantity.toFixed(1)} units × ${r.mat.unitPrice})</span>
                            </div>
                            <span className="font-semibold text-brand-dark">${r.cost.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
                <div className="flex items-center justify-between px-4 py-3 mt-3 bg-brand-primary/10 rounded-lg">
                  <span className="font-bold text-brand-dark">Total Estimated Cost</span>
                  <span className="font-bold text-lg text-brand-primary">${totalCost.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

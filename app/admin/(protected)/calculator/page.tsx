"use client";

import { useState } from "react";
import { Plus, Trash2, Calculator, Settings2, Pencil, X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { useAdminStore, type CalcMaterial } from "@/stores/admin-store";

const CUSTOM_PARENT_VALUE = "__custom_parent__";

const EMPTY_MAT: CalcMaterial = {
  id: "", name: "", parentName: "", buildingType: "",
  unitPrice: 0, unitsPerSqft: 0, size: "",
  custom: [{ key: "", value: "" }, { key: "", value: "" }],
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-medium text-mid-gray uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full h-9 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:border-brand-primary/50 transition bg-white";
const selectCls =
  "w-full h-9 px-3 rounded-lg border border-light-gray text-sm focus:outline-none focus:border-brand-primary/50 transition bg-white";

export default function AdminCalculatorPage() {
  const {
    calcBuildingTypes, calcMaterials,
    addCalcBuildingType, removeCalcBuildingType,
    addCalcMaterial, updateCalcMaterial, deleteCalcMaterial,
  } = useAdminStore(useShallow((s) => ({ calcBuildingTypes: s.calcBuildingTypes, calcMaterials: s.calcMaterials, addCalcBuildingType: s.addCalcBuildingType, removeCalcBuildingType: s.removeCalcBuildingType, addCalcMaterial: s.addCalcMaterial, updateCalcMaterial: s.updateCalcMaterial, deleteCalcMaterial: s.deleteCalcMaterial })
  ));

  const [tab, setTab] = useState<"config" | "calculate">("config");
  const [newType, setNewType] = useState("");
  const [matForm, setMatForm] = useState<CalcMaterial>(EMPTY_MAT);
  const [editingMatId, setEditingMatId] = useState<string | null>(null);
  const [customParentMode, setCustomParentMode] = useState(false);
  const [showMatForm, setShowMatForm] = useState(false);

  const parentGroups = Array.from(
    new Set(calcMaterials.map((m) => m.parentName.trim()).filter(Boolean))
  ).sort();

  const isCustomParent =
    Boolean(matForm.parentName) && !parentGroups.includes(matForm.parentName);
  const parentSelectValue = customParentMode
    ? CUSTOM_PARENT_VALUE
    : matForm.parentName
    ? isCustomParent
      ? CUSTOM_PARENT_VALUE
      : matForm.parentName
    : "";

  const resetMatForm = () => {
    setMatForm(EMPTY_MAT);
    setEditingMatId(null);
    setCustomParentMode(false);
    setShowMatForm(false);
  };

  const saveMat = () => {
    if (!matForm.name || !matForm.buildingType || matForm.unitPrice <= 0) return;
    const cleaned = { ...matForm, parentName: matForm.parentName.trim(), name: matForm.name.trim() };
    if (editingMatId) {
      updateCalcMaterial(editingMatId, cleaned);
    } else {
      addCalcMaterial({ ...cleaned, id: crypto.randomUUID() });
    }
    resetMatForm();
  };

  const startEditMat = (m: CalcMaterial) => {
    const custom =
      m.custom.length >= 2
        ? m.custom
        : [...m.custom, ...[{ key: "", value: "" }, { key: "", value: "" }].slice(m.custom.length)];
    setMatForm({ ...m, custom });
    setEditingMatId(m.id);
    setCustomParentMode(false);
    setShowMatForm(true);
  };

  // Calculator
  const [calcArea, setCalcArea] = useState("");
  const [calcFloors, setCalcFloors] = useState("1");
  const [calcType, setCalcType] = useState(calcBuildingTypes[0] || "");
  const [result, setResult] = useState<{ mat: CalcMaterial; quantity: number; cost: number }[] | null>(null);

  const runCalc = () => {
    const area = parseFloat(calcArea);
    const floors = parseInt(calcFloors) || 1;
    if (!area || area <= 0 || !calcType) return;
    const res = calcMaterials
      .filter((m) => m.buildingType === calcType)
      .map((m) => {
        const quantity = area * floors * m.unitsPerSqft;
        return { mat: m, quantity, cost: quantity * m.unitPrice };
      });
    setResult(res);
  };

  const totalCost = result?.reduce((sum, r) => sum + r.cost, 0) ?? 0;

  const groupedResult = result
    ? Array.from(
        result.reduce((map, r) => {
          const key = r.mat.parentName || "Other";
          map.set(key, [...(map.get(key) ?? []), r]);
          return map;
        }, new Map<string, typeof result>())
      )
    : [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-dark">Cost Calculator</h1>
          <p className="text-sm text-mid-gray mt-0.5">Configure materials and estimate build costs</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0.5 bg-off-white border border-light-gray/40 rounded-lg p-1 w-fit mb-6">
        {(["config", "calculate"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition ${
              tab === t
                ? "bg-white text-brand-dark shadow-sm"
                : "text-mid-gray hover:text-brand-dark"
            }`}
          >
            {t === "config" ? <Settings2 className="size-3.5" /> : <Calculator className="size-3.5" />}
            {t === "config" ? "Config" : "Calculate"}
          </button>
        ))}
      </div>

      {/* ── CONFIG ── */}
      {tab === "config" && (
        <div className="space-y-4">

          {/* Building types */}
          <div className="bg-white rounded-xl border border-light-gray/40 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-light-gray/40">
              <span className="text-sm font-semibold text-brand-dark">Building types</span>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-2 mb-4">
                {calcBuildingTypes.length === 0 && (
                  <p className="text-sm text-mid-gray">No types yet.</p>
                )}
                {calcBuildingTypes.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 h-8 pl-3 pr-2 bg-off-white border border-light-gray/60 rounded-full text-sm text-brand-dark"
                  >
                    {t}
                    <button
                      onClick={() => removeCalcBuildingType(t)}
                      className="size-5 grid place-items-center rounded-full hover:bg-red-50 text-mid-gray hover:text-red-500 transition"
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2 max-w-sm">
                <input
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newType.trim() && !calcBuildingTypes.includes(newType.trim())) {
                      addCalcBuildingType(newType.trim());
                      setNewType("");
                    }
                  }}
                  placeholder="New type name…"
                  className={inputCls}
                />
                <button
                  onClick={() => {
                    if (newType.trim() && !calcBuildingTypes.includes(newType.trim())) {
                      addCalcBuildingType(newType.trim());
                      setNewType("");
                    }
                  }}
                  className="h-9 px-4 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-1.5 hover:brightness-110 transition shrink-0"
                >
                  <Plus className="size-3.5" /> Add
                </button>
              </div>
            </div>
          </div>

          {/* Materials */}
          <div className="bg-white rounded-xl border border-light-gray/40 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-light-gray/40">
              <span className="text-sm font-semibold text-brand-dark">Materials</span>
              {!showMatForm && (
                <button
                  onClick={() => { setMatForm(EMPTY_MAT); setShowMatForm(true); setEditingMatId(null); }}
                  className="h-8 px-3 rounded-lg bg-brand-primary text-white text-xs font-semibold flex items-center gap-1.5 hover:brightness-110 transition"
                >
                  <Plus className="size-3.5" /> Add material
                </button>
              )}
            </div>

            {/* Inline form */}
            {showMatForm && (
              <div className="p-5 border-b border-light-gray/40 bg-off-white/60">
                <p className="text-xs font-semibold text-mid-gray uppercase tracking-wide mb-4">
                  {editingMatId ? "Edit material" : "New material"}
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                  <Field label="Name">
                    <input
                      value={matForm.name}
                      onChange={(e) => setMatForm({ ...matForm, name: e.target.value })}
                      placeholder="e.g. Cement"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Parent group">
                    <select
                      value={parentSelectValue}
                      onChange={(e) => {
                        const isCustom = e.target.value === CUSTOM_PARENT_VALUE;
                        setCustomParentMode(isCustom);
                        setMatForm({ ...matForm, parentName: isCustom ? "" : e.target.value });
                      }}
                      className={selectCls}
                    >
                      <option value="">— Select —</option>
                      {parentGroups.map((p) => <option key={p} value={p}>{p}</option>)}
                      <option value={CUSTOM_PARENT_VALUE}>+ New parent group</option>
                    </select>
                    {(customParentMode || parentGroups.length === 0) && (
                      <input
                        value={matForm.parentName}
                        onChange={(e) => setMatForm({ ...matForm, parentName: e.target.value })}
                        placeholder="e.g. Steel, Mineral"
                        className={`${inputCls} mt-2`}
                      />
                    )}
                  </Field>
                  <Field label="Building type">
                    <select
                      value={matForm.buildingType}
                      onChange={(e) => setMatForm({ ...matForm, buildingType: e.target.value })}
                      className={selectCls}
                    >
                      <option value="">— Select —</option>
                      {calcBuildingTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </Field>
                  <Field label="Price / unit ($)">
                    <input
                      type="number" step="0.01" min="0"
                      value={matForm.unitPrice || ""}
                      onChange={(e) => setMatForm({ ...matForm, unitPrice: parseFloat(e.target.value) || 0 })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Units / sq ft">
                    <input
                      type="number" step="0.001" min="0"
                      value={matForm.unitsPerSqft || ""}
                      onChange={(e) => setMatForm({ ...matForm, unitsPerSqft: parseFloat(e.target.value) || 0 })}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Size / bag">
                    <input
                      value={matForm.size}
                      onChange={(e) => setMatForm({ ...matForm, size: e.target.value })}
                      placeholder="e.g. 50 kg"
                      className={inputCls}
                    />
                  </Field>
                  {matForm.custom.map((c, i) => (
                    <Field key={i} label={`Custom ${i + 1}`}>
                      <div className="flex gap-1.5">
                        <input
                          value={c.key}
                          onChange={(e) => {
                            const c2 = [...matForm.custom];
                            c2[i] = { ...c2[i], key: e.target.value };
                            setMatForm({ ...matForm, custom: c2 });
                          }}
                          placeholder="Key"
                          className="w-1/2 h-9 px-3 rounded-lg border border-light-gray text-sm focus:outline-none"
                        />
                        <input
                          value={c.value}
                          onChange={(e) => {
                            const c2 = [...matForm.custom];
                            c2[i] = { ...c2[i], value: e.target.value };
                            setMatForm({ ...matForm, custom: c2 });
                          }}
                          placeholder="Value"
                          className="w-1/2 h-9 px-3 rounded-lg border border-light-gray text-sm focus:outline-none"
                        />
                      </div>
                    </Field>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveMat}
                    className="h-9 px-5 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:brightness-110 transition"
                  >
                    {editingMatId ? "Update" : "Add material"}
                  </button>
                  <button
                    onClick={resetMatForm}
                    className="h-9 px-4 rounded-lg border border-light-gray text-sm text-mid-gray hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Table */}
            {calcMaterials.length === 0 ? (
              <p className="text-sm text-mid-gray px-5 py-10 text-center">No materials yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-off-white">
                      {["Material", "Group", "Type", "Price", "Units/sqft", "Size", ""].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-2.5 text-left text-[11px] font-semibold text-mid-gray uppercase tracking-wide border-b border-light-gray/40 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-light-gray/30">
                    {calcMaterials.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50 group">
                        <td className="px-4 py-3 font-medium text-brand-dark">{m.name}</td>
                        <td className="px-4 py-3">
                          {m.parentName ? (
                            <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-off-white border border-light-gray/60 text-mid-gray">
                              {m.parentName}
                            </span>
                          ) : (
                            <span className="text-mid-gray/40">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-mid-gray">{m.buildingType}</td>
                        <td className="px-4 py-3 tabular-nums">${m.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 font-mono text-xs text-mid-gray">{m.unitsPerSqft}</td>
                        <td className="px-4 py-3 text-mid-gray">{m.size || "—"}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition">
                            <button
                              onClick={() => startEditMat(m)}
                              className="p-1.5 rounded-md hover:bg-gray-100 text-mid-gray hover:text-brand-dark transition"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button
                              onClick={() => deleteCalcMaterial(m.id)}
                              className="p-1.5 rounded-md hover:bg-red-50 text-mid-gray hover:text-red-500 transition"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── CALCULATE ── */}
      {tab === "calculate" && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-xl border border-light-gray/40 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-light-gray/40">
              <span className="text-sm font-semibold text-brand-dark">Estimate build cost</span>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-4 mb-5">
                <Field label="Building type">
                  <select
                    value={calcType}
                    onChange={(e) => setCalcType(e.target.value)}
                    className={selectCls}
                  >
                    {calcBuildingTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                <Field label="Area (sq ft)">
                  <input
                    type="number" min="0"
                    value={calcArea}
                    onChange={(e) => setCalcArea(e.target.value)}
                    placeholder="e.g. 1500"
                    className={inputCls}
                  />
                </Field>
                <Field label="Floors">
                  <input
                    type="number" min="1"
                    value={calcFloors}
                    onChange={(e) => setCalcFloors(e.target.value)}
                    className={inputCls}
                  />
                </Field>
              </div>
              <button
                onClick={runCalc}
                className="h-10 px-6 rounded-lg bg-brand-primary text-white text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition"
              >
                <Calculator className="size-4" /> Calculate cost
              </button>

              {result && (
                <div className="mt-6 pt-5 border-t border-light-gray/40">
                  <div className="flex items-baseline justify-between mb-1">
                    <p className="text-sm font-semibold text-brand-dark">
                      {calcType} — {Number(calcArea).toLocaleString()} sq ft × {calcFloors} floor{parseInt(calcFloors) > 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-mid-gray">{result.length} materials</p>
                  </div>

                  <div className="space-y-4 mt-4">
                    {groupedResult.map(([groupName, items]) => (
                      <div key={groupName}>
                        <p className="text-[11px] font-semibold text-mid-gray uppercase tracking-widest mb-2">
                          {groupName}
                        </p>
                        <div className="space-y-1.5">
                          {items.map((r) => (
                            <div
                              key={r.mat.id}
                              className="flex items-center justify-between px-4 py-2.5 bg-off-white rounded-lg"
                            >
                              <div>
                                <p className="text-sm font-medium text-brand-dark">{r.mat.name}</p>
                                <p className="text-xs text-mid-gray mt-0.5">
                                  {r.quantity.toFixed(1)} units × ${r.mat.unitPrice}
                                  {r.mat.size ? ` (${r.mat.size})` : ""}
                                </p>
                              </div>
                              <span className="text-sm font-semibold text-brand-dark tabular-nums">
                                ${r.cost.toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between px-4 py-3.5 mt-4 bg-brand-dark rounded-xl">
                    <span className="text-sm font-semibold text-white">Total estimated cost</span>
                    <span className="text-lg font-bold text-white tabular-nums">
                      ${totalCost.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
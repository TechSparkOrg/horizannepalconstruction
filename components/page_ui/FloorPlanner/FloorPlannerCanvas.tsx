"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import type { ElementType, ReactElement } from "react";
import { Stage, Layer, Rect, Line, Text, Group, Transformer } from "react-konva";
import type Konva from "konva";
import {
  Armchair,
  BedDouble,
  BookOpen,
  Box,
  Download,
  Eraser,
  Grid3X3,
  Minus,
  MousePointer2,
  PanelTop,
  Plus,
  RotateCcw,
  Ruler,
  Sofa,
  Square,
  Table2,
  Trash2,
  Utensils,
  Warehouse,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ToolType =
  | "select"
  | "room"
  | "wall"
  | "stairs"
  | "sofa"
  | "bed"
  | "table"
  | "chair"
  | "cabinet"
  | "wardrobe"
  | "desk"
  | "dining-table"
  | "bookshelf";

interface FloorElement {
  id: string;
  type: "room" | "wall" | "stairs" | "furniture";
  furnitureType?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  label: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
}

interface FurnitureDef {
  tool: ToolType;
  label: string;
  Icon: ElementType;
  color: string;
  w: number;
  h: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FURNITURE: FurnitureDef[] = [
  { tool: "sofa",         label: "Sofa",    Icon: Sofa,       color: "#e05a5a", w: 90, h: 35 },
  { tool: "bed",          label: "Bed",     Icon: BedDouble,  color: "#7c5cbf", w: 60, h: 90 },
  { tool: "table",        label: "Table",   Icon: Table2,     color: "#d4860e", w: 55, h: 55 },
  { tool: "chair",        label: "Chair",   Icon: Armchair,   color: "#0f8a72", w: 22, h: 22 },
  { tool: "cabinet",      label: "Cabinet", Icon: Box,        color: "#c96a18", w: 45, h: 22 },
  { tool: "wardrobe",     label: "Wardrobe",Icon: Warehouse,  color: "#6e3da0", w: 65, h: 28 },
  { tool: "desk",         label: "Desk",    Icon: PanelTop,   color: "#1e9b55", w: 55, h: 32 },
  { tool: "dining-table", label: "Dining",  Icon: Utensils,   color: "#b84a0f", w: 75, h: 42 },
  { tool: "bookshelf",    label: "Shelves", Icon: BookOpen,   color: "#5f7280", w: 32, h: 65 },
];

const ROOM_COLORS = [
  "#3b82f6", "#10b981", "#f43f5e", "#f59e0b",
  "#8b5cf6", "#06b6d4", "#f97316", "#64748b",
];

const TICK = 10;
const GRID = 20;
const MIN_SIZE = 10;

const TOOLS: { tool: ToolType; label: string; Icon: ElementType }[] = [
  { tool: "select", label: "Select",  Icon: MousePointer2 },
  { tool: "room",   label: "Room",    Icon: Square },
  { tool: "wall",   label: "Wall",    Icon: Ruler },
  { tool: "stairs", label: "Stairs",  Icon: PanelTop },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function snap(v: number) {
  return Math.round(v / TICK) * TICK;
}

function clampSize(v: number) {
  return Number.isFinite(v) ? Math.max(MIN_SIZE, Math.round(v)) : MIN_SIZE;
}

function randomRoomColor() {
  return ROOM_COLORS[Math.floor(Math.random() * ROOM_COLORS.length)];
}

function isEditable(t: EventTarget | null) {
  if (!(t instanceof HTMLElement)) return false;
  const tag = t.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || t.isContentEditable;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FloorPlannerCanvas() {
  const [elements,      setElements]      = useState<FloorElement[]>([]);
  const [selectedId,    setSelectedId]    = useState<string | null>(null);
  const [activeTool,    setActiveTool]    = useState<ToolType>("select");
  const [drawing,       setDrawing]       = useState(false);
  const [drawStart,     setDrawStart]     = useState<{ x: number; y: number } | null>(null);
  const [preview,       setPreview]       = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [showGrid,      setShowGrid]      = useState(true);
  const [zoom,          setZoom]          = useState(1);
  const [size,          setSize]          = useState({ w: 800, h: 600 });
  const [showFurniture, setShowFurniture] = useState(false);

  const stageRef    = useRef<Konva.Stage>(null);
  const trRef       = useRef<Konva.Transformer>(null);
  const containerRef= useRef<HTMLDivElement>(null);
  const pendingSel  = useRef<string | null>(null);

  // Canvas resize
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        setSize({ w: Math.max(400, e.contentRect.width), h: Math.max(400, e.contentRect.height) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Attach transformer to newly placed elements
  useEffect(() => {
    if (!pendingSel.current) return;
    const id = pendingSel.current;
    pendingSel.current = null;
    const t = setTimeout(() => {
      const node = stageRef.current?.findOne("#" + id);
      if (node && trRef.current) {
        trRef.current.nodes([node]);
        trRef.current.getLayer()?.batchDraw();
      }
    }, 20);
    return () => clearTimeout(t);
  }, [elements.length]);

  const sel = elements.find((e) => e.id === selectedId);

  const patch = useCallback((id: string, p: Partial<FloorElement>) => {
    setElements((prev) => prev.map((e) => (e.id === id ? { ...e, ...p } : e)));
  }, []);

  // ── Pointer events ──────────────────────────────────────────────────────────

  const onPointerDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (activeTool === "select") {
        if (e.target === e.target.getStage()) {
          setSelectedId(null);
          trRef.current?.nodes([]);
        }
        return;
      }

      const pos = e.target.getStage()?.getPointerPosition();
      if (!pos) return;
      const px = showGrid ? snap(pos.x) : pos.x;
      const py = showGrid ? snap(pos.y) : pos.y;

      if (activeTool === "room" || activeTool === "wall") {
        setDrawing(true);
        setDrawStart({ x: px, y: py });
        return;
      }

      if (activeTool === "stairs") {
        const el: FloorElement = {
          id: "e" + Date.now(), type: "stairs",
          x: px - 20, y: py - 20, width: 40, height: 40,
          rotation: 0, label: "",
          fill: "#f1f5f9", stroke: "#94a3b8", strokeWidth: 1.5,
        };
        setElements((prev) => [...prev, el]);
        pendingSel.current = el.id;
        setSelectedId(el.id);
        return;
      }

      const fi = FURNITURE.find((f) => f.tool === activeTool);
      if (fi) {
        const el: FloorElement = {
          id: "e" + Date.now(), type: "furniture", furnitureType: fi.tool,
          x: px - fi.w / 2, y: py - fi.h / 2,
          width: fi.w, height: fi.h,
          rotation: 0, label: "",
          fill: fi.color, stroke: "#1e293b", strokeWidth: 1,
        };
        setElements((prev) => [...prev, el]);
        pendingSel.current = el.id;
        setSelectedId(el.id);
      }
    },
    [activeTool, showGrid]
  );

  const onPointerMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!drawing || !drawStart) return;
      const pos = e.target.getStage()?.getPointerPosition();
      if (!pos) return;
      const ex = showGrid ? snap(pos.x) : pos.x;
      const ey = showGrid ? snap(pos.y) : pos.y;
      setPreview({
        x: Math.min(drawStart.x, ex),
        y: Math.min(drawStart.y, ey),
        w: Math.abs(ex - drawStart.x) || 1,
        h: Math.abs(ey - drawStart.y) || 1,
      });
    },
    [drawing, drawStart, showGrid]
  );

  const onPointerUp = useCallback(() => {
    if (!drawing || !drawStart || !preview) {
      setDrawing(false); setDrawStart(null); setPreview(null);
      return;
    }
    const { x, y, w, h } = preview;

    if (activeTool === "room" && w > 20 && h > 20) {
      const color = randomRoomColor();
      const el: FloorElement = {
        id: "e" + Date.now(), type: "room",
        x, y, width: w, height: h,
        rotation: 0, label: "",
        fill: color + "18", stroke: color, strokeWidth: 1.5,
      };
      setElements((prev) => [...prev, el]);
      pendingSel.current = el.id;
      setSelectedId(el.id);
    }

    if (activeTool === "wall" && (w > 5 || h > 5)) {
      const el: FloorElement = {
        id: "e" + Date.now(), type: "wall",
        x, y, width: w, height: h,
        rotation: 0, label: "",
        fill: "#cbd5e1", stroke: "#94a3b8", strokeWidth: 1,
      };
      setElements((prev) => [...prev, el]);
      pendingSel.current = el.id;
      setSelectedId(el.id);
    }

    setDrawing(false); setDrawStart(null); setPreview(null);
  }, [drawing, drawStart, preview, activeTool]);

  // ── Transform / drag ────────────────────────────────────────────────────────

  const onTransformEnd = useCallback(
    (e: Konva.KonvaEventObject<Event>) => {
      const node = e.target;
      patch(node.id(), {
        x: node.x(), y: node.y(),
        width:  clampSize(node.width()  * node.scaleX()),
        height: clampSize(node.height() * node.scaleY()),
        rotation: node.rotation(),
      });
      node.scaleX(1); node.scaleY(1);
    },
    [patch]
  );

  const onDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      const node = e.target;
      let x = node.x(), y = node.y();
      if (showGrid) { x = snap(x); y = snap(y); node.x(x); node.y(y); }
      patch(node.id(), { x, y });
    },
    [showGrid, patch]
  );

  // ── Actions ─────────────────────────────────────────────────────────────────

  const del = useCallback(() => {
    if (!selectedId) return;
    setElements((prev) => prev.filter((e) => e.id !== selectedId));
    setSelectedId(null);
    trRef.current?.nodes([]);
  }, [selectedId]);

  const clearAll = useCallback(() => {
    setElements([]); setSelectedId(null);
    setDrawing(false); setDrawStart(null); setPreview(null);
    setShowFurniture(false);
    pendingSel.current = null;
    trRef.current?.nodes([]);
    trRef.current?.getLayer()?.batchDraw();
  }, []);

  const exportPng = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const uri = stage.toDataURL({ pixelRatio: 2, mimeType: "image/png" });
    const a = Object.assign(document.createElement("a"), { download: "floor-plan.png", href: uri });
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }, []);

  // ── Keyboard ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        e.preventDefault(); del();
      }
      if (e.key === "Escape") {
        setSelectedId(null); setActiveTool("select");
        setDrawing(false); setPreview(null);
        trRef.current?.nodes([]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [del, selectedId]);

  // ── Grid dots ────────────────────────────────────────────────────────────────

  const dots = useMemo(() => {
    if (!showGrid) return [];
    const out: ReactElement[] = [];
    for (let x = 0; x < size.w / GRID; x++) {
      for (let y = 0; y < size.h / GRID; y++) {
        out.push(
          <Rect key={`${x}:${y}`} x={x * GRID - 1} y={y * GRID - 1} width={2} height={2} fill="#e2e8f0" cornerRadius={1} />
        );
      }
    }
    return out;
  }, [showGrid, size.w, size.h]);

  // ── Element helpers ──────────────────────────────────────────────────────────

  function selectElement(id: string, node: Konva.Node) {
    pendingSel.current = null;
    setSelectedId(id);
    trRef.current?.nodes([node]);
    trRef.current?.getLayer()?.batchDraw();
  }

  function getLabel(el: FloorElement) {
    if (el.label.trim()) return el.label.trim();
    if (el.type === "furniture" && el.furnitureType)
      return FURNITURE.find((f) => f.tool === el.furnitureType)?.label ?? "Furniture";
    return el.type.charAt(0).toUpperCase() + el.type.slice(1);
  }

  function renderLabel(el: FloorElement, w: number, h: number) {
    const text = getLabel(el);
    const fs = h < 28 ? 9 : 10;
    const lw = Math.max(44, Math.min(w - 8, text.length * fs * 0.6 + 16));
    const lh = fs + 8;
    return (
      <Group x={(w - lw) / 2} y={(h - lh) / 2} listening={false}>
        <Rect width={lw} height={lh} fill="rgba(255,255,255,0.90)" stroke="rgba(15,23,42,0.10)" strokeWidth={0.5} cornerRadius={3} />
        <Text text={text} x={8} y={4} width={lw - 16} height={fs + 2}
          fontSize={fs} fontFamily="Inter, system-ui, sans-serif"
          fill="#1e293b" fontStyle="600" wrap="none" ellipsis />
      </Group>
    );
  }

  // ── Render elements ──────────────────────────────────────────────────────────

  function renderElement(el: FloorElement) {
    const isSel = el.id === selectedId;
    const sw = Math.max(1, el.width);
    const sh = Math.max(1, el.height);
    const selStroke = "#f43f5e";

    const groupProps = {
      key: el.id, id: el.id,
      x: el.x, y: el.y, rotation: el.rotation,
      draggable: activeTool === "select",
      onDragEnd,
      onTransformEnd,
      onClick:  (e: Konva.KonvaEventObject<MouseEvent>) => selectElement(el.id, e.currentTarget),
      onTap:    (e: Konva.KonvaEventObject<TouchEvent>) => selectElement(el.id, e.currentTarget),
    };

    if (el.type === "wall") {
      return (
        <Group {...groupProps}>
          <Rect width={sw} height={sh} fill={el.fill}
            stroke={isSel ? selStroke : el.stroke} strokeWidth={isSel ? 2 : el.strokeWidth} />
          {renderLabel(el, sw, sh)}
        </Group>
      );
    }

    if (el.type === "stairs") {
      return (
        <Group {...groupProps}>
          <Rect width={sw} height={sh} fill={el.fill}
            stroke={isSel ? selStroke : el.stroke} strokeWidth={isSel ? 2 : el.strokeWidth} cornerRadius={2} />
          {[0.2, 0.4, 0.6, 0.8].map((r, i) => (
            <Line key={i} points={[0, sh * r, sw, sh * r]} stroke="#94a3b8" strokeWidth={0.75} />
          ))}
          <Line points={[sw * 0.3, 0, sw * 0.3, sh]} stroke="#94a3b8" strokeWidth={0.75} />
          <Text text="⬉" x={3} y={sh / 2 - 7} fontSize={11} fill="#64748b" />
          {renderLabel(el, sw, sh)}
        </Group>
      );
    }

    if (el.type === "furniture") {
      return (
        <Group {...groupProps}>
          <Rect width={sw} height={sh} fill={el.fill}
            stroke={isSel ? "#fff" : el.stroke}
            strokeWidth={isSel ? 2 : el.strokeWidth}
            cornerRadius={3} />
          {renderLabel(el, sw, sh)}
        </Group>
      );
    }

    // Room
    return (
      <Group {...groupProps}>
        <Rect width={sw} height={sh} fill={el.fill}
          stroke={isSel ? selStroke : el.stroke}
          strokeWidth={isSel ? 2 : el.strokeWidth}
          cornerRadius={2} />
        {renderLabel(el, sw, sh)}
        <Text text={`${Math.round(el.width)} × ${Math.round(el.height)}`}
          x={8} y={sh - 18} fontSize={9}
          fontFamily="Inter, system-ui, sans-serif" fill="#94a3b8" />
      </Group>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">

      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-slate-100 bg-white">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-slate-800 tracking-tight">Floor Planner</span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
            {elements.length} {elements.length === 1 ? "element" : "elements"}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={exportPng}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Download size={13} />
            Export
          </button>
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 active:scale-95 transition-all"
          >
            <Eraser size={13} />
            Clear
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: 500 }}>

        {/* Left toolbar */}
        <div className="flex lg:flex-col items-center p-2 gap-1 bg-slate-50 border-b border-slate-100 lg:border-b-0 lg:border-r lg:w-14 shrink-0 overflow-x-auto">
          {TOOLS.map((t) => (
            <button
              key={t.tool}
              onClick={() => { setActiveTool(t.tool); setShowFurniture(false); }}
              title={t.label}
              aria-label={t.label}
              className={`size-9 flex items-center justify-center rounded-lg transition-all ${
                activeTool === t.tool
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-400 hover:bg-white hover:text-slate-700"
              }`}
            >
              <t.Icon size={16} strokeWidth={2} />
            </button>
          ))}

          <div className="w-5 h-px bg-slate-200 lg:w-px lg:h-5 my-0.5 lg:mx-auto" />

          {/* Furniture toggle */}
          <div className="relative">
            <button
              onClick={() => setShowFurniture(!showFurniture)}
              title="Furniture"
              aria-label="Furniture"
              className={`size-9 flex items-center justify-center rounded-lg transition-all ${
                showFurniture || FURNITURE.some((f) => f.tool === activeTool)
                  ? "bg-blue-50 text-blue-600 ring-1 ring-blue-200"
                  : "text-slate-400 hover:bg-white hover:text-slate-700"
              }`}
            >
              <Sofa size={16} strokeWidth={2} />
            </button>

            {showFurniture && (
              <div className="absolute left-0 top-11 lg:left-12 lg:top-0 z-30 w-44 bg-white border border-slate-200 rounded-xl shadow-lg p-2">
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 px-1">Furniture</p>
                <div className="grid grid-cols-3 gap-1">
                  {FURNITURE.map((f) => (
                    <button
                      key={f.tool}
                      onClick={() => { setActiveTool(f.tool); setShowFurniture(false); }}
                      title={f.label}
                      className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-slate-600 transition-all ${
                        activeTool === f.tool
                          ? "bg-blue-50 text-blue-600 ring-1 ring-blue-200"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <f.Icon size={15} strokeWidth={2} />
                      <span className="text-[9px] font-medium leading-none">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div ref={containerRef} className="flex-1 bg-white relative overflow-hidden" style={{ minHeight: 420 }}>
          <Stage
            ref={stageRef}
            width={size.w}
            height={size.h}
            scaleX={zoom}
            scaleY={zoom}
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp}
            style={{ cursor: activeTool === "select" ? "default" : "crosshair" }}
          >
            <Layer>{dots}</Layer>
            <Layer>
              {elements.map(renderElement)}
              {preview && (
                <Rect
                  x={preview.x} y={preview.y} width={preview.w} height={preview.h}
                  fill="rgba(59,130,246,0.08)" stroke="#3b82f6"
                  strokeWidth={1} dash={[5, 4]} cornerRadius={2}
                />
              )}
            </Layer>
            <Layer>
              <Transformer
                ref={trRef}
                keepRatio={false}
                borderStroke="#f43f5e"
                borderStrokeWidth={1}
                anchorFill="#fff"
                anchorStroke="#f43f5e"
                anchorSize={7}
                anchorCornerRadius={2}
                enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
                boundBoxFunc={(old, nw) =>
                  nw.width < MIN_SIZE || nw.height < MIN_SIZE ? old : nw
                }
              />
            </Layer>
          </Stage>
        </div>

        {/* Right panel */}
        <div className="bg-slate-50 border-t border-slate-100 lg:border-t-0 lg:border-l p-4 shrink-0 flex flex-col gap-3 lg:w-60">
          <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Properties</p>

          {!sel ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-2 text-slate-300 py-10">
              <MousePointer2 size={22} strokeWidth={1.5} />
              <p className="text-xs text-center leading-relaxed">Select an element<br />to edit properties</p>
            </div>
          ) : (
            <>
              {/* Label */}
              <div>
                <label className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Label</label>
                <input
                  type="text"
                  value={sel.label}
                  onChange={(e) => patch(sel.id, { label: e.target.value })}
                  placeholder="Add label..."
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>

              {/* Width + Height */}
              <div className="grid grid-cols-2 gap-2">
                {(["width", "height"] as const).map((dim) => (
                  <div key={dim}>
                    <label className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                      {dim === "width" ? "W" : "H"}
                    </label>
                    <input
                      type="number"
                      min={MIN_SIZE}
                      value={Math.round(sel[dim])}
                      onChange={(e) => patch(sel.id, { [dim]: clampSize(Number(e.target.value)) })}
                      className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                    />
                  </div>
                ))}
              </div>

              {/* Rotation */}
              <div>
                <label className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Rotation °</label>
                <input
                  type="number"
                  value={Math.round(sel.rotation)}
                  onChange={(e) => patch(sel.id, { rotation: Number(e.target.value) })}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
                />
              </div>

              {/* Type badge */}
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Type</span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 capitalize">
                  {sel.furnitureType ?? sel.type}
                </span>
              </div>

              {/* Room color swatches */}
              {sel.type === "room" && (
                <div>
                  <label className="block text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Color</label>
                  <div className="flex flex-wrap gap-1.5">
                    {ROOM_COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => patch(sel.id, { fill: c + "18", stroke: c })}
                        style={{ backgroundColor: c }}
                        className={`size-5 rounded-full border-2 transition-transform active:scale-90 ${
                          sel.stroke === c ? "border-slate-800 scale-110" : "border-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1" />

              <button
                onClick={del}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-red-50 py-2 text-xs font-semibold text-red-500 hover:bg-red-100 active:scale-98 transition-all"
              >
                <Trash2 size={13} />
                Delete element
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-white border-t border-slate-100 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer select-none hover:text-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={showGrid}
              onChange={() => setShowGrid((g) => !g)}
              className="accent-blue-600 rounded"
            />
            <Grid3X3 size={13} />
            Grid
          </label>
          <span className="text-slate-200">|</span>
          <span className="font-mono">{size.w} × {size.h}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.1, 0.2))}
            aria-label="Zoom out"
            className="size-6 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors"
          >
            <Minus size={13} />
          </button>
          <span className="w-11 text-center font-mono font-medium text-slate-600">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.1, 3))}
            aria-label="Zoom in"
            className="size-6 flex items-center justify-center rounded-md hover:bg-slate-100 transition-colors"
          >
            <Plus size={13} />
          </button>
          <button
            onClick={() => setZoom(1)}
            aria-label="Reset zoom"
            className="flex items-center gap-1 h-6 px-2 rounded-md hover:bg-slate-100 text-[10px] font-medium transition-colors"
          >
            <RotateCcw size={11} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
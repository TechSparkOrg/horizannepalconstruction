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

const FURNITURE: FurnitureDef[] = [
  { tool: "sofa", label: "Sofa", Icon: Sofa, color: "#e74c3c", w: 90, h: 35 },
  { tool: "bed", label: "Bed", Icon: BedDouble, color: "#9b59b6", w: 60, h: 90 },
  { tool: "table", label: "Table", Icon: Table2, color: "#f39c12", w: 55, h: 55 },
  { tool: "chair", label: "Chair", Icon: Armchair, color: "#1abc9c", w: 22, h: 22 },
  { tool: "cabinet", label: "Cabinet", Icon: Box, color: "#e67e22", w: 45, h: 22 },
  { tool: "wardrobe", label: "Wardrobe", Icon: Warehouse, color: "#8e44ad", w: 65, h: 28 },
  { tool: "desk", label: "Desk", Icon: PanelTop, color: "#2ecc71", w: 55, h: 32 },
  { tool: "dining-table", label: "Dining", Icon: Utensils, color: "#d35400", w: 75, h: 42 },
  { tool: "bookshelf", label: "Shelves", Icon: BookOpen, color: "#7f8c8d", w: 32, h: 65 },
];

const ELEMENT_COLORS = ["#3498db", "#2ecc71", "#e74c3c", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#34495e"];
const TICK = 10;
const GRID = 20;
const MIN_ELEMENT_SIZE = 10;

function snap(v: number) {
  return Math.round(v / TICK) * TICK;
}

function randomColor() {
  return ELEMENT_COLORS[Math.floor(Math.random() * ELEMENT_COLORS.length)];
}

function cleanSize(value: number) {
  if (!Number.isFinite(value)) return MIN_ELEMENT_SIZE;
  return Math.max(MIN_ELEMENT_SIZE, Math.round(value));
}

const TOOLS: { tool: ToolType; label: string; Icon: ElementType }[] = [
  { tool: "select", label: "Select", Icon: MousePointer2 },
  { tool: "room", label: "Room", Icon: Square },
  { tool: "wall", label: "Wall", Icon: Ruler },
  { tool: "stairs", label: "Stairs", Icon: PanelTop },
];

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || target.isContentEditable;
}

export default function FloorPlannerCanvas() {
  const [elements, setElements] = useState<FloorElement[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolType>("select");
  const [drawing, setDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [preview, setPreview] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [grid, setGrid] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const [showFurniture, setShowFurniture] = useState(false);

  const stageRef = useRef<Konva.Stage>(null);
  const trRef = useRef<Konva.Transformer>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setSize({ w: Math.max(400, entry.contentRect.width), h: Math.max(400, entry.contentRect.height) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Track newly created element IDs to attach transformer after render
  const pendingSelectRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pendingSelectRef.current) return;
    const id = pendingSelectRef.current;
    pendingSelectRef.current = null;
    const timer = setTimeout(() => {
      const node = stageRef.current?.findOne("#" + id);
      if (node && trRef.current) {
        trRef.current.nodes([node]);
        trRef.current.getLayer()?.batchDraw();
      }
    }, 20);
    return () => clearTimeout(timer);
  }, [elements.length]); // runs only when element count changes

  const sel = elements.find((e) => e.id === selectedId);

  const patch = useCallback((id: string, p: Partial<FloorElement>) => {
    setElements((prev) => prev.map((e) => (e.id === id ? { ...e, ...p } : e)));
  }, []);

  // Pointer handlers
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

      if (activeTool === "room" || activeTool === "wall") {
        setDrawing(true);
        setDrawStart({ x: grid ? snap(pos.x) : pos.x, y: grid ? snap(pos.y) : pos.y });
        return;
      }

      // Place stairs or furniture
      const px = grid ? snap(pos.x) : pos.x;
      const py = grid ? snap(pos.y) : pos.y;

      if (activeTool === "stairs") {
        const el: FloorElement = {
          id: "e" + Date.now(),
          type: "stairs",
          x: px - 20,
          y: py - 20,
          width: 40,
          height: 40,
          rotation: 0,
          label: "",
          fill: "#f0f0f0",
          stroke: "#7f8c8d",
          strokeWidth: 2,
        };
        setElements((prev) => [...prev, el]);
        pendingSelectRef.current = el.id;
        setSelectedId(el.id);
        return;
      }

      const fi = FURNITURE.find((f) => f.tool === activeTool);
      if (fi) {
        const el: FloorElement = {
          id: "e" + Date.now(),
          type: "furniture",
          furnitureType: fi.tool,
          x: px - fi.w / 2,
          y: py - fi.h / 2,
          width: fi.w,
          height: fi.h,
          rotation: 0,
          label: "",
          fill: fi.color,
          stroke: "#2c3e50",
          strokeWidth: 1.5,
        };
        setElements((prev) => [...prev, el]);
        pendingSelectRef.current = el.id;
        setSelectedId(el.id);
      }
    },
    [activeTool, grid]
  );

  const onPointerMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!drawing || !drawStart) return;
      const pos = e.target.getStage()?.getPointerPosition();
      if (!pos) return;
      const ex = grid ? snap(pos.x) : pos.x;
      const ey = grid ? snap(pos.y) : pos.y;
      setPreview({
        x: Math.min(drawStart.x, ex),
        y: Math.min(drawStart.y, ey),
        w: Math.abs(ex - drawStart.x) || 1,
        h: Math.abs(ey - drawStart.y) || 1,
      });
    },
    [drawing, drawStart, grid]
  );

  const onPointerUp = useCallback(
    () => {
      if (!drawing || !drawStart || !preview) {
        setDrawing(false);
        setDrawStart(null);
        setPreview(null);
        return;
      }

      const { x, y, w, h } = preview;

      if (activeTool === "room" && w > 20 && h > 20) {
        const el: FloorElement = {
          id: "e" + Date.now(),
          type: "room",
          x,
          y,
          width: w,
          height: h,
          rotation: 0,
          label: "",
          fill: randomColor() + "1a",
          stroke: "#2c3e50",
          strokeWidth: 2,
        };
        setElements((prev) => [...prev, el]);
        pendingSelectRef.current = el.id;
        setSelectedId(el.id);
      }

      if (activeTool === "wall" && (w > 5 || h > 5)) {
        const el: FloorElement = {
          id: "e" + Date.now(),
          type: "wall",
          x,
          y,
          width: w,
          height: h,
          rotation: 0,
          label: "",
          fill: "#95a5a6",
          stroke: "#7f8c8d",
          strokeWidth: 1,
        };
        setElements((prev) => [...prev, el]);
        pendingSelectRef.current = el.id;
        setSelectedId(el.id);
      }

      setDrawing(false);
      setDrawStart(null);
      setPreview(null);
    },
    [drawing, drawStart, preview, activeTool]
  );

  const onTransformEnd = useCallback(
    (e: Konva.KonvaEventObject<Event>) => {
      const node = e.target;
      const id = node.id();
      patch(id, {
        x: node.x(),
        y: node.y(),
        width: cleanSize(node.width() * node.scaleX()),
        height: cleanSize(node.height() * node.scaleY()),
        rotation: node.rotation(),
      });
      node.scaleX(1);
      node.scaleY(1);
    },
    [patch]
  );

  const onDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>) => {
      const node = e.target;
      const id = node.id();
      let x = node.x();
      let y = node.y();
      if (grid) {
        x = snap(x);
        y = snap(y);
        node.x(x);
        node.y(y);
      }
      patch(id, { x, y });
    },
    [grid, patch]
  );

  const del = useCallback(() => {
    if (!selectedId) return;
    setElements((prev) => prev.filter((e) => e.id !== selectedId));
    setSelectedId(null);
  }, [selectedId]);

  const clearAll = useCallback(() => {
    setElements([]);
    setSelectedId(null);
    setDrawing(false);
    setDrawStart(null);
    setPreview(null);
    setShowFurniture(false);
    pendingSelectRef.current = null;
    trRef.current?.nodes([]);
    trRef.current?.getLayer()?.batchDraw();
  }, []);

  const exportPng = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const uri = stage.toDataURL({ pixelRatio: 2, mimeType: "image/png" });
    const a = document.createElement("a");
    a.download = "floor-plan.png";
    a.href = uri;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;

      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId) e.preventDefault();
        del();
      }
      if (e.key === "Escape") {
        setSelectedId(null);
        setActiveTool("select");
        setDrawing(false);
        setPreview(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [del, selectedId]);

  // Grid dots
  const dots = useMemo(() => {
    if (!grid) return [];
    const result: ReactElement[] = [];
    for (let x = 0; x < size.w / GRID; x++) {
      for (let y = 0; y < size.h / GRID; y++) {
        result.push(
          <Rect key={x + ":" + y} x={x * GRID - 1} y={y * GRID - 1} width={2} height={2} fill="#d0d0d0" cornerRadius={1} />
        );
      }
    }
    return result;
  }, [grid, size.w, size.h]);

  function selectElement(id: string, node: Konva.Node) {
    pendingSelectRef.current = null;
    setSelectedId(id);
    trRef.current?.nodes([node]);
    trRef.current?.getLayer()?.batchDraw();
  }

  function getElementLabel(el: FloorElement) {
    if (el.label.trim()) return el.label.trim();
    if (el.type === "furniture" && el.furnitureType) {
      return FURNITURE.find((f) => f.tool === el.furnitureType)?.label ?? "Furniture";
    }
    return el.type.charAt(0).toUpperCase() + el.type.slice(1);
  }

  function renderLabel(el: FloorElement, w: number, h: number) {
    const text = getElementLabel(el);
    const fontSize = h < 28 ? 9 : 11;
    const labelWidth = Math.max(46, Math.min(w - 8, text.length * fontSize * 0.58 + 14));
    const labelHeight = fontSize + 8;
    const x = (w - labelWidth) / 2;
    const y = (h - labelHeight) / 2;

    return (
      <Group x={x} y={y} listening={false}>
        <Rect
          width={labelWidth}
          height={labelHeight}
          fill="rgba(255,255,255,0.92)"
          stroke="rgba(44,62,80,0.18)"
          strokeWidth={1}
          cornerRadius={4}
        />
        <Text
          text={text}
          x={7}
          y={4}
          width={labelWidth - 14}
          height={fontSize + 2}
          fontSize={fontSize}
          fontFamily="Inter, sans-serif"
          fill="#2c3e50"
          fontStyle="bold"
          wrap="none"
          ellipsis
        />
      </Group>
    );
  }

  function renderElement(el: FloorElement) {
    const isSel = el.id === selectedId;
    const sw = Math.max(1, el.width);
    const sh = Math.max(1, el.height);

    if (el.type === "wall") {
      return (
        <Group
          key={el.id} id={el.id} x={el.x} y={el.y} rotation={el.rotation}
          draggable={activeTool === "select"}
          onDragEnd={onDragEnd}
          onTransformEnd={onTransformEnd}
          onClick={(e) => selectElement(el.id, e.currentTarget)}
          onTap={(e) => selectElement(el.id, e.currentTarget)}
        >
          <Rect width={sw} height={sh} fill={el.fill} stroke={isSel ? "#e74c3c" : el.stroke} strokeWidth={el.strokeWidth} />
          {renderLabel(el, sw, sh)}
        </Group>
      );
    }

    if (el.type === "stairs") {
      return (
        <Group
          key={el.id} id={el.id} x={el.x} y={el.y} rotation={el.rotation}
          draggable={activeTool === "select"}
          onDragEnd={onDragEnd}
          onTransformEnd={onTransformEnd}
          onClick={(e) => selectElement(el.id, e.currentTarget)}
          onTap={(e) => selectElement(el.id, e.currentTarget)}
        >
          <Rect width={sw} height={sh} fill={el.fill} stroke={isSel ? "#e74c3c" : el.stroke} strokeWidth={el.strokeWidth} cornerRadius={3} />
          {[0.2, 0.4, 0.6, 0.8].map((r, i) => (
            <Line key={i} points={[0, sh * r, sw, sh * r]} stroke="#b0b0b0" strokeWidth={1} />
          ))}
          <Line points={[sw * 0.3, 0, sw * 0.3, sh]} stroke="#b0b0b0" strokeWidth={1} />
          <Text text="⬉" x={4} y={sh / 2 - 7} fontSize={12} fill="#555" />
          {renderLabel(el, sw, sh)}
        </Group>
      );
    }

    if (el.type === "furniture") {
      return (
        <Group
          key={el.id} id={el.id} x={el.x} y={el.y} rotation={el.rotation}
          draggable={activeTool === "select"}
          onDragEnd={onDragEnd}
          onTransformEnd={onTransformEnd}
          onClick={(e) => selectElement(el.id, e.currentTarget)}
          onTap={(e) => selectElement(el.id, e.currentTarget)}
        >
          <Rect width={sw} height={sh} fill={el.fill} stroke={isSel ? "#fff" : el.stroke} strokeWidth={isSel ? 2.5 : el.strokeWidth} cornerRadius={3} shadowColor="rgba(0,0,0,0.12)" shadowBlur={6} shadowOffset={{ x: 0, y: 2 }} />
          {renderLabel(el, sw, sh)}
        </Group>
      );
    }

    // Room
    return (
      <Group
        key={el.id} id={el.id} x={el.x} y={el.y} rotation={el.rotation}
        draggable={activeTool === "select"}
        onDragEnd={onDragEnd}
        onTransformEnd={onTransformEnd}
        onClick={(e) => selectElement(el.id, e.currentTarget)}
        onTap={(e) => selectElement(el.id, e.currentTarget)}
      >
        <Rect width={sw} height={sh} fill={el.fill} stroke={isSel ? "#e74c3c" : el.stroke} strokeWidth={isSel ? 2.5 : el.strokeWidth} cornerRadius={2} />
        {renderLabel(el, sw, sh)}
        <Text text={Math.round(el.width) + "×" + Math.round(el.height)} x={10} y={sh - 22} fontSize={10} fontFamily="Inter, sans-serif" fill="#7f8c8d" />
      </Group>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-lg border border-light-gray/60 overflow-hidden shadow-sm">

      {/* Top bar */}
      <div className="flex flex-col gap-3 px-4 py-3 bg-white border-b border-light-gray/40 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-display font-bold text-brand-dark">Floor Planner</span>
          <span className="rounded-full bg-off-white px-2 py-0.5 text-xs font-medium text-mid-gray">{elements.length} element{elements.length !== 1 ? "s" : ""}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={exportPng} className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-white bg-brand-primary hover:bg-brand-primary/90 transition-colors">
            <Download size={14} />
            Export PNG
          </button>
          <button onClick={clearAll} className="flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors">
            <Eraser size={14} />
            Clear
          </button>
        </div>
      </div>

      {/* Body: Left toolbar + Canvas + Right panel */}
      <div className="flex flex-col lg:flex-row" style={{ minHeight: 500 }}>

        {/* Left tool palette */}
        <div className="flex lg:flex-col bg-off-white border-b border-light-gray/40 lg:w-16 lg:border-b-0 lg:border-r items-center p-2 gap-1 shrink-0 overflow-x-auto">
          {TOOLS.map((t) => (
            <button
              key={t.tool}
              onClick={() => { setActiveTool(t.tool); setShowFurniture(false); }}
              title={t.label}
              aria-label={t.label}
              className={`size-10 flex items-center justify-center rounded-md transition-all ${
                activeTool === t.tool
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-mid-gray hover:bg-white hover:text-brand-dark"
              }`}
            >
              <t.Icon size={18} strokeWidth={2} />
            </button>
          ))}

          <div className="h-6 w-px bg-light-gray/70 mx-1 lg:mx-0 lg:my-1 lg:h-px lg:w-8" />

          {/* Furniture icon */}
          <div className="relative">
            <button
              onClick={() => setShowFurniture(!showFurniture)}
              title="Furniture"
              aria-label="Furniture"
              className={`size-10 flex items-center justify-center rounded-md transition-all ${
                showFurniture || FURNITURE.some((f) => f.tool === activeTool)
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-mid-gray hover:bg-white hover:text-brand-dark"
              }`}
            >
              <Sofa size={18} strokeWidth={2} />
            </button>

            {showFurniture && (
              <div className="absolute left-0 top-12 lg:left-14 lg:top-0 bg-white border border-light-gray rounded-lg shadow-lg z-30 p-2 w-48">
                <p className="text-[10px] font-semibold text-mid-gray uppercase tracking-wide mb-1.5 px-1">Furniture</p>
                <div className="grid grid-cols-3 gap-1">
                  {FURNITURE.map((f) => (
                    <button
                      key={f.tool}
                      onClick={() => { setActiveTool(f.tool); setShowFurniture(false); }}
                      title={f.label}
                      className={`flex flex-col items-center gap-1 p-2 rounded-md transition-colors ${
                        activeTool === f.tool
                          ? "bg-brand-primary/10 ring-1 ring-brand-primary/30"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <f.Icon size={17} strokeWidth={2} />
                      <span className="text-[9px] text-mid-gray font-medium">{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div ref={containerRef} className="flex-1 bg-white relative overflow-hidden min-h-[420px]">
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
                  x={preview.x}
                  y={preview.y}
                  width={preview.w}
                  height={preview.h}
                  fill="rgba(52,152,219,0.12)"
                  stroke="#3498db"
                  strokeWidth={1.5}
                  dash={[6, 4]}
                  cornerRadius={2}
                />
              )}
            </Layer>
            <Layer>
              <Transformer
                ref={trRef}
                keepRatio={false}
                borderStroke="#e74c3c"
                borderStrokeWidth={1.5}
                anchorFill="#fff"
                anchorStroke="#e74c3c"
                anchorSize={8}
                enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
                boundBoxFunc={(oldBox, newBox) => (newBox.width < MIN_ELEMENT_SIZE || newBox.height < MIN_ELEMENT_SIZE ? oldBox : newBox)}
              />
            </Layer>
          </Stage>
        </div>

        {/* Right properties panel */}
        <div className="bg-off-white border-t border-light-gray/40 p-4 shrink-0 flex flex-col gap-3 lg:w-64 lg:border-l lg:border-t-0">
          <p className="text-[10px] font-semibold text-mid-gray uppercase tracking-wide">Properties</p>

          {!sel ? (
            <div className="flex-1 flex flex-col items-center justify-center text-xs text-mid-gray/40 gap-1">
              <MousePointer2 size={24} />
              <p>Select element</p>
              <p>to edit</p>
            </div>
          ) : (
            <>
              {/* Label */}
              <div>
                <label className="text-[10px] font-medium text-mid-gray/70 block mb-1 uppercase tracking-wide">Label</label>
                <input
                  type="text"
                  value={sel.label}
                  onChange={(e) => patch(sel.id, { label: e.target.value })}
                  placeholder="Add label..."
                  className="w-full px-2.5 py-2 rounded-md border border-light-gray/70 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30"
                />
              </div>

              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-medium text-mid-gray/70 block mb-1 uppercase tracking-wide">Width</label>
                  <input
                    type="number"
                    min={MIN_ELEMENT_SIZE}
                    value={Math.round(sel.width)}
                    onChange={(e) => patch(sel.id, { width: cleanSize(Number(e.target.value)) })}
                    className="w-full px-2.5 py-2 rounded-md border border-light-gray/70 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-mid-gray/70 block mb-1 uppercase tracking-wide">Height</label>
                  <input
                    type="number"
                    min={MIN_ELEMENT_SIZE}
                    value={Math.round(sel.height)}
                    onChange={(e) => patch(sel.id, { height: cleanSize(Number(e.target.value)) })}
                    className="w-full px-2.5 py-2 rounded-md border border-light-gray/70 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                  />
                </div>
              </div>

              {/* Rotation */}
              <div>
                <label className="text-[10px] font-medium text-mid-gray/70 block mb-1 uppercase tracking-wide">Rotation</label>
                <input
                  type="number"
                  value={Math.round(sel.rotation)}
                  onChange={(e) => patch(sel.id, { rotation: Number(e.target.value) })}
                  className="w-full px-2.5 py-2 rounded-md border border-light-gray/70 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>

              {/* Type */}
              <div className="text-xs text-mid-gray/60">
                <span className="font-medium text-mid-gray/80">Type: </span>
                <span className="capitalize">{sel.type}{sel.furnitureType ? " · " + sel.furnitureType : ""}</span>
              </div>

              {/* Color picker for rooms */}
              {sel.type === "room" && (
                <div>
                  <label className="text-[10px] font-medium text-mid-gray/70 block mb-1 uppercase tracking-wide">Color</label>
                  <div className="flex gap-1.5 flex-wrap">
                    {ELEMENT_COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => patch(sel.id, { fill: c + "1a", stroke: c })}
                        className={`size-5 rounded-full border-2 transition-all ${sel.stroke === c ? "border-gray-800 scale-110" : "border-transparent"}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex-1" />

              <button onClick={del} className="flex w-full items-center justify-center gap-1.5 rounded-md bg-red-50 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-100">
                <Trash2 size={14} />
                Delete Element
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col gap-2 px-4 py-2.5 bg-white border-t border-light-gray/40 text-xs text-mid-gray/70 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input type="checkbox" checked={grid} onChange={() => setGrid((g) => !g)} className="accent-brand-primary" />
            <Grid3X3 size={14} />
            Grid
          </label>
          <span className="text-light-gray/50">|</span>
          <span>{size.w}×{size.h}</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.max(z - 0.1, 0.2))} className="size-7 flex items-center justify-center rounded-md hover:bg-gray-100" aria-label="Zoom out"><Minus size={14} /></button>
          <span className="w-12 text-center text-xs font-medium">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(z + 0.1, 3))} className="size-7 flex items-center justify-center rounded-md hover:bg-gray-100" aria-label="Zoom in"><Plus size={14} /></button>
          <button onClick={() => setZoom(1)} className="flex h-7 items-center gap-1 rounded-md px-2 text-[10px] font-medium hover:bg-gray-100" aria-label="Reset zoom"><RotateCcw size={12} />Reset</button>
        </div>
      </div>
    </div>
  );
}

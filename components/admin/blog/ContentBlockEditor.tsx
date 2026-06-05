"use client";

import { Upload, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import type { ContentBlock } from "@/api/types/blog.types";

const RichEditor = dynamic(() => import("@/components/admin/RichEditor"), { ssr: false });

interface Props {
  block: ContentBlock;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onUpdate: (i: number, field: string, value: unknown) => void;
  onRemove: (i: number) => void;
  onMove: (i: number, dir: -1 | 1) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, i: number) => void;
}

const BLOCK_LABELS: Record<string, string> = {
  heading: "Heading",
  subheading: "Subheading",
  paragraph: "Paragraph",
  quote: "Quote",
  image: "Image",
  list: "List",
};

const input = "w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition bg-white";

export default function ContentBlockEditor({
  block, index, isFirst, isLast, onUpdate, onRemove, onMove, onImageUpload,
}: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      {/* Block header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {BLOCK_LABELS[block.type] ?? block.type}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMove(index, -1)}
            disabled={isFirst}
            className="size-7 rounded-md text-gray-400 hover:bg-gray-200 hover:text-gray-600 disabled:opacity-20 transition grid place-items-center"
          >
            <ChevronUp className="size-3.5" />
          </button>
          <button
            onClick={() => onMove(index, 1)}
            disabled={isLast}
            className="size-7 rounded-md text-gray-400 hover:bg-gray-200 hover:text-gray-600 disabled:opacity-20 transition grid place-items-center"
          >
            <ChevronDown className="size-3.5" />
          </button>
          <button
            onClick={() => onRemove(index)}
            className="size-7 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500 transition grid place-items-center ml-1"
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </div>

      {/* Block body */}
      <div className="p-4">
        {(block.type === "heading" || block.type === "subheading") && (
          <input
            value={block.value || ""}
            onChange={(e) => onUpdate(index, "value", e.target.value)}
            placeholder={block.type === "heading" ? "Heading text…" : "Subheading text…"}
            className={`${input} ${block.type === "heading" ? "font-semibold text-base" : "text-sm"}`}
          />
        )}

        {block.type === "paragraph" && (
          <RichEditor
            value={block.value || ""}
            onChange={(html) => onUpdate(index, "value", html)}
            minHeight={160}
            placeholder="Write your paragraph…"
          />
        )}

        {block.type === "quote" && (
          <div className="space-y-2">
            <textarea
              value={block.value || ""}
              onChange={(e) => onUpdate(index, "value", e.target.value)}
              rows={3}
              placeholder="Quote text…"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 resize-none focus:outline-none focus:border-gray-400 transition bg-white"
            />
            <input
              value={block.caption || ""}
              onChange={(e) => onUpdate(index, "caption", e.target.value)}
              placeholder="Attribution (optional)"
              className={input}
            />
          </div>
        )}

        {block.type === "image" && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                value={block.src || ""}
                onChange={(e) => onUpdate(index, "src", e.target.value)}
                placeholder="Paste image URL…"
                className={input}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => onImageUpload(e, index)}
                hidden
                id={`block-img-${index}`}
              />
              <label
                htmlFor={`block-img-${index}`}
                className="h-10 px-3.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 cursor-pointer inline-flex items-center gap-1.5 transition shrink-0"
              >
                <Upload className="size-3.5" />
                Upload
              </label>
            </div>
            <input
              value={block.caption || ""}
              onChange={(e) => onUpdate(index, "caption", e.target.value)}
              placeholder="Caption (optional)"
              className={input}
            />
            {block.src && (
              <div className="rounded-lg overflow-hidden border border-gray-200 aspect-video bg-gray-50">
                <img src={block.src} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        )}

        {block.type === "list" && (
          <div className="space-y-2">
            {(block.items || [""]).map((item, li) => (
              <div key={li} className="flex items-center gap-2">
                <span className="text-gray-300 text-sm select-none shrink-0">•</span>
                <input
                  value={item}
                  onChange={(e) => {
                    const items = [...(block.items || [""])];
                    items[li] = e.target.value;
                    onUpdate(index, "items", items);
                  }}
                  placeholder="List item…"
                  className={input}
                />
                <button
                  onClick={() => {
                    const items = (block.items || []).filter((_, j) => j !== li);
                    onUpdate(index, "items", items.length ? items : [""]);
                  }}
                  className="size-8 shrink-0 rounded-lg text-gray-300 hover:bg-red-50 hover:text-red-400 transition grid place-items-center"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => onUpdate(index, "items", [...(block.items || []), ""])}
              className="text-xs font-medium text-brand-primary hover:underline mt-1"
            >
              + Add item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
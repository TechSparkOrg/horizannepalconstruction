"use client";

import { useRef, useCallback, useEffect, useState, useMemo } from "react";
import {
  Bold, Italic, Underline, Strikethrough, Code,
  List, ListOrdered, Quote, AlignLeft, AlignCenter, AlignRight,
  Link, Link2Off, Undo2, Redo2, RemoveFormatting, ChevronDown,
} from "lucide-react";

type BlockFormat = "p" | "h1" | "h2" | "h3" | "blockquote" | "pre";

const BLOCK_OPTIONS: { label: string; value: BlockFormat }[] = [
  { label: "Paragraph", value: "p" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
  { label: "Quote", value: "blockquote" },
  { label: "Code block", value: "pre" },
];

function ToolbarBtn({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className="size-[30px] grid place-items-center rounded-md border-none bg-transparent text-mid-gray hover:bg-white hover:text-brand-dark transition-colors duration-150"
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="w-px h-[18px] bg-light-gray mx-1 shrink-0" />;
}

function saveSelection(editorEl: HTMLElement) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount) return null;
  const range = sel.getRangeAt(0);
  if (!editorEl.contains(range.commonAncestorContainer)) return null;
  return range.cloneRange();
}

function restoreSelection(editorEl: HTMLElement, savedRange: Range | null) {
  if (!savedRange) {
    editorEl.focus();
    return;
  }
  const sel = window.getSelection();
  if (!sel) {
    editorEl.focus();
    return;
  }
  try {
    sel.removeAllRanges();
    sel.addRange(savedRange);
  } catch {
    editorEl.focus();
  }
}

export default function RichEditor({
  value,
  onChange,
  minHeight = 200,
  placeholder = "Start typing\u2026",
}: {
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
  placeholder?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isFocusedRef = useRef(false);
  const lastEmittedRef = useRef(value);
  const mountedRef = useRef(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const updateCounts = useCallback(() => {
    const text = editorRef.current?.innerText?.trim() ?? "";
    setWordCount(text ? text.split(/\s+/).length : 0);
    setCharCount(text.length);
  }, []);

  const exec = useCallback(
    (cmd: string, val?: string) => {
      if (!editorRef.current) return;
      const saved = saveSelection(editorRef.current);
      try {
        document.execCommand(cmd, false, val ?? undefined);
      } catch {
        /* execCommand is deprecated; browser may throw */
      }
      restoreSelection(editorRef.current, saved);
      const html = editorRef.current.innerHTML;
      lastEmittedRef.current = html;
      onChange(html);
      updateCounts();
    },
    [onChange, updateCounts]
  );

  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    lastEmittedRef.current = html;
    onChange(html);
    updateCounts();
  }, [onChange, updateCounts]);

  const handleFocus = useCallback(() => {
    isFocusedRef.current = true;
  }, []);

  const handleBlur = useCallback(() => {
    isFocusedRef.current = false;
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    if (!editorRef.current) return;

    const text = e.clipboardData.getData("text/plain");
    if (!text) return;

    const cleanHtml = text
      .split(/\n+/)
      .map((line) => (line.trim() ? `<div>${line}</div>` : ""))
      .join("");

    const saved = saveSelection(editorRef.current);
    try {
      document.execCommand("insertHTML", false, cleanHtml || text);
    } catch {
      try {
        document.execCommand("insertText", false, text);
      } catch {}
    }

    restoreSelection(editorRef.current, saved);
    const html = editorRef.current.innerHTML;
    lastEmittedRef.current = html;
    onChange(html);
    updateCounts();
  }, [onChange, updateCounts]);

  const insertLink = useCallback(() => {
    const url = window.prompt("Enter URL:");
    if (url && url.trim()) exec("createLink", url.trim());
  }, [exec]);

  const wrapInlineCode = useCallback(() => {
    if (!editorRef.current) return;
    const sel = window.getSelection();
    if (!sel || !sel.toString()) return;
    const saved = saveSelection(editorRef.current);
    try {
      document.execCommand("insertHTML", false, `<code>${sel.toString()}</code>`);
    } catch {
      /* execCommand is deprecated; browser may throw */
    }
    restoreSelection(editorRef.current, saved);
    const html = editorRef.current.innerHTML;
    lastEmittedRef.current = html;
    onChange(html);
    updateCounts();
  }, [onChange, updateCounts]);

  const setBlockFormat = useCallback(
    (raw: string) => {
      const v = raw as BlockFormat;
      exec("formatBlock", v === "pre" ? "pre" : `<${v}>`);
    },
    [exec]
  );

  // Initialize editor content on first mount only
  useEffect(() => {
    mountedRef.current = true;
    if (editorRef.current) {
      editorRef.current.innerHTML = value;
      lastEmittedRef.current = value;
    }
    updateCounts();
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync parent value when editor is NOT focused
  // This handles external content changes (reset, load saved data, etc.)
  useEffect(() => {
    if (!mountedRef.current) return;
    if (!editorRef.current) return;
    if (isFocusedRef.current) return;
    if (editorRef.current.innerHTML === value) return;

    const saved = saveSelection(editorRef.current);
    editorRef.current.innerHTML = value;
    lastEmittedRef.current = value;
    restoreSelection(editorRef.current, saved);
    updateCounts();
  }, [value, updateCounts]);

  const placeholderStyle = useMemo(
    () =>
      [
        "px-4 py-3 text-sm text-brand-dark focus:outline-none leading-relaxed",
        "empty:before:content-[attr(data-placeholder)] empty:before:text-mid-gray/50",
        "[&_h1]:text-xl [&_h1]:font-medium [&_h1]:mb-1",
        "[&_h2]:text-base [&_h2]:font-medium [&_h2]:mb-1",
        "[&_h3]:text-sm [&_h3]:font-medium [&_h3]:mb-1",
        "[&_blockquote]:border-l-2 [&_blockquote]:border-light-gray [&_blockquote]:pl-3 [&_blockquote]:text-mid-gray [&_blockquote]:italic",
        "[&_ul]:list-disc [&_ul]:pl-5",
        "[&_ol]:list-decimal [&_ol]:pl-5",
        "[&_code]:font-mono [&_code]:text-xs [&_code]:bg-off-white [&_code]:px-1 [&_code]:rounded",
        "[&_a]:text-brand [&_a]:underline",
      ].join(" "),
    []
  );

  return (
    <div className="border border-light-gray rounded-xl overflow-hidden bg-white">
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-off-white border-b border-light-gray flex-wrap">
        <div className="relative mr-1">
          <select
            className="appearance-none text-xs border border-light-gray rounded-md pl-2 pr-6 h-[28px] bg-white text-mid-gray cursor-pointer focus:outline-none focus:border-brand-dark"
            onChange={(e) => setBlockFormat(e.target.value)}
            defaultValue="p"
          >
            {BLOCK_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-1.5 top-1/2 -translate-y-1/2 size-3 text-mid-gray pointer-events-none" />
        </div>

        <Sep />

        <ToolbarBtn onClick={() => exec("bold")} title="Bold (Ctrl+B)">
          <Bold className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("italic")} title="Italic (Ctrl+I)">
          <Italic className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("underline")} title="Underline">
          <Underline className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("strikeThrough")} title="Strikethrough">
          <Strikethrough className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={wrapInlineCode} title="Inline code">
          <Code className="size-3.5" />
        </ToolbarBtn>

        <Sep />

        <ToolbarBtn onClick={() => exec("insertUnorderedList")} title="Bullet list">
          <List className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("insertOrderedList")} title="Numbered list">
          <ListOrdered className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn
          onClick={() => exec("formatBlock", "<blockquote>")}
          title="Block quote"
        >
          <Quote className="size-3.5" />
        </ToolbarBtn>

        <Sep />

        <ToolbarBtn onClick={() => exec("justifyLeft")} title="Align left">
          <AlignLeft className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("justifyCenter")} title="Align center">
          <AlignCenter className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("justifyRight")} title="Align right">
          <AlignRight className="size-3.5" />
        </ToolbarBtn>

        <Sep />

        <ToolbarBtn onClick={insertLink} title="Insert link">
          <Link className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("unlink")} title="Remove link">
          <Link2Off className="size-3.5" />
        </ToolbarBtn>

        <Sep />

        <ToolbarBtn onClick={() => exec("undo")} title="Undo (Ctrl+Z)">
          <Undo2 className="size-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("redo")} title="Redo (Ctrl+Y)">
          <Redo2 className="size-3.5" />
        </ToolbarBtn>

        <Sep />

        <ToolbarBtn onClick={() => exec("removeFormat")} title="Clear formatting">
          <RemoveFormatting className="size-3.5" />
        </ToolbarBtn>
      </div>

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        className={placeholderStyle}
        style={{ minHeight }}
        dir="auto"
      />

      <div className="flex items-center justify-between px-3 py-1.5 bg-off-white border-t border-light-gray">
        <span className="text-[11px] text-mid-gray/60">
          {wordCount} {wordCount === 1 ? "word" : "words"}
        </span>
        <span className="text-[11px] text-mid-gray/60">
          {charCount} {charCount === 1 ? "character" : "characters"}
        </span>
      </div>
    </div>
  );
}

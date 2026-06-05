"use client";

import { useRef, useCallback, useEffect } from "react";
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

export default function RichEditor({
  value,
  onChange,
  minHeight = 200,
  placeholder = "Start typing…",
}: {
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
  placeholder?: string;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = useCallback(
    (cmd: string, val?: string) => {
      document.execCommand(cmd, false, val ?? undefined);
      editorRef.current?.focus();
      onChange(editorRef.current?.innerHTML ?? "");
    },
    [onChange]
  );

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML ?? "");
  };

  const insertLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  const wrapInlineCode = () => {
    const sel = window.getSelection();
    if (sel && sel.toString()) {
      document.execCommand(
        "insertHTML",
        false,
        `<code>${sel.toString()}</code>`
      );
      editorRef.current?.focus();
      onChange(editorRef.current?.innerHTML ?? "");
    }
  };

  const wordCount = () => {
    const text = editorRef.current?.innerText?.trim() ?? "";
    return text ? text.split(/\s+/).length : 0;
  };

  const charCount = () =>
    (editorRef.current?.innerText?.trim() ?? "").length;

  // Sync initial value without cursor reset on re-renders
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, []);

  return (
    <div className="border border-light-gray rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 px-2 py-1.5 bg-off-white border-b border-light-gray flex-wrap">
        {/* Block type select */}
        <div className="relative mr-1">
          <select
            className="appearance-none text-xs border border-light-gray rounded-md pl-2 pr-6 h-[28px] bg-white text-mid-gray cursor-pointer focus:outline-none focus:border-brand-dark"
            onChange={(e) => {
              const v = e.target.value as BlockFormat;
              exec("formatBlock", v === "pre" ? "pre" : `<${v}>`);
            }}
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

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        data-placeholder={placeholder}
        className={[
          "px-4 py-3 text-sm text-brand-dark focus:outline-none leading-relaxed",
          "empty:before:content-[attr(data-placeholder)] empty:before:text-mid-gray/50",
          // prose styles — add to global CSS or tailwind prose plugin if preferred
          "[&_h1]:text-xl [&_h1]:font-medium [&_h1]:mb-1",
          "[&_h2]:text-base [&_h2]:font-medium [&_h2]:mb-1",
          "[&_h3]:text-sm [&_h3]:font-medium [&_h3]:mb-1",
          "[&_blockquote]:border-l-2 [&_blockquote]:border-light-gray [&_blockquote]:pl-3 [&_blockquote]:text-mid-gray [&_blockquote]:italic",
          "[&_ul]:list-disc [&_ul]:pl-5",
          "[&_ol]:list-decimal [&_ol]:pl-5",
          "[&_code]:font-mono [&_code]:text-xs [&_code]:bg-off-white [&_code]:px-1 [&_code]:rounded",
          "[&_a]:text-brand [&_a]:underline",
        ].join(" ")}
        style={{ minHeight }}
        dir="auto"
      />

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-off-white border-t border-light-gray">
        <span className="text-[11px] text-mid-gray/60" id="wc">
          {/* word count rendered via JS; static fallback */}
          0 words
        </span>
        <span className="text-[11px] text-mid-gray/60">0 characters</span>
      </div>
    </div>
  );
}
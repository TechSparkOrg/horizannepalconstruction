"use client";

import { useRef, useCallback } from "react";
import { Bold, Italic, List, Heading, Pilcrow } from "lucide-react";

export default function RichEditor({
  value,
  onChange,
  minHeight = 200,
}: {
  value: string;
  onChange: (html: string) => void;
  minHeight?: number;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  const exec = useCallback((cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    editorRef.current?.focus();
    if (onChange) onChange(editorRef.current?.innerHTML || "");
  }, [onChange]);

  const handleInput = () => {
    onChange(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="border border-light-gray rounded-lg overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-2 bg-off-white border-b border-light-gray">
        <button type="button" onClick={() => exec("bold")} className="size-8 grid place-items-center rounded hover:bg-white text-mid-gray hover:text-brand-dark transition" title="Bold"><Bold className="size-3.5" /></button>
        <button type="button" onClick={() => exec("italic")} className="size-8 grid place-items-center rounded hover:bg-white text-mid-gray hover:text-brand-dark transition" title="Italic"><Italic className="size-3.5" /></button>
        <button type="button" onClick={() => exec("formatBlock", "<h3>")} className="size-8 grid place-items-center rounded hover:bg-white text-mid-gray hover:text-brand-dark transition" title="Heading"><Heading className="size-3.5" /></button>
        <button type="button" onClick={() => exec("formatBlock", "<p>")} className="size-8 grid place-items-center rounded hover:bg-white text-mid-gray hover:text-brand-dark transition" title="Paragraph"><Pilcrow className="size-3.5" /></button>
        <button type="button" onClick={() => exec("insertUnorderedList")} className="size-8 grid place-items-center rounded hover:bg-white text-mid-gray hover:text-brand-dark transition" title="List"><List className="size-3.5" /></button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        dangerouslySetInnerHTML={{ __html: value }}
        className="px-4 py-3 text-sm text-brand-dark focus:outline-none leading-relaxed"
        style={{ minHeight }}
      />
    </div>
  );
}

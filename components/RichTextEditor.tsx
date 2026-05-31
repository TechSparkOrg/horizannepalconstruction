"use client";

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full min-h-[200px] rounded-lg border border-light-gray p-4 text-sm"
    />
  );
}

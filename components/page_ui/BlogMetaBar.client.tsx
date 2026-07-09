"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";

interface Props {
  title: string;
  author?: string;
  authorImage?: string;
  authorRole?: string;
  date?: string;
  category?: { id: string; slug: string; name: string } | null;
}

export default function BlogMetaBar({ title, author, authorImage, authorRole, date, category }: Props) {
  return (
    <section className="bg-white border-b border-[#e8edf5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 sm:pt-14 sm:pb-10">

        {category && (
          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.12em] text-[#cd2028] border border-[#cd2028]/30 px-2.5 h-[22px] rounded">
            {category.name}
          </span>
        )}

        <div className="w-full h-[1px] bg-[#e8edf5] my-2" />

        <h1 className="text-3xl sm:text-6xl lg:text-[2.75rem] font-bold text-[#0f2557] leading-[1.15] tracking-tight mb-7">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-5 text-sm text-[#5a6e8a]">
          {author && (
            <div className="flex items-center gap-3">
              <div className="relative size-9 rounded-full overflow-hidden shrink-0 bg-[#e8edf5] border border-[#e8edf5]">
                {authorImage ? (
                  <Image src={authorImage} alt={author} fill sizes="36px" className="object-cover" />
                ) : (
                  <div className="size-full flex items-center justify-center text-xs font-bold text-[#3d526e]">
                    {author.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="font-semibold text-[#0f2557] text-[13px] leading-tight">{author}</p>
                {authorRole && (
                  <p className="text-[11px] leading-tight text-[#64748b] mt-0.5">{authorRole}</p>
                )}
              </div>
            </div>
          )}

          {author && date && <span className="w-px h-4 bg-[#e8edf5] shrink-0" />}

          {date && (
            <span className="flex items-center gap-1.5 text-[12.5px]">
              <Calendar className="size-3.5 shrink-0 text-[#5a6e8a]" />
              {date}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import type { FC } from "react";

interface Props {
  platform: string;
}

export const ReelThumbnailFallback: FC<Props> = ({ platform }) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#bdc4d3] via-[#a5b8dd] to-[#7890cf] flex flex-col items-center justify-center gap-3">
      <span className="size-14 rounded-full bg-white/10 flex items-center justify-center">
        <Image
          src="/logo.png"
          alt="Horizon Nepal"
          width={32}
          height={32}
          className="object-contain"
        />
      </span>
    </div>
  );
};

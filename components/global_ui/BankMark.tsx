import { getBankInitials } from "@/lib/emi-utils"

export function BankMark({ name }: { name: string }) {
  const initials = getBankInitials(name) || "BK"
  return (
    <div className="flex h-full w-full items-center justify-center rounded-lg bg-slate-800 text-[10px] font-black tracking-widest text-white">
      {initials}
    </div>
  )
}

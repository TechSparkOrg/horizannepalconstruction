"use client";

import { MessageCircle } from "lucide-react";
import { useSettings } from "@/stores/settings-store";

const MESSAGE = "Hello! I'd like to know more about Horizon Nepal's services.";

export function WhatsAppButton() {
  const contactInfo = useSettings((s) => s.settings?.contact_info);
  // const whatappNum= 9851414147
  const waNumber = contactInfo?.whatsappNumber || contactInfo?.phone?.replace(/[^0-9]/g, "") || "";
  const href = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(MESSAGE)}` : "#";

  if (!waNumber) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[90] group flex items-center gap-2 h-11 pl-3 pr-4 rounded-full bg-[#25D366] text-white shadow-md shadow-black/20 hover:shadow-lg hover:shadow-[#25D366]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] transition-all duration-200 overflow-hidden max-w-[44px] hover:max-w-[160px]"
    >
      <MessageCircle className="size-5 flex-shrink-0" />
      <span className="text-sm font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-75">
        Chat with us
      </span>
    </a>
  );
}
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "97714411222";
const MESSAGE = "Hello! I'd like to know more about Horizon Nepal's services.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[90] flex items-center justify-center size-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/30 hover:scale-105 active:scale-95 transition-all duration-200"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}

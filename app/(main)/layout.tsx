import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SettingsLoader } from "@/components/SettingsLoader";

export const metadata: Metadata = {
  title: {
    default: "Horizan Nepal — Building Nepal's Tomorrow",
    template: "%s | Horizan Nepal",
  },
  description: "Architecture, Engineering & Construction services across Nepal.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Horizan Nepal",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SettingsLoader />
      <Header />
      <main id="main-content">{children}</main>
      <WhatsAppButton />
      <Footer />
    </>
  );
}

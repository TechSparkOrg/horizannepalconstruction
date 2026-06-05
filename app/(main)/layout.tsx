import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SettingsLoader } from "@/components/SettingsLoader";

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

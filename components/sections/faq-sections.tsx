import dynamic from "next/dynamic";
import { getFaqGroups } from "@/api/services/faq.service";

const FAQTimeline = dynamic(() => import("@/components/page_ui/FAQTimeline").then((m) => ({ default: m.FAQTimeline })));

export async function FaqGroupsAsync() {
  "use cache";
  const res = await getFaqGroups().catch((err) => { console.error("Failed to fetch FAQ groups:", err); return { results: [] }; });
  return { groups: res.results ?? [] };
}

export async function FaqGroupsSection() {
  const { groups } = await FaqGroupsAsync();
  return <FAQTimeline initialGroups={groups} />;
}

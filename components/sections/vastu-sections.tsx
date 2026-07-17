import { getVastuNav } from "@/api/services/vastu.service";

export async function VastuNavAsync() {
  "use cache";
  const nav = await getVastuNav().catch((err) => { console.error("Failed to fetch vastu nav:", err); return { sections: [], rooms: [], directions: [] }; });
  return nav;
}

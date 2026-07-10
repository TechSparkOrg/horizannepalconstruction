import { getVastuNav } from "@/api/services/vastu.service";

export async function VastuNavAsync() {
  "use cache";
  const nav = await getVastuNav().catch(() => ({ sections: [], rooms: [], directions: [] }));
  return nav;
}

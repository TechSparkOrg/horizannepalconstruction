import { cacheLife } from "next/cache";
import { getVastuNav } from "@/api/services/vastu.service";

export async function VastuNavAsync() {
  "use cache";
  cacheLife("hours");
  const nav = await getVastuNav().catch(() => ({ sections: [], rooms: [], directions: [] }));
  return nav;
}

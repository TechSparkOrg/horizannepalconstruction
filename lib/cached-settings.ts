import { cacheLife } from "next/cache";
import { getSettings } from "@/api/services/settings.service";
import type { SiteSettings } from "@/api/types/settings.types";

export async function getCachedSettings(): Promise<SiteSettings | null> {
  "use cache";
  cacheLife("hours");
  return getSettings().catch(() => null);
}

export type StatusKey = "completed" | "ongoing" | "paused";

export function getProjectStatus(status?: string, completion?: string): { key: StatusKey; label: string } {
  const s = (status || "").toLowerCase();
  if (s === "completed" || (!status && completion)) return { key: "completed", label: "Completed" };
  if (s === "paused") return { key: "paused", label: "Paused" };
  return { key: "ongoing", label: "Ongoing" };
}

export function formatProjectDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

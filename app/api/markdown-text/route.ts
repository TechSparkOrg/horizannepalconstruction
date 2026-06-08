const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || API.replace(/\/api\/?$/, "");

interface Paginated<T> { results: T[] }
interface Bilingual { en: string; np: string }
interface ContentBlock { type: string; value?: string; items?: string[]; caption?: string; src?: string; }

function blocksToMd(blocks: ContentBlock[]): string {
  return blocks.map((b) => {
    switch (b.type) {
      case "heading": return `## ${b.value}`;
      case "subheading": return `### ${b.value}`;
      case "paragraph": return b.value || "";
      case "quote": return `> ${b.value}`;
      case "list": return (b.items || []).map((i) => `- ${i}`).join("\n");
      case "image": return b.src ? `![${b.caption || ""}](${b.src})` : "";
      default: return b.value || "";
    }
  }).join("\n\n");
}

function section(name: string, body: string): string {
  return `\n\n## ${name}\n\n${body}`;
}

async function fetchJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch { return null; }
}

async function fetchAll<T>(path: string): Promise<T[]> {
  const data = await fetchJson<Paginated<T>>(path);
  return data?.results ?? [];
}

async function getBlogs(lang: "en" | "np"): Promise<string> {
  const blogs = await fetchAll<any>("/blog/");
  if (!blogs.length) return "";
  return blogs.map((b) => {
    const title = lang === "np" ? b.title_np || b.title : b.title;
    const content = lang === "np" ? b.content_np || b.content : b.content;
    const excerpt = lang === "np" ? b.excerpt_np || b.excerpt : b.excerpt;
    const blocks = Array.isArray(content) ? content as ContentBlock[] : [];
    return `### [${title}](${SITE_URL}/blog/${b.slug})\n\n${excerpt || ""}\n\n${blocksToMd(blocks)}`;
  }).join("\n\n---\n\n");
}

async function getPages(lang: "en" | "np"): Promise<string> {
  const pages = await fetchAll<any>("/pages/");
  if (!pages.length) return "";
  return pages.map((p) => {
    const title = lang === "np" ? p.title_np || p.title : p.title;
    const content = lang === "np" ? p.content_np || p.content : p.content;
    const sections = (p.sections || []).map((s: any) => {
      const st = lang === "np" ? s.title_np || s.title_en : s.title_en;
      const sc = lang === "np" ? s.content_np || s.content_en : s.content_en;
      return sc ? `### ${st || s.section_key}\n\n${sc}` : "";
    }).filter(Boolean).join("\n\n");
    return `### [${title}](${SITE_URL}/${p.slug})\n\n${content || ""}\n\n${sections}`;
  }).join("\n\n---\n\n");
}

async function getFaqs(lang: "en" | "np"): Promise<string> {
  const faqs = await fetchAll<any>("/faq/");
  if (!faqs.length) return "";
  return faqs.map((f) => {
    const q = lang === "np" ? f.question?.np || f.question?.en : f.question?.en;
    const a = lang === "np" ? f.answer?.np || f.answer?.en : f.answer?.en;
    return `**Q:** ${q}\n\n**A:** ${a}`;
  }).join("\n\n");
}

async function getVastu(lang: "en" | "np"): Promise<string> {
  const d = await fetchJson<any>("/vastu/");
  if (!d) return "";
  const parts: string[] = [];

  if (d.hero?.title) parts.push(`# ${d.hero.title}\n\n${d.hero.subtitle || ""}`);

  const sections = Object.entries(d.sections || {});
  for (const [, s] of sections) {
    const title = lang === "np" ? (s as any).titleNp || (s as any).title : (s as any).title;
    const content = ((s as any).content || []).map((c: any) => lang === "np" ? c.np || c.en : c.en || c.np).join("\n\n");
    if (title) parts.push(`## ${title}\n\n${content}`);
  }

  const rooms = Object.entries(d.rooms || {});
  for (const [id, r] of rooms) {
    const room = r as any;
    const ideal = lang === "np" ? room.idealDirection?.np : room.idealDirection?.en;
    const facing = lang === "np" ? room.facingDirection?.np : room.facingDirection?.en;
    const tips = (room.tips || []).map((t: any) => `- ${lang === "np" ? t.np || t.en : t.en || t.np}`).join("\n");
    const avoid = (room.avoid || []).map((a: any) => `- ${lang === "np" ? a.np || a.en : a.en || a.np}`).join("\n");
    parts.push(`## Room: ${id}\n\n**Ideal Direction:** ${ideal}\n\n**Facing:** ${facing}\n\n### Tips\n\n${tips}\n\n### Avoid\n\n${avoid}`);
  }

  return parts.join("\n\n---\n\n");
}

async function getBuildingPermit(lang: "en" | "np"): Promise<string> {
  const d = await fetchJson<any>("/building-permit/");
  if (!d) return "";
  const parts: string[] = [];

  const steps = (d.workflow_steps || []).map((s: any) => {
    const title = lang === "np" ? s.title?.np || s.title?.en : s.title?.en;
    const desc = lang === "np" ? s.desc?.np || s.desc?.en : s.desc?.en;
    return `### Step ${s.num}: ${title}\n\n${desc}\n\n**Duration:** ${s.duration}\n\n**Required docs:** ${(s.docs || []).join(", ")}`;
  });
  if (steps.length) parts.push(`## Workflow\n\n${steps.join("\n\n")}`);

  const docs = (d.doc_categories || []).map((c: any) => {
    const label = lang === "np" ? c.label?.np || c.label?.en : c.label?.en;
    const items = (c.items || []).map((i: any) => `- ${lang === "np" ? i.np || i.en : i.en || i.np}`).join("\n");
    return `### ${label}\n\n${items}`;
  });
  if (docs.length) parts.push(`## Document Checklist\n\n${docs.join("\n\n")}`);

  const regs = (d.regulations || []).map((r: any) => {
    const title = lang === "np" ? r.title?.np || r.title?.en : r.title?.en;
    const items = (r.items || []).map((i: any) => `- ${lang === "np" ? i.np || i.en : i.en || i.np}`).join("\n");
    return `### ${title}\n\n${items}`;
  });
  if (regs.length) parts.push(`## Regulations\n\n${regs.join("\n\n")}`);

  return parts.join("\n\n---\n\n");
}

async function getReviews(lang: "en" | "np"): Promise<string> {
  const reviews = await fetchAll<any>("/reviews/");
  if (!reviews.length) return "";
  return reviews.map((r) => {
    const quote = lang === "np" ? r.quote?.np || r.quote?.en : r.quote?.en || r.quote?.np;
    return `> "${quote}" — **${r.name}**, ${r.role || ""} (${"★".repeat(r.rating)})`;
  }).join("\n\n");
}

async function getProjects(): Promise<string> {
  const projects = await fetchAll<any>("/projects/");
  if (!projects.length) return "";
  return projects.map((p) => {
    return `### [${p.title}](${SITE_URL}/project-details/${p.slug})\n\n${p.description || ""}`;
  }).join("\n\n---\n\n");
}

async function getTeam(): Promise<string> {
  const members = await fetchAll<any>("/team/");
  if (!members.length) return "";
  return members.map((m) => `- **${m.name}** — ${m.role} (${m.specialisation}, ${m.experience})`).join("\n");
}

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "all";
  const lang = (url.searchParams.get("lang") || "en") as "en" | "np";

  const parts: string[] = [];

  parts.push(`# Horizan Nepal — Content Archive\n\nSource: [${SITE_URL}](${SITE_URL})  \nLanguage: ${lang.toUpperCase()}  \nGenerated: ${new Date().toISOString()}\n\n`);

  if (type === "all" || type === "blog") {
    const blogs = await getBlogs(lang);
    if (blogs) parts.push(section("Blog Posts", blogs));
  }
  if (type === "all" || type === "pages") {
    const pages = await getPages(lang);
    if (pages) parts.push(section("Pages", pages));
  }
  if (type === "all" || type === "faq") {
    const faqs = await getFaqs(lang);
    if (faqs) parts.push(section("Frequently Asked Questions", faqs));
  }
  if (type === "all" || type === "vastu") {
    const vastu = await getVastu(lang);
    if (vastu) parts.push(section("Vastu Shastra Guide", vastu));
  }
  if (type === "all" || type === "building-permit") {
    const bp = await getBuildingPermit(lang);
    if (bp) parts.push(section("Building Permit Assistant", bp));
  }
  if (type === "all" || type === "reviews") {
    const reviews = await getReviews(lang);
    if (reviews) parts.push(section("Client Reviews", reviews));
  }
  if (type === "all" || type === "projects") {
    const projects = await getProjects();
    if (projects) parts.push(section("Projects", projects));
  }
  if (type === "all" || type === "team") {
    const team = await getTeam();
    if (team) parts.push(section("Team", team));
  }

  const body = parts.join("\n\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=120",
    },
  });
}

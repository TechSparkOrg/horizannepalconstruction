import { getServiceCategories } from "@/api/services/category.service";
import { ServicesSection } from "@/components/global_ui/ServicesSection";

export async function ServicesAsync({ svgUrl }: { svgUrl?: string }) {
  const services = await getServiceCategories().catch((err) => { console.error("Failed to fetch services:", err); return []; });
  return <ServicesSection initialServices={services} svgUrl={svgUrl} />;
}

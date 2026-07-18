import { getServiceCategoriesSafe } from "@/api/services/category.service";
import { ServicesSection } from "@/components/global_ui/ServicesSection";

export async function ServicesAsync({ svgUrl }: { svgUrl?: string }) {
  const services = await getServiceCategoriesSafe();
  return <ServicesSection initialServices={services} svgUrl={svgUrl} />;
}

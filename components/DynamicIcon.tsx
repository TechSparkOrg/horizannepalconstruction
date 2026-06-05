import { type LucideProps } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
  fallback?: React.ComponentType<LucideProps>;
}

export function DynamicIcon({ name, fallback: Fallback, ...props }: DynamicIconProps) {
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  if (Icon) return <Icon {...props} />;
  if (Fallback) return <Fallback {...props} />;
  return null;
}

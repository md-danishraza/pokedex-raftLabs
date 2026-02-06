import { capitalize } from "@/lib/utils";

export default function TypeBadge({ type }: { type: string }) {
  // Map API type to CSS variable format
  const colorVar = `var(--type-${type})`;

  return (
    <span
      className="px-4 py-1.5 rounded-full text-white text-sm font-bold tracking-wide shadow-sm"
      style={{ backgroundColor: colorVar, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
    >
      {capitalize(type)}
    </span>
  );
}
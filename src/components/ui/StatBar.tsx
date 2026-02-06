import { capitalize } from "@/lib/utils";

interface StatBarProps {
  label: string;
  value: number;
  max?: number; // Pokemon stats usually max out around 255
}

export default function StatBar({ label, value, max = 255 }: StatBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-32 font-medium text-[var(--text-secondary)]">
        {capitalize(label.replace('-', ' '))}
      </div>
      <div className="w-12 text-right font-bold text-[var(--text-primary)]">
        {value}
      </div>
      <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--brand)] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
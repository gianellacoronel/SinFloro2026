import { LucideIcon } from "lucide-react";
import { MonopolyCard, MonopolyCardContent } from "../custom/monopoly-card";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  valueClass?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  valueClass = "text-foreground",
}: StatCardProps) {
  return (
    <MonopolyCard className="active:shadow-[2px_2px_0px_0px] active:translate-x-0.5 active:translate-y-0.5 transition-all">
      <MonopolyCardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-5 h-5 text-chart-3" />
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
        </div>
        <p className={`text-3xl font-bold ${valueClass}`}>{value}</p>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

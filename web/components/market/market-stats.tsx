import { MonopolyCard, MonopolyCardContent } from "../custom/monopoly-card";

interface MarketStatsProps {
  stats: {
    totalPool: string;
    bettors: string;
    daysRemaining: string;
    volume24h: string;
  };
}

export function MarketStats({ stats }: MarketStatsProps) {
  return (
    <MonopolyCard>
      <MonopolyCardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {stats.totalPool}
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Pool Total (INTI)
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {stats.bettors}
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Apostadores
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {stats.daysRemaining}
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Días Restantes
            </p>
          </div>
        </div>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

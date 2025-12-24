"use client";

import { useAccount } from "wagmi";
import { AdminButtons } from "./admin-buttons";
import { BalanceCard } from "./balance-card";
import { WalletCard } from "./wallet-card";
import { EmptyComponent } from "../custom/empty-component";
import { WalletCards } from "lucide-react";

export function ProfileInformation() {
  const { address, isConnected } = useAccount();

  if (!address && !isConnected)
    return (
      <EmptyComponent
        title="Cuenta no conectada"
        description="Por favor, conéctate para comenzar."
        icon={<WalletCards />}
      />
    );
  return (
    <div>
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-6 bg-foreground" />
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground/80">
            Identificación del usuario
          </h2>
        </div>
        <WalletCard />
      </section>

      {/* Stats Grid - "Scorecard" style */}
      {/*<section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-6 bg-foreground" />
            <h2 className="text-sm font-black uppercase tracking-widest text-foreground/80">
              Hoja de Puntuación
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              label="Total Apuestas"
              value={mockUserStats.totalBets}
            />
            <StatCard
              label="Win Rate"
              value={`${mockUserStats.winRate}%`}
              valueClass="text-chart-5 drop-shadow-sm"
            />
            <StatCard
              label="Total Ganado"
              value={`${mockUserStats.totalWon.toLocaleString()} FT`}
            />
            <StatCard
              label="Ranking"
              value={`#${mockUserStats.rank}`}
            />
          </div>
        </section>*/}

      <BalanceCard />

      <AdminButtons />
    </div>
  );
}

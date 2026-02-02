"use client";

import { useAccount } from "wagmi";
import { AdminButtons } from "./admin-buttons";
import { BalanceCard } from "./balance-card";
import { WalletCard } from "./wallet-card";
import { EmptyComponent } from "../custom/empty-component";
import { WalletCards } from "lucide-react";
import { ProfileBets } from "./profile-bets";

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

      <BalanceCard />

      {/*<ProfileBets />*/}

      {/*<AdminButtons />*/}
    </div>
  );
}

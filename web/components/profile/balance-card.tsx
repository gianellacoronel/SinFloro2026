"use client";

import { LogOut } from "lucide-react";
import { MonopolyButton } from "../custom/monopoly-button";
import { MonopolyCard, MonopolyCardContent } from "../custom/monopoly-card";
import { useAccount, useBalance } from "wagmi";
import { INTITOKEN_ADDRESS } from "@/lib/constants/contracts";
import { Skeleton } from "../ui/skeleton";
import { formatUnits } from "viem";

export function BalanceCard() {
  const { address } = useAccount();
  const { data, isLoading } = useBalance({
    address,
    token: INTITOKEN_ADDRESS,
  });

  return (
    <div className="space-y-6">
      <MonopolyCard
        variant="accent"
        className="border-4 shadow-[6px_6px_0px_0px] shadow-border"
      >
        <MonopolyCardContent className="text-center space-y-2  relative">
          <p className="text-xs font-black uppercase tracking-widest text-accent-foreground/60">
            Fondos Disponibles
          </p>
          {isLoading || !data ? (
            <Skeleton className="h-4 w-8" />
          ) : (
            <p className="text-5xl font-black text-accent-foreground tracking-tighter drop-shadow-sm">
              {formatUnits(data.value, data.decimals)}
              <span className="text-2xl"> {data.symbol}</span>
            </p>
          )}

          {/*<div className="pt-2">
            <span className="inline-block px-4 py-1.5 bg-black/5 text-xs font-black uppercase tracking-wide rounded-md text-accent-foreground/80">
              En Juego: {1000} INTI
            </span>
          </div>*/}
        </MonopolyCardContent>
      </MonopolyCard>

      <div className="space-y-3">
        <MonopolyButton
          variant="destructive"
          className="w-full h-14 text-lg font-black uppercase"
          monopolySize="lg"
        >
          <LogOut className="w-6 h-6 mr-3" />
          Retirarse del Juego
        </MonopolyButton>
      </div>
    </div>
  );
}

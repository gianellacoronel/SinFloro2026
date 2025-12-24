"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useAccount } from "wagmi";
import { BetTicket } from "./bet-ticket";
import { EmptyComponent } from "../custom/empty-component";
import { TicketMinus, WalletCards } from "lucide-react";
import { MonopolyCard, MonopolyCardContent } from "../custom/monopoly-card";

export function ListBets() {
  const { address, isConnected } = useAccount();
  const bets = useQuery(api.bets.getBets, { walletAddress: address ?? "0x" });

  if (!address && !isConnected)
    return (
      <EmptyComponent
        title="Cuenta no conectada"
        description="Por favor, conéctate para comenzar."
        icon={<WalletCards />}
      />
    );

  if (!bets || bets.length === 0) {
    return (
      <EmptyComponent
        title="No se encontraron apuestas"
        description="Por favor, crea una apuesta para comenzar."
        icon={<TicketMinus />}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bets.map((bet) => (
          <BetTicket key={bet._id} bet={bet} />
        ))}
      </div>
      <MonopolyCard>
        <MonopolyCardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">4</p>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Total Apuestas
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-chart-5">2,000 INTI</p>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Apostado
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-chart-5">3,200 INTI</p>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Ganado
              </p>
            </div>
          </div>
        </MonopolyCardContent>
      </MonopolyCard>
    </>
  );
}

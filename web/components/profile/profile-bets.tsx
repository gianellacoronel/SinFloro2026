"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAccount } from "wagmi";
import { calculatePotentialPayout, cn } from "@/lib/utils";
import { Ticket, Clock, Trophy, XCircle, LucideIcon } from "lucide-react";
import { MonopolyBadge } from "../custom/monopoly-badge";
import { EmptyComponent } from "../custom/empty-component";
import { BetStatus } from "../bets/bet-ticket";

const statusConfig: Record<
  BetStatus,
  { label: string; icon: LucideIcon; bgClass: string }
> = {
  open: {
    label: "Abierta",
    icon: Clock,
    bgClass: "bg-chart-4 text-chart-4-foreground",
  },
  won: {
    label: "Ganada",
    icon: Trophy,
    bgClass: "bg-successful text-background",
  },
  lost: {
    label: "Perdida",
    icon: XCircle,
    bgClass: "bg-destructive text-destructive-foreground",
  },
};

export function ProfileBets() {
  const { address } = useAccount();
  const bets = useQuery(api.bets.getBetsByWalletAddress, {
    walletAddress: address || "",
  });
  const candidates = useQuery(api.candidates.getCandidates);

  if (!bets || !candidates) {
    return <div className="text-center py-4">Cargando apuestas...</div>;
  }

  if (bets.length === 0) {
    return (
      <EmptyComponent
        title="No tienes apuestas activas"
        description="¡Explora los candidatos y haz tu primera predicción!"
        icon={<Ticket />}
      />
    );
  }

  const globalTotalPool = candidates
    .reduce((acc, curr) => acc + parseFloat(curr.totalPool || "0"), 0)
    .toString();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-1 w-6 bg-foreground" />
        <h2 className="text-sm font-black uppercase tracking-widest text-foreground/80">
          Mis Apuestas
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bets.map((bet) => {
          const status = statusConfig[bet.status as BetStatus] || statusConfig.open;
          const StatusIcon = status.icon;

          const candidateData = candidates.find(
            (c) => c.contractId === bet.contractCandidateId
          );

          const { payout } = calculatePotentialPayout(
            bet.amount.toString(),
            candidateData?.totalPool || bet.amount.toString(),
            globalTotalPool
          );

          return (
            <div
              key={bet._id}
              className="bg-card border-2 border-border shadow-[4px_4px_0px_0px] shadow-border overflow-hidden hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px] transition-all"
            >
              {/* Header */}
              <div className="bg-muted/50 border-b-2 border-dashed border-border px-4 py-2 flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                  <Ticket className="w-3 h-3" />
                  {new Date(bet._creationTime).toLocaleDateString("es-PE")}
                </span>
                <MonopolyBadge
                  className={cn("h-5 px-2 text-[10px]", status.bgClass)}
                >
                  <StatusIcon className="w-3 h-3 mr-1" />
                  {status.label}
                </MonopolyBadge>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold uppercase text-card-foreground leading-tight">
                      {bet.candidate}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {bet.party}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted p-2 border border-border rounded-sm">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">
                      Tu apuesta
                    </p>
                    <p className="font-mono font-bold text-base">
                      {bet.amount} <span className="text-[10px]">INTI</span>
                    </p>
                  </div>
                  <div className="bg-accent/20 p-2 border border-border rounded-sm">
                    <p className="text-[10px] uppercase text-foreground/70 font-bold">
                      Premio estimado
                    </p>
                    <p className="font-mono font-bold text-base text-primary">
                      {payout} <span className="text-[10px]">INTI</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

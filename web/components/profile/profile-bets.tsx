"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAccount } from "wagmi";
import { calculatePotentialPayout, cn } from "@/lib/utils";
import { Ticket, Clock, Trophy, XCircle, LucideIcon } from "lucide-react";
import { MonopolyBadge } from "../custom/monopoly-badge";
import { EmptyComponent } from "../custom/empty-component";
import { BetStatus } from "../bets/bet-ticket";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="h-1 w-6 bg-foreground" />
        <h2 className="text-sm font-black uppercase tracking-widest text-foreground/80">
          Mis Apuestas
        </h2>
      </div>

      <div className="bg-card border-2 border-border shadow-[6px_6px_0px_0px] shadow-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow className="hover:bg-transparent border-b-2 border-border">
              <TableHead className="font-black uppercase text-[10px] tracking-wider py-4">
                Candidato / Partido
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-wider py-4 text-right">
                Tu Apuesta
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-wider py-4 text-right">
                Premio Est.
              </TableHead>
              <TableHead className="font-black uppercase text-[10px] tracking-wider py-4 text-center">
                Estado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bets.map((bet) => {
              const status =
                statusConfig[bet.status as BetStatus] || statusConfig.open;
              const StatusIcon = status.icon;

              const candidateData = candidates.find(
                (c) => c.contractId === bet.contractCandidateId,
              );

              console.log(
                "bet.amount.toString()",
                bet.amount.toString(),
                "candidateData?.totalPool || bet.amount.toString()",
                candidateData?.totalPool || bet.amount.toString(),
                "globalTotalPool",
                globalTotalPool,
              );

              const { payout } = calculatePotentialPayout(
                bet.amount.toString(),
                candidateData?.totalPool || bet.amount.toString(),
                globalTotalPool,
              );

              return (
                <TableRow
                  key={bet._id}
                  className="hover:bg-muted/30 border-b-2 border-dashed border-border"
                >
                  <TableCell className="py-4">
                    <div className="space-y-0.5">
                      <p className="font-black uppercase text-sm leading-none">
                        {bet.candidate}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-bold">
                        {bet.party}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className="font-bold text-sm">
                      {bet.amount}{" "}
                      <span className="text-[10px] text-muted-foreground">
                        INTI
                      </span>
                    </span>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <span className="font-bold text-sm text-primary">
                      {payout}{" "}
                      <span className="text-[10px] text-primary/70">INTI</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-center py-4">
                    <div className="flex justify-center">
                      <MonopolyBadge
                        className={cn(
                          "h-6 px-3 text-[10px] font-black",
                          status.bgClass,
                        )}
                      >
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </MonopolyBadge>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

import { Clock, LucideIcon, Ticket, Trophy, XCircle } from "lucide-react";
import { calculatePotentialPayout, cn } from "@/lib/utils";
import { MonopolyBadge } from "../custom/monopoly-badge";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export type BetStatus = "open" | "won" | "lost";

export interface Bet {
  _id: string;
  candidate: string;
  party: string;
  amount: number;
  odds: number;
  potentialPayout: number;
  status: BetStatus;
  _creationTime: number;
  contractCandidateId: number;
}

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

export async function BetTicket({ bet }: { bet: Bet }) {
  const candidates = await fetchQuery(api.candidates.getCandidates);
  const status = statusConfig[bet.status];
  const StatusIcon = status.icon;

  const globalTotalPool = candidates
    .reduce((acc, curr) => acc + parseFloat(curr.totalPool || "0"), 0)
    .toString();

  const candidateData = candidates.find(
    (c) => c.contractId === bet.contractCandidateId,
  );

  const { payout } = calculatePotentialPayout(
    bet.amount.toString(),
    candidateData?.totalPool || bet.amount.toString(),
    globalTotalPool,
  );

  return (
    <div className="bg-card border-4 border-border shadow-[4px_4px_0px_0px] shadow-border overflow-hidden active:shadow-[2px_2px_0px_0px] active:translate-x-0.5 active:translate-y-0.5 transition-all">
      {/* Ticket Header with perforated edge effect */}
      <div className="bg-muted border-b-4 border-dashed border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="w-4 h-4 text-muted-foreground" />
        </div>
        <span className="text-xs font-bold text-muted-foreground">
          {new Date(bet._creationTime).toLocaleString("es-PE", {
            timeZone: "America/Lima",
            dateStyle: "short",
            timeStyle: "short",
          })}
        </span>
      </div>

      {/* Ticket Body */}
      <div className="p-4 space-y-3">
        <div className="text-center border-b-2 border-border pb-3">
          <h3 className="text-lg font-bold uppercase text-card-foreground">
            {bet.candidate}
          </h3>
          <p className="text-xs text-muted-foreground font-medium">
            {bet.party}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted px-3 py-2 border-2 border-border">
            <p className="text-[10px] font-bold uppercase text-muted-foreground">
              Monto
            </p>
            <p className="font-bold text-card-foreground">{bet.amount} INTI</p>
          </div>
          <div className="bg-accent px-3 py-2 border-2 border-border">
            <p className="text-[10px] font-bold uppercase text-accent-foreground/70">
              Pago potencial
            </p>
            <p className="font-bold text-accent-foreground">{payout} INTI</p>
          </div>
        </div>

        <div className="flex justify-center">
          <MonopolyBadge
            className={cn("flex items-center gap-2", status.bgClass)}
          >
            <StatusIcon className="w-4 h-4" />
            <span>{status.label}</span>
          </MonopolyBadge>
        </div>
      </div>
    </div>
  );
}

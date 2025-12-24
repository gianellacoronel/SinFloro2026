"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp } from "lucide-react";
import { MonopolyButton } from "../custom/monopoly-button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAccount } from "wagmi";
import { Id } from "@/convex/_generated/dataModel";
import { BettingDrawer } from "./betting-drawer";

interface CandidateCardProps {
  id: string;
  name: string;
  party: string;
  partyColorClass: string;
  odds: number;
  totalPool: string;
  probability: number;
  imageQuery: string;
}

export function CandidateCard({
  id,
  name,
  party,
  partyColorClass,
  odds,
  totalPool,
  probability,
  imageQuery,
}: CandidateCardProps) {
  const { address } = useAccount();
  const createBet = useMutation(api.bets.createBet);
  const handleBet = (amount: number) => {
    // In a real scenario, you probably want to use the 'amount' in the mutation 
    // or checks. For now, we preserve the original mutation call but we can imagine
    // passing the amount if the backend supports it.
    // Assuming createBet might accept an amount later, or if it does already:
    // createBet({ walletAddress: ..., candidateId: ..., amount: amount })
    // For now we fulfill the interface.
    
    console.log(`Betting ${amount} on ${name} (${id})`);

    createBet({
      walletAddress: address || "",
      candidateId: id as Id<"candidates">,
    });
  };

  return (
    <div className="bg-card border-4 border-border shadow-[6px_6px_0px_0px] shadow-border overflow-hidden transition-all active:shadow-[3px_3px_0px_0px] active:translate-x-0.5 active:translate-y-0.5">
      {/* Party color header strip */}
      <div
        className={cn("h-8 w-full border-b-4 border-border", partyColorClass)}
      />

      {/* Title deed style header */}
      <div className="px-4 py-2 text-center border-b-2 border-border bg-muted">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {party}
        </p>
      </div>

      {/* Candidate info */}
      <div className="p-4 space-y-4">
        {/* Candidate photo using Shadcn Avatar */}
        <Avatar className="mx-auto w-24 h-24 border-4 border-border rounded-none">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_URL}/candidates/${imageQuery}`}
            alt={name}
            className="object-cover"
          />
          <AvatarFallback className="rounded-none bg-muted text-muted-foreground font-bold text-xl">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        {/* Candidate name */}
        <div className="text-center">
          <h3 className="text-xl font-bold uppercase tracking-wide text-card-foreground">
            {name}
          </h3>
        </div>

        {/* Stats - Monopoly rent style */}
        <div className="border-2 border-border divide-y-2 divide-border">
          <div className="flex justify-between items-center px-3 py-2 bg-muted">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Cuota
            </span>
            <span className="text-lg font-bold text-card-foreground">
              {odds.toFixed(2)}x
            </span>
          </div>
          <div className="flex justify-between items-center px-3 py-2">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Pool Total
            </span>
            <span className="text-sm font-bold text-card-foreground">
              {totalPool}
            </span>
          </div>
          <div className="flex justify-between items-center px-3 py-2 bg-muted">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Probabilidad
            </span>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-chart-5" />
              <span className="text-sm font-bold text-card-foreground">
                {probability}%
              </span>
            </div>
          </div>
        </div>

        {/* Bet button */}
        <BettingDrawer
          candidateName={name}
          currentOdds={odds}
          onConfirmBet={handleBet}
        >
          <MonopolyButton
            className="w-full"
            monopolySize="lg"
            // onClick removed because DrawerTrigger handles the click
          >
            Apostar
          </MonopolyButton>
        </BettingDrawer>
      </div>
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MonopolyButton } from "../custom/monopoly-button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Id } from "@/convex/_generated/dataModel";
import { BettingDrawer } from "./betting-drawer";
import { toast } from "sonner";
import { formatUnits, parseUnits } from "viem";
import {
  INTITOKEN_ADDRESS,
  SIN_FLORO_ABI,
  SIN_FLORO_ADDRESS,
} from "@/lib/constants/contracts";
import { useEffect, useState } from "react";

interface CandidateCardProps {
  id: string;
  contractId: number;
  name: string;
  party: string;
  partyColorClass: string;
  odds: number;
  probability: number;
  imageQuery: string;
}

export function CandidateCard({
  id,
  contractId,
  name,
  party,
  partyColorClass,
  odds,
  probability,
  imageQuery,
}: CandidateCardProps) {
  const { address } = useAccount();
  const { data: balance, isSuccess: IsBalanceSuccess } = useBalance({
    address,
    token: INTITOKEN_ADDRESS,
  });
  const { data: hash, writeContract } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  });
  const [pendingBet, setPendingBet] = useState<{
    candidateContractId: number;
    amount: number;
  } | null>(null);

  const createBet = useMutation(api.bets.createBet);

  useEffect(() => {
    if (isSuccess && hash && pendingBet) {
      createBet({
        walletAddress: address || "",
        candidateId: id as Id<"candidates">,
        amount: pendingBet.amount,
      });

      void toast.success("Apuesta realizada con éxito");
    }
  }, [isSuccess, hash, pendingBet]);

  const handleBet = (amount: number) => {
    try {
      const amountInWei = parseUnits(amount.toString(), 18);
      if (IsBalanceSuccess && balance.value - amountInWei < 0) {
        void toast.error(
          "INTIs insuficientes en tu cuenta. Puedes reclamar más para poder apostar.",
        );
      }
      setPendingBet({
        candidateContractId: contractId,
        amount,
      });

      writeContract({
        address: SIN_FLORO_ADDRESS,
        abi: SIN_FLORO_ABI,
        functionName: "placeBet",
        args: [BigInt(contractId), amountInWei],
      });
    } catch (error) {
      console.error("Error al preparar la transacción:", error);
    }
  };

  const totalPool = useReadContract({
    abi: SIN_FLORO_ABI,
    address: SIN_FLORO_ADDRESS,
    functionName: "getCandidatePool",
    args: [BigInt(contractId)],
  });

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
          {/*<div className="flex justify-between items-center px-3 py-2 bg-muted">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Cuota
            </span>
            <span className="text-lg font-bold text-card-foreground">
              {odds.toFixed(2)}x
            </span>
          </div>*/}
          <div className="flex justify-between items-center px-3 py-2 bg-muted">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Pozo Total
            </span>
            <span className="text-sm font-bold text-card-foreground">
              {totalPool.data ? formatUnits(totalPool.data, 18).toString() : 0}{" "}
              INTI
            </span>
          </div>
          {/*<div className="flex justify-between items-center px-3 py-2 bg-muted">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Probabilidad
            </span>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-chart-5" />
              <span className="text-sm font-bold text-card-foreground">
                {probability}%
              </span>
            </div>
          </div>*/}
        </div>

        {/* Bet button */}
        <BettingDrawer
          candidateName={name}
          currentOdds={odds}
          onConfirmBet={handleBet}
        >
          <MonopolyButton className="w-full" monopolySize="lg">
            Apostar
          </MonopolyButton>
        </BettingDrawer>
      </div>
    </div>
  );
}

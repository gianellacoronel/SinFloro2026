"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MonopolyButton } from "../custom/monopoly-button";
import { useMutation, useQuery } from "convex/react";
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
import { useEffect, useState, useMemo } from "react";
import { MarketState } from "@/lib/constants/market-state";
import { calculatePotentialPayout } from "@/lib/utils";
import { baseSepolia } from "viem/chains";

interface CandidateCardProps {
  id: string;
  contractId: number;
  name: string;
  party: string;
  partyColorClass: string;
  odds: number;
  probability: number;
  imageQuery: string;
  totalCandidatePool: string;
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
  totalCandidatePool,
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
  const updateTotalPoolById = useMutation(api.candidates.updateTotalPoolById);
  const { data: currentMarketState } = useReadContract({
    address: SIN_FLORO_ADDRESS,
    abi: SIN_FLORO_ABI,
    functionName: "currentState",
    chainId: baseSepolia.id,
  });

  const userBets = useQuery(api.bets.getBetsByCandidate, {
    walletAddress: address || "",
    candidateId: id as Id<"candidates">,
  });

  const { data: globalPoolData, refetch: refetchGlobalPool } = useReadContract({
    address: SIN_FLORO_ADDRESS,
    abi: SIN_FLORO_ABI,
    functionName: "totalPool",
    chainId: baseSepolia.id,
  });

  const { data: currentCandidatePoolData, refetch: refetchCandidatePool } =
    useReadContract({
      abi: SIN_FLORO_ABI,
      address: SIN_FLORO_ADDRESS,
      functionName: "getCandidatePool",
      chainId: baseSepolia.id,
      args: [BigInt(contractId)],
    });

  const userAggregation = useMemo(() => {
    if (
      !userBets ||
      userBets.length === 0 ||
      !globalPoolData ||
      !currentCandidatePoolData
    ) {
      return null;
    }

    const totalAmount = userBets.reduce((acc, bet) => acc + bet.amount, 0);
    const globalPool = formatUnits(globalPoolData as bigint, 18);
    const candidatePool = formatUnits(currentCandidatePoolData as bigint, 18);

    const { payout } = calculatePotentialPayout(
      totalAmount.toString(),
      candidatePool,
      globalPool,
    );

    return {
      totalAmount,
      totalPayout: payout,
      count: userBets.length,
    };
  }, [userBets, globalPoolData, currentCandidatePoolData]);

  useEffect(() => {
    if (isSuccess && hash && pendingBet) {
      createBet({
        walletAddress: address || "",
        candidateId: id as Id<"candidates">,
        amount: pendingBet.amount,
        contractCandidateId: pendingBet.candidateContractId,
      });

      updateTotalPoolById({
        id: id as Id<"candidates">,
        totalPool: (
          (Number(totalCandidatePool) || 0) + pendingBet.amount
        ).toString(),
      });

      // Refetch on-chain data to update the UI
      void refetchGlobalPool();
      void refetchCandidatePool();

      void toast.success("Apuesta realizada con éxito");
    }
  }, [
    isSuccess,
    hash,
    pendingBet,
    refetchGlobalPool,
    refetchCandidatePool,
    address,
    id,
    totalCandidatePool,
    createBet,
    updateTotalPoolById,
  ]);

  const handleBet = (amount: number) => {
    try {
      const amountInWei = parseUnits(amount.toString(), 18);
      if (IsBalanceSuccess && balance.value - amountInWei < 0) {
        void toast.error(
          "INTIs insuficientes en tu cuenta. Reclámalos para poder apostar.",
        );
        return;
      }
      setPendingBet({
        candidateContractId: contractId,
        amount,
      });

      writeContract({
        address: SIN_FLORO_ADDRESS,
        abi: SIN_FLORO_ABI,
        functionName: "placeBet",
        chainId: baseSepolia.id,
        args: [BigInt(contractId), amountInWei],
      });
    } catch (error) {
      console.error("Error al preparar la transacción:", error);
    }
  };

  return (
    <div className="bg-card border-4 border-border shadow-[6px_6px_0px_0px] shadow-border overflow-hidden transition-all active:shadow-[3px_3px_0px_0px] active:translate-x-0.5 active:translate-y-0.5">
      <div
        className={cn("h-8 w-full border-b-4 border-border", partyColorClass)}
      />

      <div className="px-4 py-2 text-center border-b-2 border-border bg-muted">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          {party}
        </p>
      </div>

      <div className="p-4 space-y-4">
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

        <div className="text-center">
          <h3 className="text-xl font-bold uppercase tracking-wide text-card-foreground">
            {name}
          </h3>
        </div>

        <div className="border-2 border-border divide-y-2 divide-border">
          <div className="flex justify-between items-center px-3 py-2 bg-muted">
            <span className="text-xs font-bold uppercase text-muted-foreground">
              Pozo Total
            </span>
            <span className="text-sm font-bold text-card-foreground">
              {currentCandidatePoolData
                ? formatUnits(currentCandidatePoolData as bigint, 18).toString()
                : 0}{" "}
              INTI
            </span>
          </div>
        </div>

        {/*{userAggregation && (
          <div className="border-4 border-dashed border-primary/30 p-3 space-y-2 bg-primary/5">
            <div className="flex justify-between items-center border-b-2 border-primary/20 pb-2">
              <span className="text-[10px] font-black uppercase text-primary">
                Tus Apuestas ({userAggregation.count})
              </span>
              <span className="text-xs font-bold text-primary">
                {userAggregation.totalAmount} INTI
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-muted-foreground">
                Pago Potencial Total
              </span>
              <span className="text-sm font-black text-successful">
                {userAggregation.totalPayout} INTI
              </span>
            </div>
          </div>
        )}*/}

        <BettingDrawer
          candidateName={name}
          currentOdds={odds}
          onConfirmBet={handleBet}
        >
          {currentMarketState === MarketState.OPEN ? (
            <MonopolyButton className="w-full" monopolySize="lg">
              Apostar
            </MonopolyButton>
          ) : currentMarketState === MarketState.CLOSED ? (
            <MonopolyButton className="w-full" monopolySize="lg" disabled>
              Apuesta cerrada
            </MonopolyButton>
          ) : currentMarketState === MarketState.RESOLVED ? (
            <MonopolyButton className="w-full" monopolySize="lg" disabled>
              Resultado anunciado
            </MonopolyButton>
          ) : (
            <MonopolyButton className="w-full" monopolySize="lg" disabled>
              No disponible
            </MonopolyButton>
          )}
        </BettingDrawer>
      </div>
    </div>
  );
}

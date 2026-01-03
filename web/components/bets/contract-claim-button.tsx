"use client";

import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { MonopolyButton } from "../custom/monopoly-button";
import { SIN_FLORO_ABI, SIN_FLORO_ADDRESS } from "@/lib/constants/contracts";
import { Bet } from "./bet-ticket";

export function ContractClaimButton({ bets }: { bets: Bet[] }) {
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: winningCandidateId } = useReadContract({
    address: SIN_FLORO_ADDRESS,
    abi: SIN_FLORO_ABI,
    functionName: "winnerCandidateId",
  });

  const winningBet = bets.find(
    (bet) => bet.contractCandidateId === Number(winningCandidateId),
  );

  const handleClaimPrize = () => {
    writeContract({
      address: SIN_FLORO_ADDRESS,
      abi: SIN_FLORO_ABI,
      functionName: "claimPrize",
    });
  };

  return (
    winningBet && (
      <MonopolyButton onClick={handleClaimPrize} disabled={isPending}>
        ¡Ganaste! Reclama tus ganancias
      </MonopolyButton>
    )
  );
}

"use client";

import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { MonopolyButton } from "../custom/monopoly-button";
import { SIN_FLORO_ABI, SIN_FLORO_ADDRESS } from "@/lib/constants/contracts";
import { Bet } from "./bet-ticket";
import { baseSepolia } from "viem/chains";

export function ContractClaimButton({ bets }: { bets: Bet[] }) {
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const { data: winningCandidateId } = useReadContract({
    address: SIN_FLORO_ADDRESS,
    abi: SIN_FLORO_ABI,
    functionName: "winnerCandidateId",
    chainId: baseSepolia.id,
  });

  console.log(winningCandidateId);

  const winningBet = bets.find(
    (bet) => bet.contractCandidateId === Number(winningCandidateId),
  );

  const handleClaimPrize = () => {
    writeContract({
      address: SIN_FLORO_ADDRESS,
      abi: SIN_FLORO_ABI,
      functionName: "claimPrize",
      chainId: baseSepolia.id,
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

"use client";

import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery, useQuery } from "convex/react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { BetTicket, Bet, BetStatus } from "./bet-ticket";
import { EmptyComponent } from "../custom/empty-component";
import { TicketMinus, WalletCards } from "lucide-react";
import { SIN_FLORO_ABI, SIN_FLORO_ADDRESS } from "@/lib/constants/contracts";
import { MonopolyButton } from "../custom/monopoly-button";

interface ListBetsProps {
  preloadedBets?: Preloaded<typeof api.bets.getBets>;
}

export interface WinningBet {
  _id: string;
  amount: number;
  odds: number;
  potentialPayout: number;
  status: BetStatus;
  _creationTime: number;
}

export function ListBets({ preloadedBets }: ListBetsProps) {
  if (preloadedBets) {
    return <ListBetsPreloaded preloadedBets={preloadedBets} />;
  }
  return <ListBetsClient />;
}

function ListBetsPreloaded({
  preloadedBets,
}: {
  preloadedBets: Preloaded<typeof api.bets.getBets>;
}) {
  const bets = usePreloadedQuery(preloadedBets);
  // We can assume valid session if preloaded existed, or we display what we have.
  return <BetsUI bets={bets} winningBet={null} />;
}

function ListBetsClient() {
  const { address, isConnected } = useAccount();

  const { data: winningCandidateId } = useReadContract({
    address: SIN_FLORO_ADDRESS,
    abi: SIN_FLORO_ABI,
    functionName: "winnerCandidateId",
  });

  const bets = useQuery(api.bets.getBets, { walletAddress: address ?? "0x" });
  const winningBet = useQuery(api.bets.getABetForWinningCandidate, {
    walletAddress: address ?? "0x",
    winningCandidateId: Number(winningCandidateId),
  });

  if (!address && !isConnected)
    return (
      <EmptyComponent
        title="Cuenta no conectada"
        description="Por favor, conéctate para comenzar."
        icon={<WalletCards />}
      />
    );

  return <BetsUI bets={bets} winningBet={winningBet} />;
}

function BetsUI({
  bets,
  winningBet,
}: {
  bets: Array<Bet> | undefined | null;
  winningBet: any;
}) {
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  if (!bets || bets.length === 0) {
    return (
      <EmptyComponent
        title="No se encontraron apuestas"
        description="Por favor, crea una apuesta para comenzar."
        icon={<TicketMinus />}
      />
    );
  }

  const handleClaimPrize = () => {
    writeContract({
      address: SIN_FLORO_ADDRESS,
      abi: SIN_FLORO_ABI,
      functionName: "claimPrize",
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bets.map((bet) => (
          <BetTicket key={bet._id} bet={bet} />
        ))}
      </div>
      {winningBet && (
        <MonopolyButton onClick={handleClaimPrize} disabled={isPending}>
          ¡Ganaste! Reclama tus ganancias
        </MonopolyButton>
      )}
      {/*<MonopolyCard>
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
      </MonopolyCard>*/}
    </>
  );
}

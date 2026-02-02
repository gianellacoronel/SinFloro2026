"use client";

import { MonopolyCard, MonopolyCardContent } from "../custom/monopoly-card";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAccount } from "wagmi";

export function MarketStats({
  initialCandidatesList,
}: {
  initialCandidatesList: Doc<"candidates">[];
}) {
  const { address } = useAccount();

  // Subscribe to real-time updates from Convex
  const liveCandidates = useQuery(api.candidates.getCandidates);
  const liveBets = useQuery(api.bets.getBets);

  // Use live data if available, otherwise fall back to initial server data
  const candidates = liveCandidates ?? initialCandidatesList;
  const bettors = liveBets
    ? [...new Set(liveBets.map((bet) => bet.walletAddress))]
    : [];

  if (!address) {
    return null;
  }

  const globalTotalPool = candidates.reduce(
    (acc, cur) => acc + Number(cur.totalPool),
    0,
  );

  const hoy = new Date();
  const fecha12Abril = new Date("2026-04-12");

  const diferenciaMilisegundos = fecha12Abril.getTime() - hoy.getTime();
  const diferenciaDias = Math.floor(
    diferenciaMilisegundos / (1000 * 60 * 60 * 24),
  );

  return (
    <MonopolyCard>
      <MonopolyCardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {globalTotalPool.toLocaleString()}
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Pool Total (INTI)
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {bettors.length}
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Apostadores
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl font-bold text-foreground">
              {diferenciaDias}
            </p>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Días Restantes
            </p>
          </div>
        </div>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

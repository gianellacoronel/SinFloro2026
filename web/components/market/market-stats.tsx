import { cookies } from "next/headers";
import { MonopolyCard, MonopolyCardContent } from "../custom/monopoly-card";
import { Doc } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export async function MarketStats({
  candidatesList,
}: {
  candidatesList: Doc<"candidates">[];
}) {
  const cookieStore = await cookies();
  const address = cookieStore.get("user_wallet_address");

  if (!address || address.value === "") {
    return null;
  }

  const globalTotalPool = candidatesList.reduce(
    (acc, cur) => acc + Number(cur.totalPool),
    0,
  );

  const betsList = await fetchQuery(api.bets.getBets);
  const bettors = [...new Set(betsList.map((bet) => bet.walletAddress))];

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
              {globalTotalPool}
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

import { ListBets } from "@/components/bets/list-bets";
import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { cookies } from "next/headers";

export default async function BetsPage() {
  const cookieStore = await cookies();
  const walletAddress = cookieStore.get("user_wallet_address")?.value;

  const preloadedBets = walletAddress
    ? await preloadQuery(api.bets.getBets, { walletAddress })
    : undefined;

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="border-b-4 border-border pb-2">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
            Mis Apuestas
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Tu historial de apuestas y tickets
        </p>
      </div>

      <ListBets preloadedBets={preloadedBets} />
    </main>
  );
}

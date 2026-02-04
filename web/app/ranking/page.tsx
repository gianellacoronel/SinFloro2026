import { RankingTable } from "@/components/ranking/ranking-table";

export default function RankingPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/*<div className="space-y-2 border-b-4 border-border pb-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground italic">
          Ranking Electoral
        </h1>
        <p className="text-muted-foreground font-bold uppercase tracking-wider text-sm">
          Los candidatos con mayor respaldo económico en Sin Floro 2026
        </p>
      </div>*/}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
          Ranking Electoral
        </h1>
      </div>

      <RankingTable />
    </main>
  );
}

import { AdminButtons } from "@/components/profile/admin-buttons";
import { BalanceCard } from "@/components/profile/balance-card";
import { WalletCard } from "@/components/profile/wallet-card";

// const mockUserStats = {
//   walletAddress: "0x1234...5678",
//   fullAddress: "0x1234567890abcdef1234567890abcdef12345678",
//   totalBets: 47,
//   winRate: 68,
//   totalWon: 12500,
//   totalStaked: 8200,
//   rank: 23,
// };

export default function ProfilePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Gamified Header */}
      <div className="flex items-center justify-between pb-6 border-b-4 border-dashed border-border/40">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
          Mi perfil
        </h1>
      </div>

      {/* Wallet Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-6 bg-foreground" />
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground/80">
            Identificación del usuario
          </h2>
        </div>
        <WalletCard />
      </section>

      {/* Stats Grid - "Scorecard" style */}
      {/*<section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-6 bg-foreground" />
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground/80">
            Hoja de Puntuación
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            label="Total Apuestas"
            value={mockUserStats.totalBets}
          />
          <StatCard
            label="Win Rate"
            value={`${mockUserStats.winRate}%`}
            valueClass="text-chart-5 drop-shadow-sm"
          />
          <StatCard
            label="Total Ganado"
            value={`${mockUserStats.totalWon.toLocaleString()} FT`}
          />
          <StatCard
            label="Ranking"
            value={`#${mockUserStats.rank}`}
          />
        </div>
      </section>*/}

      {/* Balance & Actions */}
      <BalanceCard />

      <AdminButtons />
    </main>
  );
}

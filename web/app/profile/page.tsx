import { MonopolyButton } from "@/components/custom/monopoly-button";
import {
  MonopolyCard,
  MonopolyCardContent,
} from "@/components/custom/monopoly-card";
import { AdminButtons } from "@/components/profile/admin-buttons";
import { StatCard } from "@/components/profile/stat-card";
import { WalletCard } from "@/components/profile/wallet-card";
import { Coins, LogOut, Target, Trophy, User } from "lucide-react";

const mockUserStats = {
  walletAddress: "0x1234...5678",
  fullAddress: "0x1234567890abcdef1234567890abcdef12345678",
  totalBets: 47,
  winRate: 68,
  totalWon: 12500,
  totalStaked: 8200,
  rank: 23,
};

export default function ProfilePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="border-b-4 border-border pb-2">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
            Mi Perfil
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Tu cuenta y estadísticas
        </p>
      </div>

      <WalletCard
        address={mockUserStats.fullAddress}
        shortAddress={mockUserStats.walletAddress}
      />

      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={Target}
          label="Total Apuestas"
          value={mockUserStats.totalBets}
        />
        <StatCard
          icon={Trophy}
          label="Win Rate"
          value={`${mockUserStats.winRate}%`}
          valueClass="text-chart-5"
        />
        <StatCard
          icon={Coins}
          label="Total Ganado"
          value={`${mockUserStats.totalWon.toLocaleString()} FT`}
        />
        <StatCard
          icon={Trophy}
          label="Ranking"
          value={`#${mockUserStats.rank}`}
        />
      </div>

      <MonopolyCard variant="accent">
        <MonopolyCardContent className="p-4 text-center space-y-2">
          <p className="text-xs font-bold uppercase tracking-widest text-accent-foreground/70">
            Balance Actual
          </p>
          <p className="text-4xl font-bold text-accent-foreground">
            {(
              mockUserStats.totalWon -
              mockUserStats.totalStaked +
              1000
            ).toLocaleString()}{" "}
            FT
          </p>
          <p className="text-xs text-accent-foreground/70">
            Apostado: {mockUserStats.totalStaked.toLocaleString()} FT
          </p>
        </MonopolyCardContent>
      </MonopolyCard>

      <MonopolyButton
        variant="destructive"
        className="w-full"
        monopolySize="lg"
      >
        <LogOut className="w-5 h-5 mr-3" />
        Desconectar Wallet
      </MonopolyButton>

      <AdminButtons />
    </main>
  );
}

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
        <WalletCard
          address={mockUserStats.fullAddress}
          shortAddress={mockUserStats.walletAddress}
        />
      </section>

      {/* Stats Grid - "Scorecard" style */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-1 w-6 bg-foreground" />
          <h2 className="text-sm font-black uppercase tracking-widest text-foreground/80">
            Hoja de Puntuación
          </h2>
        </div>
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
            valueClass="text-chart-5 drop-shadow-sm"
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
      </section>

      {/* Balance & Actions */}
      <div className="space-y-6 pt-4">
        <MonopolyCard
          variant="accent"
          className="border-4 shadow-[6px_6px_0px_0px] shadow-border"
        >
          <MonopolyCardContent className="text-center space-y-2 py-8 relative">
            {/* "Stamp" decoration */}
            <div className="absolute top-2 right-4 rotate-12 opacity-20 border-4 border-black p-1 rounded-sm">
              <div className="text-[10px] font-black uppercase">Auditado</div>
            </div>

            <p className="text-xs font-black uppercase tracking-widest text-accent-foreground/60">
              Fondos Disponibles
            </p>
            <p className="text-5xl font-black text-accent-foreground tracking-tighter drop-shadow-sm">
              {(
                mockUserStats.totalWon -
                mockUserStats.totalStaked +
                1000
              ).toLocaleString()}{" "}
              <span className="text-2xl">FT</span>
            </p>
            <div className="pt-2">
              <span className="inline-block px-4 py-1.5 bg-black/5 text-xs font-black uppercase tracking-wide rounded-md text-accent-foreground/80">
                En Juego: {mockUserStats.totalStaked.toLocaleString()} FT
              </span>
            </div>
          </MonopolyCardContent>
        </MonopolyCard>

        <div className="space-y-3">
          <MonopolyButton
            variant="destructive"
            className="w-full h-14 text-lg font-black uppercase"
            monopolySize="lg"
          >
            <LogOut className="w-6 h-6 mr-3" />
            Retirarse del Juego
          </MonopolyButton>

          <AdminButtons />
        </div>
      </div>
    </main>
  );
}

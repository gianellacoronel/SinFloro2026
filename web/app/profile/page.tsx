// const mockUserStats = {
//   walletAddress: "0x1234...5678",
//   fullAddress: "0x1234567890abcdef1234567890abcdef12345678",
//   totalBets: 47,
//   winRate: 68,
//   totalWon: 12500,
//   totalStaked: 8200,
//   rank: 23,
// };

import { ProfileInformation } from "@/components/profile/profile-information";

export default function ProfilePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      {/* Gamified Header */}
      <div className="flex items-center justify-between pb-6 border-b-4 border-dashed border-border/40">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
          Mi perfil
        </h1>
      </div>
      <ProfileInformation />

      {/*<div className="py-8">
        <h2 className="text-xl font-bold mb-6 text-center uppercase">Tiempo restante para las elecciones generales 2026 🇵🇪</h2>
        <CountDown targetDate={new Date("2026-04-12T00:00:00")} />
      </div>*/}
    </main>
  );
}

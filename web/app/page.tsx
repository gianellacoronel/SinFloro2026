import { CandidateCard } from "@/components/market/candidate-card";
import { FaucetPromo } from "@/components/market/faucet-promo";
import { HeroBanner } from "@/components/market/hero-banner";
import { MarketStats } from "@/components/market/market-stats";

const candidates = [
  {
    name: "Keiko Fujimori",
    party: "Fuerza Popular",
    partyColorClass: "bg-chart-1",
    odds: 2.5,
    totalPool: "125,000 INTI",
    probability: 40,
    imageQuery: "peruvian woman politician portrait formal",
  },
  {
    name: "Antauro Humala",
    party: "UPP",
    partyColorClass: "bg-chart-2",
    odds: 4.2,
    totalPool: "78,500 INTI",
    probability: 24,
    imageQuery: "peruvian man politician military style portrait",
  },
  {
    name: "Hernando de Soto",
    party: "Avanza País",
    partyColorClass: "bg-chart-3",
    odds: 5.8,
    totalPool: "52,300 INTI",
    probability: 17,
    imageQuery: "peruvian economist man portrait formal suit",
  },
];

const marketStats = {
  totalPool: "255,800",
  bettors: "1,247",
  daysRemaining: "89",
  volume24h: "+12.5%",
};

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <HeroBanner />
      <FaucetPromo />

      <div className="border-b-4 border-border pb-2">
        <h2 className="text-xl font-bold uppercase tracking-wide text-foreground">
          Candidatos Presidenciales
        </h2>
        <p className="text-sm text-muted-foreground">
          Selecciona un candidato para apostar
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.name} {...candidate} />
        ))}
      </div>

      <MarketStats stats={marketStats} />
    </main>
  );
}

import { BetTicket } from "@/components/bets/bet-ticket";
import {
  MonopolyCard,
  MonopolyCardContent,
} from "@/components/custom/monopoly-card";
import { Ticket } from "lucide-react";

type BetStatus = "open" | "won" | "lost";

interface Bet {
  id: string;
  candidate: string;
  party: string;
  amount: number;
  odds: number;
  potentialPayout: number;
  status: BetStatus;
  date: string;
}

const mockBets: Bet[] = [
  {
    id: "BET-001",
    candidate: "Keiko Fujimori",
    party: "Fuerza Popular",
    amount: 500,
    odds: 2.5,
    potentialPayout: 1250,
    status: "open" as const,
    date: "2024-12-01",
  },
  {
    id: "BET-002",
    candidate: "Hernando de Soto",
    party: "Avanza País",
    amount: 200,
    odds: 5.8,
    potentialPayout: 1160,
    status: "open" as const,
    date: "2024-11-28",
  },
  {
    id: "BET-003",
    candidate: "César Acuña",
    party: "APP",
    amount: 1000,
    odds: 3.2,
    potentialPayout: 3200,
    status: "won" as const,
    date: "2024-11-15",
  },
  {
    id: "BET-004",
    candidate: "Daniel Urresti",
    party: "Podemos",
    amount: 300,
    odds: 6.5,
    potentialPayout: 1950,
    status: "lost" as const,
    date: "2024-11-10",
  },
];

export default function BetsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <div className="border-b-4 border-border pb-2">
        <div className="flex items-center gap-3">
          <Ticket className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
            Mis Apuestas
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Tu historial de apuestas y tickets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockBets.map((bet) => (
          <BetTicket key={bet.id} bet={bet} />
        ))}
      </div>

      <MonopolyCard>
        <MonopolyCardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">4</p>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Total Apuestas
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-chart-5">2,000 FT</p>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Apostado
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-chart-5">3,200 FT</p>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Ganado
              </p>
            </div>
          </div>
        </MonopolyCardContent>
      </MonopolyCard>
    </main>
  );
}

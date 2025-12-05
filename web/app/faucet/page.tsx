import {
  MonopolyCard,
  MonopolyCardContent,
} from "@/components/custom/monopoly-card";
import { FaucetMachine } from "@/components/faucet/faucet-machine";
import { Droplets, Zap } from "lucide-react";

export default function FaucetPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="border-b-4 border-border pb-2 text-center">
        <div className="flex items-center justify-center gap-3">
          <Droplets className="w-6 h-6 text-chart-3" />
          <h1 className="text-2xl font-bold uppercase tracking-wide text-foreground">
            Faucet
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Obtén Intis gratis para apostar
        </p>
      </div>

      <FaucetMachine />

      <MonopolyCard variant="accent">
        <MonopolyCardContent className="p-4">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-accent-foreground shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold uppercase text-accent-foreground">
                Tokens de Prueba
              </h3>
              <p className="text-sm text-accent-foreground/80 mt-1">
                Los Intis son tokens de prueba sin valor real. Úsalos para
                experimentar con el mercado de predicciones antes del
                lanzamiento oficial.
              </p>
            </div>
          </div>
        </MonopolyCardContent>
      </MonopolyCard>
    </main>
  );
}

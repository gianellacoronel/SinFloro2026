import {
  MonopolyCard,
  MonopolyCardContent,
} from "@/components/custom/monopoly-card";
import { Coins, Droplets } from "lucide-react";
import { MonopolyButton } from "../custom/monopoly-button";
import Link from "next/link";

export function FaucetPromo() {
  return (
    <MonopolyCard variant="accent">
      <MonopolyCardContent>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-card border-2 border-border flex items-center justify-center shrink-0">
            <Droplets className="w-6 h-6 text-chart-3" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-wide text-accent-foreground">
              Faucet de Prueba
            </h3>
            <p className="text-xs text-accent-foreground/70">
              Obtén Intis gratis para apostar
            </p>
          </div>
          <MonopolyButton
            asChild
            variant="secondary"
            monopolySize="sm"
            className="shrink-0"
          >
            <Link href="/faucet">
              <Coins className="w-4 h-4 mr-1.5" />
              <span>Reclamar</span>
            </Link>
          </MonopolyButton>
        </div>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

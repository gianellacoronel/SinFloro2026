import {
  MonopolyCard,
  MonopolyCardContent,
} from "@/components/custom/monopoly-card";
import { Sparkles } from "lucide-react";

export function HeroBanner() {
  return (
    <MonopolyCard variant="primary" className="shadow-[6px_6px_0px_0px]">
      <MonopolyCardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-accent" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary-foreground/80">
            Elecciones Perú 2026
          </span>
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-primary-foreground mb-2 text-balance">
          Sin Floro, Solo La Verdad
        </h2>
        <p className="text-sm text-primary-foreground/80 font-medium">
          Apuesta con datos, no con promesas vacías
        </p>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

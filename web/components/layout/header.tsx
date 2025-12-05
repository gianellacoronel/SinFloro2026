import { Wallet } from "lucide-react";
import Link from "next/link";
import { MonopolyButton } from "../custom/monopoly-button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-card border-b-4 border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 bg-primary border-2 border-border flex items-center justify-center shadow-[2px_2px_0px_0px] shadow-border">
            <span className="text-primary-foreground font-bold text-lg">
              SF
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold uppercase tracking-tight text-foreground leading-none">
              Sin Floro
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              2026
            </p>
          </div>
        </Link>

        <MonopolyButton variant="secondary" monopolySize="sm">
          <Wallet className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Conectar</span>
        </MonopolyButton>
      </div>
    </header>
  );
}

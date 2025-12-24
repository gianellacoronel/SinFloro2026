"use client";

import { CheckCircle, Coins, Zap } from "lucide-react";
import { useState } from "react";
import { MonopolyButton } from "../custom/monopoly-button";

export function FaucetMachine() {
  const [isMinting, setIsMinting] = useState(false);
  const [hasMinted, setHasMinted] = useState(false);

  const handleMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setHasMinted(true);
    }, 1500);
  };

  const handleReset = () => {
    setHasMinted(false);
  };

  return (
    <div className="bg-card border-8 border-border shadow-[8px_8px_0px_0px] shadow-border overflow-hidden">
      {/* Machine Header */}
      <div className="bg-primary border-b-4 border-border px-6 py-4 text-center">
        <h2 className="text-xl font-bold uppercase tracking-widest text-primary-foreground">
          FloroMatic 3000
        </h2>
        <p className="text-xs uppercase tracking-wide text-primary-foreground/80 mt-1">
          Dispensador de Tokens
        </p>
      </div>

      {/* Display Screen */}
      <div className="bg-muted m-4 border-4 border-border p-6">
        <div className="bg-background border-2 border-border p-4 text-center space-y-2">
          {hasMinted ? (
            <>
              <CheckCircle className="w-12 h-12 text-chart-5 mx-auto" />
              <p className="text-lg font-bold text-chart-5 uppercase">
                Transferencia Exitosa
              </p>
              <p className="text-3xl font-bold text-foreground">+1,000 INTI</p>
            </>
          ) : isMinting ? (
            <>
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-lg font-bold text-foreground uppercase animate-pulse">
                Procesando...
              </p>
            </>
          ) : (
            <>
              <Coins className="w-12 h-12 text-chart-4 mx-auto" />
              <p className="text-lg font-bold text-foreground uppercase">
                Listo para Dispensar
              </p>
              <p className="text-sm text-muted-foreground">
                Presiona el botón para reclamar tokens
              </p>
            </>
          )}
        </div>
      </div>

      {/* Token Amount Display */}
      <div className="mx-4 mb-4 bg-accent border-4 border-border p-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-accent-foreground/70">
          Cantidad a Recibir
        </p>
        <p className="text-4xl font-bold text-accent-foreground mt-1">
          1,000 INTI
        </p>
      </div>

      {/* Big Mint Button */}
      <div className="p-6 pt-0">
        {hasMinted ? (
          <MonopolyButton
            onClick={handleReset}
            variant="secondary"
            className="w-full py-5 shadow-[6px_6px_0px_0px]"
          >
            <Zap className="w-6 h-6 mr-3" />
            Reclamar de Nuevo
          </MonopolyButton>
        ) : (
          <MonopolyButton
            onClick={handleMint}
            disabled={isMinting}
            className="w-full py-5 bg-successful text-background hover:bg-successful/90 shadow-[6px_6px_0px_0px]"
          >
            <Coins className="w-6 h-6 mr-3" />
            {isMinting ? "Mintando..." : "Mint 1000 Intis"}
          </MonopolyButton>
        )}
      </div>

      {/* Machine Footer */}
      <div className="bg-muted border-t-4 border-border px-4 py-3">
        <div className="flex justify-between items-center text-xs font-bold uppercase text-muted-foreground">
          <span>Cooldown: 24h</span>
          <span>Testnet Only</span>
        </div>
      </div>
    </div>
  );
}

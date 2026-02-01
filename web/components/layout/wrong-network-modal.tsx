"use client";

import { useAccount, useDisconnect, useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { AlertTriangle, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function WrongNetworkModal() {
  const { chainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Only show if connected and on the wrong network
  if (!isConnected || chainId === baseSepolia.id) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-card border-2 border-destructive max-w-md w-full rounded-xl shadow-2xl p-6 flex flex-col items-center text-center space-y-6">
        <div className="bg-destructive/10 p-4 rounded-full">
          <AlertTriangle className="w-12 h-12 text-destructive" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Red Incorrecta
          </h2>
          <p className="text-muted-foreground">
            Para usar Sin Floro 2026, necesitas conectarte a la red{" "}
            <span className="font-bold text-foreground">Base Sepolia</span>.
          </p>
        </div>

        <div className="flex flex-col w-full gap-3">
          <button
            onClick={() => switchChain({ chainId: baseSepolia.id })}
            className={cn(
              "w-full py-3 px-4 bg-primary text-primary-foreground font-bold uppercase tracking-wide rounded-lg",
              "hover:bg-primary/90 transition-colors shadow-lg active:scale-[0.98]",
            )}
          >
            Cambiar a Base Sepolia
          </button>

          <button
            onClick={() => disconnect()}
            className="w-full py-3 px-4 flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors font-medium text-sm"
          >
            <LogOut className="w-4 h-4" />
            Desconectar Billetera
          </button>
        </div>
      </div>
    </div>
  );
}

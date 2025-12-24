"use client";

import {
  MonopolyCard,
  MonopolyCardContent,
} from "@/components/custom/monopoly-card";
import { Coins } from "lucide-react";
import { MonopolyButton } from "../custom/monopoly-button";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { INTITOKEN_ABI, INTITOKEN_ADDRESS } from "@/lib/constants/contracts";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

export function FaucetPromo() {
  const { data: hash, writeContract, isPending } = useWriteContract();

  const handleClaim = async () => {
    writeContract({
      address: INTITOKEN_ADDRESS,
      abi: INTITOKEN_ABI,
      functionName: "faucet",
      args: [],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return (
    <MonopolyCard variant="accent">
      <MonopolyCardContent>
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-wide text-accent-foreground">
              Faucet de Prueba
            </h3>
            <p className="text-xs text-accent-foreground/70">
              Obtén Intis gratis para apostar
            </p>
          </div>
          <MonopolyButton
            variant="secondary"
            monopolySize="sm"
            className="shrink-0"
            disabled={isPending}
            onClick={handleClaim}
          >
            {isPending ? (
              <Spinner className="size-6 text-primary" />
            ) : (
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 mr-1.5" />
                <span>Reclamar</span>
              </div>
            )}
          </MonopolyButton>
          {isConfirming && toast.info("Esperando la confirmación...")}
          {isConfirmed && toast.success("Intis reclamados con éxito")}
        </div>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

"use client";

import {
  MonopolyCard,
  MonopolyCardContent,
} from "@/components/custom/monopoly-card";
import { Coins } from "lucide-react";
import { MonopolyButton } from "../custom/monopoly-button";
import {
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import {
  INTITOKEN_ABI,
  INTITOKEN_ADDRESS,
} from "@/lib/constants/contracts";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export function FaucetPromo() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending: isWriting } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const bettor = useQuery(api.bettors.getBettorByWalletAddress, {
    walletAddress: address || "",
  });
  const createBettor = useMutation(api.bettors.createBettor);

  useEffect(() => {
    if (isConfirmed) {
      toast.success("Intis reclamados con éxito");
      createBettor({ walletAddress: address || "" });
    }
  }, [isConfirmed, createBettor, address]);

  async function handleClaim() {
    try {
      if (!isConnected) {
        toast.error("Por favor, conecta tu cuenta");
        return;
      }
      if (bettor && bettor.wereTokensClaimed) {
        toast.info(
          "Ya reclamaste Intis, disfruta de apostar en la aplicación.",
        );
        return;
      }

      writeContract({
        abi: INTITOKEN_ABI,
        address: INTITOKEN_ADDRESS,
        functionName: "faucet",
        args: [],
      });
    } catch (error: any) {
      void toast.error(error.message);
    }
  }

  return (
    <MonopolyCard variant="accent">
      <MonopolyCardContent>
        <div className="flex items-center gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold uppercase tracking-wide text-accent-foreground">
              Generador de Intis
            </h3>
            <p className="text-xs text-accent-foreground/70">
              Obtén Intis gratis para apostar
            </p>
          </div>
          <MonopolyButton
            variant="secondary"
            monopolySize="sm"
            className="shrink-0"
            disabled={isWriting || isConfirming}
            onClick={handleClaim}
          >
            {isWriting || isConfirming ? (
              <Spinner className="size-6 text-primary" />
            ) : (
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 mr-1.5" />
                <span>Reclamar</span>
              </div>
            )}
          </MonopolyButton>
        </div>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

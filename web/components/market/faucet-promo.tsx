"use client";

import {
  MonopolyCard,
  MonopolyCardContent,
} from "@/components/custom/monopoly-card";
import { Coins } from "lucide-react";
import { MonopolyButton } from "../custom/monopoly-button";
import { useAccount, useSendCalls } from "wagmi";
import {
  INTITOKEN_ABI,
  INTITOKEN_ADDRESS,
  SIN_FLORO_ADDRESS,
} from "@/lib/constants/contracts";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { encodeFunctionData } from "viem";
import { baseSepolia } from "viem/chains";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export function FaucetPromo() {
  const { address, isConnected } = useAccount();
  const { sendCalls, isPending, isSuccess } = useSendCalls();

  const bettor = useQuery(api.bettors.getBettorByWalletAddress, {
    walletAddress: address || "",
  });
  const createBettor = useMutation(api.bettors.createBettor);

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

      const callFaucet = encodeFunctionData({
        abi: INTITOKEN_ABI,
        functionName: "faucet",
        args: [],
      });

      const callApprove = encodeFunctionData({
        abi: INTITOKEN_ABI,
        functionName: "approve",
        args: [SIN_FLORO_ADDRESS, BigInt(1000 * 10 ** 18)],
      });

      sendCalls({
        calls: [
          {
            to: INTITOKEN_ADDRESS,
            data: callFaucet,
          },
          {
            to: INTITOKEN_ADDRESS,
            data: callApprove,
          },
        ],
        chainId: baseSepolia.id,
      });

      if (isSuccess) {
        createBettor({ walletAddress: address || "" });
      }
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
              Obtén Intis para apostar
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
          {isSuccess && void toast.success("Intis reclamados con éxito")}
        </div>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

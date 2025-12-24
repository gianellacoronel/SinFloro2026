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
  SIN_FLORO_ADDRESS,
} from "@/lib/constants/contracts";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { useEffect } from "react";

export function FaucetPromo() {
  const { isConnected } = useAccount();

  const { 
    data: faucetHash, 
    writeContract: writeFaucet, 
    isPending: isFaucetPending 
  } = useWriteContract();

  const { 
    isLoading: isFaucetConfirming, 
    isSuccess: isFaucetConfirmed 
  } = useWaitForTransactionReceipt({ hash: faucetHash });

  const { 
    data: approveHash, 
    writeContract: writeApprove, 
    isPending: isApprovePending 
  } = useWriteContract();

  const { 
    isLoading: isApproveConfirming, 
    isSuccess: isApproveConfirmed 
  } = useWaitForTransactionReceipt({ hash: approveHash });

  const handleClaim = async () => {
    if (!isConnected) {
      toast.error("Por favor, conecta tu cuenta");
      return;
    }

    writeFaucet({
      address: INTITOKEN_ADDRESS,
      abi: INTITOKEN_ABI,
      functionName: "faucet",
      args: [],
    });
  };

  useEffect(() => {
    if (isFaucetConfirmed && !approveHash) {
      writeApprove({
        address: INTITOKEN_ADDRESS,
        abi: INTITOKEN_ABI,
        functionName: "approve",
        args: [SIN_FLORO_ADDRESS, BigInt(1000 * 10 ** 18)],
      });
    }
  }, [isFaucetConfirmed, approveHash, writeApprove]);

  const isPending = isFaucetPending || isApprovePending || isFaucetConfirming || isApproveConfirming;

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
          {isFaucetConfirming && void toast.info("Confirmando obtención de intis")}
          {isApproveConfirming && void toast.info("Confirmando aprobación de la operación")}
          {isApproveConfirmed && void toast.success("Intis reclamados y aprobados con éxito")}
        </div>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

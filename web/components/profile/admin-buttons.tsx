"use client";

import {
  useAccount,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEffect } from "react";
import {
  INTITOKEN_ABI,
  INTITOKEN_ADDRESS,
  SIN_FLORO_ABI,
  SIN_FLORO_ADDRESS,
} from "@/lib/constants/contracts";
import { Button } from "../ui/button";
import { baseSepolia } from "viem/chains";

export function AdminButtons() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  const {
    data: hash,
    isPending: isWalletLoading,
    error: writeError,
    writeContract,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const handleAddCandidate = async () => {
    try {
      if (chain?.id !== baseSepolia.id) {
        console.log("Red incorrecta, cambiando a Base Sepolia...");
        await switchChain({ chainId: baseSepolia.id });
      }
      writeContract({
        address: SIN_FLORO_ADDRESS,
        abi: SIN_FLORO_ABI,
        functionName: "addCandidate",
        chainId: baseSepolia.id,
        args: [],
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFaucet = () => {
    writeContract({
      address: INTITOKEN_ADDRESS,
      abi: INTITOKEN_ABI,
      functionName: "faucet",
      args: [],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      console.log("Candidate added successfully");
    }
  }, [isConfirmed]);

  if (address !== "0x0fb249b159543BCcE6f1f649DAdfe2f31a4a80D9") {
    return null;
  }
  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleAddCandidate}
        disabled={isWalletLoading || isConfirming}
      >
        Agregar candidato
      </Button>
      <Button onClick={handleFaucet} disabled={isWalletLoading || isConfirming}>
        Recolectar
      </Button>

      {writeError && (
        <p className="text-red-500 text-xs font-bold mt-1">
          Error: {writeError.message.split(".")[0]}
        </p>
      )}
      {isConfirmed && (
        <p className="text-green-600 text-xs font-bold mt-1">
          ¡Transacción completada! Hash: {hash?.slice(0, 6)}...{hash?.slice(-4)}
        </p>
      )}
      {/*{!isPending && (
        <div>
          <ul>
            <li>candidateId: {candidatesContract[0]}</li>
            <li>totalBetAmount: {candidatesContract[1]}</li>
          </ul>
        </div>
      )}*/}
    </div>
  );
}

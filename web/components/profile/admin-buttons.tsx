"use client";

import {
  useAccount,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEffect, useState } from "react";
import { SIN_FLORO_ABI, SIN_FLORO_ADDRESS } from "@/lib/constants/contracts";
import { Button } from "../ui/button";
import { base, baseSepolia } from "viem/chains";
import { toast } from "sonner";
import { Input } from "../ui/input";

export function AdminButtons() {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [value, setValue] = useState<number>(-1);

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
      if (chain?.id !== base.id) {
        void toast.info("Red incorrecta, cambiando a Base...");
        await switchChain({ chainId: base.id });
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

  const handleCloseVoting = () => {
    writeContract({
      address: SIN_FLORO_ADDRESS,
      abi: SIN_FLORO_ABI,
      functionName: "closeVoting",
      chainId: base.id,
    });
  };

  const handleResolveVoting = (winnerId: number) => {
    console.log("id winner: ", winnerId);
    writeContract({
      address: SIN_FLORO_ADDRESS,
      abi: SIN_FLORO_ABI,
      functionName: "resolveMarket",
      chainId: base.id,
      args: [BigInt(winnerId)],
    });
  };

  useEffect(() => {
    if (isConfirmed) {
      console.log("Candidate added successfully");
    }
  }, [isConfirmed]);

  if (address !== process.env.NEXT_PUBLIC_ADDRESS_OWNER) {
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

      <Button
        onClick={handleCloseVoting}
        disabled={isWalletLoading || isConfirming}
      >
        Cerrar votaciones
      </Button>

      <div className="flex gap-2">
        <Input
          onChange={(e) => setValue(Number(e.target.value))}
          placeholder="Ingresa el id (contrato) del ganador "
        />
        <Button
          onClick={() => handleResolveVoting(value)}
          disabled={isWalletLoading || isConfirming}
        >
          Declarar ganador
        </Button>
      </div>

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

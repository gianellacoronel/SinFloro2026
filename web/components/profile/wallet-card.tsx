"use client";

import { Check, Copy } from "lucide-react";
import { MonopolyCard, MonopolyCardContent } from "../custom/monopoly-card";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAccount } from "wagmi";

export function WalletCard() {
  const [copied, setCopied] = useState(false);
  const { address } = useAccount();

  const truncateWord = (word: string) => {
    if (word.length <= 8) return word; // Don't truncate if word is too short
    return `${word.slice(0, 6)}...${word.slice(-4)}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address ?? "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MonopolyCard className="relative overflow-hidden ">
      <MonopolyCardContent>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <code className="text-lg font-bold tracking-wider">
              {truncateWord(address ?? "")}
            </code>
            <button
              onClick={handleCopy}
              className={cn(
                "p-2 rounded-md transition-all active:scale-95 active:translate-y-1",
                copied
                  ? "bg-green-500 text-black"
                  : "bg-white text-black hover:bg-gray-200",
              )}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-wide border-2 border-black px-2 py-0.5 rounded-full bg-successful text-white">
              Activo
            </span>
          </div>
        </div>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

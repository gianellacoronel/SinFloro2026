"use client";

import { Check, Copy, Wallet } from "lucide-react";
import {
  MonopolyCard,
  MonopolyCardContent,
  MonopolyCardHeader,
} from "../custom/monopoly-card";
import { useState } from "react";

interface WalletCardProps {
  address: string;
  shortAddress: string;
}

export function WalletCard({ address, shortAddress }: WalletCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <MonopolyCard>
      <MonopolyCardHeader className="bg-primary">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5 text-primary-foreground" />
          <span className="text-sm font-bold uppercase tracking-wide text-primary-foreground">
            Wallet Conectada
          </span>
        </div>
      </MonopolyCardHeader>
      <MonopolyCardContent>
        <div className="flex items-center justify-between bg-muted border-2 border-border px-4 py-3">
          <code className="text-sm font-mono font-bold text-foreground">
            {shortAddress}
          </code>
          <button
            onClick={handleCopy}
            className="p-2 bg-card border-2 border-border active:scale-95 transition-transform"
          >
            {copied ? (
              <Check className="w-4 h-4 text-chart-5" />
            ) : (
              <Copy className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </MonopolyCardContent>
    </MonopolyCard>
  );
}

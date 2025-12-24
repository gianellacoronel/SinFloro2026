import {
  MonopolyCard,
  MonopolyCardContent,
} from "@/components/custom/monopoly-card";
import { FaucetMachine } from "@/components/faucet/faucet-machine";
import { Zap } from "lucide-react";

export default function FaucetPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <FaucetMachine />
    </main>
  );
}

"use client";

import * as React from "react";
import { Minus, Plus, TrendingUp, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "wagmi";
import { toast } from "sonner";

interface BettingDrawerProps {
  candidateName: string;
  currentOdds: number;
  balance?: number;
  children: React.ReactNode;
  onConfirmBet: (amount: number) => void;
}

export function BettingDrawer({
  candidateName,
  currentOdds,
  balance = 0,
  children,
  onConfirmBet,
}: BettingDrawerProps) {
  const { isConnected } = useAccount();
  const [amount, setAmount] = React.useState<number>(10);
  const [isOpen, setIsOpen] = React.useState(false);

  // Calculate potential payout
  const potentialPayout = (amount * currentOdds).toFixed(2);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setAmount(value);
    } else if (e.target.value === "") {
      setAmount(0);
    }
  };

  const adjustAmount = (delta: number) => {
    setAmount((prev) => Math.max(0, prev + delta));
  };

  const handleSubmit = () => {
    if (!isConnected) {
      toast.error("Por favor, conéctate para participar");
    }
    onConfirmBet(amount);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-2xl text-center uppercase font-black tracking-tighter">
              Apostar en <span className="text-primary">{candidateName}</span>
            </DrawerTitle>
            <DrawerDescription className="text-center">
              Define cuánto quieres apostar.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => adjustAmount(-10)}
                disabled={amount <= 0}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-5xl font-bold tracking-tighter">
                  {amount}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  INTI
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => adjustAmount(10)}
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase</span>
              </Button>
            </div>

            <div className="mt-8 space-y-4">
              {/*<div className="bg-muted/50 p-4 rounded-lg border border-border/50 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Cuota Actual
                  </span>
                  <span className="font-bold text-foreground">
                    {currentOdds.toFixed(2)}x
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> Retorno Potencial
                  </span>
                  <span className="font-bold text-green-500">
                    +{potentialPayout}
                  </span>
                </div>
              </div>*/}

              <div className="hidden">
                <Label htmlFor="bet-amount" className="sr-only">
                  Monto de apuesta
                </Label>
                <Input
                  id="bet-amount"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className="text-center"
                />
              </div>
            </div>
          </div>

          <DrawerFooter>
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full text-lg font-bold uppercase tracking-wide"
            >
              Confirmar Apuesta
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost" className="w-full">
                Cancelar
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

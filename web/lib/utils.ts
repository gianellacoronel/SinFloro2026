import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePotentialPayout(
  myBetAmount: string,
  candidateTotalPool: string,
  globalTotalPool: string,
) {
  const bet = parseFloat(myBetAmount);
  const candPool = parseFloat(candidateTotalPool);
  const globalPool = parseFloat(globalTotalPool);

  if (candPool === 0 || globalPool === 0) return { payout: 0, multiplier: 0 };

  const potentialPayout = (bet * globalPool) / candPool;
  const multiplier = potentialPayout / bet;

  return {
    payout: potentialPayout.toFixed(2),
    multiplier: multiplier.toFixed(1),
  };
}

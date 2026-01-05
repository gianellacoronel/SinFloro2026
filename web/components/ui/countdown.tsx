"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountDownProps {
  targetDate: Date;
  className?: string;
}

const DigitCard = ({ digit }: { digit: string }) => {
  return (
    <div className="relative flex h-10 w-8 items-center justify-center overflow-hidden rounded-lg border border-border/10 bg-white dark:bg-card shadow-sm sm:h-16 sm:w-12 md:h-24 md:w-20">
      <div className="z-10 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-4xl md:text-6xl">
        {digit}
      </div>
      {/* Horizontal split line */}
      <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-border/20 content-['']" />
      <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-white/20 dark:bg-black/20" />
    </div>
  );
};

const TimeGroup = ({
  value,
  label,
}: {
  value: number;
  label: string;
}) => {
  // Format to 2 digits
  const digits = value.toString().padStart(2, "0").split("");

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-3">
      <div className="flex gap-1 sm:gap-2">
        <DigitCard digit={digits[0]} />
        <DigitCard digit={digits[1]} />
      </div>
      <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
        {label}
      </span>
    </div>
  );
};

const Separator = () => (
  <div className="flex flex-col gap-2 pt-3 sm:gap-3 sm:pt-6 md:pt-8">
    <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 sm:h-1.5 sm:w-1.5" />
    <div className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 sm:h-1.5 sm:w-1.5" />
  </div>
);

export function CountDown({ targetDate, className }: CountDownProps) {
  const [timeLeft, setTimeLeft] = React.useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = React.useState(false);
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        setIsComplete(false);
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      
      setIsComplete(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isClient) return null; // Prevent hydration mismatch

  if (isComplete) {
    return (
      <div className={cn("flex justify-center", className)}>
        <div className="flex bg-white dark:bg-card border border-border/10 rounded-lg shadow-sm px-6 py-4 items-center justify-center">
          <span className="text-xl font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 sm:text-2xl md:text-3xl text-center">
            Día de elecciones generales 2026
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex justify-center gap-2 sm:gap-4", className)}>
      <TimeGroup value={timeLeft.days} label="Días" />
      <Separator />
      <TimeGroup value={timeLeft.hours} label="horas" />
      <Separator />
      <TimeGroup value={timeLeft.minutes} label="minutos" />
      <Separator />
      <TimeGroup value={timeLeft.seconds} label="segundos" />
    </div>
  );
}

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
    <div className="relative flex h-16 w-12 items-center justify-center overflow-hidden rounded-lg border border-border/10 bg-white dark:bg-card shadow-sm sm:h-20 sm:w-16 md:h-24 md:w-20">
      <div className="z-10 text-4xl font-bold text-slate-900 dark:text-slate-100 sm:text-5xl md:text-6xl">
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
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        <DigitCard digit={digits[0]} />
        <DigitCard digit={digits[1]} />
      </div>
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground sm:text-sm">
        {label}
      </span>
    </div>
  );
};

const Separator = () => (
  <div className="hidden flex-col gap-3 pt-6 sm:flex md:pt-8">
    <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
    <div className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
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

  React.useEffect(() => {
    setIsClient(true);
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
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

  return (
    <div className={cn("flex flex-wrap justify-center gap-4 sm:gap-6", className)}>
      <TimeGroup value={timeLeft.days} label="Days" />
      <Separator />
      <TimeGroup value={timeLeft.hours} label="Hours" />
      <Separator />
      <TimeGroup value={timeLeft.minutes} label="Minutes" />
      <Separator />
      <TimeGroup value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Droplets, Home, Ticket, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "/", label: "Market", icon: Home },
  { id: "/bets", label: "Mis Apuestas", icon: Ticket },
  { id: "/faucet", label: "Faucet", icon: Droplets },
  { id: "/profile", label: "Perfil", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
      <div className="bg-card border-4 border-border rounded-2xl shadow-[6px_6px_0px_0px] shadow-border px-2 py-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.id;
            return (
              <Link
                key={item.id}
                href={item.id}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all active:scale-95",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

"use client";

import { cn } from "@/lib/utils";
import { Home, Ticket, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { id: "/", label: "Market", icon: Home },
  { id: "/bets", label: "Mis Apuestas", icon: Ticket },
  // { id: "/faucet", label: "Faucet", icon: Droplets },
  { id: "/profile", label: "Perfil", icon: User },
];

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center gap-1 bg-muted border-2 border-border p-1 shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.id;
        return (
          <Link
            key={item.id}
            href={item.id}
            className={cn(
              "flex items-center gap-2 px-4 py-2 font-bold text-sm uppercase tracking-wide transition-all active:scale-95",
              isActive
                ? "bg-primary text-primary-foreground shadow-[2px_2px_0px_0px] shadow-border"
                : "text-muted-foreground hover:text-foreground hover:bg-card",
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

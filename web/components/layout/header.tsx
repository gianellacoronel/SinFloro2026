"use client";

import Link from "next/link";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { DesktopNav } from "./desktop-nav";
import { useAccount, useSwitchChain } from "wagmi";
import { base } from "viem/chains";

export function Header() {
  const { chain } = useAccount();
  const { switchChain } = useSwitchChain();

  return (
    <header className="sticky top-0 z-40 bg-card border-b-4 border-border">
      <div className="flex items-center justify-between px-4 py-3 relative">
        <Link
          href="/"
          className="flex items-center gap-2 active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 bg-primary border-2 border-border flex items-center justify-center shadow-[2px_2px_0px_0px] shadow-border">
            <span className="text-primary-foreground font-bold text-lg">
              SF
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold uppercase tracking-tight text-foreground leading-none">
              Sin Floro
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              2026
            </p>
          </div>
        </Link>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
          <DesktopNav />
        </div>

        <Wallet>
          <ConnectWallet
            onConnect={() => {
              if (chain?.id !== base.id) {
                switchChain({ chainId: base.id });
              }
            }}
            disconnectedLabel="Conéctate ahora"
            className="bg-primary text-primary-foreground font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
          >
            <Avatar className="h-6 w-6" />
            <Name />
          </ConnectWallet>

          {/* Este Dropdown aparece cuando ya estás conectado */}
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
              Wallet
            </WalletDropdownLink>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    </header>
  );
}

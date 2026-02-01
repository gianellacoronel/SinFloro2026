"use client";

import {
  Address,
  EthBalance,
  Identity,
  Name,
} from "@coinbase/onchainkit/identity";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from "@coinbase/onchainkit/wallet";
import { Avatar } from "../ui/avatar";
import { useAccount, useSwitchChain } from "wagmi";
import { baseSepolia } from "viem/chains";
import { updateWalletCookie } from "@/app/actions/wallet";
import { useEffect } from "react";

export function WalletWidget() {
  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isConnected && address) {
      updateWalletCookie(address);
    } else {
      updateWalletCookie(null);
    }
  }, [address, isConnected]);

  return (
    <Wallet>
      <ConnectWallet
        onConnect={() => {
          if (chain?.id !== baseSepolia.id) {
            switchChain({ chainId: baseSepolia.id });
          }
        }}
        disconnectedLabel="Conéctate ahora"
        className="bg-primary text-primary-foreground font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all"
      >
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>

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
  );
}

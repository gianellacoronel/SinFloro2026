"use client";

import { useEffect } from "react";
import { useAccount } from "wagmi";

export function WalletCookieSync() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      document.cookie = `user_wallet_address=${address}; path=/; max-age=31536000; SameSite=Strict`;
    } else {
      document.cookie = `user_wallet_address=; path=/; max-age=0; SameSite=Strict`;
    }
  }, [address, isConnected]);

  return null;
}

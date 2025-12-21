"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { ReactNode } from "react";
import { base } from "viem/chains";
import { WagmiProvider, createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

const wagmiConfig = createConfig({
  chains: [baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: "Sin Floro 2026",
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(),
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      miniKit={{
        enabled: true,
      }}
      config={{
        appearance: {
          mode: "auto", // 'light' | 'dark' | 'auto'
        },
        wallet: {
          display: "modal", // 'modal' | 'drawer'
          preference: "all",
        },
      }}
    >
      <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
    </OnchainKitProvider>
  );
}

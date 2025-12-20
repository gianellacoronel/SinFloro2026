"use client";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { ReactNode } from "react";
import { base } from "viem/chains";

export default function MyOnchainKitProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: "auto", // 'light' | 'dark' | 'auto'
        },
        wallet: {
          display: "modal", // 'modal' | 'drawer'
        },
      }}
    >
      {children}
    </OnchainKitProvider>
  );
}

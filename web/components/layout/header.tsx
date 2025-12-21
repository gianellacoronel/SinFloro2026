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
import { MonopolyButton } from "../custom/monopoly-button";

export function Header() {
  // const [token, setToken] = useState<string | null>(null);
  // const [userData, setUserData] = useState<{ fid: number } | null>(null);

  // async function signIn() {
  //   try {
  //     const { token } = await sdk.quickAuth.getToken();
  //     setToken(token);

  //     const response = await sdk.quickAuth.fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/auth`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       },
  //     );

  //     const data = await response.json();
  //     setUserData(data);
  //   } catch (error) {
  //     console.error("Authentication failed: ", error);
  //   }
  // }

  // function signOut() {
  //   setToken(null);
  //   setUserData(null);
  // }

  return (
    <header className="sticky top-0 z-40 bg-card border-b-4 border-border">
      <div className="flex items-center justify-between px-4 py-3">
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
        {/*{!token ? (
          <MonopolyButton
            variant="secondary"
            monopolySize="sm"
            onClick={signIn}
          >
            <Wallet className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Conectar</span>
          </MonopolyButton>
        ) : (
          <div>
            <p>Authenticated as FID: {userData?.fid}</p>
            <Button onClick={signOut}>Sign Out</Button>
          </div>
        )}*/}
        <Wallet>
          <ConnectWallet
            render={({ label, onClick, status, isLoading }) => (
              <MonopolyButton
                variant="secondary"
                monopolySize="sm"
                onClick={onClick}
                disabled={isLoading}
              >
                <span className="hidden sm:inline">
                  {status === "disconnected" ? "Comienza ahora" : label}
                </span>
              </MonopolyButton>
            )}
          />
          <WalletDropdown>
            <Identity
              className="px-4 pt-3 pb-2 hover:bg-blue-200"
              hasCopyAddressOnClick
            >
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownLink
              className="hover:bg-blue-200"
              icon="wallet"
              href="https://keys.coinbase.com"
            >
              Wallet
            </WalletDropdownLink>
            <WalletDropdownDisconnect className="hover:bg-blue-200" />
          </WalletDropdown>
        </Wallet>
      </div>
    </header>
  );
}

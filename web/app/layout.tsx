import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Analytics } from "@vercel/analytics/next";
import { ConvexClientProvider } from "./ConvexClientProvider";
import ClientMiniApp from "./client-miniapp";
import "@coinbase/onchainkit/styles.css";
import Providers from "./Providers";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sin Floro 2026",
    description: "Predict the 2026 winner",
    other: {
      "fc:miniapp": JSON.stringify({
        version: "next",
        imageUrl: "https://sin-floro-2026.vercel.app/hero-image.png",
        button: {
          title: `Predict the 2026 Winner`,
          action: {
            type: "predict_2026_winner",
            name: "Sin Floro 2026",
            url: "https://sin-floro-2026.vercel.app",
            splashImageUrl: "https://sin-floro-2026.vercel.app/app-icon.png",
            splashBackgroundColor: "#ffe3aa",
          },
        },
      }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="es">
        <body
          className={`${oswald.variable} ${inter.variable} font-sans antialiased`}
        >
          <ClientMiniApp />
          <div className="min-h-screen bg-background andean-pattern pb-28 md:pb-8">
            <Header />

            <ConvexClientProvider>{children}</ConvexClientProvider>
            <MobileNav />
          </div>
          <Analytics />
        </body>
      </html>
    </Providers>
  );
}

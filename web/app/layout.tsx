import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { DesktopNav } from "@/components/layout/desktop-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Analytics } from "@vercel/analytics/next";
import { ConvexClientProvider } from "./ConvexClientProvider";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sin Floro 2026 | Prediction Market",
  description:
    "Web3 Prediction Market for Peruvian Elections 2026 - No Floro, Just Data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${oswald.variable} ${inter.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-background andean-pattern pb-28 md:pb-8">
          <Header />
          <div className="hidden md:block max-w-6xl mx-auto px-4 py-4">
            <DesktopNav />
          </div>
          <ConvexClientProvider>{children}</ConvexClientProvider>
          <MobileNav />
        </div>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Oswald } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${oswald.variable} ${inter.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-background andean-pattern pb-28 md:pb-8">
          {children}
        </div>
      </body>
    </html>
  );
}

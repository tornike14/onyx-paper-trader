import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tornikyx Odds",
  description: "Paper trading for prediction markets.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className={`${geist.variable} h-full antialiased`}>
    <body className="min-h-full bg-bg text-text-high">{children}</body>
  </html>
);

export default RootLayout;

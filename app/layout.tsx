import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tornikyx Odds",
  description: "Paper trading for prediction markets.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" className="h-full antialiased">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
    </head>
    <body className="min-h-full bg-bg text-text-high">{children}</body>
  </html>
);

export default RootLayout;

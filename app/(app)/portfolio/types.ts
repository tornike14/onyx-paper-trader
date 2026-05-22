export type PositionRow = {
  id: string;
  marketSymbol: string;
  marketName: string;
  side: "YES" | "NO";
  shares: number;
  avgPrice: number;
  currentPrice: number | null;
  costBasis: number;
  marketValue: number | null;
  unrealizedPnl: number | null;
  unrealizedPnlPct: number | null;
};

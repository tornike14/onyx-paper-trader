import type { UpstreamMarket } from "@/lib/upstream";
import type { PositionRow } from "./types";

type RawPosition = {
  id: string;
  marketSymbol: string;
  marketName: string;
  side: "YES" | "NO";
  shares: number;
  avgPrice: string;
};

export const computePositionRows = (
  positions: RawPosition[],
  markets: UpstreamMarket[],
): PositionRow[] => {
  const priceBySymbol = new Map<string, number>();
  for (const m of markets) {
    if (m.yes_price !== null) priceBySymbol.set(m.symbol, m.yes_price);
  }

  const rows: PositionRow[] = [];
  for (const p of positions) {
    const avgPrice = Number(p.avgPrice);
    const costBasis = avgPrice * p.shares;
    const yesPrice = priceBySymbol.get(p.marketSymbol) ?? null;
    const currentPrice =
      yesPrice === null ? null : p.side === "YES" ? yesPrice : 1 - yesPrice;
    const marketValue = currentPrice === null ? null : currentPrice * p.shares;
    const unrealizedPnl = marketValue === null ? null : marketValue - costBasis;
    const unrealizedPnlPct =
      unrealizedPnl === null || costBasis === 0
        ? null
        : (unrealizedPnl / costBasis) * 100;

    rows.push({
      id: p.id,
      marketSymbol: p.marketSymbol,
      marketName: p.marketName,
      side: p.side,
      shares: p.shares,
      avgPrice,
      currentPrice,
      costBasis,
      marketValue,
      unrealizedPnl,
      unrealizedPnlPct,
    });
  }

  return rows.sort((a, b) => a.marketName.localeCompare(b.marketName));
};

export const sumPnl = (rows: PositionRow[]) => {
  let total = 0;
  for (const r of rows) {
    if (r.unrealizedPnl !== null) total += r.unrealizedPnl;
  }
  return total;
};

export const sumCostBasis = (rows: PositionRow[]) => {
  let total = 0;
  for (const r of rows) total += r.costBasis;
  return total;
};

export const sumMarketValue = (rows: PositionRow[]) => {
  let total = 0;
  for (const r of rows) {
    if (r.marketValue !== null) total += r.marketValue;
    else total += r.costBasis;
  }
  return total;
};

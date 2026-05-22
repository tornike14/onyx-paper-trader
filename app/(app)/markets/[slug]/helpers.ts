import type { ParsedMarket } from "../types";
import type { Category, CategorizedMarkets } from "./types";

const SPREAD = /^.+\s[+-]\d/;
const TOTAL = /^(Over|Under)\s+\d/i;

const categorize = (m: ParsedMarket, home: string, away: string): Category => {
  if (m.selection === home || m.selection === away) return "Moneyline";
  if (TOTAL.test(m.selection)) return "Total";
  if (SPREAD.test(m.selection)) return "Spread";
  return "Other";
};

export const categorizeMarkets = (
  markets: ParsedMarket[],
  home: string,
  away: string,
): CategorizedMarkets => {
  const out: CategorizedMarkets = { Moneyline: [], Spread: [], Total: [], Other: [] };
  for (const m of markets) {
    out[categorize(m, home, away)].push(m);
  }
  out.Spread.sort((a, b) => a.selection.localeCompare(b.selection));
  out.Total.sort((a, b) => a.selection.localeCompare(b.selection));
  return out;
};

import type { ParsedMarket } from "../types";

export type Category = "Moneyline" | "Spread" | "Total" | "Other";

export type CategorizedMarkets = {
  Moneyline: ParsedMarket[];
  Spread: ParsedMarket[];
  Total: ParsedMarket[];
  Other: ParsedMarket[];
};

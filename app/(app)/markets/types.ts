import type { UpstreamMarket } from "@/lib/upstream";

export type ParsedMarket = UpstreamMarket & {
  eventName: string;
  selection: string;
  venue: string;
  dateCode: string;
  yesPrice: number;
};

export type EventGroup = {
  eventName: string;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  dateCode: string;
  markets: ParsedMarket[];
  homeMoneyline: ParsedMarket | null;
  awayMoneyline: ParsedMarket | null;
};

import type { UpstreamMarket } from "@/lib/upstream";
import type { EventGroup, ParsedMarket } from "./types";

export const parseMarket = (m: UpstreamMarket): ParsedMarket | null => {
  if (m.yes_price === null) return null;
  const [eventName, selection, venue, dateCode] = m.name.split(" ; ");
  if (!eventName || !selection) return null;
  return {
    ...m,
    eventName,
    selection,
    venue: venue ?? "",
    dateCode: dateCode ?? "",
    yesPrice: m.yes_price,
  };
};

const splitTeams = (eventName: string): [string, string] => {
  const i = eventName.indexOf(" vs ");
  if (i === -1) return [eventName, ""];
  return [eventName.slice(0, i), eventName.slice(i + 4)];
};

export const groupByEvent = (raw: UpstreamMarket[]): EventGroup[] => {
  const byEvent = new Map<string, ParsedMarket[]>();
  for (const m of raw) {
    const parsed = parseMarket(m);
    if (!parsed) continue;
    const bucket = byEvent.get(parsed.eventName);
    if (bucket) bucket.push(parsed);
    else byEvent.set(parsed.eventName, [parsed]);
  }

  const groups: EventGroup[] = [];
  for (const [eventName, markets] of byEvent) {
    const [home, away] = splitTeams(eventName);
    const first = markets[0];
    groups.push({
      eventName,
      homeTeam: home,
      awayTeam: away,
      venue: first?.venue ?? "",
      dateCode: first?.dateCode ?? "",
      markets,
      homeMoneyline: markets.find((m) => m.selection === home) ?? null,
      awayMoneyline: markets.find((m) => m.selection === away) ?? null,
    });
  }

  return groups.sort((a, b) => a.eventName.localeCompare(b.eventName));
};

export const formatPrice = (price: number) => `${Math.round(price * 100)}¢`;

export const formatDateCode = (code: string): string => {
  if (code.length !== 6) return code;
  const date = new Date(`20${code.slice(0, 2)}-${code.slice(2, 4)}-${code.slice(4, 6)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return code;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
};

export const eventSlug = (eventName: string) =>
  eventName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

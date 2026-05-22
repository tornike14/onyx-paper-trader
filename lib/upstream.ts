export type UpstreamMarket = {
  id: string;
  symbol: string;
  sport: string;
  name: string;
  event_name: string | null;
  status: string;
  expiry_date: string;
  min_price: number;
  max_price: number;
  yes_price: number | null;
};

const BASE = process.env.UPSTREAM_BASE_URL ?? "https://predictions.dev-onyxodds.com";

export const fetchMarkets = async (): Promise<UpstreamMarket[]> => {
  const res = await fetch(`${BASE}/markets?limit=300&status=open`, {
    next: { revalidate: 10 },
  });
  if (!res.ok) throw new Error(`Upstream /markets failed: ${res.status}`);
  return res.json();
};

export const fetchPricedMarkets = async (): Promise<UpstreamMarket[]> => {
  const all = await fetchMarkets();
  const priced: UpstreamMarket[] = [];
  for (const m of all) {
    if (m.yes_price !== null) priced.push(m);
  }
  return priced;
};

import { fetchMarkets } from "@/lib/upstream";
import { groupByEvent } from "./helpers";
import EventCard from "./components/EventCard";

const MarketsPage = async () => {
  const markets = await fetchMarkets();
  const groups = groupByEvent(markets);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Markets</h1>
        <span className="text-sm text-text-dim">
          {groups.length} event{groups.length === 1 ? "" : "s"}
        </span>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-card border border-border bg-bg-elevated p-8 text-center text-text-mid">
          No open markets right now.
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <EventCard key={g.eventName} group={g} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketsPage;

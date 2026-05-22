import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchMarkets } from "@/lib/upstream";
import { groupByEvent, eventSlug, formatDateCode } from "../helpers";
import { categorizeMarkets } from "./helpers";
import MarketSection from "./components/MarketSection";
import AutoRefresh from "@/components/ui/AutoRefresh";

const EventPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const markets = await fetchMarkets();
  const groups = groupByEvent(markets);
  const group = groups.find((g) => eventSlug(g.eventName) === slug);
  if (!group) notFound();

  const categories = categorizeMarkets(group.markets, group.homeTeam, group.awayTeam);

  return (
    <div className="space-y-6">
      <AutoRefresh />
      <div className="space-y-2">
        <Link
          href="/markets"
          className="text-xs text-text-mid hover:text-text-high"
        >
          &larr; All markets
        </Link>
        <div className="flex items-baseline justify-between gap-4 flex-wrap">
          <h1 className="text-2xl font-semibold">{group.eventName}</h1>
          <div className="text-sm text-text-dim space-x-3">
            <span>{formatDateCode(group.dateCode)}</span>
            {group.venue ? <span>{group.venue}</span> : null}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <MarketSection title="Moneyline" slug={slug} markets={categories.Moneyline} />
        <div className="grid gap-4 lg:grid-cols-2">
          <MarketSection title="Spread" slug={slug} markets={categories.Spread} />
          <MarketSection title="Total" slug={slug} markets={categories.Total} />
        </div>
        <MarketSection title="Other" slug={slug} markets={categories.Other} />
      </div>
    </div>
  );
};

export default EventPage;

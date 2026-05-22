import type { ParsedMarket } from "../../types";
import MarketRow from "./MarketRow";

type Props = {
  title: string;
  slug: string;
  markets: ParsedMarket[];
};

const MarketSection = ({ title, slug, markets }: Props) => {
  if (markets.length === 0) return null;
  return (
    <section className="rounded-card border border-border bg-bg-elevated/30 overflow-hidden">
      <header className="px-4 py-3 flex items-center justify-between border-b border-border">
        <h2 className="text-sm font-semibold text-text-high">{title}</h2>
        <span className="text-xs text-text-dim">{markets.length}</span>
      </header>
      <div>
        {markets.map((m) => (
          <MarketRow key={m.symbol} slug={slug} market={m} />
        ))}
      </div>
    </section>
  );
};

export default MarketSection;

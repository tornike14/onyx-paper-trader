import Link from "next/link";
import type { ParsedMarket } from "../../types";
import { formatPrice } from "../../helpers";
import SelectionLabel from "../../components/SelectionLabel";

const MarketRow = ({ slug, market }: { slug: string; market: ParsedMarket }) => {
  const noPrice = 1 - market.yesPrice;
  const href = `/markets/${slug}/${encodeURIComponent(market.symbol)}`;
  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center px-4 py-2 border-b border-border/60 last:border-b-0">
      <span className="text-sm truncate">
        <SelectionLabel selection={market.selection} />
      </span>
      <Link
        href={`${href}?side=YES`}
        className="h-9 px-3 rounded-btn border border-border bg-bg-elevated hover:border-brand hover:bg-bg-raised flex items-center gap-2 transition"
      >
        <span className="text-[10px] text-text-mid">YES</span>
        <span className="text-sm font-mono text-text-high">{formatPrice(market.yesPrice)}</span>
      </Link>
      <Link
        href={`${href}?side=NO`}
        className="h-9 px-3 rounded-btn border border-border bg-bg-elevated hover:border-brand hover:bg-bg-raised flex items-center gap-2 transition"
      >
        <span className="text-[10px] text-text-mid">NO</span>
        <span className="text-sm font-mono text-text-high">{formatPrice(noPrice)}</span>
      </Link>
    </div>
  );
};

export default MarketRow;

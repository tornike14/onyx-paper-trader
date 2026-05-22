import Link from "next/link";
import type { ParsedMarket } from "../../types";
import { formatPrice } from "../../helpers";

const SPREAD_RE = /^(.+?)\s([+-]\d+(?:\.\d+)?)$/;
const TOTAL_RE = /^(Over|Under)\s+([\d.]+)$/i;

const renderSelection = (selection: string) => {
  const spread = SPREAD_RE.exec(selection);
  if (spread) {
    return (
      <>
        <span className="text-text-high">{spread[1]} </span>
        <span className="font-mono text-brand">{spread[2]}</span>
      </>
    );
  }
  const total = TOTAL_RE.exec(selection);
  if (total) {
    return (
      <>
        <span className="text-text-high">{total[1]} </span>
        <span className="font-mono text-brand">{total[2]}</span>
      </>
    );
  }
  return <span className="text-text-high">{selection}</span>;
};

const MarketRow = ({ slug, market }: { slug: string; market: ParsedMarket }) => {
  const noPrice = 1 - market.yesPrice;
  const href = `/markets/${slug}/${encodeURIComponent(market.symbol)}`;
  return (
    <div className="grid grid-cols-[1fr_auto_auto] gap-2 items-center px-4 py-2 border-b border-border/60 last:border-b-0">
      <span className="text-sm truncate">{renderSelection(market.selection)}</span>
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

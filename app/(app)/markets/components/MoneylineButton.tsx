import Link from "next/link";
import type { ParsedMarket } from "../types";
import { formatPrice } from "../helpers";

type Props = {
  team: string;
  market: ParsedMarket | null;
  slug: string;
};

const MoneylineButton = ({ team, market, slug }: Props) => {
  if (!market) {
    return (
      <div className="h-16 rounded-btn border border-border/60 bg-bg-elevated/30 px-3 flex items-center justify-between text-text-dim">
        <span className="text-sm truncate">{team}</span>
        <span className="text-xs">-</span>
      </div>
    );
  }
  return (
    <Link
      href={`/markets/${slug}/${encodeURIComponent(market.symbol)}`}
      className="h-16 rounded-btn border border-border bg-bg-elevated hover:border-brand hover:bg-bg-raised px-3 flex items-center justify-between transition"
    >
      <span className="text-sm text-text-high truncate">{team}</span>
      <span className="text-base font-mono text-text-high shrink-0 ml-2">
        {formatPrice(market.yesPrice)}
      </span>
    </Link>
  );
};

export default MoneylineButton;

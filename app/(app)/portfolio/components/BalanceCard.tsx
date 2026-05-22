import { formatUsd } from "@/lib/money";

type Props = {
  cash: number;
  marketValue: number;
  unrealizedPnl: number;
};

const BalanceCard = ({ cash, marketValue, unrealizedPnl }: Props) => {
  const totalEquity = cash + marketValue;
  const pnlColor =
    unrealizedPnl > 0 ? "text-pos" : unrealizedPnl < 0 ? "text-neg" : "text-text-mid";
  const pnlSign = unrealizedPnl > 0 ? "+" : "";

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-card border border-border bg-bg-elevated/40 p-4 space-y-1">
        <div className="text-xs uppercase tracking-wider text-text-dim">Cash</div>
        <div className="text-2xl font-mono text-text-high">{formatUsd(cash)}</div>
      </div>
      <div className="rounded-card border border-border bg-bg-elevated/40 p-4 space-y-1">
        <div className="text-xs uppercase tracking-wider text-text-dim">Open positions</div>
        <div className="text-2xl font-mono text-text-high">{formatUsd(marketValue)}</div>
      </div>
      <div className="rounded-card border border-border bg-bg-elevated/40 p-4 space-y-1">
        <div className="text-xs uppercase tracking-wider text-text-dim">Unrealized P&L</div>
        <div className={`text-2xl font-mono ${pnlColor}`}>
          {pnlSign}
          {formatUsd(unrealizedPnl)}
        </div>
        <div className="text-xs text-text-dim">Total equity {formatUsd(totalEquity)}</div>
      </div>
    </div>
  );
};

export default BalanceCard;

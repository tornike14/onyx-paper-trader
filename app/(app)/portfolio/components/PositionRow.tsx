import Link from "next/link";
import type { PositionRow as PositionRowType } from "../types";
import { formatUsd, formatCents } from "@/lib/money";
import { eventSlug } from "../../markets/helpers";

const PositionRow = ({ row }: { row: PositionRowType }) => {
  const eventName = row.marketName.split(" ; ")[0] ?? "";
  const selection = row.marketName.split(" ; ")[1] ?? row.marketName;
  const slug = eventName ? eventSlug(eventName) : null;
  const href = slug
    ? `/markets/${slug}/${encodeURIComponent(row.marketSymbol)}`
    : null;

  const pnl = row.unrealizedPnl;
  const pnlColor =
    pnl === null
      ? "text-text-dim"
      : pnl > 0
        ? "text-pos"
        : pnl < 0
          ? "text-neg"
          : "text-text-mid";
  const pnlText =
    pnl === null
      ? "-"
      : `${pnl > 0 ? "+" : ""}${formatUsd(pnl)}${
          row.unrealizedPnlPct !== null
            ? ` (${pnl > 0 ? "+" : ""}${row.unrealizedPnlPct.toFixed(1)}%)`
            : ""
        }`;

  const sideClass =
    row.side === "YES"
      ? "bg-pos/10 text-pos border-pos/30"
      : "bg-neg/10 text-neg border-neg/30";

  return (
    <tr className="border-b border-border/60 last:border-b-0">
      <td className="px-4 py-3">
        <div className="space-y-0.5">
          <div className="text-sm text-text-high truncate max-w-xs">{selection}</div>
          <div className="text-xs text-text-dim truncate max-w-xs">{eventName}</div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2 h-6 rounded-pill border text-[10px] font-medium uppercase tracking-wider ${sideClass}`}
        >
          {row.side}
        </span>
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm text-text-high">
        {row.shares}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm text-text-mid">
        {formatCents(row.avgPrice)}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm text-text-high">
        {row.currentPrice === null ? "-" : formatCents(row.currentPrice)}
      </td>
      <td className="px-4 py-3 text-right font-mono text-sm">
        {row.marketValue === null ? "-" : formatUsd(row.marketValue)}
      </td>
      <td className={`px-4 py-3 text-right font-mono text-sm ${pnlColor}`}>{pnlText}</td>
      <td className="px-4 py-3 text-right">
        {href ? (
          <Link href={href} className="text-xs text-brand hover:text-brand-hover">
            Trade
          </Link>
        ) : null}
      </td>
    </tr>
  );
};

export default PositionRow;

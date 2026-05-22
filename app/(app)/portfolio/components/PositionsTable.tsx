import type { PositionRow as PositionRowType } from "../types";
import PositionRow from "./PositionRow";

const PositionsTable = ({ rows }: { rows: PositionRowType[] }) => {
  if (rows.length === 0) {
    return (
      <div className="rounded-card border border-border bg-bg-elevated/30 p-10 text-center space-y-2">
        <p className="text-text-mid">No open positions.</p>
        <p className="text-sm text-text-dim">
          Head to{" "}
          <a href="/markets" className="text-brand hover:text-brand-hover">
            Markets
          </a>{" "}
          to place your first order.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-bg-elevated/30 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-[10px] uppercase tracking-wider text-text-dim">
            <th className="px-4 py-3 text-left font-medium">Market</th>
            <th className="px-4 py-3 text-left font-medium">Side</th>
            <th className="px-4 py-3 text-right font-medium">Shares</th>
            <th className="px-4 py-3 text-right font-medium">Avg</th>
            <th className="px-4 py-3 text-right font-medium">Current</th>
            <th className="px-4 py-3 text-right font-medium">Value</th>
            <th className="px-4 py-3 text-right font-medium">P&L</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <PositionRow key={r.id} row={r} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PositionsTable;

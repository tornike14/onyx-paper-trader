"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { formatUsd, formatCents } from "@/lib/money";

type Props = {
  symbol: string;
  yesPrice: number;
  initialSide: "YES" | "NO";
  balance: number;
};

const OrderTicket = ({ symbol, yesPrice, initialSide, balance }: Props) => {
  const router = useRouter();
  const [side, setSide] = useState<"YES" | "NO">(initialSide);
  const [shares, setShares] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const price = side === "YES" ? yesPrice : 1 - yesPrice;
  const cost = shares * price;
  const insufficient = cost > balance;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPending(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symbol, side, shares }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: "Order failed" }));
      setError(data.error ?? "Order failed");
      setPending(false);
      return;
    }

    router.push("/portfolio");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setSide("YES")}
          className={`h-12 rounded-btn border font-medium transition ${
            side === "YES"
              ? "border-pos bg-pos/10 text-pos"
              : "border-border bg-bg-elevated text-text-mid hover:border-border-strong"
          }`}
        >
          <div className="text-xs uppercase tracking-wider">Buy YES</div>
          <div className="text-sm font-mono">{formatCents(yesPrice)}</div>
        </button>
        <button
          type="button"
          onClick={() => setSide("NO")}
          className={`h-12 rounded-btn border font-medium transition ${
            side === "NO"
              ? "border-neg bg-neg/10 text-neg"
              : "border-border bg-bg-elevated text-text-mid hover:border-border-strong"
          }`}
        >
          <div className="text-xs uppercase tracking-wider">Buy NO</div>
          <div className="text-sm font-mono">{formatCents(1 - yesPrice)}</div>
        </button>
      </div>

      <label className="block space-y-1.5">
        <span className="text-xs uppercase tracking-wider text-text-mid">Shares</span>
        <input
          type="number"
          min={1}
          max={1000}
          step={1}
          required
          value={shares}
          onChange={(e) => setShares(Math.max(1, Number(e.target.value) || 1))}
          className="w-full h-11 px-3 rounded-btn bg-bg-elevated border border-border text-text-high text-base font-mono focus:outline-none focus:border-brand transition"
        />
      </label>

      <div className="rounded-card border border-border bg-bg-elevated/50 p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-text-mid">Price per share</span>
          <span className="font-mono text-text-high">{formatCents(price)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-mid">Shares</span>
          <span className="font-mono text-text-high">{shares}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-border">
          <span className="text-text-mid">Total cost</span>
          <span className="font-mono text-text-high font-semibold">{formatUsd(cost)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-text-dim">Available balance</span>
          <span className={`font-mono ${insufficient ? "text-neg" : "text-text-dim"}`}>
            {formatUsd(balance)}
          </span>
        </div>
      </div>

      {error ? <p className="text-sm text-neg">{error}</p> : null}

      <Button
        type="submit"
        disabled={pending || insufficient}
        className="w-full"
      >
        {pending
          ? "Filling..."
          : insufficient
            ? "Insufficient balance"
            : `Buy ${shares} ${side} for ${formatUsd(cost)}`}
      </Button>
    </form>
  );
};

export default OrderTicket;

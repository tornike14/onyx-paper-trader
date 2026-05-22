import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { fillOrder, InsufficientFundsError } from "@/lib/orders";
import { fetchMarkets } from "@/lib/upstream";

const orderSchema = z.object({
  symbol: z.string().min(1),
  side: z.enum(["YES", "NO"]),
  shares: z.int().positive().max(1000),
});

export const POST = async (req: Request) => {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  }

  const { symbol, side, shares } = parsed.data;

  const markets = await fetchMarkets();
  const market = markets.find((m) => m.symbol === symbol);
  if (!market || market.yes_price === null) {
    return NextResponse.json({ error: "Market not available" }, { status: 404 });
  }

  const fillPrice = side === "YES" ? market.yes_price : 1 - market.yes_price;

  try {
    const order = await fillOrder({
      userId: session.user.id,
      marketSymbol: symbol,
      marketName: market.name,
      side,
      shares,
      fillPrice,
    });
    return NextResponse.json({ ok: true, order });
  } catch (err) {
    if (err instanceof InsufficientFundsError) {
      return NextResponse.json(
        { error: `Not enough balance. Need $${err.required.toFixed(2)}, have $${err.available.toFixed(2)}.` },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Order failed" }, { status: 500 });
  }
};

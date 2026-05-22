import { and, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { balances, orders, positions } from "@/lib/db/schema";

export type FillRequest = {
  userId: string;
  marketSymbol: string;
  marketName: string;
  side: "YES" | "NO";
  shares: number;
  fillPrice: number;
};

export class InsufficientFundsError extends Error {
  constructor(public required: number, public available: number) {
    super(`Need ${required.toFixed(2)}, have ${available.toFixed(2)}`);
  }
}

export const fillOrder = async (req: FillRequest) => {
  const { userId, marketSymbol, marketName, side, shares, fillPrice } = req;
  const cost = shares * fillPrice;

  return db.transaction(async (tx) => {
    const [bal] = await tx.select().from(balances).where(eq(balances.userId, userId));
    if (!bal) throw new Error("Balance not found");

    const available = Number(bal.available);
    if (available < cost) throw new InsufficientFundsError(cost, available);

    await tx
      .update(balances)
      .set({ available: sql`${balances.available} - ${cost}` })
      .where(eq(balances.userId, userId));

    const [order] = await tx
      .insert(orders)
      .values({
        userId,
        marketSymbol,
        marketName,
        side,
        shares,
        fillPrice: fillPrice.toFixed(4),
      })
      .returning();

    const [existing] = await tx
      .select()
      .from(positions)
      .where(
        and(
          eq(positions.userId, userId),
          eq(positions.marketSymbol, marketSymbol),
          eq(positions.side, side),
        ),
      );

    if (existing) {
      const oldShares = existing.shares;
      const oldAvg = Number(existing.avgPrice);
      const newShares = oldShares + shares;
      const newAvg = (oldShares * oldAvg + shares * fillPrice) / newShares;
      await tx
        .update(positions)
        .set({ shares: newShares, avgPrice: newAvg.toFixed(4) })
        .where(eq(positions.id, existing.id));
    } else {
      await tx.insert(positions).values({
        userId,
        marketSymbol,
        marketName,
        side,
        shares,
        avgPrice: fillPrice.toFixed(4),
      });
    }

    return order;
  });
};

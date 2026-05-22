import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { balances, positions } from "@/lib/db/schema";
import { fetchMarkets } from "@/lib/upstream";
import { computePositionRows, sumMarketValue, sumPnl } from "./helpers";
import BalanceCard from "./components/BalanceCard";
import PositionsTable from "./components/PositionsTable";

const PortfolioPage = async () => {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");
  const userId = session.user.id;

  const [bal] = await db
    .select({ available: balances.available })
    .from(balances)
    .where(eq(balances.userId, userId));
  const cash = bal ? Number(bal.available) : 0;

  const rawPositions = await db
    .select({
      id: positions.id,
      marketSymbol: positions.marketSymbol,
      marketName: positions.marketName,
      side: positions.side,
      shares: positions.shares,
      avgPrice: positions.avgPrice,
    })
    .from(positions)
    .where(eq(positions.userId, userId));

  const markets = await fetchMarkets();
  const rows = computePositionRows(rawPositions, markets);
  const marketValue = sumMarketValue(rows);
  const unrealizedPnl = sumPnl(rows);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Portfolio</h1>
      <BalanceCard cash={cash} marketValue={marketValue} unrealizedPnl={unrealizedPnl} />
      <PositionsTable rows={rows} />
    </div>
  );
};

export default PortfolioPage;

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { balances } from "@/lib/db/schema";
import { fetchMarkets } from "@/lib/upstream";
import { parseMarket } from "../../helpers";
import { formatCents } from "@/lib/money";
import SelectionLabel from "../../components/SelectionLabel";
import OrderTicket from "./components/OrderTicket";

type SearchParams = { side?: string };

const OrderPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; symbol: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { slug, symbol } = await params;
  const decodedSymbol = decodeURIComponent(symbol);
  const { side: sideParam } = await searchParams;
  const initialSide: "YES" | "NO" = sideParam === "NO" ? "NO" : "YES";

  const markets = await fetchMarkets();
  const raw = markets.find((m) => m.symbol === decodedSymbol);
  if (!raw) notFound();

  const parsed = parseMarket(raw);
  if (!parsed) notFound();

  const [bal] = await db
    .select({ available: balances.available })
    .from(balances)
    .where(eq(balances.userId, session.user.id));
  const balance = bal ? Number(bal.available) : 0;

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-2">
        <Link
          href={`/markets/${slug}`}
          className="text-xs text-text-mid hover:text-text-high"
        >
          &larr; {parsed.eventName}
        </Link>
        <h1 className="text-2xl font-semibold">
          <SelectionLabel selection={parsed.selection} />
        </h1>
        <div className="flex items-baseline gap-3 text-sm text-text-dim">
          <span className="font-mono text-text-high text-base">
            YES {formatCents(parsed.yesPrice)} / NO {formatCents(1 - parsed.yesPrice)}
          </span>
        </div>
      </div>

      <OrderTicket
        symbol={parsed.symbol}
        yesPrice={parsed.yesPrice}
        initialSide={initialSide}
        balance={balance}
      />
    </div>
  );
};

export default OrderPage;

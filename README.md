# Tornikyx Odds

A paper-trading interface for the [Onyx Predictions dev API](https://predictions.dev-onyxodds.com/docs). Sign up, get $1,000 of paper money, place YES/NO orders against live upstream prices, track your positions and unrealized P&L.

**Live:** onyx-paper-trader.vercel.app

## Stack

- **Next.js 16** (App Router, RSC)
- **TypeScript** strict, **Tailwind 4** (CSS-first `@theme`)
- **NextAuth v5** (Credentials provider, JWT session)
- **Drizzle ORM** + **Neon Postgres**
- **bcryptjs** for password hashing, **zod** for input validation
- Deployed on **Vercel**

## Run locally

```bash
pnpm install
cp .env.example .env.local   # fill DATABASE_URL, AUTH_SECRET
pnpm db:push
pnpm dev
```

## Architecture notes

- **Own auth + own DB.** Paper-trading state (users, balances, orders, positions) lives in our Postgres. Nothing hits the upstream venue.
- **`fillOrder` is a Drizzle transaction.** Debit balance, insert order, upsert position (`avgPrice` weighted by share count) all in one transaction. That logic lives in `lib/orders.ts` and is the first place I'd write tests if this were going to production.
- **Server-rendered pages with 10s revalidation + client `router.refresh()` on a timer.** Pages re-fetch upstream prices on the server every 10s; a small `<AutoRefresh />` client component pings the router to pick them up. Defensible for prediction markets (price changes are minute-scale, not millisecond-scale) and avoids the operational weight of WebSockets for a 90-minute build.
- **Auth-walled routes via `proxy.ts`** (Next 16 renamed `middleware.ts`). `/markets/*` and `/portfolio` redirect to `/login` when logged out.
- **Drizzle `db:push`** instead of generated migrations. Right call for a sprint; a real deployment would use `drizzle-kit generate` and migration files.

## Data quirks (dev API)

This took a chunk of the build time to figure out, so calling it out:

- `/api/markets/transformed`, `/games/{sport}`, `/events/{id}/markets`, `/games/{game_id}/markets`'s structured fields all return empty or null in dev. The structured grouping (`marketType`, `participant`, etc.) is not populated upstream.
- Only `/markets?limit=300&status=open` returns real data, and event grouping has to come from parsing `name` (format: `"Event ; Selection ; Venue ; YYMMDD"`).
- `GET /markets/{symbol}` returns `yes_price: null` even for priced markets. We use the list endpoint for fill prices.
- The API publishes spreads independently per team without enforcing symmetry. "Duke -1.5" and "St. John's -1.5" can both exist as separate markets even though that's nonsensical in a real spread book. Acknowledged but not corrected in the UI.
- 4 events, ~46 markets each, only 4 distinct prices in the data (20¢ / 50¢ / 51¢ / 80¢). The app handles continuous pricing; the dataset just doesn't exercise it.

## What I'd build next

- **SELL / close-position** flow. Currently buy-only.
- **Realized P&L** when markets settle.
- **Unit tests on `lib/orders.ts#fillOrder`.** The transaction logic is the highest-risk surface; testing it under concurrent fills would be the first investment.
- **WebSocket prices** if the production API supports them and live volume is meaningful. The current 10s revalidate is intentional for the dev dataset.
- **Search / filter** on the markets list (search by team, filter by event type).
- **Mobile polish** beyond "doesn't break".

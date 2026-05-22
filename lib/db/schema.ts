import {
  pgTable,
  uuid,
  text,
  numeric,
  integer,
  timestamp,
  unique,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const balances = pgTable("balances", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  available: numeric("available", { precision: 12, scale: 2 }).notNull().default("1000.00"),
});

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    marketSymbol: text("market_symbol").notNull(),
    marketName: text("market_name").notNull(),
    side: text("side", { enum: ["YES", "NO"] }).notNull(),
    shares: integer("shares").notNull(),
    fillPrice: numeric("fill_price", { precision: 5, scale: 4 }).notNull(),
    filledAt: timestamp("filled_at", { withTimezone: true }).defaultNow().notNull(),
    status: text("status").notNull().default("FILLED"),
  },
  (t) => [index("orders_user_filled_idx").on(t.userId, t.filledAt.desc())],
);

export const positions = pgTable(
  "positions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    marketSymbol: text("market_symbol").notNull(),
    marketName: text("market_name").notNull(),
    side: text("side", { enum: ["YES", "NO"] }).notNull(),
    shares: integer("shares").notNull(),
    avgPrice: numeric("avg_price", { precision: 5, scale: 4 }).notNull(),
  },
  (t) => [unique("positions_user_market_side_key").on(t.userId, t.marketSymbol, t.side)],
);

import { pgTable, text, real, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const poolsTable = pgTable("pools", {
  id: text("id").primaryKey(),
  project: text("project").notNull(),
  symbol: text("symbol").notNull(),
  chain: text("chain").notNull(),
  tvlUsd: real("tvl_usd").notNull().default(0),
  apy: real("apy").notNull().default(0),
  apyBase: real("apy_base"),
  apyReward: real("apy_reward"),
  il7d: real("il7d"),
  stablecoin: boolean("stablecoin").notNull().default(false),
  ilRisk: text("il_risk").notNull().default("no"),
  exposure: text("exposure").notNull().default("single"),
  riskScore: text("risk_score").notNull().default("C"),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPoolSchema = createInsertSchema(poolsTable).omit({ updatedAt: true });
export type InsertPool = z.infer<typeof insertPoolSchema>;
export type Pool = typeof poolsTable.$inferSelect;

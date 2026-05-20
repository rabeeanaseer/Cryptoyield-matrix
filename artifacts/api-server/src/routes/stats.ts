import { Router } from "express";
import { db, poolsTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { formatPool } from "./chains";
import { fetchAndStorePools } from "../lib/dataFetcher";

const router = Router();

router.get("/stats/summary", async (req, res) => {
  try {
    const rows = await db
      .select({
        totalPools: sql<number>`cast(count(*) as int)`,
        totalTvlUsd: sql<number>`sum(${poolsTable.tvlUsd})`,
        avgApy: sql<number>`avg(${poolsTable.apy})`,
        maxApy: sql<number>`max(${poolsTable.apy})`,
        totalChains: sql<number>`cast(count(distinct ${poolsTable.chain}) as int)`,
        totalProtocols: sql<number>`cast(count(distinct ${poolsTable.project}) as int)`,
        lastUpdated: sql<string>`max(${poolsTable.updatedAt})`,
      })
      .from(poolsTable);

    const r = rows[0];
    res.json({
      totalPools: r.totalPools ?? 0,
      totalTvlUsd: r.totalTvlUsd ?? 0,
      avgApy: r.avgApy ?? 0,
      maxApy: r.maxApy ?? 0,
      totalChains: r.totalChains ?? 0,
      totalProtocols: r.totalProtocols ?? 0,
      lastUpdated: r.lastUpdated ? new Date(r.lastUpdated).toISOString() : new Date().toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get stats summary");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stats/top-yields", async (req, res) => {
  try {
    const limit = Math.min(parseInt((req.query.limit as string) ?? "10"), 50);
    const pools = await db
      .select()
      .from(poolsTable)
      .orderBy(sql`${poolsTable.apy} desc`)
      .limit(limit);

    res.json(pools.map(formatPool));
  } catch (err) {
    req.log.error({ err }, "Failed to get top yields");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stats/by-chain", async (req, res) => {
  try {
    const rows = await db
      .select({
        chain: poolsTable.chain,
        poolCount: sql<number>`cast(count(*) as int)`,
        totalTvl: sql<number>`sum(${poolsTable.tvlUsd})`,
        avgApy: sql<number>`avg(${poolsTable.apy})`,
      })
      .from(poolsTable)
      .groupBy(poolsTable.chain)
      .orderBy(sql`sum(${poolsTable.tvlUsd}) desc`)
      .limit(20);

    res.json(
      rows.map((r) => ({
        chain: r.chain,
        poolCount: r.poolCount,
        totalTvl: r.totalTvl ?? 0,
        avgApy: r.avgApy ?? 0,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get stats by chain");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stats/by-token", async (req, res) => {
  try {
    const rows = await db
      .select({
        symbol: poolsTable.symbol,
        poolCount: sql<number>`cast(count(*) as int)`,
        avgApy: sql<number>`avg(${poolsTable.apy})`,
        maxApy: sql<number>`max(${poolsTable.apy})`,
        totalTvl: sql<number>`sum(${poolsTable.tvlUsd})`,
      })
      .from(poolsTable)
      .groupBy(poolsTable.symbol)
      .orderBy(sql`sum(${poolsTable.tvlUsd}) desc`)
      .limit(30);

    res.json(
      rows.map((r) => ({
        symbol: r.symbol,
        poolCount: r.poolCount,
        avgApy: r.avgApy ?? 0,
        maxApy: r.maxApy ?? 0,
        totalTvl: r.totalTvl ?? 0,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get stats by token");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/data/refresh", async (req, res) => {
  try {
    const count = await fetchAndStorePools();
    res.json({
      message: count > 0 ? "Data refreshed successfully" : "Refresh completed with warnings",
      poolsUpdated: count,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to trigger data refresh");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

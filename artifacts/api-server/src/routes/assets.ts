import { Router } from "express";
import { db, poolsTable } from "@workspace/db";
import { sql, eq, ilike } from "drizzle-orm";
import { formatPool } from "./chains";

const router = Router();

router.get("/assets", async (req, res) => {
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
      .limit(100);

    const assets = rows.map((row) => ({
      symbol: row.symbol,
      name: null as string | null,
      poolCount: row.poolCount,
      avgApy: row.avgApy ?? 0,
      maxApy: row.maxApy ?? 0,
      totalTvl: row.totalTvl ?? 0,
      priceUsd: null as number | null,
    }));

    res.json(assets);
  } catch (err) {
    req.log.error({ err }, "Failed to list assets");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/assets/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const upperSymbol = symbol.toUpperCase();

    const stats = await db
      .select({
        poolCount: sql<number>`cast(count(*) as int)`,
        avgApy: sql<number>`avg(${poolsTable.apy})`,
        maxApy: sql<number>`max(${poolsTable.apy})`,
        totalTvl: sql<number>`sum(${poolsTable.tvlUsd})`,
      })
      .from(poolsTable)
      .where(ilike(poolsTable.symbol, upperSymbol));

    let finalStats = stats[0];

    if (!finalStats || finalStats.poolCount === 0) {
      // Try partial match
      const partialStats = await db
        .select({
          poolCount: sql<number>`cast(count(*) as int)`,
          avgApy: sql<number>`avg(${poolsTable.apy})`,
          maxApy: sql<number>`max(${poolsTable.apy})`,
          totalTvl: sql<number>`sum(${poolsTable.tvlUsd})`,
        })
        .from(poolsTable)
        .where(ilike(poolsTable.symbol, `%${upperSymbol}%`));

      if (!partialStats[0] || partialStats[0].poolCount === 0) {
        res.status(404).json({ error: `Asset '${symbol}' not found` });
        return;
      }
      finalStats = partialStats[0];
    }

    const pools = await db
      .select()
      .from(poolsTable)
      .where(ilike(poolsTable.symbol, `%${upperSymbol}%`))
      .orderBy(sql`${poolsTable.tvlUsd} desc`)
      .limit(100);

    res.json({
      symbol: upperSymbol,
      name: null,
      poolCount: finalStats.poolCount,
      avgApy: finalStats.avgApy ?? 0,
      maxApy: finalStats.maxApy ?? 0,
      totalTvl: finalStats.totalTvl ?? 0,
      priceUsd: null,
      pools: pools.map(formatPool),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get asset");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

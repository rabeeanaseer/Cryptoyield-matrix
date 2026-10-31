import { Router } from "express";
import { db, poolsTable } from "@workspace/db";
import { sql, eq, ilike, desc } from "drizzle-orm";

const router = Router();

router.get("/chains", async (req, res) => {
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
      .limit(50);

    const chains = await Promise.all(
      rows.map(async (row) => {
        const topProtocols = await db
          .select({ project: poolsTable.project })
          .from(poolsTable)
          .where(eq(poolsTable.chain, row.chain))
          .groupBy(poolsTable.project)
          .orderBy(sql`sum(${poolsTable.tvlUsd}) desc`)
          .limit(5);

        return {
          name: capitalize(row.chain),
          slug: row.chain,
          poolCount: row.poolCount,
          totalTvl: row.totalTvl ?? 0,
          avgApy: row.avgApy ?? 0,
          topProtocols: topProtocols.map((p) => p.project),
        };
      })
    );

    res.json(chains);
  } catch (err) {
    req.log.error({ err }, "Failed to list chains");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/chains/:chainName", async (req, res) => {
  try {
    const { chainName } = req.params;
    const slug = chainName.toLowerCase();

    // 1. Try exact match
    let resolvedSlug = slug;
    let exactStats = await db
      .select({
        poolCount: sql<number>`cast(count(*) as int)`,
        totalTvl: sql<number>`sum(${poolsTable.tvlUsd})`,
        avgApy: sql<number>`avg(${poolsTable.apy})`,
      })
      .from(poolsTable)
      .where(eq(poolsTable.chain, slug));

    // 2. Fuzzy fallback — handles "Ethereum" → "ethereum", "eth" → "ethereum", etc.
    if (!exactStats[0] || exactStats[0].poolCount === 0) {
      const fuzzyMatch = await db
        .select({ chain: poolsTable.chain, tvl: sql<number>`sum(${poolsTable.tvlUsd})` })
        .from(poolsTable)
        .where(ilike(poolsTable.chain, `%${slug}%`))
        .groupBy(poolsTable.chain)
        .orderBy(sql`sum(${poolsTable.tvlUsd}) desc`)
        .limit(1);

      if (!fuzzyMatch[0]) {
        res.status(404).json({ error: `Chain '${chainName}' not found` });
        return;
      }

      resolvedSlug = fuzzyMatch[0].chain;
      exactStats = await db
        .select({
          poolCount: sql<number>`cast(count(*) as int)`,
          totalTvl: sql<number>`sum(${poolsTable.tvlUsd})`,
          avgApy: sql<number>`avg(${poolsTable.apy})`,
        })
        .from(poolsTable)
        .where(eq(poolsTable.chain, resolvedSlug));
    }

    const topProtocols = await db
      .select({ project: poolsTable.project })
      .from(poolsTable)
      .where(eq(poolsTable.chain, resolvedSlug))
      .groupBy(poolsTable.project)
      .orderBy(sql`sum(${poolsTable.tvlUsd}) desc`)
      .limit(5);

    const pools = await db
      .select()
      .from(poolsTable)
      .where(eq(poolsTable.chain, resolvedSlug))
      .orderBy(desc(poolsTable.tvlUsd))
      .limit(100);

    res.json({
      name: capitalize(resolvedSlug),
      slug: resolvedSlug,
      poolCount: exactStats[0].poolCount,
      totalTvl: exactStats[0].totalTvl ?? 0,
      avgApy: exactStats[0].avgApy ?? 0,
      topProtocols: topProtocols.map((p) => p.project),
      pools: pools.map(formatPool),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get chain");
    res.status(500).json({ error: "Internal server error" });
  }
});

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatPool(p: typeof poolsTable.$inferSelect) {
  return {
    id: p.id,
    project: p.project,
    symbol: p.symbol,
    chain: p.chain,
    tvlUsd: p.tvlUsd,
    apy: p.apy,
    apyBase: p.apyBase,
    apyReward: p.apyReward,
    il7d: p.il7d,
    riskScore: p.riskScore,
    stablecoin: p.stablecoin,
    ilRisk: p.ilRisk,
    exposure: p.exposure,
    updatedAt: p.updatedAt.toISOString(),
  };
}

export { formatPool };
export default router;

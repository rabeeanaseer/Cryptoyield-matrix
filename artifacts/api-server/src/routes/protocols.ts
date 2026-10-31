import { Router } from "express";
import { db, poolsTable } from "@workspace/db";
import { sql, eq, ilike, desc } from "drizzle-orm";
import { formatPool } from "./chains";

const router = Router();

router.get("/protocols", async (req, res) => {
  try {
    const rows = await db
      .select({
        project: poolsTable.project,
        poolCount: sql<number>`cast(count(*) as int)`,
        totalTvl: sql<number>`sum(${poolsTable.tvlUsd})`,
        avgApy: sql<number>`avg(${poolsTable.apy})`,
      })
      .from(poolsTable)
      .groupBy(poolsTable.project)
      .orderBy(sql`sum(${poolsTable.tvlUsd}) desc`)
      .limit(100);

    const protocols = await Promise.all(
      rows.map(async (row) => {
        const chainRows = await db
          .select({ chain: poolsTable.chain })
          .from(poolsTable)
          .where(eq(poolsTable.project, row.project))
          .groupBy(poolsTable.chain);

        const riskRows = await db
          .select({
            riskScore: poolsTable.riskScore,
            cnt: sql<number>`cast(count(*) as int)`,
          })
          .from(poolsTable)
          .where(eq(poolsTable.project, row.project))
          .groupBy(poolsTable.riskScore)
          .orderBy(sql`count(*) desc`)
          .limit(1);

        return {
          name: row.project,
          slug: row.project,
          poolCount: row.poolCount,
          totalTvl: row.totalTvl ?? 0,
          avgApy: row.avgApy ?? 0,
          chains: chainRows.map((c) => c.chain),
          riskScore: riskRows[0]?.riskScore ?? null,
        };
      })
    );

    res.json(protocols);
  } catch (err) {
    req.log.error({ err }, "Failed to list protocols");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/protocols/:protocolName", async (req, res) => {
  try {
    const { protocolName } = req.params;
    const slug = protocolName.toLowerCase();

    // 1. Try exact match
    let resolvedSlug = slug;
    let exactStats = await db
      .select({
        poolCount: sql<number>`cast(count(*) as int)`,
        totalTvl: sql<number>`sum(${poolsTable.tvlUsd})`,
        avgApy: sql<number>`avg(${poolsTable.apy})`,
      })
      .from(poolsTable)
      .where(eq(poolsTable.project, slug));

    // 2. If exact returns nothing, fuzzy-match and pick highest-TVL project
    if (!exactStats[0] || exactStats[0].poolCount === 0) {
      const fuzzyMatch = await db
        .select({ project: poolsTable.project, tvl: sql<number>`sum(${poolsTable.tvlUsd})` })
        .from(poolsTable)
        .where(ilike(poolsTable.project, `%${slug}%`))
        .groupBy(poolsTable.project)
        .orderBy(sql`sum(${poolsTable.tvlUsd}) desc`)
        .limit(1);

      if (!fuzzyMatch[0]) {
        res.status(404).json({ error: `Protocol '${protocolName}' not found` });
        return;
      }

      resolvedSlug = fuzzyMatch[0].project;
      exactStats = await db
        .select({
          poolCount: sql<number>`cast(count(*) as int)`,
          totalTvl: sql<number>`sum(${poolsTable.tvlUsd})`,
          avgApy: sql<number>`avg(${poolsTable.apy})`,
        })
        .from(poolsTable)
        .where(eq(poolsTable.project, resolvedSlug));
    }

    const chainRows = await db
      .select({ chain: poolsTable.chain })
      .from(poolsTable)
      .where(eq(poolsTable.project, resolvedSlug))
      .groupBy(poolsTable.chain);

    const riskRows = await db
      .select({
        riskScore: poolsTable.riskScore,
        cnt: sql<number>`cast(count(*) as int)`,
      })
      .from(poolsTable)
      .where(eq(poolsTable.project, resolvedSlug))
      .groupBy(poolsTable.riskScore)
      .orderBy(sql`count(*) desc`)
      .limit(1);

    const pools = await db
      .select()
      .from(poolsTable)
      .where(eq(poolsTable.project, resolvedSlug))
      .orderBy(desc(poolsTable.tvlUsd))
      .limit(100);

    res.json({
      name: resolvedSlug,
      slug: resolvedSlug,
      poolCount: exactStats[0].poolCount,
      totalTvl: exactStats[0].totalTvl ?? 0,
      avgApy: exactStats[0].avgApy ?? 0,
      chains: chainRows.map((c) => c.chain),
      riskScore: riskRows[0]?.riskScore ?? null,
      pools: pools.map(formatPool),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get protocol");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

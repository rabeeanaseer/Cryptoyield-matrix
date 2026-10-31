import { Router } from "express";
import { db, poolsTable } from "@workspace/db";
import { sql, eq, and, gte, lte, ilike } from "drizzle-orm";
import { formatPool } from "./chains";

const router = Router();

router.get("/pools", async (req, res) => {
  try {
    const {
      chain,
      token,
      protocol,
      minApy,
      maxApy,
      sortBy = "tvl",
      limit = "50",
      offset = "0",
    } = req.query as Record<string, string>;

    const conditions = [];
    if (chain) conditions.push(eq(poolsTable.chain, chain.toLowerCase()));
    if (token) conditions.push(ilike(poolsTable.symbol, `%${token.toUpperCase()}%`));
    if (protocol) conditions.push(eq(poolsTable.project, protocol.toLowerCase()));
    if (minApy) conditions.push(gte(poolsTable.apy, parseFloat(minApy)));
    if (maxApy) conditions.push(lte(poolsTable.apy, parseFloat(maxApy)));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const orderCol =
      sortBy === "apy"
        ? sql`${poolsTable.apy} desc`
        : sortBy === "risk"
          ? sql`${poolsTable.riskScore} asc`
          : sql`${poolsTable.tvlUsd} desc`;

    const [pools, totalRows] = await Promise.all([
      db
        .select()
        .from(poolsTable)
        .where(where)
        .orderBy(orderCol)
        .limit(Math.min(parseInt(limit), 200))
        .offset(parseInt(offset)),
      db
        .select({ count: sql<number>`cast(count(*) as int)` })
        .from(poolsTable)
        .where(where),
    ]);

    res.json({
      pools: pools.map(formatPool),
      total: totalRows[0]?.count ?? 0,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to list pools");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/pools/:poolId", async (req, res) => {
  try {
    const { poolId } = req.params;
    const pool = await db
      .select()
      .from(poolsTable)
      .where(eq(poolsTable.id, poolId))
      .limit(1);

    if (!pool[0]) {
      res.status(404).json({ error: `Pool '${poolId}' not found` });
      return;
    }

    res.json(formatPool(pool[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to get pool");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

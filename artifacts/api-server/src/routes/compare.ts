import { Router } from "express";
import { db, poolsTable } from "@workspace/db";
import { sql, and, ilike, desc } from "drizzle-orm";
import { formatPool } from "./chains";

const router = Router();

/**
 * Find the best matching pool for a protocol slug + token symbol.
 * Strategy:
 *   1. Fuzzy match on project (ilike '%slug%') + token symbol (ilike '%sym%'), pick highest TVL.
 *   2. If nothing found, fall back to any pool matching just the token symbol across all protocols.
 */
async function findBestPool(slug: string, sym: string) {
  // Try fuzzy project + symbol match
  const fuzzy = await db
    .select()
    .from(poolsTable)
    .where(
      and(
        ilike(poolsTable.project, `%${slug}%`),
        ilike(poolsTable.symbol, `%${sym}%`)
      )
    )
    .orderBy(desc(poolsTable.tvlUsd))
    .limit(1);

  if (fuzzy[0]) return { pool: fuzzy[0], fallback: false };

  // Fallback: best pool for this token globally (any protocol)
  const global = await db
    .select()
    .from(poolsTable)
    .where(ilike(poolsTable.symbol, `%${sym}%`))
    .orderBy(desc(poolsTable.tvlUsd))
    .limit(1);

  if (global[0]) return { pool: global[0], fallback: true };

  return null;
}

router.get("/compare/:protocolA/:protocolB/:tokenSymbol", async (req, res) => {
  try {
    const { protocolA, protocolB, tokenSymbol } = req.params;
    const slugA = protocolA.toLowerCase();
    const slugB = protocolB.toLowerCase();
    const sym = tokenSymbol.toUpperCase();

    const [resultA, resultB] = await Promise.all([
      findBestPool(slugA, sym),
      findBestPool(slugB, sym),
    ]);

    if (!resultA || !resultB) {
      res.status(404).json({ error: "Could not find pools for that token" });
      return;
    }

    const pA = resultA.pool;
    const pB = resultB.pool;
    const isFallback = resultA.fallback || resultB.fallback;

    // Use the actual matched project names (not the slugs passed in)
    const nameA = resultA.fallback ? pA.project : slugA;
    const nameB = resultB.fallback ? pB.project : slugB;

    const winner =
      pA.apy > pB.apy ? nameA : pB.apy > pA.apy ? nameB : null;

    const apyDiff = Math.abs(pA.apy - pB.apy).toFixed(2);
    const summary = isFallback
      ? `Showing best available pools for ${sym}. ${winner ? `${winner} currently leads with ${apyDiff}% higher APY.` : "Both options offer similar APY."}`
      : winner
        ? `${winner} offers ${apyDiff}% higher APY for ${sym}. ${pA.riskScore <= pB.riskScore ? nameA : nameB} has a better risk score.`
        : `Both protocols offer similar APY for ${sym}.`;

    res.json({
      protocolA: {
        name: nameA,
        pool: formatPool(pA),
        tvlUsd: pA.tvlUsd,
        apy: pA.apy,
        riskScore: pA.riskScore,
        fallback: resultA.fallback,
      },
      protocolB: {
        name: nameB,
        pool: formatPool(pB),
        tvlUsd: pB.tvlUsd,
        apy: pB.apy,
        riskScore: pB.riskScore,
        fallback: resultB.fallback,
      },
      tokenSymbol: sym,
      winner,
      summary,
      isFallback,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to compare protocols");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

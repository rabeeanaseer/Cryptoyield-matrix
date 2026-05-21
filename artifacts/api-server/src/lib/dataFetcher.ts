import { db } from "@workspace/db";
import { poolsTable } from "@workspace/db";
import { eq, sql } from "drizzle-orm";
import { logger } from "./logger";

const DEFILLAMA_POOLS_URL = "https://yields.llama.fi/pools";

function computeRiskScore(pool: {
  stablecoin: boolean;
  ilRisk: string;
  tvlUsd: number;
  apy: number;
}): string {
  let score = 100;
  if (!pool.stablecoin) score -= 20;
  if (pool.ilRisk === "yes") score -= 25;
  if (pool.tvlUsd < 1_000_000) score -= 20;
  if (pool.tvlUsd < 100_000) score -= 15;
  if (pool.apy > 100) score -= 20;
  if (pool.apy > 500) score -= 20;

  if (score >= 90) return "A";
  if (score >= 75) return "B";
  if (score >= 55) return "C";
  if (score >= 35) return "D";
  if (score >= 15) return "E";
  return "F";
}

export async function fetchAndStorePools(): Promise<number> {
  try {
    logger.info("Starting pool data fetch from DeFiLlama");

    const response = await fetch(DEFILLAMA_POOLS_URL, {
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) {
      throw new Error(`DeFiLlama API responded with ${response.status}`);
    }

    const json = (await response.json()) as {
      data: Array<{
        pool: string;
        project: string;
        symbol: string;
        chain: string;
        tvlUsd: number;
        apy: number;
        apyBase?: number;
        apyReward?: number;
        il7d?: number;
        stablecoin: boolean;
        ilRisk: string;
        exposure: string;
      }>;
    };

    if (!json.data || !Array.isArray(json.data)) {
      throw new Error("Unexpected DeFiLlama response shape");
    }

    // Filter to reasonable pools: min TVL $50k, valid APY
    const filtered = json.data.filter(
      (p) => p.tvlUsd >= 50_000 && p.apy >= 0 && p.apy < 10_000 && p.pool && p.project
    );

    // Take top 5000 by TVL to keep DB manageable
    const sorted = filtered
      .sort((a, b) => (b.tvlUsd ?? 0) - (a.tvlUsd ?? 0))
      .slice(0, 5000);

    const now = new Date();

    // Upsert in batches of 100
    const batchSize = 100;
    let count = 0;
    for (let i = 0; i < sorted.length; i += batchSize) {
      const batch = sorted.slice(i, i + batchSize).map((p) => ({
        id: p.pool,
        project: p.project.toLowerCase(),
        symbol: p.symbol,
        chain: p.chain.toLowerCase(),
        tvlUsd: p.tvlUsd ?? 0,
        apy: p.apy ?? 0,
        apyBase: p.apyBase ?? null,
        apyReward: p.apyReward ?? null,
        il7d: p.il7d ?? null,
        stablecoin: p.stablecoin ?? false,
        ilRisk: p.ilRisk ?? "no",
        exposure: p.exposure ?? "single",
        riskScore: computeRiskScore({
          stablecoin: p.stablecoin ?? false,
          ilRisk: p.ilRisk ?? "no",
          tvlUsd: p.tvlUsd ?? 0,
          apy: p.apy ?? 0,
        }),
        updatedAt: now,
      }));

      await db
        .insert(poolsTable)
        .values(batch)
        .onConflictDoUpdate({
          target: poolsTable.id,
          set: {
            tvlUsd: sql`excluded.tvl_usd`,
            apy: sql`excluded.apy`,
            apyBase: sql`excluded.apy_base`,
            apyReward: sql`excluded.apy_reward`,
            il7d: sql`excluded.il7d`,
            riskScore: sql`excluded.risk_score`,
            updatedAt: sql`excluded.updated_at`,
          },
        });

      count += batch.length;
    }

    logger.info({ count }, "Pool data upserted successfully");
    return count;
  } catch (err) {
    logger.error({ err }, "Failed to fetch pool data from DeFiLlama");
    return 0;
  }
}

let refreshTimer: ReturnType<typeof setInterval> | null = null;

export function startBackgroundRefresh(intervalMs = 30 * 60 * 1000): void {
  // Run immediately on startup
  void fetchAndStorePools();

  // Then on interval
  refreshTimer = setInterval(() => {
    void fetchAndStorePools();
  }, intervalMs);

  logger.info({ intervalMs }, "Background data refresh scheduled");
}

export function stopBackgroundRefresh(): void {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
}

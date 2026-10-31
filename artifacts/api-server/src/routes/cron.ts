import { Router } from "express";
import { fetchAndStorePools } from "../lib/dataFetcher";

const router = Router();

/**
 * Vercel Cron endpoint — called hourly to refresh DeFiLlama pool data.
 * Secured via CRON_SECRET env var when set.
 */
router.get("/cron/refresh", async (req, res) => {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const authHeader = req.headers.authorization;
    if (authHeader !== `Bearer ${secret}`) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
  }

  try {
    const count = await fetchAndStorePools();
    res.json({ ok: true, poolsUpserted: count, timestamp: new Date().toISOString() });
  } catch (err) {
    req.log.error({ err }, "Cron refresh failed");
    res.status(500).json({ error: "Refresh failed" });
  }
});

export default router;

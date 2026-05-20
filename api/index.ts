/**
 * Vercel serverless entry point.
 * Wraps the Express app so all /api/* routes are handled by a single function.
 * On cold start, automatically creates DB tables, seeds articles, and fetches
 * pool data from DeFiLlama if the database is empty.
 */
import app from "../artifacts/api-server/src/app";
import { initDb } from "../artifacts/api-server/src/lib/initDb";

// Fire-and-forget on cold start — non-blocking so the function responds
// to health checks immediately while init runs in the background.
// For the first real data request, the DB will be ready within ~5 seconds.
void initDb();

export default app;

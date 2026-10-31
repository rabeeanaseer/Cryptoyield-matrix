import app from "./app.js";
import { logger } from "./lib/logger.js";
import { startBackgroundRefresh } from "./lib/dataFetcher.js";
import { initDb } from "./lib/initDb.js";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

await initDb();

const server = app.listen(port, () => {
  logger.info({ port }, "Server listening");

  // Start background data refresh (every 30 min)
  startBackgroundRefresh(30 * 60 * 1000);
});

server.on("error", (err) => {
  logger.error({ err }, "Error listening on port");
  process.exit(1);
});

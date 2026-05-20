# Cryptoyield-matrix
An institutional-grade, multi-chain DeFi yield aggregator and dynamic investment strategy sandbox tracking $135B+ TVL across 87 chains. Built with an async FastAPI backend and automated data pipelines syncing 5,000+ pools into SQLite updated every 30 minutes from DeFiLlama. Features interactive continuous-compounding tools, TradingView charts, and programmatic JSON-LD SEO schemas.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/crypto-yield run dev` — run the frontend (port 24632)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Tailwind CSS + shadcn/ui (dark terminal aesthetic)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Data: DeFiLlama `/pools` endpoint (fetched every 30 min, 5000 pools cached)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract source of truth
- `lib/db/src/schema/pools.ts` — Pool table schema
- `lib/db/src/schema/articles.ts` — Blog article table schema
- `artifacts/api-server/src/lib/dataFetcher.ts` — DeFiLlama background fetcher
- `artifacts/api-server/src/routes/` — All API route handlers
- `artifacts/crypto-yield/src/` — React frontend

## Architecture decisions

- Pool data is fetched from DeFiLlama on startup and every 30 minutes, stored in Postgres for fast querying. No external API calls happen during user requests.
- Risk score (A–F) is computed from TVL, stablecoin status, IL risk, and APY outliers.
- Top 5,000 pools by TVL are stored to keep DB size manageable while covering all major opportunities.
- All API routes are backed by real DB queries with no mocked data.
- Frontend uses generated React Query hooks from the OpenAPI spec — no hand-written fetch calls.

## Product

- **Terminal Overview** — Platform-wide stats + interactive Strategy Sandbox + top yields
- **Chains** — All supported blockchains with TVL, pool count, avg APY
- **Protocols** — All DeFi protocols ranked by TVL with risk scores
- **Assets** — Token-level yield aggregation (USDC, ETH, WBTC, etc.)
- **Yield Pools** — Full filterable/sortable table of 5,000 pools
- **Compare** — Side-by-side protocol comparison for a specific token
- **Research (Blog)** — Data-driven articles with live embedded pool tables

## Gotchas

- Always run `pnpm --filter @workspace/db run push` after schema changes before `pnpm run dev`
- After changing `openapi.yaml`, run `pnpm --filter @workspace/api-spec run codegen` and restart both workflows
- The data fetcher runs on startup — first load may be slow (3–5s) as DeFiLlama is fetched
- Pool data from DeFiLlama uses lowercase chain/project names throughout the system

import { db, pool, articlesTable, poolsTable } from "@workspace/db";
import { eq, sql, count } from "drizzle-orm";
import { logger } from "./logger";
import { fetchAndStorePools } from "./dataFetcher";

const AUTHOR_NAME = "Rabeea Naseer";
const AUTHOR_BIO =
  "Rabeea Naseer is Lead Financial Systems Architect at CryptoYield, specialising in multi-chain DeFi yield modelling, risk-adjusted return analysis, and algorithmic protocol evaluation across 87+ blockchains. With a background in quantitative finance and distributed systems, Rabeea leads the team responsible for CryptoYield's risk scoring engine, strategy simulation sandbox, and live data pipeline architecture.";

const FEATURED_IMAGES: Record<string, string> = {
  "stablecoin-yield-l2-2026": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
  "liquid-staking-derivatives-2026": "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=1200&q=80",
  "impermanent-loss-mitigation-2026": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
};

const ARTICLES = [
  {
    slug: "stablecoin-yield-l2-2026",
    title: "The 2026 Guide to Stablecoin Yield Optimization across Layer-2 Networks",
    excerpt: "A comprehensive analysis of USDC and USDT yield opportunities on Base, Arbitrum, and Optimism — how liquidity depth, protocol incentives, and bridging costs interact to determine real net APY for stablecoin capital allocators.",
    category: "Strategy",
    readTime: 14,
    relatedToken: "USDC",
    content: `<h2>Why Layer-2 Networks Dominate Stablecoin Yield in 2026</h2>
<p>The migration of stablecoin yield from Ethereum mainnet to Layer-2 networks has been one of the defining structural shifts in DeFi over the past two years. As of early 2026, the combined TVL across Base, Arbitrum, and Optimism exceeds $60 billion — with stablecoins representing over 40% of that figure. For serious capital allocators, understanding the mechanics of why L2 networks consistently outperform mainnet for yield is no longer optional — it is foundational.</p>
<h2>The Core Mechanics: Why L2 Yields Exceed Mainnet</h2>
<p>On Ethereum mainnet, the combination of high gas costs and fierce competition for established pool positions compresses yield spreads to near-institutional lending rates. A USDC-USDT pool on Uniswap v3 mainnet might offer 2–4% APY in swap fee revenue — barely above the risk-free rate available in on-chain T-bill protocols.</p>
<ul>
  <li><strong>Lower gas costs enable higher-frequency compounding:</strong> A position that costs $180 in gas to compound weekly on mainnet costs $0.30–$2.00 on Arbitrum or Base.</li>
  <li><strong>Protocol incentive programs are structurally larger relative to TVL.</strong></li>
  <li><strong>Lower competition for emerging pools</strong> means early LPs capture outsized fees.</li>
</ul>
<h2>Base: The Coinbase-Backed Liquidity Magnet</h2>
<p>Base has emerged as the highest-volume L2 network for retail stablecoin activity. As of Q1 2026, Base hosts over $8 billion in stablecoin liquidity, with Aerodrome Finance accounting for approximately 45% of total stablecoin DEX volume.</p>
<h2>Arbitrum: The Institutional DeFi Standard</h2>
<p>Arbitrum One remains the preferred L2 for institutional-grade stablecoin yield. The Aave V3 deployment on Arbitrum offers USDC supply APY ranging from 4–8% depending on utilisation rates.</p>
<h2>Comparative Risk-Adjusted Return Analysis</h2>
<table>
  <thead><tr><th>Network</th><th>Protocol</th><th>Nominal APY</th><th>Net APY Est.</th></tr></thead>
  <tbody>
    <tr><td>Base</td><td>Aerodrome USDC-USDT</td><td>5–14%</td><td>4.5–11%</td></tr>
    <tr><td>Arbitrum</td><td>Aave V3 USDC Supply</td><td>4–8%</td><td>3.8–7.5%</td></tr>
    <tr><td>Optimism</td><td>Velodrome USDC-sUSD</td><td>5–10%</td><td>4–8.5%</td></tr>
  </tbody>
</table>
<p>Use the CryptoYield Strategy Sandbox to model specific compound APY projections before committing capital to any multi-step strategy.</p>`,
  },
  {
    slug: "liquid-staking-derivatives-2026",
    title: "Liquid Staking Derivatives (LSDs): Maximising Capital Efficiency on Ethereum and Solana",
    excerpt: "A deep-dive into Lido, Rocket Pool, Marinade, and Jito — how liquid staking tokens unlock layered yield strategies across lending markets, liquidity pools, and restaking protocols without sacrificing staking rewards.",
    category: "Education",
    readTime: 16,
    relatedProtocol: "lido",
    content: `<h2>The Capital Efficiency Revolution: From Locked to Liquid</h2>
<p>Liquid staking protocols dissolved the constraint of locked capital by issuing a 1:1 representative token (the liquid staking derivative, or LSD) that continuously accrues staking rewards while remaining freely transferable and deployable across the DeFi ecosystem.</p>
<h2>Ethereum Liquid Staking: The Protocol Landscape</h2>
<p><strong>Lido Finance (stETH)</strong> commands market dominance with over $30 billion staked ETH. stETH's near-perfect liquidity makes it the default LSD for sophisticated capital allocators.</p>
<p><strong>Rocket Pool (rETH)</strong> prioritises decentralisation over market share, allowing permissionless node operator participation. For allocators seeking decentralised staking exposure, rETH represents the risk-adjusted optimal choice.</p>
<p><strong>Frax Ether (sfrxETH)</strong> offers the highest base staking yield among major LSDs through a clever two-token system, historically delivering 0.5–1% higher APY than comparable LSDs.</p>
<h2>Solana Liquid Staking: Marinade and Jito</h2>
<p>Marinade Finance's mSOL was Solana's first major LSD and remains the most widely integrated, accruing approximately 6–7% APY as of 2026.</p>
<p>Jito's jitoSOL introduced MEV extraction, distributing a portion of MEV revenue to jitoSOL holders on top of base staking rewards — historically adding 0.5–1.5% additional APY.</p>
<h2>The LSD Yield Stack</h2>
<table>
  <thead><tr><th>LSD Protocol</th><th>Chain</th><th>Base Staking APY</th><th>Risk Score</th></tr></thead>
  <tbody>
    <tr><td>Lido (stETH)</td><td>Ethereum</td><td>3.8–4.5%</td><td>B</td></tr>
    <tr><td>Rocket Pool (rETH)</td><td>Ethereum</td><td>3.6–4.2%</td><td>B</td></tr>
    <tr><td>Marinade (mSOL)</td><td>Solana</td><td>6.0–7.2%</td><td>B</td></tr>
    <tr><td>Jito (jitoSOL)</td><td>Solana</td><td>6.5–8.5%</td><td>B</td></tr>
  </tbody>
</table>
<p>Use the CryptoYield Strategy Sandbox to model your specific multi-step LSD strategy before committing capital.</p>`,
  },
  {
    slug: "impermanent-loss-mitigation-2026",
    title: "DeFi Impermanent Loss Mitigation: Structural Strategies for Long-Term Yield Farmers",
    excerpt: "Impermanent loss is the silent killer of DeFi LP returns. This guide breaks down the structural mechanics of IL, quantifies its real-world impact across pool types, and presents seven evidence-based mitigation strategies for long-term yield farmers.",
    category: "Risk Management",
    readTime: 18,
    relatedToken: "ETH",
    content: `<h2>Impermanent Loss: The Most Misunderstood Risk in DeFi</h2>
<p>Impermanent loss silently erodes LP positions during periods of price divergence, often appearing only in hindsight when a yield farmer compares their LP position's value against simply holding the underlying assets.</p>
<h2>The Mathematics of Impermanent Loss</h2>
<p>IL arises from the constant-product formula: x × y = k. When the price of one asset changes, arbitrageurs rebalance the pool, meaning LPs always end up holding more of the asset that depreciated and less of the asset that appreciated.</p>
<table>
  <thead><tr><th>Price Change</th><th>Impermanent Loss</th><th>Break-even Fee APY</th></tr></thead>
  <tbody>
    <tr><td>+25%</td><td>-0.6%</td><td>0.6%+</td></tr>
    <tr><td>+100% (2x)</td><td>-5.7%</td><td>5.7%+</td></tr>
    <tr><td>+400% (5x)</td><td>-25.5%</td><td>25.5%+</td></tr>
    <tr><td>-50%</td><td>-5.7%</td><td>5.7%+</td></tr>
  </tbody>
</table>
<h2>Seven Evidence-Based IL Mitigation Strategies</h2>
<ol>
  <li><strong>Stable Pair Prioritisation</strong> — Concentrate LP capital in stable-stable and correlated-asset pools.</li>
  <li><strong>Incentive-Adjusted Break-Even Analysis</strong> — Always calculate real net yield after IL before entering.</li>
  <li><strong>Delta Hedging via Perps</strong> — Use perpetual futures to offset the price exposure that creates IL.</li>
  <li><strong>Correlated Pair Selection</strong> — Select pool pairs with high historical price correlation.</li>
  <li><strong>Concentrated Liquidity Active Management</strong> — Actively manage price ranges on Uniswap V3.</li>
  <li><strong>IL Insurance Protocols</strong> — Use Nexus Mutual or InsurAce for large volatile pair positions.</li>
  <li><strong>Time-Diversified Entry</strong> — Dollar-cost average into LP positions over time.</li>
</ol>
<p>Use CryptoYield's live pool data, risk scores, and Strategy Sandbox to build and stress-test your LP portfolio.</p>`,
  },
];

async function createTablesIfNotExist(): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS pools (
        id TEXT PRIMARY KEY,
        project TEXT NOT NULL,
        symbol TEXT NOT NULL,
        chain TEXT NOT NULL,
        tvl_usd REAL NOT NULL DEFAULT 0,
        apy REAL NOT NULL DEFAULT 0,
        apy_base REAL,
        apy_reward REAL,
        il7d REAL,
        stablecoin BOOLEAN NOT NULL DEFAULT false,
        il_risk TEXT NOT NULL DEFAULT 'no',
        exposure TEXT NOT NULL DEFAULT 'single',
        risk_score TEXT NOT NULL DEFAULT 'C',
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        author_name TEXT NOT NULL DEFAULT 'Rabeea Naseer',
        author_bio TEXT NOT NULL DEFAULT '',
        featured_image_url TEXT,
        related_token TEXT,
        related_protocol TEXT,
        read_time INTEGER NOT NULL DEFAULT 5,
        published_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    logger.info("Database tables verified/created");
  } finally {
    client.release();
  }
}

async function seedArticlesIfEmpty(): Promise<void> {
  const [row] = await db.select({ total: count() }).from(articlesTable);
  if ((row?.total ?? 0) > 0) {
    logger.info({ count: row?.total }, "Articles already seeded, skipping");
    return;
  }

  logger.info("Seeding articles...");
  for (const article of ARTICLES) {
    await db
      .insert(articlesTable)
      .values({
        ...article,
        authorName: AUTHOR_NAME,
        authorBio: AUTHOR_BIO,
        featuredImageUrl: FEATURED_IMAGES[article.slug] ?? null,
      })
      .onConflictDoUpdate({
        target: articlesTable.slug,
        set: {
          title: sql`excluded.title`,
          content: sql`excluded.content`,
          excerpt: sql`excluded.excerpt`,
          authorName: sql`excluded.author_name`,
          authorBio: sql`excluded.author_bio`,
          featuredImageUrl: sql`excluded.featured_image_url`,
          readTime: sql`excluded.read_time`,
          category: sql`excluded.category`,
        },
      });
    logger.info({ slug: article.slug }, "Article seeded");
  }
}

async function seedPoolsIfEmpty(): Promise<void> {
  const [row] = await db.select({ total: count() }).from(poolsTable);
  if ((row?.total ?? 0) > 0) {
    logger.info({ count: row?.total }, "Pools already populated, skipping initial fetch");
    return;
  }
  logger.info("No pools found — triggering initial DeFiLlama fetch...");
  await fetchAndStorePools();
}

let initialized = false;

export async function initDb(): Promise<void> {
  if (initialized) return;
  initialized = true;

  try {
    await createTablesIfNotExist();
    await seedArticlesIfEmpty();
    await seedPoolsIfEmpty();
    logger.info("Database initialisation complete");
  } catch (err) {
    logger.error({ err }, "Database initialisation failed");
    // Don't crash the process — let health checks surface the issue
  }
}

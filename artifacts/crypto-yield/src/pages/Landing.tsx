import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import {
  useGetStatsSummary,
  useGetTopYields,
  useListArticles,
} from "@workspace/api-client-react";
import { formatCurrency, formatPercent } from "@/lib/format";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { TradingViewTicker } from "@/components/shared/TradingViewTicker";
import { TradingViewChart } from "@/components/shared/TradingViewChart";
import { TradingViewScreener } from "@/components/shared/TradingViewScreener";
import {
  ArrowRight,
  Activity,
  Globe,
  Layers,
  Database,
  Shield,
  Clock,
  ChevronRight,
  Zap,
  BarChart2,
  TrendingUp,
  User,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

function RiskBadge({ score }: { score: string }) {
  const color =
    score.startsWith("A")
      ? "text-green-400 bg-green-500/10 border-green-500/30"
      : score.startsWith("B") || score.startsWith("C")
        ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
        : "text-red-400 bg-red-500/10 border-red-500/30";
  return (
    <span
      className={`inline-flex items-center gap-1 border rounded px-1.5 py-0.5 text-[11px] font-mono font-bold ${color}`}
    >
      <Shield className="w-3 h-3" />
      {score}
    </span>
  );
}

// Maps an article category to token keywords for pool matching
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  STRATEGY: ["usdc", "usdt", "dai", "frax", "lusd", "crvusd"],
  EDUCATION: ["eth", "steth", "wsteth", "sol", "msol", "jitosol", "cbeth", "reth"],
  "RISK MANAGEMENT": ["eth", "btc", "wbtc", "usdc", "usdt"],
};

function getKeywordsForArticle(category: string, slug: string): string[] {
  // Slug-based override for precision
  if (slug.includes("stablecoin")) return CATEGORY_KEYWORDS["STRATEGY"];
  if (slug.includes("liquid-staking") || slug.includes("lsd")) return CATEGORY_KEYWORDS["EDUCATION"];
  if (slug.includes("impermanent")) return CATEGORY_KEYWORDS["RISK MANAGEMENT"];
  return CATEGORY_KEYWORDS[category] ?? [];
}

interface PoolRow {
  id: string;
  symbol: string;
  project: string;
  chain: string;
  tvlUsd: number;
  apy: number;
  riskScore: string;
}

function ArticlePoolsTable({
  pools,
  category,
  slug,
}: {
  pools: PoolRow[];
  category: string;
  slug: string;
}) {
  const keywords = getKeywordsForArticle(category, slug);
  const filtered = keywords.length
    ? pools.filter((p) =>
        keywords.some((kw) => p.symbol.toLowerCase().includes(kw))
      )
    : pools;
  const top3 = filtered.slice(0, 3);

  if (top3.length === 0) return null;

  return (
    <div className="mt-4 border border-border/60 rounded-lg overflow-hidden bg-background/60">
      <div className="px-3 py-1.5 border-b border-border/40 bg-muted/30">
        <p className="text-[10px] font-mono text-primary uppercase tracking-widest">
          Live Top Pools
        </p>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border/30">
            <th className="px-3 py-1.5 text-left font-mono text-muted-foreground">Asset</th>
            <th className="px-3 py-1.5 text-left font-mono text-muted-foreground">Protocol</th>
            <th className="px-3 py-1.5 text-right font-mono text-primary">APY</th>
            <th className="px-3 py-1.5 text-center font-mono text-muted-foreground">Risk</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/20">
          {top3.map((pool) => (
            <tr key={pool.id} className="hover:bg-muted/20 transition-colors">
              <td className="px-3 py-1.5 font-bold font-mono">{pool.symbol}</td>
              <td className="px-3 py-1.5 font-mono text-muted-foreground capitalize">{pool.project}</td>
              <td className="px-3 py-1.5 text-right font-mono font-bold text-primary">
                {formatPercent(pool.apy)}
              </td>
              <td className="px-3 py-1.5 text-center">
                <RiskBadge score={pool.riskScore} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Landing() {
  useSeo({
    title: "CryptoYield — Institutional Multi-Chain DeFi Yield Aggregator",
    description:
      "Track 5,000+ yield pools across 87+ chains in real time. Find, compare, and simulate DeFi yield strategies with institutional-grade analytics.",
  });

  const { data: stats, isLoading: statsLoading } = useGetStatsSummary();
  const { data: topYields, isLoading: yieldsLoading } = useGetTopYields({ limit: 5 });
  // Larger pool set for article inline tables (client-side filtered)
  const { data: poolsForArticles } = useGetTopYields({ limit: 50 });
  const { data: articles, isLoading: articlesLoading } = useListArticles({ limit: 3 });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Nav ──────────────────────────────────────────────────────── */}
      <header className="border-b border-border/60 sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Activity className="w-5 h-5 text-primary group-hover:animate-pulse" />
            <span className="font-bold text-lg tracking-tight">
              CRYPTO<span className="text-primary">YIELD</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-mono text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors uppercase tracking-wide">About</Link>
            <Link href="/terminal/chains" className="hover:text-foreground transition-colors uppercase tracking-wide">Chains</Link>
            <Link href="/terminal/protocols" className="hover:text-foreground transition-colors uppercase tracking-wide">Protocols</Link>
            <Link href="/terminal/pools" className="hover:text-foreground transition-colors uppercase tracking-wide">Pools</Link>
            <Link href="/terminal/blog" className="hover:text-foreground transition-colors uppercase tracking-wide">Research</Link>
          </nav>
          <Link
            href="/terminal"
            data-testid="link-launch-terminal-nav"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono font-bold text-sm px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Launch Terminal <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ── Ticker Tape ─────────────────────────────────────────────── */}
      <TradingViewTicker />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 text-primary rounded-full px-4 py-1.5 text-xs font-mono mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          LIVE DATA — 5,000+ POOLS TRACKED ACROSS 87+ CHAINS
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
          Maximize Your<br />
          <span className="text-primary">Crypto Capital</span><br />
          Efficiency
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 font-mono">
          Automated multi-chain yield intelligence. Track every major DeFi protocol
          in real time, simulate compound strategies, and find alpha across 87 chains.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/terminal"
            data-testid="button-launch-terminal"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono font-bold text-base px-8 py-4 rounded-md hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(0,255,255,0.15)] hover:shadow-[0_0_40px_rgba(0,255,255,0.25)]"
          >
            Launch Yield Terminal <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/terminal/pools"
            data-testid="link-browse-pools"
            className="inline-flex items-center gap-2 border border-border text-muted-foreground font-mono text-sm px-6 py-4 rounded-md hover:border-primary/50 hover:text-foreground transition-colors"
          >
            Browse Pools <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Live Stats Bar ───────────────────────────────────────────── */}
      <section className="border-y border-border/60 bg-card/40">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {statsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-border/60">
              <div className="flex flex-col items-center md:items-start px-6 first:pl-0 last:pr-0 gap-1">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-primary" /> Total TVL Tracked
                </span>
                <span className="text-3xl font-bold font-mono" data-testid="stat-total-tvl">
                  {formatCurrency(stats.totalTvlUsd)}
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start px-6 gap-1">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 text-primary" /> Avg Market APY
                </span>
                <span className="text-3xl font-bold font-mono text-primary" data-testid="stat-avg-apy">
                  {formatPercent(stats.avgApy)}
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start px-6 gap-1">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-primary" /> Active Pools
                </span>
                <span className="text-3xl font-bold font-mono" data-testid="stat-active-pools">
                  {stats.totalPools.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start px-6 gap-1">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" /> Chains Covered
                </span>
                <span className="text-3xl font-bold font-mono" data-testid="stat-chains-covered">
                  {stats.totalChains}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* ── Global Yield Market Intelligence (TradingView) ───────────── */}
      <section className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="mb-8">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Market Intelligence</p>
            <h2 className="text-3xl font-bold tracking-tight">
              Global Yield Market Intelligence &amp; Technical Analysis
            </h2>
            <p className="text-sm font-mono text-muted-foreground mt-2">
              Live candlestick charting and crypto market screener — powered by TradingView.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Advanced Chart — 2/3 */}
            <div className="lg:col-span-2 border border-border rounded-xl overflow-hidden bg-card/40 min-h-[520px]">
              <div className="px-5 py-3 border-b border-border/60 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Advanced Chart · ETH/USDT
                </p>
              </div>
              <TradingViewChart />
            </div>

            {/* Screener — 1/3 */}
            <div className="border border-border rounded-xl overflow-hidden bg-card/40 min-h-[520px]">
              <div className="px-5 py-3 border-b border-border/60 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  Crypto Market Screener
                </p>
              </div>
              <TradingViewScreener />
            </div>
          </div>
        </div>
      </section>

      {/* ── Top Yields ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Live Data</p>
            <h2 className="text-3xl font-bold tracking-tight">Top Yields Today</h2>
          </div>
          <Link
            href="/terminal/pools"
            className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            View all 5,000+ pools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-lg border border-border overflow-hidden bg-card">
          <table className="w-full text-sm" data-testid="table-top-yields">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">#</th>
                <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">Asset</th>
                <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">Protocol</th>
                <th className="px-5 py-3 text-left text-xs font-mono text-muted-foreground uppercase tracking-wider">Chain</th>
                <th className="px-5 py-3 text-right text-xs font-mono text-muted-foreground uppercase tracking-wider">TVL</th>
                <th className="px-5 py-3 text-right text-xs font-mono text-primary uppercase tracking-wider bg-primary/5">APY</th>
                <th className="px-5 py-3 text-center text-xs font-mono text-muted-foreground uppercase tracking-wider">Risk</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {yieldsLoading
                ? Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={8} className="px-5 py-4">
                        <Skeleton className="h-5 w-full" />
                      </td>
                    </tr>
                  ))
                : topYields?.map((pool, i) => (
                    <tr key={pool.id} className="hover:bg-muted/40 transition-colors" data-testid={`row-pool-${i}`}>
                      <td className="px-5 py-4 font-mono text-muted-foreground">{i + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-[11px] font-bold">
                            {pool.symbol.charAt(0)}
                          </div>
                          <span className="font-bold">{pool.symbol}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-mono text-muted-foreground capitalize">{pool.project}</td>
                      <td className="px-5 py-4 font-mono text-muted-foreground capitalize">{pool.chain}</td>
                      <td className="px-5 py-4 text-right font-mono">{formatCurrency(pool.tvlUsd)}</td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-primary bg-primary/5">
                        {formatPercent(pool.apy)}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <RiskBadge score={pool.riskScore} />
                      </td>
                      <td className="px-5 py-4">
                        <Link href="/terminal/pools" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Platform Features ────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Platform</p>
            <h2 className="text-3xl font-bold tracking-tight">Institutional-Grade Intelligence</h2>
            <p className="text-muted-foreground mt-3 font-mono text-sm max-w-xl mx-auto">
              Built for serious capital allocators who think in basis points.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-border rounded-lg p-8 bg-card hover:border-primary/40 transition-colors group" data-testid="feature-sandbox">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Strategy Sandbox</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Chain multiple protocols together and simulate compound yield paths.
                Our engine calculates net APY using continuous compounding formulas —
                before you commit a single dollar.
              </p>
            </div>

            <div className="border border-border rounded-lg p-8 bg-card hover:border-primary/40 transition-colors group" data-testid="feature-analytics">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <BarChart2 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Cross-Chain Analytics</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Unified view across 87+ chains and 5,000+ protocols refreshed every
                30 minutes from DeFiLlama. Filter, sort, and slice yield data by chain,
                token, protocol, or APY range.
              </p>
            </div>

            <div className="border border-border rounded-lg p-8 bg-card hover:border-primary/40 transition-colors group" data-testid="feature-risk">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Risk Scoring System</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every pool carries an A–F risk grade computed from TVL depth, impermanent
                loss exposure, stablecoin status, and APY outlier detection. Know the risk
                before chasing the yield.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────────── */}
      <section className="border-t border-border/60 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Ready to find your next yield?
          </h2>
          <p className="text-muted-foreground font-mono text-sm mb-8 max-w-md mx-auto">
            5,000 pools. 87 chains. Updated every 30 minutes. Free forever.
          </p>
          <Link
            href="/terminal"
            data-testid="button-launch-terminal-cta"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono font-bold text-base px-10 py-4 rounded-md hover:bg-primary/90 transition-all shadow-[0_0_30px_rgba(0,255,255,0.15)] hover:shadow-[0_0_50px_rgba(0,255,255,0.3)]"
          >
            Launch Yield Terminal <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Editorial Research Matrix ─────────────────────────────────── */}
      <section className="border-t border-border/60 bg-card/20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Research Desk</p>
              <h2 className="text-3xl font-bold tracking-tight">
                Core Research &amp; Market Trends
              </h2>
              <p className="text-sm font-mono text-muted-foreground mt-1.5">
                By{" "}
                <Link href="/author/rabeea-naseer" className="text-primary hover:underline">
                  Rabeea Naseer
                </Link>
                {" "}— Lead Financial Systems Architect, CryptoYield
              </p>
            </div>
            <Link
              href="/terminal/blog"
              className="hidden md:flex text-sm font-mono text-muted-foreground hover:text-primary transition-colors items-center gap-1"
            >
              All articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {articlesLoading
              ? Array(3).fill(0).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-28 w-full rounded-lg" />
                  </div>
                ))
              : articles?.map((article) => (
                  <div
                    key={article.id}
                    className="border border-border rounded-xl bg-card hover:border-primary/40 transition-all group flex flex-col overflow-hidden"
                    data-testid={`card-article-${article.id}`}
                  >
                    <div className="h-2 bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge
                          variant="outline"
                          className="font-mono text-[11px] text-primary border-primary/30 bg-primary/5 uppercase"
                        >
                          {article.category}
                        </Badge>
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime} min read
                        </span>
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <Link href={`/terminal/blog/${article.slug}`}>
                        <h3 className="font-bold text-base leading-snug mb-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                        {article.excerpt}
                      </p>

                      <Link
                        href="/author/rabeea-naseer"
                        className="flex items-center gap-2 mb-4 group/author w-fit"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-xs font-mono text-muted-foreground group-hover/author:text-primary transition-colors">
                          By Rabeea Naseer
                        </span>
                      </Link>

                      {poolsForArticles && poolsForArticles.length > 0 && (
                        <ArticlePoolsTable
                          pools={poolsForArticles as PoolRow[]}
                          category={article.category}
                          slug={article.slug}
                        />
                      )}

                      <Link
                        href={`/terminal/blog/${article.slug}`}
                        className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Read full analysis <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/terminal/blog"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary font-mono text-sm px-6 py-3 rounded-md hover:bg-primary/10 transition-colors"
            >
              Browse All Research Articles <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

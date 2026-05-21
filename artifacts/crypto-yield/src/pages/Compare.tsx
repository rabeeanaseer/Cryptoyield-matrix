import { useSeo } from "@/hooks/use-seo";
import { useCompareProtocols, useGetTopYields } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { formatCurrency, formatPercent, formatSlug } from "@/lib/format";
import {
  ArrowLeftRight,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  ArrowLeft,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function RiskIcon({ score }: { score: string }) {
  if (score.startsWith("A")) return <ShieldCheck className="w-5 h-5 text-green-500" />;
  if (score.startsWith("B") || score.startsWith("C")) return <Shield className="w-5 h-5 text-yellow-500" />;
  return <ShieldAlert className="w-5 h-5 text-red-500" />;
}

function GlobalFallback({ token }: { token: string }) {
  const { data: pools, isLoading } = useGetTopYields({ limit: 50 });

  const filtered = pools
    ? pools.filter((p) => p.symbol.toLowerCase().includes(token.toLowerCase()))
    : [];
  const display = filtered.length > 0 ? filtered.slice(0, 10) : (pools ?? []).slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 border border-yellow-500/30 bg-yellow-500/5 rounded-lg p-5">
        <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-yellow-400 mb-1">Exact match not found</p>
          <p className="text-sm text-muted-foreground font-mono">
            No pools were found matching both protocols for <span className="text-foreground font-bold">{token}</span>.
            Showing the top global alternative yield pools instead.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold">
            Top Global Alternative Yield Pools for {token.toUpperCase()}
          </h3>
        </div>

        <div className="rounded-lg border border-border overflow-hidden bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-mono text-muted-foreground uppercase">#</th>
                <th className="px-4 py-3 text-left text-xs font-mono text-muted-foreground uppercase">Asset</th>
                <th className="px-4 py-3 text-left text-xs font-mono text-muted-foreground uppercase">Protocol</th>
                <th className="px-4 py-3 text-left text-xs font-mono text-muted-foreground uppercase">Chain</th>
                <th className="px-4 py-3 text-right text-xs font-mono text-muted-foreground uppercase">TVL</th>
                <th className="px-4 py-3 text-right text-xs font-mono text-primary uppercase bg-primary/5">APY</th>
                <th className="px-4 py-3 text-center text-xs font-mono text-muted-foreground uppercase">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading
                ? Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={7} className="px-4 py-3">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    </tr>
                  ))
                : display.map((pool, i) => (
                    <tr key={pool.id} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 font-mono text-muted-foreground">{i + 1}</td>
                      <td className="px-4 py-3 font-bold font-mono">{pool.symbol}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{formatSlug(pool.project)}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{formatSlug(pool.chain)}</td>
                      <td className="px-4 py-3 text-right font-mono">{formatCurrency(pool.tvlUsd)}</td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-primary bg-primary/5">
                        {formatPercent(pool.apy)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex items-center gap-1 border rounded px-1.5 py-0.5 text-[11px] font-mono font-bold ${
                          pool.riskScore.startsWith("A")
                            ? "text-green-400 bg-green-500/10 border-green-500/30"
                            : pool.riskScore.startsWith("B") || pool.riskScore.startsWith("C")
                              ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
                              : "text-red-400 bg-red-500/10 border-red-500/30"
                        }`}>
                          <Shield className="w-3 h-3" />{pool.riskScore}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/terminal/pools"
            className="text-sm font-mono text-primary hover:underline"
          >
            Browse all 5,000+ pools →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Compare() {
  const params = useParams();
  const protocolA = params.protocolA || "aave";
  const protocolB = params.protocolB || "compound";
  const tokenSymbol = params.tokenSymbol || "USDC";

  useSeo({
    title: `Compare ${protocolA} vs ${protocolB} for ${tokenSymbol} | CryptoYield`,
    description: `Detailed comparison of yield, TVL, and risk for ${tokenSymbol} on ${protocolA} and ${protocolB}.`,
  });

  const { data: comparison, isLoading, error } = useCompareProtocols(
    protocolA,
    protocolB,
    tokenSymbol,
    { query: { enabled: !!(protocolA && protocolB && tokenSymbol), queryKey: ["/api/compare", protocolA, protocolB, tokenSymbol] } }
  );

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <Link
        href="/terminal/protocols"
        className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Protocols
      </Link>

      <div className="text-center space-y-4 py-8 border-b border-border">
        <h1 className="text-4xl font-bold tracking-tight uppercase flex items-center justify-center gap-4">
          <span className="text-muted-foreground">{formatSlug(protocolA)}</span>
          <ArrowLeftRight className="w-8 h-8 text-primary mx-4" />
          <span className="text-muted-foreground">{formatSlug(protocolB)}</span>
        </h1>
        <p className="text-xl font-mono text-primary bg-primary/10 inline-block px-4 py-1 rounded-sm border border-primary/20">
          Yield Comparison for {tokenSymbol}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px]" />
          <Skeleton className="h-[400px]" />
        </div>
      ) : error ? (
        <GlobalFallback token={tokenSymbol} />
      ) : comparison ? (
        <>
          {comparison.isFallback && (
            <div className="flex items-start gap-3 border border-yellow-500/30 bg-yellow-500/5 rounded-lg p-4">
              <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
              <p className="text-xs font-mono text-muted-foreground">
                Exact protocol match not found — showing best available pools for{" "}
                <span className="text-foreground font-bold">{tokenSymbol}</span>.
              </p>
            </div>
          )}

          <div className="bg-muted p-4 rounded-md border border-border text-center font-mono text-sm max-w-2xl mx-auto">
            {comparison.summary}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[comparison.protocolA, comparison.protocolB].map((item) => {
              const isWinner = comparison.winner === item.name.toLowerCase();
              return (
                <Card
                  key={item.name}
                  className={`bg-card relative overflow-hidden transition-all ${
                    isWinner
                      ? "border-primary shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                      : "border-border"
                  }`}
                >
                  {isWinner && <div className="absolute top-0 inset-x-0 h-1 bg-primary" />}
                  <CardHeader className="text-center pb-2">
                    {isWinner && (
                      <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-mono text-xs flex gap-1 items-center">
                        <Trophy className="w-3 h-3" /> BEST OPTION
                      </Badge>
                    )}
                    <CardTitle className="text-3xl font-bold uppercase">{formatSlug(item.name)}</CardTitle>
                    {item.fallback && (
                      <p className="text-[10px] font-mono text-muted-foreground">
                        (best available match)
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                    <div className="space-y-1 text-center">
                      <p className="text-xs font-mono text-muted-foreground uppercase">Current APY</p>
                      <p className={`text-5xl font-bold tracking-tighter ${isWinner ? "text-primary" : "text-foreground"}`}>
                        {formatPercent(item.apy)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                      <div className="space-y-1">
                        <p className="text-xs font-mono text-muted-foreground uppercase">Pool TVL</p>
                        <p className="font-mono text-xl">{formatCurrency(item.tvlUsd)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-mono text-muted-foreground uppercase">Security</p>
                        <div className="flex items-center gap-2">
                          <RiskIcon score={item.riskScore} />
                          <span className="font-mono text-xl">{item.riskScore}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

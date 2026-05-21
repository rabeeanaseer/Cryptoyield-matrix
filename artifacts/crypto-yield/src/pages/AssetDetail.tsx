import { useSeo } from "@/hooks/use-seo";
import { useGetAsset } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { PoolTable } from "@/components/shared/PoolTable";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Database } from "lucide-react";

export default function AssetDetail() {
  const params = useParams();
  const symbol = params.symbol || "";
  
  useSeo({ 
    title: `${symbol} Yield Pools — Best APY on ${symbol} | CryptoYield`, 
    description: `Find the best yield opportunities and liquidity pools for ${symbol}.` 
  });

  const { data: asset, isLoading, error } = useGetAsset(symbol, { 
    query: { enabled: !!symbol, queryKey: ['/api/assets', symbol] } 
  });

  if (error) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-destructive">Error loading asset data</h2>
        <Link href="/terminal/assets" className="text-primary mt-4 inline-block hover:underline">Return to Assets</Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <Link href="/terminal/assets" className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Assets
      </Link>
      
      {isLoading ? (
        <div className="space-y-8">
          <Skeleton className="h-20 w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      ) : asset ? (
        <>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-secondary text-secondary-foreground border border-border rounded-lg flex items-center justify-center font-bold text-2xl">
              {asset.symbol.substring(0, 2)}
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{asset.symbol}</h1>
              <p className="text-muted-foreground mt-1 font-mono text-sm">{asset.name || `${asset.symbol} Token`} Yield Analytics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Current Price" value={asset.priceUsd ? formatCurrency(asset.priceUsd) : '-'} />
            <StatCard title="Total TVL Tracked" value={formatCurrency(asset.totalTvl)} />
            <StatCard title="Average APY" value={formatPercent(asset.avgApy)} />
            <StatCard title="Max Available APY" value={formatPercent(asset.maxApy)} trend={{ value: asset.maxApy - asset.avgApy, label: "over avg", isPositive: true }} />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Yield Opportunities for {asset.symbol}</h2>
            <PoolTable pools={asset.pools} />
          </div>
        </>
      ) : null}
    </div>
  );
}

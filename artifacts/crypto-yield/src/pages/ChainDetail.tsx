import { useSeo } from "@/hooks/use-seo";
import { useGetChain } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { PoolTable } from "@/components/shared/PoolTable";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency, formatPercent, formatSlug } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Globe } from "lucide-react";

export default function ChainDetail() {
  const params = useParams();
  const chainName = params.chainName || "";
  
  useSeo({ 
    title: `${chainName.charAt(0).toUpperCase() + chainName.slice(1)} Yield Pools | CryptoYield`, 
    description: `Explore the best DeFi yield pools on ${chainName}.` 
  });

  const { data: chain, isLoading, error } = useGetChain(chainName, { 
    query: { enabled: !!chainName, queryKey: ['/api/chains', chainName] } 
  });

  if (error) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-destructive">Error loading chain data</h2>
        <Link href="/terminal/chains" className="text-primary mt-4 inline-block hover:underline">Return to Chains</Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <Link href="/terminal/chains" className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Networks
      </Link>
      
      {isLoading ? (
        <div className="space-y-8">
          <Skeleton className="h-20 w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      ) : chain ? (
        <>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center">
              <Globe className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">{formatSlug(chain.name)} Ecosystem</h1>
              <p className="text-muted-foreground mt-1 font-mono text-sm">Network overview & yield opportunities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Network TVL Tracked" value={formatCurrency(chain.totalTvl)} />
            <StatCard title="Average Network APY" value={formatPercent(chain.avgApy)} />
            <StatCard title="Active Pools" value={chain.poolCount.toLocaleString()} />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Top Pools on {formatSlug(chain.name)}</h2>
            <PoolTable pools={chain.pools} />
          </div>
        </>
      ) : null}
    </div>
  );
}

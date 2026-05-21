import { useSeo } from "@/hooks/use-seo";
import { useGetProtocol } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { PoolTable } from "@/components/shared/PoolTable";
import { StatCard } from "@/components/ui/stat-card";
import { formatCurrency, formatPercent, formatSlug } from "@/lib/format";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Layers, ShieldCheck, Shield, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProtocolDetail() {
  const params = useParams();
  const protocolName = params.protocolName || "";
  
  useSeo({ 
    title: `${protocolName.charAt(0).toUpperCase() + protocolName.slice(1)} Protocol Profile | CryptoYield`, 
    description: `Analyze TVL, risk, and yield performance for ${protocolName}.` 
  });

  const { data: protocol, isLoading, error } = useGetProtocol(protocolName, { 
    query: { enabled: !!protocolName, queryKey: ['/api/protocols', protocolName] } 
  });

  if (error) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-destructive">Error loading protocol data</h2>
        <Link href="/terminal/protocols" className="text-primary mt-4 inline-block hover:underline">Return to Protocols</Link>
      </div>
    );
  }

  const getRiskIcon = (score: string | null) => {
    if (!score) return null;
    if (score.startsWith('A')) return <ShieldCheck className="w-5 h-5 text-green-500" />;
    if (score.startsWith('B') || score.startsWith('C')) return <Shield className="w-5 h-5 text-yellow-500" />;
    return <ShieldAlert className="w-5 h-5 text-red-500" />;
  };

  const getRiskColor = (score: string | null) => {
    if (!score) return 'border-border bg-muted text-muted-foreground';
    if (score.startsWith('A')) return 'border-green-500/30 bg-green-500/10 text-green-500';
    if (score.startsWith('B') || score.startsWith('C')) return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500';
    return 'border-red-500/30 bg-red-500/10 text-red-500';
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <Link href="/terminal/protocols" className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors w-fit">
        <ArrowLeft className="w-4 h-4" /> Back to Protocols
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
      ) : protocol ? (
        <>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center">
                <Layers className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight">{formatSlug(protocol.name)}</h1>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {protocol.chains.map(c => (
                    <span key={c} className="text-xs font-mono bg-secondary px-2 py-1 rounded text-secondary-foreground">
                      {formatSlug(c)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {protocol.riskScore && (
              <Badge variant="outline" className={`font-mono px-3 py-1.5 text-sm ${getRiskColor(protocol.riskScore)}`}>
                {getRiskIcon(protocol.riskScore)}
                <span className="ml-2 font-bold">Risk: {protocol.riskScore}</span>
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title="Protocol TVL" value={formatCurrency(protocol.totalTvl)} />
            <StatCard title="Average APY" value={formatPercent(protocol.avgApy)} />
            <StatCard title="Active Pools" value={protocol.poolCount.toLocaleString()} />
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight uppercase">Yield Pools</h2>
            <PoolTable pools={protocol.pools} />
          </div>
        </>
      ) : null}
    </div>
  );
}

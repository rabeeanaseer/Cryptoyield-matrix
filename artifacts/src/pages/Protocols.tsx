import { useSeo } from "@/hooks/use-seo";
import { useListProtocols } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatPercent, formatSlug } from "@/lib/format";
import { Link } from "wouter";
import { Layers, ArrowRight, ShieldCheck, Shield, ShieldAlert } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Protocols() {
  useSeo({ title: "DeFi Protocols | CryptoYield", description: "Compare DeFi protocols, their total value locked, and average yields." });

  const { data: protocols, isLoading } = useListProtocols();

  const getRiskIcon = (score: string | null) => {
    if (!score) return null;
    if (score.startsWith('A')) return <ShieldCheck className="w-4 h-4 text-green-500" />;
    if (score.startsWith('B') || score.startsWith('C')) return <Shield className="w-4 h-4 text-yellow-500" />;
    return <ShieldAlert className="w-4 h-4 text-red-500" />;
  };

  const getRiskColor = (score: string | null) => {
    if (!score) return 'border-border bg-muted text-muted-foreground';
    if (score.startsWith('A')) return 'border-green-500/30 bg-green-500/10 text-green-500';
    if (score.startsWith('B') || score.startsWith('C')) return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500';
    return 'border-red-500/30 bg-red-500/10 text-red-500';
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight uppercase flex items-center gap-3">
          <Layers className="w-8 h-8 text-primary" /> Protocol Directory
        </h1>
        <p className="text-muted-foreground mt-2 font-mono text-sm">Analyze protocol security, TVL, and yield performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-[240px] w-full" />)
        ) : protocols?.map((protocol) => (
          <Link key={protocol.slug} href={`/terminal/protocols/${protocol.slug}`}>
            <Card className="bg-card hover:bg-muted/50 transition-all border-border cursor-pointer group h-full hover:border-primary/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <CardContent className="p-6 flex flex-col h-full justify-between gap-6">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{formatSlug(protocol.name)}</h3>
                    {protocol.riskScore && (
                      <Badge variant="outline" className={`font-mono text-xs ${getRiskColor(protocol.riskScore)}`}>
                        {getRiskIcon(protocol.riskScore)}
                        <span className="ml-1">{protocol.riskScore}</span>
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {protocol.chains.map(c => (
                      <span key={c} className="text-xs font-mono bg-secondary px-2 py-1 rounded text-secondary-foreground">
                        {formatSlug(c)}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border mt-auto">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase">Total TVL</p>
                    <p className="font-mono font-bold text-lg">{formatCurrency(protocol.totalTvl)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase">Avg APY</p>
                    <p className="font-mono font-bold text-lg text-primary">{formatPercent(protocol.avgApy)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

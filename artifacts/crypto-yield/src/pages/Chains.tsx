import { useSeo } from "@/hooks/use-seo";
import { useListChains } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatPercent, formatSlug } from "@/lib/format";
import { Link } from "wouter";
import { Globe, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Chains() {
  useSeo({ title: "Supported Chains | CryptoYield", description: "Explore DeFi yield opportunities across Ethereum, Arbitrum, Optimism, Solana, and more." });

  const { data: chains, isLoading } = useListChains();

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight uppercase flex items-center gap-3">
          <Globe className="w-8 h-8 text-primary" /> Network Hub
        </h1>
        <p className="text-muted-foreground mt-2 font-mono text-sm">Compare aggregate yields and liquidity across networks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-[200px] w-full" />)
        ) : chains?.map((chain) => (
          <Link key={chain.slug} href={`/terminal/chains/${chain.slug}`}>
            <Card className="bg-card hover:bg-muted/50 transition-all border-border cursor-pointer group h-full hover:border-primary/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <CardContent className="p-6 flex flex-col h-full justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{formatSlug(chain.name)}</h3>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {chain.topProtocols.map(p => (
                      <span key={p} className="text-xs font-mono bg-secondary px-2 py-1 rounded text-secondary-foreground">
                        {formatSlug(p)}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border mt-auto">
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase">Total TVL</p>
                    <p className="font-mono font-bold text-lg">{formatCurrency(chain.totalTvl)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase">Avg APY</p>
                    <p className="font-mono font-bold text-lg text-primary">{formatPercent(chain.avgApy)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground uppercase">Pools</p>
                    <p className="font-mono font-bold text-lg">{chain.poolCount}</p>
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

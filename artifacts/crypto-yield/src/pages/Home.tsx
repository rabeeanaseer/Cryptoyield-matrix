import { useState } from "react";
import { useSeo } from "@/hooks/use-seo";
import { useGetStatsSummary, useGetTopYields, useListProtocols } from "@workspace/api-client-react";
import { StatCard } from "@/components/ui/stat-card";
import { PoolTable } from "@/components/shared/PoolTable";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Activity, Database, Globe, Layers, ArrowRight, Play, Settings2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  useSeo({ title: "CryptoYield Terminal | Advanced DeFi Analytics", description: "Institutional-grade multi-chain DeFi yield aggregator and strategy sandbox." });

  const { data: stats, isLoading: statsLoading } = useGetStatsSummary();
  const { data: topYields, isLoading: yieldsLoading } = useGetTopYields({ limit: 5 });
  const { data: protocols } = useListProtocols();

  // Sandbox State
  const [startAsset, setStartAsset] = useState("USDC");
  const [amount, setAmount] = useState(10000);
  const [steps, setSteps] = useState<string[]>([]);
  
  const handleAddStep = (protocol: string) => {
    if (steps.length < 4) {
      setSteps([...steps, protocol]);
    }
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const calculateNetApy = () => {
    // Mock simulation logic
    if (steps.length === 0) return 0;
    
    // Assign mock apys based on protocol names length to make it deterministic but variable
    const stepApys = steps.map(p => (p.length % 5) + 3.5); 
    
    // Continuous compound: (1 + r1)(1 + r2) - 1
    const compoundFactor = stepApys.reduce((acc, apy) => acc * (1 + (apy / 100)), 1);
    return (compoundFactor - 1) * 100;
  };

  const netApy = calculateNetApy();
  const estYield = amount * (netApy / 100);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase">Terminal Overview</h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm">Real-time cross-chain yield intelligence.</p>
        </div>
        {stats?.lastUpdated && (
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground bg-card border border-border px-3 py-1.5 rounded-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            LAST UPDATED: {new Date(stats.lastUpdated).toLocaleTimeString()}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsLoading ? (
          Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-[120px] w-full" />)
        ) : stats ? (
          <>
            <StatCard title="Total TVL Tracked" value={formatCurrency(stats.totalTvlUsd)} icon={<Database />} />
            <StatCard title="Average Market APY" value={formatPercent(stats.avgApy)} icon={<Activity />} />
            <StatCard title="Active Pools" value={stats.totalPools.toLocaleString()} icon={<Layers />} />
            <StatCard title="Supported Chains" value={stats.totalChains} icon={<Globe />} />
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight uppercase flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-primary" /> Strategy Sandbox
            </h2>
            <Badge variant="outline" className="font-mono bg-primary/5 text-primary border-primary/20">BETA ENGINE</Badge>
          </div>
          
          <Card className="bg-card border-border">
            <CardContent className="p-0 flex flex-col md:flex-row h-[400px]">
              {/* Sandbox Controls */}
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-border p-6 flex flex-col gap-6 bg-muted/20">
                <div className="space-y-3">
                  <label className="text-xs font-mono text-muted-foreground uppercase">Base Asset</label>
                  <Select value={startAsset} onValueChange={setStartAsset}>
                    <SelectTrigger className="font-mono">
                      <SelectValue placeholder="Select asset" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                      <SelectItem value="WBTC">WBTC</SelectItem>
                      <SelectItem value="DAI">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3 flex-1">
                  <label className="text-xs font-mono text-muted-foreground uppercase">Available Protocols</label>
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-[200px] pr-2">
                    {protocols?.slice(0, 10).map(p => (
                      <button 
                        key={p.name}
                        onClick={() => handleAddStep(p.name)}
                        disabled={steps.length >= 4}
                        className="text-left px-3 py-2 text-sm bg-background border border-border hover:border-primary/50 hover:bg-primary/5 rounded flex justify-between items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="font-medium">{p.name}</span>
                        <span className="text-xs font-mono text-primary">+{formatPercent(p.avgApy)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sandbox Canvas */}
              <div className="w-full md:w-2/3 p-6 flex flex-col relative bg-grid-white/[0.02]">
                <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
                  <div className="w-32 py-2 bg-secondary text-secondary-foreground border border-border text-center rounded shadow-sm font-mono text-sm font-bold z-10">
                    {startAsset}
                  </div>
                  
                  {steps.map((step, index) => (
                    <div key={`${step}-${index}`} className="flex flex-col items-center group w-full max-w-[240px]">
                      <div className="h-6 w-px bg-border my-1"></div>
                      <div className="w-full flex items-center gap-2">
                        <div className="flex-1 py-3 bg-card border border-primary/30 shadow-[0_0_15px_rgba(0,255,255,0.05)] text-center rounded relative z-10 group-hover:border-primary transition-colors">
                          <span className="font-bold text-sm">{step}</span>
                          <div className="text-[10px] font-mono text-muted-foreground mt-1">Leg {index + 1}</div>
                        </div>
                        <button 
                          onClick={() => handleRemoveStep(index)}
                          className="w-6 h-6 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground opacity-0 group-hover:opacity-100 transition-all text-xs"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  {steps.length === 0 && (
                    <div className="text-sm font-mono text-muted-foreground text-center max-w-[200px] mt-8 p-4 border border-dashed border-border rounded">
                      Add protocols from the left panel to build a yield strategy chain.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight uppercase invisible hidden lg:block">Matrix</h2>
          <Card className="bg-card border-border h-full">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-sm font-mono tracking-wider text-muted-foreground">SIMULATION MATRIX</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-mono">Principal:</span>
                  <span className="font-mono font-bold">${amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-mono">Steps:</span>
                  <span className="font-mono">{steps.length}/4</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-mono">Risk Profile:</span>
                  <span className="font-mono text-yellow-500">Medium (B)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-mono">Est. Gas:</span>
                  <span className="font-mono text-red-400">~$45.00</span>
                </div>
              </div>

              <div className="h-px bg-border w-full"></div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground uppercase">Projected Net APY</div>
                <div className="text-5xl font-bold tracking-tighter text-primary">
                  {formatPercent(netApy)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-muted-foreground uppercase">Est. 1Y Yield</div>
                <div className="text-2xl font-mono text-green-400">
                  +{formatCurrency(estYield)}
                </div>
              </div>

              <Button className="w-full mt-4 font-bold font-mono tracking-wide" disabled={steps.length === 0}>
                <Play className="w-4 h-4 mr-2" /> EXECUTE STRATEGY
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4 pt-8 border-t border-border">
        <h2 className="text-2xl font-bold tracking-tight uppercase">Top Market Opportunities</h2>
        {yieldsLoading ? (
          <Skeleton className="h-[400px] w-full" />
        ) : topYields ? (
          <PoolTable pools={topYields} />
        ) : null}
      </div>
    </div>
  );
}

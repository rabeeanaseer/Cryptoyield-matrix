import { useSeo } from "@/hooks/use-seo";
import { useListPools, useListChains, useListProtocols, useListAssets } from "@workspace/api-client-react";
import { PoolTable } from "@/components/shared/PoolTable";
import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export default function Pools() {
  useSeo({ title: "Yield Pools Explorer | CryptoYield", description: "Search, filter, and sort all DeFi yield pools." });

  const [search, setSearch] = useState("");
  const [chain, setChain] = useState<string>("all");
  const [protocol, setProtocol] = useState<string>("all");

  const { data: poolsData, isLoading } = useListPools();
  const { data: chains } = useListChains();
  const { data: protocols } = useListProtocols();

  const filteredPools = poolsData?.pools.filter(pool => {
    const matchesSearch = pool.symbol.toLowerCase().includes(search.toLowerCase()) || pool.project.toLowerCase().includes(search.toLowerCase());
    const matchesChain = chain === "all" || pool.chain.toLowerCase() === chain.toLowerCase();
    const matchesProtocol = protocol === "all" || pool.project.toLowerCase() === protocol.toLowerCase();
    return matchesSearch && matchesChain && matchesProtocol;
  }) || [];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight uppercase">Pools Explorer</h1>
        <p className="text-muted-foreground mt-2 font-mono text-sm">Advanced filtering for yield opportunities.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 p-4 bg-card border border-border rounded-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search asset or protocol..." 
            className="pl-9 font-mono bg-background"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <Select value={chain} onValueChange={setChain}>
            <SelectTrigger className="w-[180px] font-mono bg-background">
              <SelectValue placeholder="All Chains" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Chains</SelectItem>
              {chains?.map(c => (
                <SelectItem key={c.slug} value={c.slug} className="capitalize">{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={protocol} onValueChange={setProtocol}>
            <SelectTrigger className="w-[180px] font-mono bg-background">
              <SelectValue placeholder="All Protocols" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Protocols</SelectItem>
              {protocols?.map(p => (
                <SelectItem key={p.slug} value={p.slug}>{p.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-[600px] w-full" />
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm font-mono text-muted-foreground">
            <span>Showing {filteredPools.length} pools</span>
          </div>
          <PoolTable pools={filteredPools} />
        </div>
      )}
    </div>
  );
}

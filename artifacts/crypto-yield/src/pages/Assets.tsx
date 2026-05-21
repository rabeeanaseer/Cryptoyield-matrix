import { useSeo } from "@/hooks/use-seo";
import { useListAssets } from "@workspace/api-client-react";
import { formatCurrency, formatPercent } from "@/lib/format";
import { Link } from "wouter";
import { Database, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Assets() {
  useSeo({ title: "DeFi Assets | CryptoYield", description: "Compare yields across stablecoins, major pairs, and exotic assets." });

  const { data: assets, isLoading } = useListAssets();
  const [search, setSearch] = useState("");

  const filteredAssets = assets?.filter(a => 
    a.symbol.toLowerCase().includes(search.toLowerCase()) || 
    (a.name && a.name.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight uppercase flex items-center gap-3">
            <Database className="w-8 h-8 text-primary" /> Asset Index
          </h1>
          <p className="text-muted-foreground mt-2 font-mono text-sm">Discover peak yields for any asset.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search symbol or name..." 
            className="pl-9 font-mono bg-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto rounded-md border border-border bg-card">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="px-6 py-4 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset</th>
              <th className="px-6 py-4 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Price</th>
              <th className="px-6 py-4 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Total TVL Tracked</th>
              <th className="px-6 py-4 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Pools</th>
              <th className="px-6 py-4 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Avg APY</th>
              <th className="px-6 py-4 font-mono text-xs font-medium text-primary uppercase tracking-wider text-right">Max APY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              Array(10).fill(0).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4"><Skeleton className="h-6 w-24" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-6 w-16 ml-auto" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-6 w-24 ml-auto" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-6 w-12 ml-auto" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-6 w-16 ml-auto" /></td>
                  <td className="px-6 py-4"><Skeleton className="h-6 w-16 ml-auto" /></td>
                </tr>
              ))
            ) : filteredAssets.map((asset) => (
              <tr key={asset.symbol} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <Link href={`/assets/${asset.symbol}`} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {asset.symbol.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-foreground group-hover:text-primary transition-colors">{asset.symbol}</p>
                      {asset.name && <p className="text-xs text-muted-foreground font-mono">{asset.name}</p>}
                    </div>
                  </Link>
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {asset.priceUsd ? formatCurrency(asset.priceUsd) : '-'}
                </td>
                <td className="px-6 py-4 text-right font-mono text-foreground font-medium">
                  {formatCurrency(asset.totalTvl)}
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {asset.poolCount}
                </td>
                <td className="px-6 py-4 text-right font-mono text-muted-foreground">
                  {formatPercent(asset.avgApy)}
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold text-primary">
                  {formatPercent(asset.maxApy)}
                </td>
              </tr>
            ))}
            {!isLoading && filteredAssets.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground font-mono text-sm">
                  No assets found matching "{search}".
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

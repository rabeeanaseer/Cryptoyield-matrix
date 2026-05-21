import { Pool } from "@workspace/api-client-react";
import { formatCurrency, formatPercent, formatSlug } from "@/lib/format";
import { Link } from "wouter";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PoolTable({ pools = [] }: { pools?: Pool[] }) {
  const getRiskIcon = (score: string) => {
    if (score.startsWith('A')) return <ShieldCheck className="w-4 h-4 text-green-500" />;
    if (score.startsWith('B') || score.startsWith('C')) return <Shield className="w-4 h-4 text-yellow-500" />;
    return <ShieldAlert className="w-4 h-4 text-red-500" />;
  };

  const getRiskColor = (score: string) => {
    if (score.startsWith('A')) return 'border-green-500/30 bg-green-500/10 text-green-500';
    if (score.startsWith('B') || score.startsWith('C')) return 'border-yellow-500/30 bg-yellow-500/10 text-yellow-500';
    return 'border-red-500/30 bg-red-500/10 text-red-500';
  };

  return (
    <div className="w-full overflow-x-auto rounded-md border border-border bg-card">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted border-b border-border">
          <tr>
            <th className="px-4 py-3 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset</th>
            <th className="px-4 py-3 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">Protocol</th>
            <th className="px-4 py-3 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider">Chain</th>
            <th className="px-4 py-3 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">TVL</th>
            <th className="px-4 py-3 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Base APY</th>
            <th className="px-4 py-3 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">Reward APY</th>
            <th className="px-4 py-3 font-mono text-xs font-medium text-primary uppercase tracking-wider text-right bg-primary/5">Total APY</th>
            <th className="px-4 py-3 font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider text-center">Risk</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {pools.map((pool) => (
            <tr key={pool.id} className="hover:bg-muted/50 transition-colors">
              <td className="px-4 py-3">
                <Link href={`/terminal/assets/${pool.symbol}`} className="font-bold text-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px]">{pool.symbol.substring(0, 1)}</div>
                  {pool.symbol}
                </Link>
              </td>
              <td className="px-4 py-3">
                <Link href={`/terminal/protocols/${pool.project}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {formatSlug(pool.project)}
                </Link>
              </td>
              <td className="px-4 py-3">
                <Link href={`/terminal/chains/${pool.chain}`} className="text-muted-foreground hover:text-foreground transition-colors">
                  {formatSlug(pool.chain)}
                </Link>
              </td>
              <td className="px-4 py-3 text-right font-mono text-foreground">
                {formatCurrency(pool.tvlUsd)}
              </td>
              <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                {pool.apyBase ? formatPercent(pool.apyBase) : '-'}
              </td>
              <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                {pool.apyReward ? formatPercent(pool.apyReward) : '-'}
              </td>
              <td className="px-4 py-3 text-right font-mono font-bold text-primary bg-primary/5">
                {formatPercent(pool.apy)}
              </td>
              <td className="px-4 py-3 text-center">
                <Badge variant="outline" className={`font-mono text-[10px] ${getRiskColor(pool.riskScore)}`}>
                  {getRiskIcon(pool.riskScore)}
                  <span className="ml-1">{pool.riskScore}</span>
                </Badge>
              </td>
            </tr>
          ))}
          {pools.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground font-mono text-sm">
                No pools found matching criteria.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

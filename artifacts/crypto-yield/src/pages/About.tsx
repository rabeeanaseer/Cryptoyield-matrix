import { useSeo } from "@/hooks/use-seo";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useGetStatsSummary } from "@workspace/api-client-react";
import { formatCurrency } from "@/lib/format";
import { Database, Globe, Shield, Zap, BarChart2, TrendingUp } from "lucide-react";

export default function About() {
  useSeo({
    title: "About CryptoYield — Our Mission & Data-Driven Approach",
    description: "CryptoYield aggregates live yield data from 5,000+ DeFi pools across 87+ chains to help investors find, compare, and simulate crypto yield strategies with institutional precision.",
  });

  const { data: stats } = useGetStatsSummary();

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="border-b border-border/60 bg-card/20">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Our Mission</p>
          <h1 className="text-5xl font-bold tracking-tight leading-tight mb-6">
            Clearing the Fog<br />
            <span className="text-primary">in DeFi Yield Markets</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed font-mono max-w-3xl">
            DeFi yield opportunities are fragmented across hundreds of protocols and dozens of blockchains. 
            CryptoYield was built to eliminate that fragmentation — giving serious capital allocators a single, 
            institutional-grade interface to find, compare, and simulate yield strategies across the entire on-chain landscape.
          </p>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="border-b border-border/60">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold font-mono text-primary mb-1">{stats.totalChains}+</div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Blockchains Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold font-mono mb-1">{stats.totalPools.toLocaleString()}</div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Active Yield Pools</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold font-mono text-primary mb-1">{formatCurrency(stats.totalTvlUsd)}</div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Total TVL Indexed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold font-mono mb-1">30m</div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Data Refresh Interval</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission content */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">The Problem We Solve</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The DeFi yield landscape is both the most democratic and the most opaque financial market in history. 
            At any given moment, thousands of liquidity pools across Ethereum, Arbitrum, Solana, Base, and dozens 
            of other chains offer yields ranging from 1% to thousands of percent per year.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The challenge is signal vs. noise. High-APY pools often carry hidden risks — smart contract vulnerabilities, 
            impermanent loss exposure, inflationary reward tokens, or insufficient liquidity depth. Retail investors 
            frequently chase yield without the analytical tools to assess what they're actually signing up for.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Institutional players, meanwhile, lack a unified aggregation layer that spans the entire multi-chain 
            landscape without requiring custom data infrastructure. CryptoYield is that layer.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Our Data-Driven Approach</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Every metric on CryptoYield is sourced from live, verifiable on-chain data via DeFiLlama's public API — 
            one of the most trusted data providers in decentralized finance. We do not manufacture, estimate, or 
            interpolate yield figures. All APY values represent real historical and current pool performance.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Database,
                title: "Live Data Pipeline",
                body: "Our backend fetches and caches the top 5,000 pools by TVL every 30 minutes. No stale data, no guesswork."
              },
              {
                icon: Shield,
                title: "Risk Scoring Engine",
                body: "Every pool receives an A–F grade computed from TVL depth, stablecoin status, impermanent loss exposure, and APY outlier analysis."
              },
              {
                icon: Zap,
                title: "Strategy Sandbox",
                body: "Our compound yield simulator lets investors chain multiple protocols together and model real net APY before committing capital."
              },
              {
                icon: Globe,
                title: "Cross-Chain Coverage",
                body: "We track every major EVM chain, Solana, and emerging L2s. If liquidity exists, we surface it."
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold">{title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Who We Serve</h2>
          <div className="space-y-4">
            {[
              {
                label: "Institutional Capital Allocators",
                desc: "Family offices, crypto funds, and treasury managers that need auditable, data-backed yield discovery across multiple chains without custom infrastructure."
              },
              {
                label: "DeFi Power Users",
                desc: "Sophisticated individuals who manage six-figure+ on-chain positions and need systematic tools for yield optimization, risk assessment, and strategy comparison."
              },
              {
                label: "Protocol Researchers & Analysts",
                desc: "Academics, journalists, and on-chain analysts who require accurate, up-to-date DeFi market data for research and publication."
              },
            ].map(({ label, desc }) => (
              <div key={label} className="flex gap-4 p-5 border border-border rounded-lg bg-card/50">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                <div>
                  <div className="font-bold mb-1">{label}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            CryptoYield has no financial incentive to promote any specific protocol, chain, or token. 
            We take no listing fees, no kickbacks, and no affiliate commissions from the protocols we index. 
            Our risk scoring algorithm is deterministic and documented in our{" "}
            <a href="/editorial-standards" className="text-primary hover:underline">Editorial Standards</a>.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We are a data aggregation and analytical tool. We are not a financial advisor. 
            Please read our <a href="/disclaimer" className="text-primary hover:underline">Financial Disclaimer</a> before 
            making any investment decisions based on data presented on this platform.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}

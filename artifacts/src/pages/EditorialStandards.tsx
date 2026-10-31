import { useSeo } from "@/hooks/use-seo";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { CheckCircle2, Database, Shield, BarChart2, Eye, RefreshCw } from "lucide-react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold border-b border-border pb-2">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

export default function EditorialStandards() {
  useSeo({
    title: "Editorial Standards & Data Methodology — CryptoYield",
    description: "Our commitment to unbiased data, transparent risk scoring methodology, and mathematical accuracy in DeFi yield analytics.",
  });

  return (
    <PublicLayout>
      <div className="border-b border-border/60 bg-card/20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-4">Transparency</p>
          <h1 className="text-4xl font-bold mb-4">Editorial Standards</h1>
          <p className="text-muted-foreground font-mono text-sm max-w-2xl leading-relaxed">
            Our commitment to accuracy, transparency, and editorial independence underpins every number, 
            ranking, and article on this platform. This document explains exactly how our data is sourced, 
            processed, scored, and published.
          </p>
        </div>
      </div>

      {/* Principles Grid */}
      <div className="border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Eye,
                title: "Full Transparency",
                body: "Every data source, scoring methodology, and algorithm is publicly documented. We hold no hidden agendas and derive no revenue from the protocols we index."
              },
              {
                icon: Database,
                title: "Primary Source Data",
                body: "All yield data originates from DeFiLlama's publicly available API — one of the most audited and reliable DeFi data aggregators in the ecosystem."
              },
              {
                icon: CheckCircle2,
                title: "Mathematical Integrity",
                body: "APY calculations, compound formulas, and risk scores are deterministic algorithms. Given the same inputs, the outputs are always identical and auditable."
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="border border-border rounded-lg p-6 bg-card">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        <Section title="1. Data Sources">
          <p>CryptoYield aggregates yield data exclusively from <strong className="text-foreground">DeFiLlama's public yield API</strong> (<code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">yields.llama.fi/pools</code>). DeFiLlama is an independent, open-source DeFi data aggregator that collects data directly from on-chain smart contracts and protocol APIs.</p>
          <p>We do not:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Accept payment from protocols to be listed on our platform</li>
            <li>Manually curate or suppress data for any protocol</li>
            <li>Estimate or interpolate yield figures — all values are passed through from source data</li>
            <li>Backfill historical APY data with modified values</li>
          </ul>
          <p>If DeFiLlama data contains errors, those errors will appear in our platform until corrected at the source. We recommend verifying critical figures directly against protocol dashboards.</p>
        </Section>

        <Section title="2. Pool Selection Criteria">
          <p>From the full DeFiLlama pool universe, we apply the following objective filters to maintain data quality:</p>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left font-mono text-xs text-muted-foreground uppercase tracking-wider">Filter</th>
                  <th className="px-4 py-3 text-left font-mono text-xs text-muted-foreground uppercase tracking-wider">Threshold</th>
                  <th className="px-4 py-3 text-left font-mono text-xs text-muted-foreground uppercase tracking-wider">Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Minimum TVL", "$50,000", "Eliminate ghost pools with negligible liquidity"],
                  ["Maximum APY", "10,000%", "Exclude APY outliers that typically indicate data errors or unsustainable reward schedules"],
                  ["Pool limit", "Top 5,000 by TVL", "Prioritize the most liquid, most-used pools to keep data manageable"],
                  ["Pool ID", "Must be present", "Exclude pools with missing identifiers"],
                ].map(([filter, threshold, rationale]) => (
                  <tr key={filter}>
                    <td className="px-4 py-3 font-mono text-xs text-foreground">{filter}</td>
                    <td className="px-4 py-3 font-mono text-xs text-primary">{threshold}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="3. Risk Scoring Methodology (A–F Matrix)">
          <p>Every pool displayed on CryptoYield receives an algorithmic risk score from A (lowest risk) to F (highest risk). The scoring algorithm is as follows:</p>

          <div className="space-y-4">
            <div className="border border-border rounded-lg p-5 bg-card">
              <div className="font-mono text-xs text-primary mb-3 uppercase tracking-wide">Score Computation (starting score: 100 points)</div>
              <div className="space-y-2">
                {[
                  ["Non-stablecoin asset", "-20 points", "Stablecoin pairs carry significantly lower price risk"],
                  ["Impermanent loss risk = 'yes'", "-25 points", "IL exposure fundamentally changes the risk profile of a pool"],
                  ["TVL < $1,000,000", "-20 points", "Low liquidity depth increases slippage risk and bank-run vulnerability"],
                  ["TVL < $100,000", "Additional -15 points", "Very low liquidity pools carry extreme exit risk"],
                  ["APY > 100%", "-20 points", "Extremely high APY almost always reflects unsustainable token emission"],
                  ["APY > 500%", "Additional -20 points", "APYs above 500% are typically exploitative or erroneous"],
                ].map(([condition, points, reason]) => (
                  <div key={condition} className="flex gap-3 text-sm">
                    <code className="font-mono text-xs bg-muted px-2 py-1 rounded shrink-0 text-foreground">{condition}</code>
                    <span className="text-red-400 font-mono text-xs shrink-0 mt-1">{points}</span>
                    <span className="text-muted-foreground text-xs mt-1">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border rounded-lg p-5 bg-card">
              <div className="font-mono text-xs text-primary mb-3 uppercase tracking-wide">Score to Grade Conversion</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  ["A", "≥ 90 points", "text-green-400 border-green-500/30 bg-green-500/10"],
                  ["B", "75–89 points", "text-lime-400 border-lime-500/30 bg-lime-500/10"],
                  ["C", "55–74 points", "text-yellow-400 border-yellow-500/30 bg-yellow-500/10"],
                  ["D", "35–54 points", "text-orange-400 border-orange-500/30 bg-orange-500/10"],
                  ["E", "15–34 points", "text-red-400 border-red-500/30 bg-red-500/10"],
                  ["F", "< 15 points", "text-red-600 border-red-600/30 bg-red-600/10"],
                ].map(([grade, range, colorClass]) => (
                  <div key={grade} className={`border rounded-lg px-4 py-3 flex items-center gap-3 ${colorClass}`}>
                    <span className="text-2xl font-bold font-mono">{grade}</span>
                    <span className="text-xs text-muted-foreground">{range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-amber-500/20 bg-amber-500/5 rounded-lg p-4">
            <p><strong className="text-amber-400">Important limitation:</strong> Our risk score uses only observable on-chain metrics. It does not assess code quality, audit status, team credibility, governance structure, or many other factors that sophisticated investors evaluate. Treat our score as one analytical data point, not a comprehensive safety assessment.</p>
          </div>
        </Section>

        <Section title="4. APY Calculations">
          <p>We display APY figures exactly as provided by DeFiLlama. This includes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Base APY:</strong> Yield earned from protocol fees and interest, denominated in the deposited asset</li>
            <li><strong className="text-foreground">Reward APY:</strong> Yield from additional token incentives (e.g., protocol governance tokens)</li>
            <li><strong className="text-foreground">Total APY:</strong> Base APY + Reward APY combined</li>
          </ul>
          <p>The Strategy Sandbox uses the following continuous compounding formula for multi-step strategies:</p>
          <div className="border border-border rounded-lg p-4 bg-muted font-mono text-sm text-center">
            Net APY = ((1 + r₁) × (1 + r₂) × ... × (1 + rₙ) - 1) × 100
          </div>
          <p>Where each <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">rₙ</code> = the decimal APY of each protocol step (e.g., 5% APY = 0.05). This is a simplified model that does not account for continuous recompounding frequency, gas costs, or protocol-specific mechanics.</p>
        </Section>

        <Section title="5. Editorial Content (Research Desk)">
          <p>Articles published on the Research Desk are written to provide market analysis and educational content about DeFi yield strategies. Our editorial principles:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Data-driven:</strong> All claims about yields, TVL, or market conditions reference live database queries</li>
            <li><strong className="text-foreground">No sponsored content:</strong> We do not publish paid articles, sponsored reviews, or promotional content for any protocol</li>
            <li><strong className="text-foreground">Not financial advice:</strong> All articles include appropriate disclaimers and are analytical in nature</li>
            <li><strong className="text-foreground">Live data embedding:</strong> Article pool tables are dynamically populated from our database at read time, ensuring data is current</li>
            <li><strong className="text-foreground">Corrections policy:</strong> Factual errors identified after publication are corrected promptly with a correction notice appended</li>
          </ul>
        </Section>

        <Section title="6. Data Refresh Policy">
          <div className="flex gap-4 p-4 border border-border rounded-lg bg-card">
            <RefreshCw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p>Our data pipeline fetches fresh data from DeFiLlama every <strong className="text-foreground">30 minutes</strong>. Each fetch retrieves, filters, and upserts pool data in our database. The "Last Updated" timestamp displayed on the Terminal Overview reflects the actual time of the most recent successful data refresh. In the event of a failed fetch (e.g., upstream API downtime), the previous data remains in place and we will not display stale timestamps.</p>
            </div>
          </div>
        </Section>

        <Section title="7. Conflicts of Interest Policy">
          <p>CryptoYield has no financial relationships with the protocols, chains, or tokens indexed on this platform. We do not:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Hold positions in any of the assets, tokens, or protocols featured on the platform</li>
            <li>Accept listing fees, kickbacks, or incentive payments from protocols</li>
            <li>Receive affiliate commissions from DeFi protocols for user referrals</li>
            <li>Allow advertising relationships to influence editorial content or data ranking</li>
          </ul>
          <p>Our revenue model is based on platform subscriptions and data licensing — never on promoting specific protocols or assets.</p>
        </Section>

        <Section title="8. Feedback and Corrections">
          <p>If you identify an error in our data, risk scoring, or editorial content, please contact our team at <a href="/contact" className="text-primary hover:underline">editorial@cryptoyield.com</a>. We review all factual complaints within 5 business days and issue corrections or clarifications as warranted.</p>
        </Section>
      </div>
    </PublicLayout>
  );
}

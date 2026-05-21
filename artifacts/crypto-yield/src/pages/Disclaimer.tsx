import { useSeo } from "@/hooks/use-seo";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AlertTriangle, ShieldAlert, Info } from "lucide-react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold border-b border-border pb-2">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

export default function Disclaimer() {
  useSeo({
    title: "Financial Disclaimer — CryptoYield Is Not Financial Advice",
    description: "CryptoYield is a data aggregation and mathematical simulation tool. Nothing on this platform constitutes financial advice. Crypto investments carry substantial risk.",
  });

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-bold mb-3">Financial Disclaimer</h1>
          <p className="text-sm font-mono text-muted-foreground">Effective: May 20, 2025 — Read carefully before using this platform.</p>
        </div>

        {/* High-visibility primary alert */}
        <div className="border-2 border-red-500/50 bg-red-500/5 rounded-xl p-8 mb-10 flex gap-5">
          <ShieldAlert className="w-12 h-12 text-red-500 shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-red-400 mb-3 uppercase tracking-wide">Critical Notice</h2>
            <p className="text-foreground leading-relaxed font-mono text-sm">
              CRYPTOYIELD IS A DATA AGGREGATION TOOL AND MATHEMATICAL SIMULATOR. IT IS NOT A FINANCIAL ADVISOR, 
              INVESTMENT ADVISOR, BROKER-DEALER, OR EXCHANGE. NOTHING ON THIS PLATFORM CONSTITUTES FINANCIAL, 
              INVESTMENT, LEGAL, OR TAX ADVICE. ALL CONTENT IS FOR INFORMATIONAL AND ANALYTICAL PURPOSES ONLY.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <Section title="1. Not Financial Advice">
            <p>All data, analysis, yield figures, risk scores, strategy simulations, and editorial content published on CryptoYield are provided strictly for <strong className="text-foreground">informational and educational purposes</strong>. Nothing on this platform should be interpreted as a recommendation, solicitation, or advice to buy, sell, hold, stake, deposit, borrow against, or otherwise transact with any cryptocurrency, digital asset, DeFi protocol, or financial instrument.</p>
            <p>CryptoYield does not take into account your individual financial situation, investment objectives, risk tolerance, time horizon, or any other personal financial circumstances. Always consult with a qualified, licensed financial advisor before making investment decisions.</p>
          </Section>

          <Section title="2. CryptoYield Is a Mathematical Simulation Tool">
            <p>The Strategy Sandbox and yield calculator features on this platform are <strong className="text-foreground">mathematical simulation engines only</strong>. They perform arithmetic calculations on historical and current APY data to produce hypothetical projections. These projections:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Do not account for future changes in APY, which can change drastically within hours</li>
              <li>Do not account for token price volatility, which may erase any apparent yield gains</li>
              <li>Do not account for gas costs, slippage, protocol fees, or withdrawal restrictions</li>
              <li>Do not account for smart contract risk, which can result in total or partial loss of deposited funds</li>
              <li>Are based on past performance, which is not indicative of future results</li>
            </ul>
          </Section>

          <Section title="3. Crypto and DeFi Carry Substantial Risks">
            <div className="grid md:grid-cols-2 gap-4 not-prose">
              {[
                {
                  icon: AlertTriangle,
                  title: "Smart Contract Risk",
                  body: "DeFi protocols operate via immutable or upgradable smart contracts that may contain bugs, vulnerabilities, or logic errors. Exploits have resulted in total loss of deposited funds with no recourse."
                },
                {
                  icon: AlertTriangle,
                  title: "Impermanent Loss",
                  body: "Liquidity provision in automated market makers (AMMs) exposes capital to impermanent loss when asset prices diverge. This can result in receiving less value than holding assets outright."
                },
                {
                  icon: AlertTriangle,
                  title: "Reward Token Inflation",
                  body: "High APYs often reflect emissions of governance or reward tokens that can experience severe price depreciation, reducing or eliminating the real-world value of apparent yield."
                },
                {
                  icon: AlertTriangle,
                  title: "Regulatory Risk",
                  body: "Cryptocurrency and DeFi regulations are evolving rapidly across jurisdictions. Regulatory actions may affect the legality, accessibility, or tax treatment of any DeFi strategy."
                },
                {
                  icon: AlertTriangle,
                  title: "Liquidity Risk",
                  body: "DeFi pools can experience sudden liquidity withdrawals (bank runs), making it difficult or impossible to exit positions at favorable prices, particularly during market stress."
                },
                {
                  icon: AlertTriangle,
                  title: "Oracle & Governance Risk",
                  body: "Price oracle manipulation and malicious governance proposals have been used to drain DeFi protocol treasuries. These risks exist in even highly-rated protocols."
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="border border-red-500/20 bg-red-500/5 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="font-bold text-sm text-red-300">{title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="4. Past Performance">
            <p>All historical APY data, TVL figures, and yield metrics displayed on CryptoYield reflect past performance. <strong className="text-foreground">Past performance is not indicative, predictive, or guaranteeing of future results.</strong> DeFi yields are highly sensitive to market conditions, protocol utilization rates, token emissions schedules, and competitive dynamics — all of which can change without warning.</p>
          </Section>

          <Section title="5. Risk Score Limitations">
            <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-4 flex gap-3">
              <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p>Our A–F risk scoring system is a proprietary algorithmic assessment based on a limited set of observable on-chain metrics (TVL, stablecoin status, impermanent loss exposure, APY outliers). An "A" rating does NOT mean a pool is safe or free from risk. Pools with high ratings have still been exploited or suffered significant losses. Our scoring is one data point for analytical comparison only, not a safety certification.</p>
            </div>
          </Section>

          <Section title="6. Data Accuracy">
            <p>While we endeavor to provide accurate and timely data, CryptoYield makes no warranty regarding the completeness, accuracy, or reliability of any data sourced from third parties including DeFiLlama. Data may be delayed, inaccurate, or subject to errors. Always verify critical data directly on-chain or through official protocol documentation before making any financial decisions.</p>
          </Section>

          <Section title="7. No Endorsement">
            <p>The appearance of any protocol, token, chain, or yield opportunity on CryptoYield does not constitute an endorsement, recommendation, or approval of that protocol or its security. We index protocols algorithmically based on publicly available data. Listing is not equivalent to auditing, vetting, or certifying any protocol's safety or legitimacy.</p>
          </Section>

          <Section title="8. Geographic Restrictions">
            <p>Access to certain DeFi protocols and financial instruments may be prohibited or restricted in your jurisdiction. It is your responsibility to ensure that your use of any DeFi protocol referenced on this platform complies with all applicable laws and regulations in your country of residence.</p>
          </Section>

          <Section title="9. Seek Professional Advice">
            <p>Before making any investment, staking, lending, borrowing, or liquidity provision decision, we strongly recommend consulting with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>A licensed financial advisor or investment manager registered in your jurisdiction</li>
              <li>A qualified tax professional familiar with cryptocurrency taxation</li>
              <li>A legal professional if your activity may have regulatory implications</li>
              <li>Independent smart contract auditors before depositing significant sums into any protocol</li>
            </ul>
          </Section>
        </div>
      </div>
    </PublicLayout>
  );
}

import { useSeo } from "@/hooks/use-seo";
import { PublicLayout } from "@/components/layout/PublicLayout";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-bold border-b border-border pb-2">{title}</h2>
      <div className="text-muted-foreground leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  );
}

export default function TermsOfService() {
  useSeo({
    title: "Terms of Service — CryptoYield",
    description: "CryptoYield's Terms of Service govern your access to and use of our DeFi yield analytics platform, strategy sandbox, and data aggregation tools.",
  });

  const lastUpdated = "May 20, 2025";

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-bold mb-3">Terms of Service</h1>
          <p className="text-sm font-mono text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>

        <div className="space-y-10">
          <div className="border border-amber-500/30 bg-amber-500/5 rounded-lg p-5 text-sm font-mono text-amber-400">
            IMPORTANT: By accessing or using CryptoYield, you agree to be bound by these Terms. Please read them carefully. If you do not agree to these Terms, do not use this platform.
          </div>

          <Section title="1. Acceptance of Terms">
            <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and CryptoYield ("Company," "we," "us," or "our") regarding your use of the CryptoYield platform, including all software, data aggregation services, analytical tools, and content available at cryptoyield.com and related subdomains.</p>
            <p>By accessing or using our platform, you affirm that you are at least 18 years of age, have the legal capacity to enter into these Terms, and agree to comply with them in full.</p>
          </Section>

          <Section title="2. Description of Services">
            <p>CryptoYield is a <strong className="text-foreground">data aggregation and analytical software platform</strong>. Our services include:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Aggregation and display of publicly available DeFi yield data from third-party sources including DeFiLlama</li>
              <li>Algorithmic risk scoring of yield pools based on publicly observable metrics</li>
              <li>Interactive strategy simulation tools (the "Strategy Sandbox") for modeling hypothetical yield strategies</li>
              <li>Research articles and editorial content on DeFi yield markets</li>
              <li>Comparison tools for protocol and yield analysis</li>
            </ul>
            <p>We are <strong className="text-foreground">not</strong> a broker, exchange, financial advisor, investment manager, or custodian of any kind. See our <a href="/disclaimer" className="text-primary hover:underline">Financial Disclaimer</a> for full details.</p>
          </Section>

          <Section title="3. User Responsibilities">
            <p>You agree to use the platform solely for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Scrape, crawl, or systematically extract data from the platform without prior written authorization</li>
              <li>Use the platform to facilitate market manipulation, fraud, or any illegal financial activity</li>
              <li>Attempt to reverse engineer, decompile, or extract source code from our software</li>
              <li>Introduce viruses, malware, or any harmful code into the platform</li>
              <li>Use automated systems to access the platform in a manner that exceeds reasonable personal use</li>
              <li>Misrepresent data from our platform as your own original research without attribution</li>
              <li>Reproduce or redistribute our content commercially without written permission</li>
            </ul>
          </Section>

          <Section title="4. Intellectual Property">
            <p>All content on CryptoYield, including but not limited to software code, design, text, graphics, logos, risk scoring algorithms, and editorial content, is owned by or licensed to CryptoYield and is protected by applicable intellectual property laws.</p>
            <p>Underlying DeFi yield data is sourced from third-party providers (including DeFiLlama) and is subject to their respective terms. We make no ownership claims over raw blockchain data.</p>
            <p>You are granted a limited, non-exclusive, non-transferable license to access and use the platform for personal, non-commercial purposes. This license does not include the right to reproduce, distribute, modify, or create derivative works.</p>
          </Section>

          <Section title="5. Data Accuracy and Disclaimer">
            <p>We strive to provide accurate and up-to-date yield data. However, DeFi markets are highly volatile and data may be subject to delays, inaccuracies, or errors due to upstream data provider limitations, blockchain network conditions, or technical issues.</p>
            <p>ALL DATA ON CRYPTOYIELD IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR ACCURACY.</p>
            <p>You acknowledge that any investment or financial decision made based on information from our platform is made entirely at your own risk. See our <a href="/disclaimer" className="text-primary hover:underline">Financial Disclaimer</a>.</p>
          </Section>

          <Section title="6. Limitation of Liability">
            <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CRYPTOYIELD AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND LICENSORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Loss of funds, tokens, or other digital assets</li>
              <li>Investment losses arising from reliance on platform data</li>
              <li>Smart contract exploits, protocol failures, or blockchain network issues</li>
              <li>Loss of profits, revenue, or anticipated savings</li>
              <li>Data loss or platform downtime</li>
            </ul>
            <p>Our total aggregate liability to you for any claims arising from your use of the platform shall not exceed USD $100.</p>
          </Section>

          <Section title="7. Third-Party Services and Links">
            <p>Our platform aggregates data from and links to third-party services (e.g., DeFi protocols, blockchain explorers, DeFiLlama). We do not control these services and are not responsible for their content, accuracy, availability, or privacy practices. Your interactions with third-party services are governed by their own terms and policies.</p>
          </Section>

          <Section title="8. Modifications to the Platform and Terms">
            <p>We reserve the right to modify, suspend, or discontinue any aspect of the platform at any time without notice. We may also update these Terms at our discretion. Material changes will be communicated via the platform. Continued use after changes constitutes acceptance.</p>
          </Section>

          <Section title="9. Termination">
            <p>We reserve the right to terminate or suspend your access to the platform immediately, without prior notice or liability, for any breach of these Terms or for any other reason at our sole discretion. Upon termination, all licenses granted to you under these Terms will immediately cease.</p>
          </Section>

          <Section title="10. Governing Law and Dispute Resolution">
            <p>These Terms shall be governed by and construed in accordance with applicable law. Any dispute arising from these Terms or your use of the platform shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with applicable arbitration rules.</p>
          </Section>

          <Section title="11. Severability and Waiver">
            <p>If any provision of these Terms is found to be unenforceable, that provision shall be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall remain in full force. Failure to enforce any provision of these Terms shall not constitute a waiver of our right to enforce it in the future.</p>
          </Section>

          <Section title="12. Contact">
            <p>For questions about these Terms, contact us at legal@cryptoyield.com or via our <a href="/contact" className="text-primary hover:underline">Contact page</a>.</p>
          </Section>
        </div>
      </div>
    </PublicLayout>
  );
}

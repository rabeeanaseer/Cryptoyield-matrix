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

export default function PrivacyPolicy() {
  useSeo({
    title: "Privacy Policy — CryptoYield",
    description: "CryptoYield's comprehensive privacy policy covering GDPR and CCPA compliance, cookie usage, data collection practices, and your rights as a data subject.",
  });

  const lastUpdated = "May 20, 2025";

  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-10">
          <p className="text-xs font-mono text-primary uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-sm font-mono text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose-like space-y-10">
          <div className="border border-primary/20 bg-primary/5 rounded-lg p-5 text-sm font-mono text-primary">
            This policy applies to all users of CryptoYield ("we," "us," or "our") and describes how we collect, use, disclose, and safeguard your information when you visit cryptoyield.com and use our analytical platform.
          </div>

          <Section title="1. Information We Collect">
            <p><strong className="text-foreground">1.1 Information You Provide Directly</strong></p>
            <p>We collect information you voluntarily provide when you contact us via our contact form, including your name, email address, and the content of your message. We do not require account registration to use our platform.</p>
            <p><strong className="text-foreground">1.2 Automatically Collected Information</strong></p>
            <p>When you access our platform, our servers automatically record log data including your IP address, browser type and version, operating system, referring URL, pages visited, and timestamps. This data is used exclusively for security, analytics, and service improvement.</p>
            <p><strong className="text-foreground">1.3 Cookies and Tracking Technologies</strong></p>
            <p>We use the following categories of cookies:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Strictly Necessary Cookies:</strong> Required for the platform to function. These cannot be disabled. Examples include session identifiers and security tokens.</li>
              <li><strong className="text-foreground">Analytics Cookies:</strong> Help us understand how visitors interact with our platform (e.g., Google Analytics, if enabled). These are subject to your consent.</li>
              <li><strong className="text-foreground">Preference Cookies:</strong> Store user preferences such as selected theme or display settings. These improve your experience but are not essential.</li>
              <li><strong className="text-foreground">Advertising Cookies:</strong> If third-party advertising networks are integrated, they may set cookies to serve relevant advertisements. We will notify you before enabling any advertising cookies and provide opt-out mechanisms.</li>
            </ul>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, operate, maintain, and improve our data aggregation platform</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Monitor and analyze usage patterns to improve user experience</li>
              <li>Detect and prevent fraudulent, unauthorized, or illegal activity</li>
              <li>Comply with legal obligations</li>
              <li>Send transactional communications directly related to your use of the service</li>
            </ul>
            <p>We do <strong className="text-foreground">not</strong> sell, rent, or trade your personal information to third parties for marketing purposes.</p>
          </Section>

          <Section title="3. Legal Basis for Processing (GDPR)">
            <p>For users in the European Economic Area (EEA) and United Kingdom, we process personal data under the following legal bases:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Legitimate Interests (Art. 6(1)(f) GDPR):</strong> Operating our platform, maintaining security, and improving our services</li>
              <li><strong className="text-foreground">Consent (Art. 6(1)(a) GDPR):</strong> Non-essential cookies and analytics tracking</li>
              <li><strong className="text-foreground">Legal Obligation (Art. 6(1)(c) GDPR):</strong> Compliance with applicable laws and regulations</li>
              <li><strong className="text-foreground">Contract Performance (Art. 6(1)(b) GDPR):</strong> Responding to inquiries and fulfilling service requests</li>
            </ul>
          </Section>

          <Section title="4. California Consumer Privacy Act (CCPA)">
            <p>California residents have additional rights under the CCPA, including:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>The right to know what personal information we collect, use, disclose, and sell</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to opt-out of the sale of personal information (we do not sell personal information)</li>
              <li>The right to non-discrimination for exercising your privacy rights</li>
            </ul>
            <p>To exercise any of these rights, contact us at privacy@cryptoyield.com. We will respond within 45 days.</p>
          </Section>

          <Section title="5. Data Sharing and Disclosure">
            <p>We may share your information with:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Service Providers:</strong> Trusted third parties who assist us in operating our platform (e.g., hosting providers, analytics services) under confidentiality agreements</li>
              <li><strong className="text-foreground">Legal Requirements:</strong> When required by law, subpoena, or to protect our rights and the safety of our users</li>
              <li><strong className="text-foreground">Business Transfers:</strong> In connection with any merger, acquisition, or sale of company assets, with advance notice to affected users</li>
            </ul>
          </Section>

          <Section title="6. Data Retention">
            <p>We retain personal data only as long as necessary for the purposes described in this policy:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Server logs: 90 days</li>
              <li>Contact form submissions: 24 months</li>
              <li>Analytics data: Up to 26 months (aggregated and anonymized thereafter)</li>
            </ul>
            <p>You may request earlier deletion at any time by contacting privacy@cryptoyield.com.</p>
          </Section>

          <Section title="7. Your Rights">
            <p>Subject to applicable law, you have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="text-foreground">Access:</strong> Request a copy of personal data we hold about you</li>
              <li><strong className="text-foreground">Rectification:</strong> Request correction of inaccurate personal data</li>
              <li><strong className="text-foreground">Erasure:</strong> Request deletion of your personal data ("right to be forgotten")</li>
              <li><strong className="text-foreground">Restriction:</strong> Request restriction of processing in certain circumstances</li>
              <li><strong className="text-foreground">Portability:</strong> Receive your personal data in a structured, machine-readable format</li>
              <li><strong className="text-foreground">Objection:</strong> Object to processing based on legitimate interests</li>
              <li><strong className="text-foreground">Withdraw Consent:</strong> Where processing is based on consent, withdraw it at any time</li>
            </ul>
          </Section>

          <Section title="8. Security">
            <p>We implement industry-standard security measures including TLS encryption for all data in transit, regular security audits, and restricted access controls. However, no method of internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security.</p>
          </Section>

          <Section title="9. Third-Party Links">
            <p>Our platform may contain links to external websites, including DeFi protocol documentation and blockchain explorers. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies independently.</p>
          </Section>

          <Section title="10. Children's Privacy">
            <p>Our platform is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe we have inadvertently collected data from a minor, contact us immediately at privacy@cryptoyield.com.</p>
          </Section>

          <Section title="11. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. We will notify users of material changes by updating the "Last updated" date and, where appropriate, by displaying a prominent notice on our platform. Continued use of our services after changes constitutes acceptance of the revised policy.</p>
          </Section>

          <Section title="12. Contact Our Privacy Team">
            <p>For privacy-related inquiries, data subject requests, or to exercise your rights:</p>
            <div className="border border-border rounded-lg p-4 bg-card space-y-1">
              <p><strong className="text-foreground">Email:</strong> privacy@cryptoyield.com</p>
              <p><strong className="text-foreground">Response time:</strong> Within 30 days (45 days for CCPA requests)</p>
              <p><strong className="text-foreground">Data Controller:</strong> CryptoYield</p>
            </div>
          </Section>
        </div>
      </div>
    </PublicLayout>
  );
}

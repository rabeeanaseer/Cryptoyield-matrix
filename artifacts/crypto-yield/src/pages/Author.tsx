import { useEffect } from "react";
import { Link } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import { PublicLayout } from "@/components/layout/PublicLayout";
import {
  Globe,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  ExternalLink,
  Code2,
  Database,
  Cpu,
  Layers,
  GitBranch,
  Zap,
} from "lucide-react";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Rabeea Naseer",
    jobTitle: "Lead Systems Architect & Founder",
    worksFor: {
      "@type": "Organization",
      name: "NovatraTech",
      url: "https://rabeeanaseer.online",
    },
    description:
      "Full-stack software engineer and SaaS developer specialized in algorithmic web infrastructures, automated data ecosystems, and predictive AI applications.",
    url: "https://cryptoyield.com/author/rabeea-naseer",
    sameAs: [
      "https://cryptoyield.com/author/rabeea-naseer",
      "https://rabeeanaseer.online",
      "https://www.printplues.com",
      "https://www.printplues.com/about-author",
      "https://freeiqtestonline.online",
      "https://freeiqtestonline.online/author",
      "https://github.com/rabeeanaseer",
      "https://www.linkedin.com/in/rabeea-naseer-045b4a337/",
      "https://www.facebook.com/profile.php?id=61568865071757",
      "https://www.instagram.com/rabeea.naseer/",
    ],
  },
};

const SOCIAL_LINKS = [
  {
    label: "Portfolio",
    href: "https://rabeeanaseer.online",
    icon: Globe,
    color: "text-primary",
  },
  {
    label: "GitHub",
    href: "https://github.com/rabeeanaseer",
    icon: Github,
    color: "text-foreground",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rabeea-naseer-045b4a337/",
    icon: Linkedin,
    color: "text-blue-400",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61568865071757",
    icon: Facebook,
    color: "text-blue-500",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rabeea.naseer/",
    icon: Instagram,
    color: "text-pink-400",
  },
];

const METRICS = [
  { value: "3+", label: "Years Full-Stack Experience" },
  { value: "25+", label: "Independent Web Assets Shipped" },
  { value: "Expert", label: "Programmatic Data Architecture" },
  { value: "AI/ML", label: "Predictive Systems Engineering" },
];

const STACK = [
  { label: "Python", icon: Code2 },
  { label: "FastAPI", icon: Zap },
  { label: "SQLite / PostgreSQL", icon: Database },
  { label: "Tailwind CSS", icon: Layers },
  { label: "Git Version Control", icon: GitBranch },
  { label: "Automated Data Processing", icon: Cpu },
];

const ASSETS = [
  {
    name: "CryptoYield",
    domain: "cryptoyield.com",
    href: "/",
    external: false,
    desc: "Real-time cross-chain DeFi yield intelligence application tracking 5,000+ pools across 87+ blockchains.",
    badge: "DeFi Analytics",
  },
  {
    name: "PrintPlues",
    domain: "printplues.com",
    href: "https://www.printplues.com/about-author",
    external: true,
    desc: "Automated digital asset vault and print production engine with programmatic content workflows.",
    badge: "Print / E-Commerce",
  },
  {
    name: "Free IQ Test Online",
    domain: "freeiqtestonline.online",
    href: "https://freeiqtestonline.online/author",
    external: true,
    desc: "Psychometric data analytics testing calculation suite — algorithmic score modelling and cognitive benchmarking.",
    badge: "EdTech / Analytics",
  },
  {
    name: "Personal Engineering Portfolio",
    domain: "rabeeanaseer.online",
    href: "https://rabeeanaseer.online",
    external: true,
    desc: "Central hub for software architecture logs, engineering case studies, and SaaS product documentation.",
    badge: "Portfolio",
  },
];

export default function Author() {
  useSeo({
    title: "Rabeea Naseer — Founder & Lead Systems Architect | CryptoYield",
    description:
      "Rabeea Naseer is Lead Financial Systems Architect at CryptoYield and Founder of NovatraTech — a full-stack engineer specialising in AI systems, automated data pipelines, and scalable SaaS infrastructure.",
  });

  // Inject JSON-LD structured data
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "author-jsonld";
    script.textContent = JSON.stringify(JSON_LD);
    document.head.appendChild(script);
    return () => {
      document.getElementById("author-jsonld")?.remove();
    };
  }, []);

  return (
    <PublicLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="border-b border-border/60 bg-card/20">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                <span className="text-5xl md:text-6xl font-bold text-primary font-mono">RN</span>
              </div>
            </div>

            {/* Identity */}
            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">
                  Author Profile
                </p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Rabeea Naseer
                </h1>
                <p className="text-lg text-muted-foreground font-mono mt-1">
                  Founder & Lead Systems Architect,{" "}
                  <a
                    href="https://rabeeanaseer.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    NovatraTech
                  </a>
                </p>
              </div>

              <div className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 rounded-full px-4 py-1.5">
                <Cpu className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-mono text-primary">
                  AI Systems · Data Pipelines · SaaS Engineer
                </span>
              </div>

              {/* Social links */}
              <div className="flex flex-wrap gap-3 pt-1">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center gap-2 border border-border bg-card hover:border-primary/40 hover:bg-muted/50 rounded-lg px-4 py-2 text-sm font-mono transition-colors"
                  >
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-muted-foreground">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Metrics ──────────────────────────────────────────────────── */}
      <section className="border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {METRICS.map(({ value, label }) => (
              <div
                key={label}
                className="border border-border rounded-xl bg-card p-6 text-center"
              >
                <div className="text-3xl font-bold font-mono text-primary mb-1">
                  {value}
                </div>
                <div className="text-xs font-mono text-muted-foreground uppercase tracking-wide leading-snug">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-14 space-y-16">
        {/* ── Biography ────────────────────────────────────────────── */}
        <section className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-5">
            <h2 className="text-2xl font-bold">Professional Biography</h2>
            <p className="text-muted-foreground leading-relaxed">
              Rabeea Naseer is an AI and data-driven systems developer focused on building
              scalable SaaS products, automated web infrastructures, and data-intelligent
              digital ecosystems. Combining backend systems engineering with advanced
              technical SEO mechanics, Rabeea has independently engineered and deployed
              over 25+ niche web assets, managing comprehensive algorithmic data pipelines
              and programmatic content architectures.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              At CryptoYield, Rabeea serves as Lead Financial Systems Architect —
              responsible for the risk scoring engine, the strategy simulation sandbox,
              and the live multi-chain data pipeline that ingests and indexes 5,000+ DeFi
              yield pools from 87+ blockchains every 30 minutes. All editorial content
              published on the Research Desk is authored by Rabeea with a commitment to
              mathematical accuracy, primary-source data, and zero financial conflicts of
              interest.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Through NovatraTech, Rabeea architects and operates a portfolio of
              independent web platforms across DeFi analytics, EdTech, and print
              automation — each built on the same principle: real data, real systems, no
              shortcuts.
            </p>
          </div>

          {/* ── Tech Stack ─────────────────────────────────────────── */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
              Technical Stack
            </h3>
            <div className="space-y-2">
              {STACK.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 border border-border rounded-lg px-4 py-2.5 bg-card text-sm font-mono"
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CryptoYield Role ─────────────────────────────────────── */}
        <section className="border border-primary/20 bg-primary/5 rounded-xl p-8 space-y-4">
          <p className="text-xs font-mono text-primary uppercase tracking-widest">
            Role at CryptoYield
          </p>
          <h2 className="text-xl font-bold">Lead Financial Systems Architect</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Risk Scoring Engine",
                desc: "Designed and maintains the A–F algorithmic risk scoring system applied to all 5,000+ indexed pools, based on TVL depth, stablecoin status, IL exposure, and APY outlier detection.",
              },
              {
                title: "Strategy Sandbox",
                desc: "Architected the compound yield simulation engine allowing investors to chain multiple protocols and model net APY paths before committing capital.",
              },
              {
                title: "Research Desk",
                desc: "Authors all long-form data-journalism content on the Research Desk. Every article is grounded in live SQL-backed pool data with zero editorial conflicts of interest.",
              },
            ].map(({ title, desc }) => (
              <div key={title} className="space-y-2">
                <h3 className="font-bold text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Digital Asset Portfolio ──────────────────────────────── */}
        <section className="space-y-6">
          <div>
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">
              Digital Portfolio
            </p>
            <h2 className="text-2xl font-bold">Linked Web Properties</h2>
            <p className="text-sm text-muted-foreground mt-1 font-mono">
              Independent platforms built, deployed, and operated by Rabeea Naseer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {ASSETS.map(({ name, domain, href, external, desc, badge }) => {
              const content = (
                <div className="border border-border rounded-xl bg-card hover:border-primary/40 hover:bg-muted/30 transition-all p-6 h-full group cursor-pointer">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-xs font-mono text-primary border border-primary/30 bg-primary/5 rounded-full px-2.5 py-0.5">
                        {badge}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                  <p className="text-xs font-mono text-muted-foreground mb-3">{domain}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              );

              return external ? (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {content}
                </a>
              ) : (
                <Link key={name} href={href} className="block h-full">
                  {content}
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Research Desk CTA ────────────────────────────────────── */}
        <section className="border-t border-border/60 pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold mb-1">Read Rabeea's Research</h3>
            <p className="text-sm text-muted-foreground font-mono">
              Long-form DeFi analysis, yield strategy breakdowns, and risk management
              frameworks — all data-backed and independently authored.
            </p>
          </div>
          <Link
            href="/terminal/blog"
            className="shrink-0 inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono font-bold text-sm px-6 py-3 rounded-md hover:bg-primary/90 transition-colors"
          >
            View All Articles
          </Link>
        </section>
      </div>
    </PublicLayout>
  );
}

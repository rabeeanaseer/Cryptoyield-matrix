import { Link } from "wouter";
import { Activity } from "lucide-react";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card/20">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group mb-4">
              <Activity className="w-5 h-5 text-primary group-hover:animate-pulse" />
              <span className="font-bold text-base tracking-tight">
                CRYPTO<span className="text-primary">YIELD</span>
              </span>
            </Link>
            <p className="text-xs font-mono text-muted-foreground leading-relaxed">
              Institutional-grade multi-chain DeFi yield intelligence. Data updated every 30 minutes.
            </p>
          </div>

          {/* Platform */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Platform</span>
            <Link href="/terminal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Yield Terminal</Link>
            <Link href="/terminal/chains" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Chains</Link>
            <Link href="/terminal/protocols" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Protocols</Link>
            <Link href="/terminal/assets" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Assets</Link>
            <Link href="/terminal/pools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Yield Pools</Link>
          </div>

          {/* Tools */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Tools</span>
            <Link href="/terminal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Strategy Sandbox</Link>
            <Link href="/terminal/compare/aave/compound/USDC" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Compare Protocols</Link>
            <Link href="/terminal/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Research Desk</Link>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Company</span>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            <Link href="/author/rabeea-naseer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Author Profile</Link>
            <Link href="/editorial-standards" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Editorial Standards</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">Legal</span>
            <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Disclaimer</Link>
            <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>

        <div className="border-t border-border/60 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-mono text-muted-foreground">
              &copy; {currentYear} CryptoYield. Data sourced from DeFiLlama. Not financial advice.
            </p>
            <p className="text-xs font-mono text-muted-foreground/60">
              Engineered by{" "}
              <a
                href="https://rabeeanaseer.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                NovatraTech
              </a>
              {" "}/ Developed by{" "}
              <Link href="/author/rabeea-naseer" className="hover:text-primary transition-colors">
                Rabeea Naseer
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
            <Link href="/disclaimer" className="hover:text-primary transition-colors">Financial Disclaimer</Link>
            <span className="text-border">|</span>
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <span className="text-border">|</span>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

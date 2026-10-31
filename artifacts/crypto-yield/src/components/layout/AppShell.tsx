import { Link, useLocation } from "wouter";
import { ReactNode } from "react";
import { BarChart3, Database, Globe, Layers, ArrowLeftRight, FileText, Activity } from "lucide-react";

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  exact?: boolean;
}

function NavItem({ href, label, icon: Icon, exact = false }: NavItemProps) {
  const [location] = useLocation();
  const isActive = exact
    ? location === href
    : location === href || location.startsWith(href + "/") || location.startsWith(href + "?");

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
        isActive
          ? "text-primary bg-primary/10 border-r-2 border-primary"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="font-medium tracking-wide uppercase">{label}</span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col z-10 shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 group">
            <Activity className="w-5 h-5 text-primary group-hover:animate-pulse" />
            <span className="font-bold text-lg tracking-tight">
              CRYPTO<span className="text-primary">YIELD</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
          <NavItem href="/terminal" label="Terminal" icon={BarChart3} exact />
          <NavItem href="/terminal/chains" label="Chains" icon={Globe} />
          <NavItem href="/terminal/protocols" label="Protocols" icon={Layers} />
          <NavItem href="/terminal/assets" label="Assets" icon={Database} />
          <NavItem href="/terminal/pools" label="Yield Pools" icon={Database} />
          <NavItem href="/terminal/compare/aave/compound/USDC" label="Compare" icon={ArrowLeftRight} />
          <NavItem href="/terminal/blog" label="Research" icon={FileText} />
        </nav>

        <div className="p-6 border-t border-border mt-auto">
          <div className="text-xs font-mono text-muted-foreground flex items-center justify-between">
            <span>SYSTEM: ONLINE</span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative bg-background/50">
        <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay"></div>
        {children}
      </main>
    </div>
  );
}

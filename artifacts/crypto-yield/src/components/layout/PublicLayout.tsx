import { ReactNode } from "react";
import { Link } from "wouter";
import { Activity, ChevronRight } from "lucide-react";
import { SiteFooter } from "./SiteFooter";

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Nav */}
      <header className="border-b border-border/60 sticky top-0 z-50 bg-background/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <Activity className="w-5 h-5 text-primary group-hover:animate-pulse" />
            <span className="font-bold text-lg tracking-tight">
              CRYPTO<span className="text-primary">YIELD</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-mono text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors uppercase tracking-wide">About</Link>
            <Link href="/terminal/blog" className="hover:text-foreground transition-colors uppercase tracking-wide">Research</Link>
            <Link href="/contact" className="hover:text-foreground transition-colors uppercase tracking-wide">Contact</Link>
          </nav>
          <Link
            href="/terminal"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono font-bold text-sm px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Launch Terminal <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}

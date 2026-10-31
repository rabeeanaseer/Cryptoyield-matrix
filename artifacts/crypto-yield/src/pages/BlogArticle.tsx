import { useSeo } from "@/hooks/use-seo";
import { useGetArticle } from "@workspace/api-client-react";
import { useParams, Link } from "wouter";
import { PoolTable } from "@/components/shared/PoolTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Terminal,
  ArrowRight,
  BookOpen,
} from "lucide-react";

function ArticleSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-5 w-32" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-4/5" />
        <Skeleton className="h-5 w-64" />
      </div>
      <Skeleton className="h-72 w-full rounded-xl" />
      <div className="space-y-3 pt-4">
        {Array(8).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" style={{ width: `${85 + Math.random() * 15}%` }} />
        ))}
      </div>
    </div>
  );
}

function HtmlContent({ html }: { html: string }) {
  const isHtml = html.trim().startsWith("<");
  if (isHtml) {
    return (
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
  return (
    <div className="article-body">
      {html.split("\n\n").map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </div>
  );
}

export default function BlogArticle() {
  const params = useParams();
  const slug = params.slug || "";

  const { data: article, isLoading, error } = useGetArticle(slug, {
    query: { enabled: !!slug, queryKey: ["/api/articles", slug] },
  });

  useSeo({
    title: article ? `${article.title} | CryptoYield Research` : "Research | CryptoYield",
    description: article?.content?.replace(/<[^>]+>/g, "").substring(0, 160) || "DeFi yield analysis and strategies.",
  });

  if (error) {
    return (
      <div className="p-10 text-center space-y-4">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto" />
        <h2 className="text-xl font-bold">Article not found</h2>
        <Link href="/terminal/blog" className="text-primary inline-block hover:underline font-mono text-sm">
          ← Return to Research Desk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 space-y-0">
      {/* Back nav */}
      <Link
        href="/terminal/blog"
        className="flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors w-fit mb-10"
      >
        <ArrowLeft className="w-4 h-4" /> Research Desk
      </Link>

      {isLoading ? (
        <ArticleSkeleton />
      ) : article ? (
        <article>
          {/* ── Hero Header ─────────────────────────────────────────── */}
          <header className="space-y-6 mb-10">
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="font-mono text-xs text-primary border-primary/30 bg-primary/5 uppercase tracking-wide"
              >
                {article.category}
              </Badge>
              <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                <Clock className="w-3 h-3" /> {article.readTime} min read
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Author meta row */}
            <div className="flex items-center gap-3 pt-1">
              <Link href="/author/rabeea-naseer" className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 hover:bg-primary/30 transition-colors">
                <User className="w-4 h-4 text-primary" />
              </Link>
              <div>
                <Link
                  href="/author/rabeea-naseer"
                  className="text-sm font-bold leading-none hover:text-primary transition-colors"
                >
                  By {article.authorName}
                </Link>
                <p className="text-xs font-mono text-muted-foreground mt-0.5">
                  Lead Financial Systems Architect, CryptoYield
                </p>
              </div>
            </div>
          </header>

          {/* ── Featured Image ───────────────────────────────────────── */}
          {article.featuredImageUrl && (
            <div className="mb-10 rounded-xl overflow-hidden border border-border">
              <img
                src={article.featuredImageUrl}
                alt={article.title}
                className="w-full object-cover max-h-80"
              />
            </div>
          )}

          {/* No featured image — decorative gradient bar */}
          {!article.featuredImageUrl && (
            <div className="mb-10 h-2 rounded-full bg-gradient-to-r from-primary/60 via-primary/20 to-transparent" />
          )}

          {/* ── Article Body ─────────────────────────────────────────── */}
          <style>{`
            .article-body { color: hsl(var(--foreground) / 0.85); line-height: 1.8; }
            .article-body p { margin-bottom: 1.25rem; }
            .article-body h2 { font-size: 1.5rem; font-weight: 700; margin: 2.5rem 0 1rem; color: hsl(var(--foreground)); }
            .article-body h3 { font-size: 1.15rem; font-weight: 700; margin: 2rem 0 0.75rem; color: hsl(var(--foreground)); }
            .article-body ul, .article-body ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
            .article-body li { margin-bottom: 0.4rem; }
            .article-body blockquote { border-left: 3px solid hsl(var(--primary)); padding-left: 1.25rem; margin: 1.5rem 0; color: hsl(var(--muted-foreground)); font-style: italic; }
            .article-body table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.85rem; }
            .article-body th { text-align: left; padding: 0.5rem 0.75rem; background: hsl(var(--muted)); border: 1px solid hsl(var(--border)); font-family: monospace; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; }
            .article-body td { padding: 0.5rem 0.75rem; border: 1px solid hsl(var(--border)); }
            .article-body tr:nth-child(even) td { background: hsl(var(--muted) / 0.4); }
            .article-body strong { color: hsl(var(--foreground)); font-weight: 600; }
            .article-body code { font-family: monospace; font-size: 0.85em; background: hsl(var(--muted)); padding: 0.15em 0.4em; border-radius: 4px; }
          `}</style>
          <HtmlContent html={article.content} />

          {/* ── Live Data: Related Pools ─────────────────────────────── */}
          {article.relatedPools && article.relatedPools.length > 0 && (
            <div className="mt-12 pt-10 border-t border-border space-y-4">
              <div>
                <p className="text-xs font-mono text-primary uppercase tracking-widest mb-1">Live Data</p>
                <h3 className="text-2xl font-bold">Relevant Yield Pools</h3>
                <p className="text-sm font-mono text-muted-foreground mt-1">
                  Real-time yields for strategies discussed in this report. Updated every 30 minutes.
                </p>
              </div>
              <PoolTable pools={article.relatedPools} />
            </div>
          )}

          {/* ── Strategy CTA Widget ──────────────────────────────────── */}
          <div className="mt-12 border border-primary/30 bg-primary/5 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Terminal className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-xs font-mono text-primary uppercase tracking-widest">Strategy Sandbox</p>
                <h3 className="text-xl font-bold">
                  Want to test this strategy?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Load these protocols directly into the <strong className="text-foreground">CryptoYield Sandbox Engine</strong>. 
                  Model compound yield paths, calculate net APY, and stress-test allocations — before you commit a single dollar.
                </p>
                <Link
                  href="/terminal"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-mono font-bold text-sm px-5 py-2.5 rounded-md hover:bg-primary/90 transition-colors mt-2"
                >
                  Open Strategy Sandbox <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Author Bio Box ───────────────────────────────────────── */}
          <div className="mt-10 border border-border rounded-xl p-8 bg-card">
            <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">About the Author</p>
            <div className="flex items-start gap-5">
              <Link href="/author/rabeea-naseer" className="w-16 h-16 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center shrink-0 hover:bg-primary/25 transition-colors">
                <User className="w-8 h-8 text-primary" />
              </Link>
              <div className="space-y-2">
                <div>
                  <Link href="/author/rabeea-naseer" className="text-lg font-bold hover:text-primary transition-colors">
                    {article.authorName}
                  </Link>
                  <p className="text-xs font-mono text-primary">Lead Financial Systems Architect — CryptoYield</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.authorBio}
                </p>
                <Link
                  href="/author/rabeea-naseer"
                  className="inline-block text-xs font-mono text-primary hover:underline mt-1"
                >
                  View full profile →
                </Link>
              </div>
            </div>
          </div>
        </article>
      ) : null}
    </div>
  );
}

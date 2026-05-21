import { useSeo } from "@/hooks/use-seo";
import { useListArticles } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Clock, ArrowRight, User, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Blog() {
  useSeo({
    title: "Research & Analysis | CryptoYield",
    description: "In-depth research on DeFi yield strategies, risks, and market trends by Rabeea Naseer, Lead Financial Systems Architect.",
  });

  const { data: articles, isLoading } = useListArticles();

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <div className="border-b border-border pb-8">
        <p className="text-xs font-mono text-primary uppercase tracking-widest mb-2">Data Journalism</p>
        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" /> Research Desk
        </h1>
        <p className="text-muted-foreground mt-2 font-mono text-sm">
          Long-form market analysis and yield strategy breakdowns. All articles are data-driven and authored by the CryptoYield research team.
        </p>
      </div>

      <div className="space-y-5">
        {isLoading
          ? Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-44 w-full" />)
          : articles?.map((article) => (
              <Link key={article.id} href={`/terminal/blog/${article.slug}`}>
                <Card className="bg-card hover:bg-muted/40 transition-all border-border cursor-pointer group hover:border-primary/40 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
                  <CardContent className="p-0">
                    <div className="flex gap-0 items-stretch">
                      {/* Featured image thumbnail */}
                      {(article as any).featuredImageUrl && (
                        <div className="hidden md:block w-48 shrink-0 overflow-hidden">
                          <img
                            src={(article as any).featuredImageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 p-6 md:p-8 space-y-3">
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
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors leading-snug">
                          {article.title}
                        </h2>

                        {/* Author */}
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">
                            By {article.authorName}
                          </span>
                        </div>
                      </div>

                      <div className="hidden md:flex shrink-0 w-10 h-10 rounded-full bg-secondary items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors self-center mr-6">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>
    </div>
  );
}

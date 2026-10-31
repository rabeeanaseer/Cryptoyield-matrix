import { Router } from "express";
import { db, articlesTable, poolsTable } from "@workspace/db";
import { eq, sql, desc, ilike } from "drizzle-orm";
import { formatPool } from "./chains";

const router = Router();

router.get("/blog", async (req, res) => {
  try {
    const limit = Math.min(parseInt((req.query.limit as string) ?? "10"), 50);
    const offset = parseInt((req.query.offset as string) ?? "0");

    const articles = await db
      .select({
        id: articlesTable.id,
        slug: articlesTable.slug,
        title: articlesTable.title,
        excerpt: articlesTable.excerpt,
        category: articlesTable.category,
        authorName: articlesTable.authorName,
        publishedAt: articlesTable.publishedAt,
        readTime: articlesTable.readTime,
        featuredImageUrl: articlesTable.featuredImageUrl,
      })
      .from(articlesTable)
      .orderBy(desc(articlesTable.publishedAt))
      .limit(limit)
      .offset(offset);

    res.json(
      articles.map((a) => ({
        ...a,
        publishedAt: a.publishedAt.toISOString(),
        featuredImageUrl: a.featuredImageUrl ?? null,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to list articles");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/blog/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const articles = await db
      .select()
      .from(articlesTable)
      .where(eq(articlesTable.slug, slug))
      .limit(1);

    if (!articles[0]) {
      res.status(404).json({ error: `Article '${slug}' not found` });
      return;
    }

    const article = articles[0];

    // Fetch related pools based on article token/protocol tags
    let relatedPools: ReturnType<typeof formatPool>[] = [];
    if (article.relatedToken) {
      const pools = await db
        .select()
        .from(poolsTable)
        .where(ilike(poolsTable.symbol, `%${article.relatedToken.toUpperCase()}%`))
        .orderBy(sql`${poolsTable.tvlUsd} desc`)
        .limit(5);
      relatedPools = pools.map(formatPool);
    } else if (article.relatedProtocol) {
      const pools = await db
        .select()
        .from(poolsTable)
        .where(eq(poolsTable.project, article.relatedProtocol.toLowerCase()))
        .orderBy(sql`${poolsTable.apy} desc`)
        .limit(5);
      relatedPools = pools.map(formatPool);
    } else {
      const pools = await db
        .select()
        .from(poolsTable)
        .orderBy(sql`${poolsTable.apy} desc`)
        .limit(5);
      relatedPools = pools.map(formatPool);
    }

    res.json({
      id: article.id,
      slug: article.slug,
      title: article.title,
      content: article.content,
      category: article.category,
      authorName: article.authorName,
      authorBio: article.authorBio,
      featuredImageUrl: article.featuredImageUrl ?? null,
      publishedAt: article.publishedAt.toISOString(),
      readTime: article.readTime,
      relatedPools,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get article");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

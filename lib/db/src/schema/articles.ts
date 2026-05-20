import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const articlesTable = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  authorName: text("author_name").notNull().default("Rabeea Naseer"),
  authorBio: text("author_bio").notNull().default(
    "Rabeea Naseer is Lead Financial Systems Architect at CryptoYield, specialising in multi-chain DeFi yield modelling, risk-adjusted return analysis, and algorithmic protocol evaluation across 87+ blockchains."
  ),
  featuredImageUrl: text("featured_image_url"),
  relatedToken: text("related_token"),
  relatedProtocol: text("related_protocol"),
  readTime: integer("read_time").notNull().default(5),
  publishedAt: timestamp("published_at").notNull().defaultNow(),
});

export const insertArticleSchema = createInsertSchema(articlesTable).omit({ id: true, publishedAt: true });
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articlesTable.$inferSelect;

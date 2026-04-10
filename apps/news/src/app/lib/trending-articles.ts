import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";
import { apiFetch } from "./api";

export async function getTrendingArticles(
  count: number,
): Promise<Article[] | null> {
  const trendingArticles = await apiFetch<Article[]>(`/articles/trending`);
  // Make sure we have at least 1 article.
  if (!trendingArticles[0]) return null;
  console.log("trending articles results:", trendingArticles);
  return z.array(ArticleSchema).parse(trendingArticles);
}

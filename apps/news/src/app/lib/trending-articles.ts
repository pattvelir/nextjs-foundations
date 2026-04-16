import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";
import { apiFetch } from "./api";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export async function getTrendingArticles(
  count: number,
): Promise<Article[] | null> {
  "use cache";
  cacheLife("minutes");

  const trendingArticles = await apiFetch<Article[]>(`/articles/trending`);

  // Make sure we have at least 1 article.
  if (!trendingArticles[0]) {
    return null;
  }

  return z.array(ArticleSchema).parse(trendingArticles);
}

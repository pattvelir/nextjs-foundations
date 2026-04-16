import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";
import { apiFetch } from "./api";
import { articleSearchToQueryString } from "./utils";
import { SearchSchema } from "@repo/models/requests/search";
import { cacheLife } from "next/dist/server/use-cache/cache-life";
// Get the database connection.

export async function getFeaturedArticles(
  count: number,
): Promise<Article[] | null> {
  "use cache";
  cacheLife("hours");
  // Only allow up to a maximum of 10 articles to display. We'll parse out any breaking
  // news since that will be displayed seperately.
  const validatedCount = count > 0 && count <= 10 ? count : 10;
  const request = SearchSchema.parse({
    limit: validatedCount,
    featured: "true",
  });
  const articles = await apiFetch<Article[]>(
    `/articles?${articleSearchToQueryString(request)}`,
  );

  // Make sure we have at least 1 article.
  if (!articles[0]) {
    return null;
  }
  console.log("featured articles results:", articles);
  return z.array(ArticleSchema).parse(articles);
}

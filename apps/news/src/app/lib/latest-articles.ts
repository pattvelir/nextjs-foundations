import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";
import { apiFetch } from "./api";
import { articleSearchToQueryString } from "./utils";
import { SearchSchema } from "@repo/models/requests/search";
import { cacheLife } from "next/cache";

export async function getLatestArticles(
  count: number,
): Promise<Article[] | null> {
  "use cache";
  cacheLife("minutes");

  // Only allow up to a maximum of 10 articles to display. We'll parse out any breaking
  // news since that will be displayed seperately.
  const validatedCount = count > 0 && count <= 10 ? count : 10;
  const request = SearchSchema.parse({
    limit: validatedCount,
  });
  const articles = await apiFetch<Article[]>(
    `/articles?${articleSearchToQueryString(request)}`,
  );

  // Make sure we have at least 1 article.
  if (!articles[0]) {
    return null;
  }

  return z.array(ArticleSchema).parse(articles);
}

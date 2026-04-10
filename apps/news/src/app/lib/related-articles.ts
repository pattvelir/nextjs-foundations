import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { z } from "zod";
import { apiFetch } from "./api";
import { SearchSchema } from "@repo/models/requests/search";
import { articleSearchToQueryString } from "./utils";

// Get the database connection.

export async function getRelatedArticles(
  category: string | null,
  count: number,
): Promise<Article[] | null> {
  // Only allow up to a maximum of 10 articles to display. We'll parse out any breaking
  // news since that will be displayed seperately.

  if (!category || category.length === 0) {
    return null;
  }

  const validatedCount = count > 0 && count <= 10 ? count : 10;
  const request = SearchSchema.parse({
    limit: validatedCount,
    category: category,
  });

  const relatedArticles = await apiFetch<Article[]>(
    `/articles?${articleSearchToQueryString(request)}`,
  );

  // Make sure we have at least 1 article.
  if (!relatedArticles[0]) return null;
  console.log("related results:", relatedArticles);
  return z.array(ArticleSchema).parse(relatedArticles);
}

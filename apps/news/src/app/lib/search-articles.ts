import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { SearchSchema, Search } from "@repo/models/requests/search";
import { z } from "zod";
import { apiFetch } from "./api";
import { articleSearchToQueryString } from "./utils";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export async function searchArticles(
  search: Search,
): Promise<Article[] | null> {
  "use cache";
  cacheLife("seconds");

  const validatedSearch = SearchSchema.parse(search);

  // Force results limit to only 5.
  validatedSearch.limit = 5;

  const articles = await apiFetch<Article[]>(
    `/articles?${articleSearchToQueryString(validatedSearch)}`,
  );

  if (!articles[0]) {
    return null;
  }
  return z.array(ArticleSchema).parse(articles);
}

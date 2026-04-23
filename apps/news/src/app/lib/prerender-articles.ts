import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { SearchSchema, Search } from "@repo/models/requests/search";
import { z } from "zod";
import { apiFetch } from "./api";
import { articleSearchToQueryString } from "./utils";
import { cacheLife } from "next/dist/server/use-cache/cache-life";

export async function preRenderArticles(): Promise<Article[] | null> {
  "use cache";

  const prerenderRequest = SearchSchema.parse({
    limit: 20,
  });

  cacheLife("hours");

  const validatedSearch = SearchSchema.parse(prerenderRequest);

  const articles = await apiFetch<Article[]>(
    `/articles?${articleSearchToQueryString(validatedSearch)}`,
  );

  if (!articles[0]) {
    return null;
  }
  return z.array(ArticleSchema).parse(articles);
}

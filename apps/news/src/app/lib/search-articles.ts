import { neon } from "@neondatabase/serverless";
import { Article, ArticleSchema } from "@repo/models/article";
import { SearchSchema, Search } from "@repo/models/requests/search";
import { z } from "zod";
import { apiFetch } from "./api";
import { articleSearchToQueryString } from "./utils";

export async function searchArticles(query: Search): Promise<Article[] | null> {
  const articles = await apiFetch<Article[]>(
    `/articles?${articleSearchToQueryString(query)}`,
  );
  if (!articles[0]) return null;
  return z.array(ArticleSchema).parse(articles);
}

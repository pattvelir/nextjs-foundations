import { Article, ArticleSchema } from "@repo/models/article";
import { apiFetch } from "./api";
import { cacheLife } from "next/cache";

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  "use cache";

  const article = await apiFetch<Article>(`/articles/${slug}`);

  if (!article) {
    return null;
  }

  // We'll only cache the article if it was successfully found.
  cacheLife("articles");

  return ArticleSchema.parse(article);
}

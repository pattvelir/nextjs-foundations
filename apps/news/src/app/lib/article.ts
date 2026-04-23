import { Article, ArticleSchema } from "@repo/models/article";
import { apiFetch } from "./api";
import { cacheLife, unstable_noStore } from "next/cache";

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  "use cache";

  const article = await apiFetch<Article>(`/articles/${slug}`);

  if (!article) {
    // If no article was found, don't cache.
    unstable_noStore();
    return null;
  }

  // We'll only cache the article if it was successfully found.
  cacheLife("hours");

  return ArticleSchema.parse(article);
}

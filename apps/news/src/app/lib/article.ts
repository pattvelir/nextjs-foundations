import { Article, ArticleSchema } from "@repo/models/article";
import { apiFetch } from "./api";
import { getSubscriptionStatusServer } from "./subscription-status-server";
import { ContentBlock } from "@repo/models/content-block";
import { cacheLife } from "next/cache";

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  "use cache";

  // Cache the article
  cacheLife("hours");
  const article = await apiFetch<Article>(`/articles/${slug}`);

  if (!article) return null;

  return ArticleSchema.parse(article);
}

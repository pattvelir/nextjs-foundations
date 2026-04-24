import { Article, ArticleSchema } from "@repo/models/article";
import { apiFetch } from "./api";
import { cacheLife } from "next/cache";

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  "use cache";
  try {
    const article = await apiFetch<Article>(`/articles/${slug}`);

    if (!article) {
      return null;
    }

    // We'll only cache the article if it was successfully found.
    cacheLife("articles");

    return ArticleSchema.parse(article);
  } catch (err: unknown) {
    console.log("error:", err);
    if (err instanceof Error && err.message === "NOT_FOUND") {
      return null;
    }

    throw err;
  }
}

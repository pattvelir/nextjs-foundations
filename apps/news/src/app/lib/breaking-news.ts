import { BreakingNews, BreakingNewsSchema } from "@repo/models/breaking-news";
import { z } from "zod";
import { apiFetch } from "./api";
import { cacheLife } from "next/cache";

export async function getBreakingNews(): Promise<BreakingNews | null> {
  "use cache";

  // We'll only cache in seconds because breaking news could change frequently.
  cacheLife("seconds");
  const breakingNewsArticles = await apiFetch<BreakingNews>(`/breaking-news`);

  // Make sure we found an article
  if (!breakingNewsArticles) {
    return null;
  }

  return BreakingNewsSchema.parse(breakingNewsArticles);
}

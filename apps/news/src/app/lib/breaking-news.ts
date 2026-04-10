import { BreakingNews, BreakingNewsSchema } from "@repo/models/breaking-news";
import { z } from "zod";
import { apiFetch } from "./api";

export async function getBreakingNews(): Promise<BreakingNews | null> {
  const breakingNewsArticles = await apiFetch<BreakingNews>(`/breaking-news`);

  // Make sure we have at least 1 article.
  if (!breakingNewsArticles) return null;
  console.log("breaking news results:", breakingNewsArticles);
  return BreakingNewsSchema.parse(breakingNewsArticles);
}

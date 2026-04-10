import { z } from "zod";

export const BreakingNewsSchema = z
  .object({
    articleId: z.string().min(1),
    category: z.string().optional(),
    headline: z.string().min(1),
    id: z.string(),
    publishedAt: z.coerce.date(),
    summary: z.string().optional(),
    urgent: z.boolean().default(false),
  })
  .transform((article) => ({
    ...article,
    url: `/articles/${article.articleId}`,
  }));

export type BreakingNews = z.infer<typeof BreakingNewsSchema>;

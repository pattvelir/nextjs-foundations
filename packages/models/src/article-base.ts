import { z } from "zod";

export const ArticleBaseSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  body: z.string().min(1),
});

export type ArticleBase = z.infer<typeof ArticleBaseSchema>;

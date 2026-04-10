import { z } from "zod";
import { ContentBlockSchema } from "./content-block";

export const ArticleBaseSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  content: z.array(ContentBlockSchema).min(1),
});

export type ArticleBase = z.infer<typeof ArticleBaseSchema>;

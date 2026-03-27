import { z } from "zod";
import { ArticleBaseSchema } from "./article-base";

export const ArticleSchema = ArticleBaseSchema.extend({
  id: z.number(),
  slug: z.string(),
  datecreated: z.date(), // or z.coerce.date() (see below)
  image: z.string().optional(),
  category: z.string().optional(),
});

export type Article = z.infer<typeof ArticleSchema>;

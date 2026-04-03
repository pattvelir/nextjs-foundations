import { z } from "zod";
import { ArticleBaseSchema } from "./article-base";
import { TaxonomySchema } from "./taxonomy";
export const ArticleSchema = ArticleBaseSchema.extend({
  id: z.number(),
  slug: z.string(),
  datecreated: z.date(), // or z.coerce.date() (see below)
  image: z.string().optional(),
  category: z.string().optional(),
  views: z.number(),
  isbreakingnews: z.boolean(),
  tags: z.array(TaxonomySchema).optional(),
}).transform((article) => ({
  ...article,
  url: `/articles/${article.slug}`,
}));

export type Article = z.infer<typeof ArticleSchema>;

import { z } from "zod";
import { ContentBlockSchema } from "./content-block";
import { AuthorSchema } from "./author";
export const ArticleSchema = z
  .object({
    title: z.string().min(1),
    author: AuthorSchema,
    content: z.array(ContentBlockSchema).min(1),
    id: z.string(),
    slug: z.string(),
    publishedAt: z.coerce.date(),
    image: z.string().optional(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  })
  .transform((article) => ({
    ...article,
    url: `/articles/${article.slug}`,
  }));

export type Article = z.infer<typeof ArticleSchema>;

import { z } from "zod";

export const CategorySchema = z
  .object({
    articleCount: z.number().int().nonnegative(),
    name: z.string().min(1),
    slug: z.string().min(1),
  })
  .transform((category) => ({
    ...category,
    url: `/search?category=${encodeURIComponent(category.slug)}`,
  }));

export type Category = z.infer<typeof CategorySchema>;

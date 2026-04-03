import { z } from "zod";

export const TaxonomySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
});

export type Taxonomy = z.infer<typeof TaxonomySchema>;

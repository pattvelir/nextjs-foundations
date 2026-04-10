import { z } from "zod";

export const PaginationMetaSchema = z.object({
  hasNextPage: z.boolean(),
  hasPreviousPage: z.boolean(),
  limit: z.number().int().positive(),
  page: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

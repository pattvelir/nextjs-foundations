import { z } from "zod";

// note: preprossing is used here so that we can parse the query string values
export const SubscriptionRequestSchema = z.object({
  page: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().int().positive().default(1),
  ),
  limit: z.preprocess(
    (val) => (val ? Number(val) : undefined),
    z.number().int().positive().max(100).default(20),
  ),
  category: z
    .enum([
      "changelog",
      "engineering",
      "customers",
      "company-news",
      "community",
    ])
    .optional(),
  search: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().min(1).optional(),
  ),
  featured: z.enum(["true", "false"]).optional(),
});

export type SubscriptionRequest = z.infer<typeof SubscriptionRequestSchema>;

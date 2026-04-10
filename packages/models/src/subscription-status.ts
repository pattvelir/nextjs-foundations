import { z } from "zod";

export const SubscriptionStatusSchema = z.object({
  token: z.uuid(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  status: z.enum(["active", "inactive"]),
  subscribedAt: z.coerce.date(),
  changeMessage: z.string().optional(),
});

export type SubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;

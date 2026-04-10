import {
  SubscriptionStatus,
  SubscriptionStatusSchema,
} from "@repo/models/subscription-status";

export async function getSubscriptionStatus(): Promise<SubscriptionStatus | null> {
  const response = await fetch("/api/subscribe", {
    method: "GET",
  });

  const subscriptionStatus = await response.json();
  return SubscriptionStatusSchema.parse(subscriptionStatus);
}

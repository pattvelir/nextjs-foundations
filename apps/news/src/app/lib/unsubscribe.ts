import { apiFetch } from "./api";
import {
  SubscriptionStatus,
  SubscriptionStatusSchema,
} from "@repo/models/subscription-status";

export async function unsubscribe(
  subscriptionStatus: SubscriptionStatus,
): Promise<SubscriptionStatus | null> {
  // if the subscription status is null, we'll return null back.
  if (!subscriptionStatus) {
    return null;
  }

  // Only unsubscribe if the status is active.
  if (subscriptionStatus != null && subscriptionStatus.status === "active") {
    const response = await fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "x-subscription-token": subscriptionStatus.token },
    });

    const data = await response.json();
    return SubscriptionStatusSchema.parse(data);
  }

  // If the subscription status isn't active, we'll return the existing status back.
  return subscriptionStatus;
}

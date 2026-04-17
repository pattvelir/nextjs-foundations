// Note: Remove this file.

import {
  SubscriptionStatus,
  SubscriptionStatusSchema,
} from "@repo/models/subscription-status";

export async function subscribe(): Promise<SubscriptionStatus | null> {
  const response = await fetch("/api/subscribe", {
    method: "POST",
  });

  const data = await response.json();
  return SubscriptionStatusSchema.parse(data);
}

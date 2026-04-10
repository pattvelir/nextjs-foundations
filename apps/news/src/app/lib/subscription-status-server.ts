import {
  SubscriptionStatus,
  SubscriptionStatusSchema,
} from "@repo/models/subscription-status";
import { cookies } from "next/dist/server/request/cookies";
import { apiFetch } from "./api";

// Server variant of the getSubscriptionStatus internal API function.
export async function getSubscriptionStatusServer(): Promise<SubscriptionStatus | null> {
  const cookiesList = await cookies();
  const subscriptionToken = cookiesList.get("subscriptionToken")?.value;

  if (!subscriptionToken) {
    return null;
  }
  const subscriptionStatus = await apiFetch<SubscriptionStatus>(
    "/subscription",
    "GET",
    { "x-subscription-token": subscriptionToken },
  );

  // If we don't get a subscription status back, we'll return null as the user isn't subscribed.
  if (!subscriptionStatus) {
    return null;
  }

  console.log("subscription status result:", subscriptionStatus);
  return SubscriptionStatusSchema.parse(subscriptionStatus);
}

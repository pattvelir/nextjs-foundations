import {
  SubscriptionStatus,
  SubscriptionStatusSchema,
} from "@repo/models/subscription-status";
import { cookies } from "next/dist/server/request/cookies";
import { apiFetch } from "./api";
import { headers } from "next/headers";

// Server variant of the getSubscriptionStatus internal API function.
export async function getSubscriptionStatusServer(): Promise<SubscriptionStatus | null> {
  const hasSubscriptionToken =
    (await headers()).get("x-has-subscription-token") === "true";

  // If we don't have a subscription token,
  // we can return early with null as the user definitely isn't subscribed.
  if (!hasSubscriptionToken) {
    return null;
  }

  const cookiesList = await cookies();
  const subscriptionToken = cookiesList.get("subscriptionToken")?.value;

  if (!subscriptionToken) {
    return null;
  }

  // We still need to check for subscription status even if we have the cookie,
  // as it may be invalid or expired.
  const subscriptionStatus = await apiFetch<SubscriptionStatus>(
    "/subscription",
    "GET",
    { "x-subscription-token": subscriptionToken },
  );

  // If we don't get a subscription status back, we'll return null as the user isn't subscribed.
  if (!subscriptionStatus) {
    return null;
  }

  return SubscriptionStatusSchema.parse(subscriptionStatus);
}

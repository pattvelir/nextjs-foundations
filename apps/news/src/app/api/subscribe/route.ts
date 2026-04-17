import { apiFetch } from "@/app/lib/api";
import {
  SubscriptionStatus,
  SubscriptionStatusSchema,
} from "@repo/models/subscription-status";
import { cookies } from "next/headers";

export async function POST() {
  const cookiesList = await cookies();

  // Check to make sure the user isn't already subscribed.
  const subscriptionToken = cookiesList.get("subscriptionToken")?.value;
  let subscriptionStatus;
  if (subscriptionToken) {
    // If the user is already subscribed, we'll get the subscription status.
    subscriptionStatus = await apiFetch<SubscriptionStatus>(
      `/subscription`,
      "GET",
      { "x-subscription-token": subscriptionToken },
    );

    // If we didn't find a valid subscription status, delete the existing cookie,
    // and re-create the subscription.
    if (!subscriptionStatus) {
      cookiesList.delete("subscriptionToken");
    } else {
      // If the subscription status is not active, we'll reactivate it.
      if (subscriptionStatus.status !== "active") {
        subscriptionStatus = await apiFetch<SubscriptionStatus>(
          `/subscription`,
          "POST",
          { "x-subscription-token": subscriptionToken },
        );
      }
    }
  }

  // If no subscription token exists, or if it was invalid, we'll create a new subscription.
  if (!subscriptionStatus) {
    subscriptionStatus = await apiFetch<SubscriptionStatus>(
      `/subscription/create`,
      "POST",
    );
  }

  // If the subscription creation failed, we'll return null.
  if (!subscriptionStatus) {
    return Response.json(null);
  }

  // Automatically activate the subscription.
  subscriptionStatus = await apiFetch<SubscriptionStatus>(
    `/subscription`,
    "POST",
    { "x-subscription-token": subscriptionStatus.token },
  );

  // If the activation failed, we'll return null.
  if (!subscriptionStatus) {
    return Response.json(null);
  }

  // Finally, if everything succeeded, we'll set the cookie and return the status.
  cookiesList.set("subscriptionToken", subscriptionStatus.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return Response.json(subscriptionStatus);
}

export async function GET() {
  const cookiesList = await cookies();
  const subscriptionToken = cookiesList.get("subscriptionToken")?.value;

  if (!subscriptionToken) {
    return Response.json(null);
  }
  const subscriptionStatus = await apiFetch<SubscriptionStatus>(
    "/subscription",
    "GET",
    { "x-subscription-token": subscriptionToken },
  );

  // If we don't get a subscription status back, we'll return null as the user isn't subscribed.
  if (!subscriptionStatus) {
    return Response.json(null);
  }

  return Response.json(subscriptionStatus);
}
